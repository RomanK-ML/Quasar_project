import { reactive } from 'vue'
import CryptoJS from 'crypto-js';


import process from 'processify';
import { Buffer } from 'buffer';
import {connect} from "net";
window.process = process;
window.process.platform = 'win32';
window.process.env = { NODE_DEBUG: '' };
window.process.version = 'v' + navigator.appVersion;
window.Buffer = Buffer;
const fs = require('fs');
const axios = require('axios');

class Database {
  keyForToken = "z%C*F-J@NcRfUjXn2r5u8x/A?D(G+KbP"
  connection;

  usersList = reactive([])
  usersDb = reactive([
    {id: 1, userId: 1, sip: "sip:admin@example.com", name: "Admin", email: "admin@example.com", phone: "+7 (926) 610-87-91", password: "password123", role: "admin"},
    {id: 2, userId: 52873471, sip: "sip:egor.kuimov@yandex.ru", name: "Егор", email: "egor.kuimov@yandex.ru", phone: "+7 (929) 770-14-86", password: "174cb5eea", role: "subadmin"},
    {id: 3, userId: 52300065, sip: "sip:yuliana93@gmail.com", name: "Юлиана", email: "yuliana93@gmail.com", phone: "+7 (984) 252-86-65", password: "285d2c4f5", role: "user"},
    {id: 4, userId: 87639390, sip: "sip:valentin1963@hotmail.com", name: "Валентин", email: "valentin1963@hotmail.com", phone: "+7 (917) 486-62-69", password: "7b382acd7", role: "user"},
    {id: 5, userId: 262420, sip: "sip:alisa04091995@ya.ru", name: "Алиса", email: "alisa04091995@ya.ru", phone: "+7 (955) 896-28-53", password: "cbaaec892", role: "user"},
    {id: 6, userId: 92158604, sip: "sip:georgiy47@yandex.ru", name: "Георгий", email: "georgiy47@yandex.ru", phone: "+7 (978) 899-24-63", password: "1b98a7aaa", role: "user"},
    {id: 7, userId: 76815607, sip: "sip:kira1620@rambler.ru", name: "Кира", email: "kira1620@rambler.ru", phone: "+7 (979) 371-49-72", password: "840a1a589", role: "user"},
    {id: 8, userId: 42921546, sip: "sip:asya.oskina@hotmail.com", name: "Ася", email: "asya.oskina@hotmail.com", phone: "+7 (993) 142-55-12", password: "ec637f781", role: "user"},
    {id: 9, userId: 77709334, sip: "sip:anjela26031960@ya.ru", name: "Анжела", email: "anjela26031960@ya.ru", phone: "+7 (932) 260-72-76", password: "7631d89d5", role: "user"},
    {id: 10, userId: 34737967, sip: "sip:nina7532@ya.ru", name: "Нина", email: "nina7532@ya.ru", phone: "+7 (943) 543-32-69", password: "81d4f9dbf", role: "user"},
    {id: 11, userId: 84896138, sip: "sip:efim22@rambler.ru", name: "Ефим", email: "efim22@rambler.ru", phone: "+7 (956) 716-32-93", password: "044923987", role: "user"},
    {id: 12, userId: 98130064, sip: "sip:mila.karyavina@mail.ru", name: "Мила", email: "mila.karyavina@mail.ru", phone: "+7 (992) 913-72-38", password: "b783ad9a6", role: "user"},
    {id: 13, userId: 63660508, sip: "sip:nina5603@yandex.ru", name: "Нина", email: "nina5603@yandex.ru", phone: "+7 (992) 913-72-38", password: "5c0d98891", role: "user"},
    {id: 14, userId: 89549979, sip: "sip:zahar3891@yandex.ru", name: "Захар", email: "zahar3891@yandex.ru", phone: "+7 (992) 913-72-38", password: "4a811014e", role: "user"},
    {id: 15, userId: 33012176, sip: "sip:apollinariya16041973@yandex.ru", name: "Аполлинария", email: "apollinariya16041973@yandex.ru", phone: "+7 (911) 308-91-89", password: "212b38864", role: "user"},
    {id: 16, userId: 79729586, sip: "sip:polina.krizko@mail.ru", name: "Полина", email: "polina.krizko@mail.ru", phone: "+7 (964) 280-45-65", password: "357613bab", role: "user"},
    {id: 17, userId: 73343254, sip: "sip:lyudmila1360@ya.ru", name: "Людмила", email: "lyudmila1360@ya.ru", phone: "+7 (924) 443-46-76", password: "e8fb35ed1", role: "user"},
    {id: 18, userId: 19394460, sip: "sip:nikita1971@hotmail.com", name: "Никита", email: "nikita1971@hotmail.com", phone: "+7 (997) 264-21-99", password: "ac70b4ab3", role: "user"},
    {id: 19, userId: 83360128, sip: "sip:savva.kutepov@gmail.com", name: "Савва", email: "savva.kutepov@gmail.com", phone: "+7 (944) 287-46-88", password: "e3fc94cc4", role: "user"},
    {id: 20, userId: 22248123, sip: "sip:svetlana2690@ya.ru", name: "Светлана", email: "svetlana2690@ya.ru", phone: "+7 (925) 451-11-33", password: "08095821d", role: "user"},
  ])
  constructor() {
    console.log('Database constructor')
  }

// Функция для генерации токена по email и паролю пользователя
  async generatedAuthTokenByEmailAndPassword(email, password) {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      if (response.data.isVerified === true) {

      }
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  deleteUsers(idList){
    console.log(idList) // выводим список id пользователей, которых нужно удалить
    for (let user in this.usersList) {
      for (let idDel in idList) { // перебираем список id пользователей, которых нужно удалить
        if (this.usersList[user].id === idList[idDel]) { // если текущий пользователь в списке на удаление
          this.usersList.splice(user, 1); // удаляем пользователя из массива пользователей
        }
      }
    }
  }
  editUser(userId, sip, name, email, phone, password, role){
    // Ищем пользователя с заданным userId
    for (let user in this.usersList) {
      if (this.usersList[user].userId === userId){
        // Обновляем данные пользователя
        this.usersList[user].name = name;
        this.usersList[user].email = email;
        this.usersList[user].phone = phone;
        this.usersList[user].sip = sip;
        this.usersList[user].password = password;
        this.usersList[user].role = role;
      }
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
  addUser(sip, name, email, phone, password, role){
    // Генерируем userId для нового пользователя
    const userId = this.generateUserId();
    // Добавляем нового пользователя в массив пользователей
    this.usersList.push({id: this.usersList.length+1, userId: userId, sip: sip, name: name, email: email, phone: phone, password: password, role: role})
  }

  /*
 * Функция поиска пользователей в базе данных по тексту запроса
 * @param {string} searchText - текст запроса
 */
  searchUsers(searchText){
    console.log(searchText);
    let usersResult = reactive([])
    this.updateDb() // обновляем базу данных перед поиском
    this.usersList.forEach(user =>{
      if (user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())) {
        usersResult.push(user); // добавляем пользователя в результаты поиска
      }
    })
    this.usersList = usersResult // обновляем список пользователей
  }
  updateDb(){
    // обновляем базу данных
    this.usersList = this.usersDb
  }
  generateUserId(){
    let userId = 0;
    /// Бесконечный цикл для генерации userId
    while (true){
      userId = Math.floor(Math.random() * 99999999) + 1; // генерация случайного числа от 1 до 99999999
      let result  = this.usersList.find(user => user.userId === userId) // проверка, существует ли пользователь с таким userId
      if (result){
        console.log('Такой userId уже есть') // если такой userId уже существует, выводим сообщение об этом в консоль
      }
      else {
        break // если такого userId нет, выходим из цикла
      }
    }
    return userId // возвращаем сгенерированный уникальный userId
  }
  generateToken(user) {
    // Создание заголовка токена
    const header =  {
      "type": "JWT",
      "alg": "HS256"
    }
    // Кодирование заголовка в формат Base64
    const encodedHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));

    // Создание данных для токена
    const data = {
      "Id": user.userId,
      "Email": user.email,
    }
    // Кодирование данных в формат Base64
    const encodedData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data)));
    // Создание токена путем объединения закодированного заголовка и закодированных данных
    const token = `${encodedHeader}.${encodedData}`;
    // Создание подписи токена путем кодирования HMAC-256 хэша токена с использованием ключа доступа
    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(token, this.keyForToken));

    // Вывод токена и подписи в консоль для отладки
    console.log('generateToken')
    console.log(`${token}.${signature}`)

    // Возврат строки, представляющей токен и подпись
    return `${token}.${signature}`;
  }
  verificationToken(token){
    const verification = async (token) => {
      try {
        const response = await axios.post('http://localhost:3000/api/verification', { token });
        return response.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    };



    // Разделяем токен на 3 части: заголовок, данные и подпись
    const [encodedHeader, encodedData, signature] = token.split('.');

    // Декодируем данные из base64 формата и парсим их как JSON объект
    const data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedData)));

    // Генерируем HMAC хэш используя ключ и объединенную строку из заголовка и данных
    const hash = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedData}`, this.keyForToken);

    // Переводим полученный хэш в строку в формате base64
    const expectedSignature = CryptoJS.enc.Base64.stringify(hash);

    // Сверяем полученную подпись и ожидаемую
    if (signature === expectedSignature){
      // Если подписи совпадают, то парсим заголовок и данные
      const header = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedHeader)));
      const data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedData)));

      // Проверяем, есть ли пользователь с такими данными (email и userId) в нашей базе
      const isUser = this.usersList.some(user => user.email === data["Email"] && user.userId === data["Id"])
      console.log("Verification token")
      console.log(data)
      console.log(isUser)
      if (isUser){
        return true; // Если пользователь найден, возвращаем true
      }
      else {
        return false; // Если пользователь не найден, возвращаем false
      }
    }
    return false; // Если подписи не совпадают, возвращаем false
  }
}

const db = new Database();
export default db


