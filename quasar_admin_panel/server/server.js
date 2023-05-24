const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

class DataBaseServer {
  port = 3000;  // Порт, на котором будет запущен сервер
  app = express();  // Создание экземпляра Express приложения
  isJson = true;  // Флаг, указывающий на использование JSON-файла или базы данных
  pathJson = "server/users-100000.json";  // Путь к JSON-файлу
  keyForToken = "z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbP"; // Ключ для создания и верификации JWT-токенов
  usersDb = []; // Массив пользователей

  // Параметры подключения к базе данных
  dbConfig = {
    database: "quasar_db",
    host: "localhost",
    username: "root",
    password: "",
  };
  sequelize;  // Объект Sequelize для работы с базой данных
  User; // Модель пользователя

  constructor() {
    // Подключение промежуточного ПО для обработки тела запроса
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    if (!this.isJson) {
      // Подключение к базе данных
      this.sequelize = new Sequelize(
        this.dbConfig.database,
        this.dbConfig.username,
        this.dbConfig.password,
        {
          host: this.dbConfig.host,
          dialect: "mysql",
        }
      );
      // Определение модели для таблицы
      this.User = this.sequelize.define("User", {
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
          defaultValue: "user",
        },
      });
    } else {
      this.initUsersDb(); // Инициализация массива пользователей из JSON-файла
    }
    this.createRoutes();  // Создание маршрутов
    this.startServer(); // Запуск сервера
  }

  // Функция инициализации пользователей из JSON-файла
  async initUsersDb() {
    try {
      // Чтение содержимого JSON-файла
      const data = await fs.readFile(this.pathJson, { encoding: "utf8" });
      // Преобразование содержимого файла в объект JavaScript
      this.usersDb = JSON.parse(data);
    } catch (error) {
      // Обработка ошибки при разборе файла JSON
      console.error("Ошибка при разборе файла JSON:", error);
    }
  }

  // Асинхронная функция для удаления пользователей
  async deleteUsers(userIds, res) {
    try {
      console.log("deleteUsers");
      console.log(userIds);
      // Фильтрация массива пользователей и удаление пользователей с заданными userId
      this.usersDb = this.usersDb.filter(
        (user) => !userIds.includes(user.userId)
      );
      // Отправка ответа клиенту с указанием успешного выполнения операции
      res.json({ status: "accepted", success: true });
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Асинхронная функция для редактирования пользователя
  async editUser(userId, sip, name, email, phone, password, role, res) {
    try {
      // Ищем пользователя с заданным userId в массиве this.usersDb
      const user = this.usersDb.find((user) => user.userId === userId);
      // Если пользователь найден
      if (user) {
        // Обновляем свойства пользователя с новыми значениями
        user.sip = sip;
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.password = password;
        user.role = role;

        // Отправка ответа клиенту с указанием успешного выполнения операции
        res.json({ status: "accepted", success: true });
      } else {
        // Если пользователь с заданным userId не найден
        console.log("Пользователь с userId", userId, "не найден");
        // Отправка ответа клиенту с сообщением об ошибке
        res.json({ status: "error", message: "Пользователь не найден" });
      }
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Асинхронная функция для добавления нового пользователя
  async addUser(sip, name, email, phone, password, role, res) {
    try {
      // Генерируем уникальный идентификатор (userId) для нового пользователя
      const userId = this.generateUserId();

      // Определяем количество "раундов" соли для хеширования пароля
      const saltRounds = 10;
      // Генерируем соль (случайное значение) для хеширования пароля
      const salt = bcrypt.genSaltSync(saltRounds);
      // Создаем хэш пароля с использованием соли
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Создаем объект нового пользователя и добавляем его в массив пользователей (usersDb)
      this.usersDb.push({
        id: this.usersDb.length + 1,
        userId: userId,
        sip: sip,
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        role: role,
      });
      // Отправка ответа клиенту с указанием успешного выполнения операции
      res.json({ status: "accepted", success: true });
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Асинхронная функция для поиска пользователей по запросу
  async searchUsersForQuery(query, res) {
    try {
      // Преобразуем запрос к нижнему регистру
      query = query.toLowerCase();
      // Фильтруем массив пользователей (usersDb) на основе запроса
      const result = this.usersDb.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.sip.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query)
      );
      // Отправка ответа клиенту с указанием успешного выполнения операции и найденными пользователями
      res.json({ status: "accepted", users: result });
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Асинхронная функция для входа пользователя в систему
  async loginUser(email, password, res) {
    try {
      // Находим пользователя по его электронной почте в массиве пользователей
      const user = this.usersDb.find((user) => user.email === email);
      console.log(user)
      // Если пользователь не найден, возвращаем ошибку входа
      if (!user) {
        return res.json({ status: "error", message: "Login is failed for user" });
      }

      // Сравниваем введенный пароль с хэшированным паролем пользователя
      const passwordMatch = await bcrypt.compare(password, user.password);
      // Если пароли не совпадают, возвращаем ошибку входа
      if (!passwordMatch) {
        return res.json({ status: "error", message: "Login is failed for password" });
      }

      // Генерируем JWT-токен для аутентификации пользователя
      const token = this.generateJwtToken(user);
      // Отправляем ответ клиенту с успешным статусом и сгенерированным токеном
      res.json({ status: "accepted", token: token });
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Асинхронная функция для верификации пользователя по токену
  async verificationUser(userToken, res) {
    try {
      console.log('VerifyToken:' +  userToken);
      // Декодируем токен и извлекаем из него идентификатор пользователя и электронную почту
      const decoded = jwt.verify(userToken, this.keyForToken);
      const { Id: userId, Email: email } = decoded;

      // Проверяем, существует ли пользователь с указанным идентификатором и электронной почтой
      const isUser = this.usersDb.some(
        (user) => user.email === email && user.userId === userId
      );
      console.log("Verification token");
      console.log({ userId, email });
      console.log(isUser);

      // Отправляем ответ клиенту с успешным статусом и флагом, указывающим на результат верификации
      res.json({ status: "accepted", isVerified: isUser });
    } catch (error) {
      // Обработка ошибки и отправка сообщения об ошибке клиенту
      res.json({ status: "error", message: error.message });
    }
  }

  // Функция для генерации уникального идентификатора пользователя (userId)
  generateUserId() {
    let userId = 0;
    /// Бесконечный цикл для генерации userId
    while (true) {
      userId = Math.floor(10000000 + Math.random() * 90000000); // Генерация уникального userId состоящего из 8 цифр
      const result = this.usersDb.find((user) => user.userId === userId); // проверка, существует ли пользователь с таким userId
      if (!result) {
        break; // если такого userId нет, выходим из цикла
      }
    }
    return userId; // возвращаем сгенерированный уникальный userId
  }

  // Функция генерации токена
  generateJwtToken(user) {
    const data = {
      Id: user.userId,
      Email: user.email,
    };
    const jwtToken = jwt.sign(data, this.keyForToken, { algorithm: "HS256" });
    console.log(jwtToken);
    // Возврат строки, представляющей токен и подпись
    return jwtToken;
  }

  createRoutes() {
    // Маршрут для получения всех пользователей
    this.app.post("/api/allUsers", async (req, res) => {
      try {
        res.json({ status: "accepted", users: this.usersDb });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для удаления пользователей
    this.app.post("/api/deleteUsers", async (req, res) => {
      try {
        const { userIds } = req.body;
        await this.deleteUsers(userIds, res);
        console.log("deleteUsers");
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для редактирования пользователя
    this.app.post("/api/editUser", async (req, res) => {
      try {
        const { userId, name, email, phone, sip, password, role } = req.body;
        await this.editUser(
          userId,
          sip,
          name,
          email,
          phone,
          password,
          role,
          res
        );
        console.log("editUser");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для добавления нового пользователя
    this.app.post("/api/addUser", async (req, res) => {
      try {
        const { name, email, phone, sip, password, role } = req.body;
        await this.addUser(sip, name, email, phone, password, role, res);
        console.log("addUser");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для поиска пользователей по запросу
    this.app.post("/api/searchUsersForQuery", async (req, res) => {
      try {
        const { query } = req.body;
        const usersResult = await this.searchUsersForQuery(query, res);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для входа пользователя
    this.app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res
            .status(400)
            .json({
              status: "error",
              message: "Email and password are required",
            });
        }
        await this.loginUser(email, password, res);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

    // Маршрут для верификации пользователя
    this.app.post("/api/verification", async (req, res) => {
      try {
        const { userToken } = req.body;
        await this.verificationUser(userToken, res);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
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

// Создание объекта сервера и запуск сервера
const dataBaseServer = new DataBaseServer();
