const express = require('express');
const { Sequelize, DataTypes } = require('sequelize')
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class DataBaseServer{
  // Создаем экземпляр приложения Express
  port = 3000;
  app = express();
  isJson = true;
  pathJson = 'server/data.json';
  keyForToken = "z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbP";
  usersDb = [];

  // Параметры подключения к базе данных
  dbConfig = {
    database: 'quasar_db',
    host: 'localhost',
    username: 'root',
    password: '',
  };
  sequelize;
  User;

  constructor() {
    // Подключение промежуточного ПО для обработки тела запроса
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    if (!this.isJson){
      // Подключение к базе данных
      this.sequelize = new Sequelize(this.dbConfig.database, this.dbConfig.username, this.dbConfig.password, {
        host: this.dbConfig.host,
        dialect: 'mysql',
      });
      // Определение модели для таблицы
      this.User = this.sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        sip: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user'
        },
      });
    }
    else {
      this.initUsersDb();
    }
    this.createRoutes();
    this.startServer();
  }

// Функция чтения файла JSON (возвращает промис)
  async initUsersDb() {
    try {
      const data = await fs.readFile(this.pathJson, { encoding: 'utf8' });
      this.usersDb = JSON.parse(data);
    } catch (error) {
      console.error('Ошибка при разборе файла JSON:', error);
    }
  }

  async deleteUsers(userIds){
    this.usersDb = this.usersDb.filter(user => !userIds.includes(user.userId));
  }

  async editUser(userId, sip, name, email, phone, password, role){
    // Ищем пользователя с заданным userId
    const user = this.usersDb.find(user => userId.includes(user.userId));
    if (user) {
      user.sip = sip;
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.password = password;
      user.role = role;
    } else {
      console.log('Пользователь с userId', userId, 'не найден');
    }
  }

  async addUser(sip, name, email, phone, password, role){
    // Генерируем userId для нового пользователя
    const userId = this.generateUserId();
    // Добавляем нового пользователя в массив пользователей
    this.usersDb.push({id: this.usersDb.length+1, userId: userId, sip: sip, name: name, email: email, phone: phone, password: password, role: role})

  }

  async searchUsersForQuery(query){
    query = query.toLowerCase();
    return this.usersDb.filter((user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.sip.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query)
    );
  }

  async loginUser(email, password, res){
    try {
      const user = this.usersDb.find((user) => user.email === email);
      if (!user) {
        return res.status(400).json({ error: 'Login is failed' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Login is failed' });
      }

      const token = this.generateJwtToken(user);
      res.json({ Token: token });
    } catch (error){
      res.json({ Token: false });
    }

  }

  async verificationUser(userToken, res){
    try {
      const decoded = jwt.verify(userToken, this.keyForToken);
      const { Id: userId, Email: email } = decoded;

      const isUser = this.usersDb.some((user) => user.email === email && user.userId === userId);
      console.log('Verification token');
      console.log({ userId, email });
      console.log(isUser);

      res.json({ isVerified: isUser });
    } catch (error) {
      res.json({ isVerified: false });
    }
  }

  generateUserId(){
    let userId = 0;
    /// Бесконечный цикл для генерации userId
    while (true){
      userId = Math.floor(Math.random() * 99999999) + 1; // генерация случайного числа от 1 до 99999999
      const result  = this.usersDb.find((user) => user.userId === userId) // проверка, существует ли пользователь с таким userId
      if (!result){
        break // если такого userId нет, выходим из цикла
      }
    }
    return userId // возвращаем сгенерированный уникальный userId
  }

  // Функция генерации токена
  generateJwtToken(user) {
    const data = {
      Id: user.userId,
      Email: user.email,
    };
    const jwtToken = jwt.sign(data, this.keyForToken, {algorithm: 'HS256'});
    console.log(jwtToken)
    // Возврат строки, представляющей токен и подпись
    return jwtToken
  }

  createRoutes() {

    // Маршрут для получения всех пользователей
    this.app.post('/api/allUsers', async (req, res) => {
      try {
        res.json(this.usersDb);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/deleteUsers', async (req, res) => {
      try {
        const { userIds } = req.body;
        await this.deleteUsers(userIds)
        res.json({success: true});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/editUser', async (req, res) => {
      try {
        const { userId, name, email, phone, sip, password, role } = req.body;
        await this.editUser(userId, sip, name, email, phone, password, role);
        res.json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/addUser', async (req, res) => {
      try {
        const { name, email, phone, sip, password, role } = req.body;
        await this.addUser(sip, name, email, phone, password, role);
        res.json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/searchUsersForQuery', async (req, res) => {
      try {
        const { query } = req.body;
        const usersResult = await this.searchUsersForQuery(query);
        res.json(usersResult);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/login', async (req, res) => {
      try {
        const {email, password} = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
        await this.loginUser(email, password, res)
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/verification', async (req, res) => {
      try {
        const { userToken } = req.body;
        await this.verificationUser(userToken, res)
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  }

  // Запуск сервера
  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Сервер запущен на порту ${this.port}`);
    });
  }


}

const dataBaseServer = new DataBaseServer();
