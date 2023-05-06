import { reactive } from 'vue'
import CryptoJS from 'crypto-js';

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class Database {
  config = {
    database: 'quasar_db',
    host: 'localhost',
    user: 'root',
    password: '',
  }
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

  async connect() {
    console.log('Connecting')
    // this.connection = await mysql.createConnection(config)
    // const result = await this.connection.execute('SELECT * FROM users')
    // console.log(result)
  }
  generatedTokenByEmailAndPassword(email, password) {
    if (email && password) {
      const user = this.usersList.find(user => user.email === email && user.password === password)
      if (user){
        return this.generateToken(user);
      }
    }
    return false;
  }
  deleteUsers(idList){
    console.log(idList)
    for (let user in this.usersList) {
      for (let idDel in idList) {
        if (this.usersList[user].id === idList[idDel]) {
          this.usersList.splice(user, 1);
        }
      }
    }
  }
  editUser(userId, sip, name, email, phone, password, role){
    for (let user in this.usersList) {
      if (this.usersList[user].userId === userId){
        this.usersList[user].name = name;
        this.usersList[user].email = email;
        this.usersList[user].phone = phone;
        this.usersList[user].sip = sip;
        this.usersList[user].password = password;
        this.usersList[user].role = role;
      }
    }
  }
  addUser(sip, name, email, phone, password, role){
    this.usersList.push({id: this.usersList.length+1, userId: this.generateUserId(), sip: sip, name: name, email: email, phone: phone, password: password, role: role})
  }
  searchUsers(searchText){
    console.log(searchText);
    let usersResult = reactive([])
    this.updateDb()
    this.usersList.forEach(user =>{
      if (user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())) {
        usersResult.push(user);
      }
    })
    this.usersList = usersResult
  }
  updateDb(){
    this.usersList = this.usersDb
  }
  generateUserId(){
    let userId = 0;
    while (true){
      userId = Math.floor(Math.random() * 99999999) + 1;
      let result  = this.usersList.find(user=>user.userId === userId)
      if (result){
        console.log('Такой userId уже есть')
      }
      else {
        break
      }
    }
    return userId
  }
  generateToken(user) {
    const header =  {
      "type": "JWT",
      "alg": "HS256"
    }
    const encodedHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));

    const data = {
      "Id": user.userId,
      "Email": user.email,
    }
    const encodedData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(data)));
    const token = `${encodedHeader}.${encodedData}`;
    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(token, this.keyForToken));


    console.log('generateToken')
    console.log(`${token}.${signature}`)

    return `${token}.${signature}`;
  }
  verificationToken(token){
    const [encodedHeader, encodedData, signature] = token.split('.');
    const data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedData)));
    const hash = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedData}`, this.keyForToken);
    const expectedSignature = CryptoJS.enc.Base64.stringify(hash);
    if (signature === expectedSignature){
      const header = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedHeader)));
      const data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedData)));

      const isUser = this.usersList.some(user => user.email === data["Email"] && user.userId === data["Id"])
      console.log("Verifecation token")
      console.log(data)
      console.log(isUser)
      if (isUser){
        return true;
      }
      else {
        return false;
      }
    }
    return false
  }
}

const db = new Database();
export default db


