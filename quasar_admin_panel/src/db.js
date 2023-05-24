import { reactive } from "vue";
const axios = require("axios");

// import Vue from 'vue';
// import VueCookies from 'vue-cookies';
// Vue.use(VueCookies)
import Cookies from 'js-cookie';

import process from "processify";
import { Buffer } from "buffer";
import { connect } from "net";

window.process = process;
window.process.platform = "win32";
window.process.env = { NODE_DEBUG: "" };
window.process.version = "v" + navigator.appVersion;
window.Buffer = Buffer;
const fs = require("fs");

class Database {
  usersList = reactive([]);
  usersDb = reactive([
    {
      id: 1,
      userId: 1,
      sip: "sip:admin@example.com",
      name: "Admin",
      email: "admin@example.com",
      phone: "+7 (926) 610-87-91",
      password: "password123",
      role: "admin",
    },
    {
      id: 2,
      userId: 52873471,
      sip: "sip:egor.kuimov@yandex.ru",
      name: "Егор",
      email: "egor.kuimov@yandex.ru",
      phone: "+7 (929) 770-14-86",
      password: "174cb5eea",
      role: "subadmin",
    },
    {
      id: 3,
      userId: 52300065,
      sip: "sip:yuliana93@gmail.com",
      name: "Юлиана",
      email: "yuliana93@gmail.com",
      phone: "+7 (984) 252-86-65",
      password: "285d2c4f5",
      role: "user",
    },
    {
      id: 4,
      userId: 87639390,
      sip: "sip:valentin1963@hotmail.com",
      name: "Валентин",
      email: "valentin1963@hotmail.com",
      phone: "+7 (917) 486-62-69",
      password: "7b382acd7",
      role: "user",
    },
    {
      id: 5,
      userId: 262420,
      sip: "sip:alisa04091995@ya.ru",
      name: "Алиса",
      email: "alisa04091995@ya.ru",
      phone: "+7 (955) 896-28-53",
      password: "cbaaec892",
      role: "user",
    },
    {
      id: 6,
      userId: 92158604,
      sip: "sip:georgiy47@yandex.ru",
      name: "Георгий",
      email: "georgiy47@yandex.ru",
      phone: "+7 (978) 899-24-63",
      password: "1b98a7aaa",
      role: "user",
    },
    {
      id: 7,
      userId: 76815607,
      sip: "sip:kira1620@rambler.ru",
      name: "Кира",
      email: "kira1620@rambler.ru",
      phone: "+7 (979) 371-49-72",
      password: "840a1a589",
      role: "user",
    },
    {
      id: 8,
      userId: 42921546,
      sip: "sip:asya.oskina@hotmail.com",
      name: "Ася",
      email: "asya.oskina@hotmail.com",
      phone: "+7 (993) 142-55-12",
      password: "ec637f781",
      role: "user",
    },
    {
      id: 9,
      userId: 77709334,
      sip: "sip:anjela26031960@ya.ru",
      name: "Анжела",
      email: "anjela26031960@ya.ru",
      phone: "+7 (932) 260-72-76",
      password: "7631d89d5",
      role: "user",
    },
    {
      id: 10,
      userId: 34737967,
      sip: "sip:nina7532@ya.ru",
      name: "Нина",
      email: "nina7532@ya.ru",
      phone: "+7 (943) 543-32-69",
      password: "81d4f9dbf",
      role: "user",
    },
    {
      id: 11,
      userId: 84896138,
      sip: "sip:efim22@rambler.ru",
      name: "Ефим",
      email: "efim22@rambler.ru",
      phone: "+7 (956) 716-32-93",
      password: "044923987",
      role: "user",
    },
    {
      id: 12,
      userId: 98130064,
      sip: "sip:mila.karyavina@mail.ru",
      name: "Мила",
      email: "mila.karyavina@mail.ru",
      phone: "+7 (992) 913-72-38",
      password: "b783ad9a6",
      role: "user",
    },
    {
      id: 13,
      userId: 63660508,
      sip: "sip:nina5603@yandex.ru",
      name: "Нина",
      email: "nina5603@yandex.ru",
      phone: "+7 (992) 913-72-38",
      password: "5c0d98891",
      role: "user",
    },
    {
      id: 14,
      userId: 89549979,
      sip: "sip:zahar3891@yandex.ru",
      name: "Захар",
      email: "zahar3891@yandex.ru",
      phone: "+7 (992) 913-72-38",
      password: "4a811014e",
      role: "user",
    },
    {
      id: 15,
      userId: 33012176,
      sip: "sip:apollinariya16041973@yandex.ru",
      name: "Аполлинария",
      email: "apollinariya16041973@yandex.ru",
      phone: "+7 (911) 308-91-89",
      password: "212b38864",
      role: "user",
    },
    {
      id: 16,
      userId: 79729586,
      sip: "sip:polina.krizko@mail.ru",
      name: "Полина",
      email: "polina.krizko@mail.ru",
      phone: "+7 (964) 280-45-65",
      password: "357613bab",
      role: "user",
    },
    {
      id: 17,
      userId: 73343254,
      sip: "sip:lyudmila1360@ya.ru",
      name: "Людмила",
      email: "lyudmila1360@ya.ru",
      phone: "+7 (924) 443-46-76",
      password: "e8fb35ed1",
      role: "user",
    },
    {
      id: 18,
      userId: 19394460,
      sip: "sip:nikita1971@hotmail.com",
      name: "Никита",
      email: "nikita1971@hotmail.com",
      phone: "+7 (997) 264-21-99",
      password: "ac70b4ab3",
      role: "user",
    },
    {
      id: 19,
      userId: 83360128,
      sip: "sip:savva.kutepov@gmail.com",
      name: "Савва",
      email: "savva.kutepov@gmail.com",
      phone: "+7 (944) 287-46-88",
      password: "e3fc94cc4",
      role: "user",
    },
    {
      id: 20,
      userId: 22248123,
      sip: "sip:svetlana2690@ya.ru",
      name: "Светлана",
      email: "svetlana2690@ya.ru",
      phone: "+7 (925) 451-11-33",
      password: "08095821d",
      role: "user",
    },
  ]);

  constructor() {
    console.log("Database constructor");
    this.initialize();
  }
  async initialize() {
    await this.updateDb();
  }

  // Функция для генерации токена по email и паролю пользователя
  async authorizationUser(email, password) {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      console.log('Authorization: ' + response.data.status)
      if (response.data.status === "accepted") {
        console.log('AuthorizationToken: ' + response.data.token)
        // VueCookies.set("token", response.data.token);
        Cookies.set("token", response.data.token)
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
  removeToken(){
    Cookies.remove('token');
  }

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
      await this.updateDb();
    } catch (error) {
      console.error(error);
    }
  }

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
      await this.updateDb();
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
      await this.updateDb();
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

  async updateDb() {
    try {
      const response = await axios.post("http://localhost:3000/api/allUsers");
      if (response.data.status === "accepted") {
        this.usersList.length = 0;
        for (let responseId in response.data.users){
          this.usersList.push(response.data.users[[responseId]]);
        }

      }
    } catch (error) {
      console.error(error);
    }
  }

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
        Cookies.remove("token");
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

const db = new Database();
export default db;
