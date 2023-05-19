const express = require('express');
const { Sequelize, DataTypes } = require('sequelize')
const fs = require('fs');
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

// Функция чтения файла JSON (возвращает промис)
  async initUsersDb() {
    try {
      const data = await fs.promises.readFile(this.pathJson, { encoding: 'utf8' });
      this.usersDb = JSON.parse(data);
    } catch (error) {
      console.error('Ошибка при разборе файла JSON:', error);
      throw error;
    }
  }
  async deleteUsers(userIds){
    this.usersDb = this.usersDb.filter(user => !userIds.includes(user.userId));
  }
  async editUser(userId, sip, name, email, phone, password, role){
    // Ищем пользователя с заданным userId
    const userIndex = this.usersDb.findIndex((user) => user.userId === userId)
    if (userIndex !== -1) {
      this.usersDb[userIndex].name = name;
      this.usersDb[userIndex].email = email;
      this.usersDb[userIndex].phone = phone;
      this.usersDb[userIndex].sip = sip;
      this.usersDb[userIndex].password = password;
      this.usersDb[userIndex].role = role;
    }
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

    this.app.post('/api/login', async (req, res) => {
      try {
        const {email, password} = req.body;
        if (!email || !password) {
          return res.status(400).json({error: 'Email and password are required'});
        }

        const user = this.usersDb.find(user => user.email === email);
        if (!user) {
          return res.status(400).json({error: 'Login is failed'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(await bcrypt.hash(password, 10))
        if (!passwordMatch) {
          return res.status(400).json({error: 'Login is failed'});
        }

        const token = this.generateJwtToken(user);
        res.json({Token: token});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    this.app.post('/api/deleteUsers', async (req, res) => {
      try {
        const UserIds = req.body.userIds
        await this.deleteUsers(UserIds)
        res.json({success: true});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
    this.app.post('/api/editUser', async (req, res) => {
      try {
        const { userId, name, email, phone, sip, password, role } = req.body;
        await this.editUser(userId, name, email, phone, sip, password, role);
        res.json({success: true});
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
