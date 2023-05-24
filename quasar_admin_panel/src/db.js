import { reactive } from "vue";
import axios from "axios";
import Cookies from 'js-cookie';

class Database {
  usersList = reactive([]); // Реактивный массив пользователей

  constructor() {
    console.log("Database constructor");
    this.updateDb();// Вызываем функцию обновления базы данных при создании экземпляра класса
  }
  // Функция для авторизации пользователя по email и паролю
  async authorizationUser(email, password) {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      console.log('Authorization: ' + response.data.status)
      if (response.data.status === "accepted") {
        console.log('AuthorizationToken: ' + response.data.token)
        Cookies.set("token", response.data.token) // Установка токена в cookies
        return true;
      } else {
        console.log(response.data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  // Удаление токена пользователя из cookies
  removeToken(){
    Cookies.remove('token');
  }

  // Удаление пользователей по их идентификаторам
  async deleteUsers(userIds) {
    try {
      console.log("USER IDS");
      console.log(userIds.toString()); // выводим список id пользователей, которых нужно удалить
      const response = await axios.post(
        "http://localhost:3000/api/deleteUsers",
        { userIds }
      );
      if (response.data.status === "error") {
        console.log(response.data.message);
      }
      await this.updateDb();  // Обновление базы данных после удаления пользователей
    } catch (error) {
      console.error(error);
    }
  }
  // Редактирование информации о пользователе
  async editUser(userId, sip, name, email, phone, password, role) {
    try {
      const response = await axios.post("http://localhost:3000/api/editUser", {
        userId,
        name,
        email,
        phone,
        sip,
        password,
        role,
      });
      if (response.data.status === "error") {
        console.log(response.data.message);
      }
      await this.updateDb();  // Обновление базы данных после редактирования пользователя
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Функция добавляет нового пользователя в массив пользователей
   * @param {string} sip - SIP-адрес пользователя
   * @param {string} name - Имя пользователя
   * @param {string} email - Электронная почта пользователя
   * @param {string} phone - Телефон пользователя
   * @param {string} password - Пароль пользователя
   * @param {string} role - Роль пользователя
   */
  async addUser(sip, name, email, phone, password, role) {
    try {
      const response = await axios.post("http://localhost:3000/api/addUser", {
        name,
        email,
        phone,
        sip,
        password,
        role,
      });
      if (response.data.status === "error") {
        console.log(response.data.message);
      }
      await this.updateDb();  // Обновление базы данных после добавления пользователя
    } catch (error) {
      console.error(error);
    }
  }

  /*
   * Функция поиска пользователей в базе данных по тексту запроса
   * @param {string} searchText - текст запроса
   */
  async searchUsers(query) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/searchUsersForQuery",
        { query }
      );
      if (response.data.status === "accepted") {
        this.usersList.splice(0, this.usersList.length, ...response.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Обновление базы данных пользователей
  async updateDb() {
    try {
      const response = await axios.post("http://localhost:3000/api/allUsers");
      if (response.data.status === "accepted") {
        this.usersList.length = 0;  // Очистка массива пользователей
        for (let responseId in response.data.users){
          this.usersList.push(response.data.users[[responseId]]); // Добавление пользователей из ответа сервера в массив
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Проверка токена пользователя
  async verificationToken() {
    try {
      console.log('Get Token')
      const userToken = Cookies.get("token")
      if (userToken === null || userToken === undefined){
        return false;
      }
      console.log("Getting token: " + userToken);
      const response = await axios.post("http://localhost:3000/api/verification",
        { userToken });
      console.log('DataStatus: ' + response.data.status);
      if (response.data.status === "accepted") {
        console.log("isVerified: " + response.data.isVerified);
        return response.data.isVerified;
      } else {
        console.log("isVerifiedFalse: " + response.data.message);
        Cookies.remove("token");  // Удаление токена из cookies, если он недействителен
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

const db = new Database();
export default db;
