const axios = require('axios');
const fs = require('fs');
const bcrypt = require("bcrypt");

generatedUsersList = []
usersCount = 1000
usersOneRequest = 50

adminData = {
  userId: 11111111,
  sip: 'sip:admin@example.com',
  name: 'Admin',
  email: 'admin@example.com',
  phone: '+7 (926) 610-87-91',
  password: 'password123',
  role: 'admin'
}

async function generateUserId() {
  let userId = 0;
  while (true) {
    userId = Math.floor(10000000 + Math.random() * 90000000); // Генерация уникального userId состоящего из 8 цифр
    const result = generatedUsersList.find((user) => user.userId === userId.toString()); // проверка, существует ли пользователь с таким userId
    if (!result) {
      break; // если такого userId нет, выходим из цикла
    }
  }
  return userId.toString();
}

async function generateUsers() {
  let generatedId = 2
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  // Создание хэша пароля
  const adminHashedPassword = bcrypt.hashSync(adminData.password, salt);
  generatedUsersList.push({
    id: 1,
    userId: adminData.userId.toString(),
    sip: adminData.sip,
    name: adminData.name,
    email: adminData.email,
    phone: adminData.phone,
    password: adminHashedPassword,
    role: adminData.role
  })
  while (generatedId <= usersCount) {
    const response = await axios.get('https://api.randomdatatools.ru/?unescaped=false&params=FirstName,Phone,Password,Email&count=' + usersOneRequest.toString());
    for (let resultResponse in response.data){
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      // Создание хэша пароля
      const hashedPassword = bcrypt.hashSync(response.data[resultResponse].Password.toString(), salt);

      generatedUsersList.push({
        id: generatedId,
        userId: await generateUserId(),
        sip: "sip:" + response.data[resultResponse].Email,
        name: response.data[resultResponse].FirstName,
        email: response.data[resultResponse].Email,
        phone: response.data[resultResponse].Phone,
        password: hashedPassword,
        role: 'user'
      })
      generatedId++
    }
    console.log('GeneratedId: ' + generatedId)
  }
}

(async () => {
  try {
    await generateUsers();
    const jsonData = JSON.stringify(generatedUsersList);

    fs.writeFileSync('server/users.json', jsonData);
    console.log('Data saved to users.json file.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
