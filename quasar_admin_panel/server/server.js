const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

class DataBaseServer {
  // Создаем экземпляр приложения Express
  port = 3000;
  app = express();
  isJson = true;
  pathJson = "server/users-100000.json";
  keyForToken = "z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbP";
  usersDb = [];

  // Параметры подключения к базе данных
  dbConfig = {
    database: "quasar_db",
    host: "localhost",
    username: "root",
    password: "",
  };
  sequelize;
  User;

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
      this.initUsersDb();
    }
    this.createRoutes();
    this.startServer();
  }

  // Функция чтения файла JSON (возвращает промис)
  async initUsersDb() {
    try {
      const data = await fs.readFile(this.pathJson, { encoding: "utf8" });
      this.usersDb = JSON.parse(data);
    } catch (error) {
      console.error("Ошибка при разборе файла JSON:", error);
    }
  }

  async deleteUsers(userIds, res) {
    try {
      console.log("deleteUsers");
      console.log(userIds);
      this.usersDb = this.usersDb.filter(
        (user) => !userIds.includes(user.userId)
      );
      res.json({ status: "accepted", success: true });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

  async editUser(userId, sip, name, email, phone, password, role, res) {
    try {
      // Ищем пользователя с заданным userId
      const user = this.usersDb.find((user) => user.userId === userId);
      if (user) {
        user.sip = sip;
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.password = password;
        user.role = role;
        res.json({ status: "accepted", success: true });
      } else {
        console.log("Пользователь с userId", userId, "не найден");
        res.json({ status: "error", message: "Пользователь не найден" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

  async addUser(sip, name, email, phone, password, role, res) {
    try {
      // Генерируем userId для нового пользователя
      const userId = this.generateUserId();

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      // Создание хэша пароля
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Добавляем нового пользователя в массив пользователей
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
      res.json({ status: "accepted", success: true });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

  async searchUsersForQuery(query, res) {
    try {
      query = query.toLowerCase();
      const result = this.usersDb.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.sip.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query)
      );
      res.json({ status: "accepted", users: result });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

  async loginUser(email, password, res) {
    try {
      const user = this.usersDb.find((user) => user.email === email);
      console.log(user)
      if (!user) {
        return res.json({ status: "error", message: "Login is failed for user" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.json({ status: "error", message: "Login is failed for password" });
      }

      const token = this.generateJwtToken(user);
      res.json({ status: "accepted", token: token });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

  async verificationUser(userToken, res) {
    try {
      console.log('VerifyToken:' +  userToken);
      const decoded = jwt.verify(userToken, this.keyForToken);
      const { Id: userId, Email: email } = decoded;

      const isUser = this.usersDb.some(
        (user) => user.email === email && user.userId === userId
      );
      console.log("Verification token");
      console.log({ userId, email });
      console.log(isUser);

      res.json({ status: "accepted", isVerified: isUser });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }

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
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

    this.app.post("/api/deleteUsers", async (req, res) => {
      try {
        const { userIds } = req.body;
        await this.deleteUsers(userIds, res);
        console.log("deleteUsers");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    });

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

const dataBaseServer = new DataBaseServer();
