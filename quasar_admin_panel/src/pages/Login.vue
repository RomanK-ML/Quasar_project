<template>
  <div class="auth-container">
    <div class="text-center">
      <h1>Авторизация</h1>
      <p class="lead">
        Пожалуйста, авторизируйтесь
      </p>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="card-container">
          <div class="text-center">
            <img src="../assets/img/quasar_logo.png" alt="Logo" class="card-img" width="150"
                 height="150"/>
          </div>
          <form>
            <div class="email-field">
              <label class="form-label">Email</label>
              <input v-model="this.emailInputValue" class="form-control form-control-lg" type="email" name="email" placeholder="Введите свой email" required/>
            </div>
            <div class="password-field">
              <label class="form-label">Пароль</label>
              <input v-model="this.passwordInputValue" class="form-control form-control-lg" type="password" name="password"
                     placeholder="Введите свой пароль" required/>
            </div>
            <div class="card-error" :class="{'login-error':this.cardErrorIsShown}">
              <p>Неверное имя пользователя или пароль</p>
              <p>Убедитесь, что данные введены правильно</p>
            </div>

            <div class="card-button">
              <a @click.prevent="validationButtonClick"  class="btn btn-lg btn-primary">Войти</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "src/db";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  mounted() {
    db.updateDb() // вызываем функцию для обновления базы данных
  },
  data () {
    return{
      emailInputValue: '',
      passwordInputValue: '',
      cardErrorIsShown: false, // флаг для показа ошибки
      emailInputIsValid: true, // флаг для проверки валидности ввода почты
      passwordInputIsValid: true, // флаг для проверки валидности ввода пароля
    }
  },
  methods: {
    validationButtonClick(){ // функция для обработки события нажатия на кнопку валидации
      if (this.validationForm()){ // если форма валидна, вызываем функцию авторизации
        this.authorization()
      }
    },
    validationForm(){ // функция для проверки валидности введенных данных
      this.emailRules(this.emailInputValue) // проверяем валидность ввода почты
      this.passwordRules(this.passwordInputValue) // проверяем валидность ввода пароля
      if (this.emailInputIsValid && this.passwordInputIsValid){ // если оба поля валидны, сбрасываем флаг ошибки и возвращаем true
        this.cardErrorIsShown = false
        return true
      }
      else { // если есть ошибки, устанавливаем флаг ошибки и возвращаем false
        this.cardErrorIsShown = true
        return false
      }
    },
    emailRules(value){ // функция для проверки валидности ввода почты
      console.log(value)
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && pattern.test(value)) { // если введенная почта валидна, устанавливаем флаг валидности почты и возвращаем true
        this.emailInputIsValid = true
        console.log("Email is valid");
        return true
      } else { // если введенная почта не валидна, сбрасываем флаг валидности почты и возвращаем false
        this.emailInputIsValid = false
        console.log("Email is not valid");
        return false
      }
    },
    passwordRules(value){ // функция для проверки валидности ввода пароля
      console.log(value)
      if (value && value.length >= 8) { // если введенный пароль валиден, устанавливаем флаг валидности пароля и возвращаем true
        this.passwordInputIsValid = true
        console.log("Password is valid");
        return true
      } else { // если введенный пароль не валиден, сбрасываем флаг валидности пароля и возвращаем false
        this.passwordInputIsValid = false
        console.log("Password is not valid");
        return false
      }
    },
    // Функция для авторизации пользователя
    async authorization(){
      // Генерируем токен, используя данные из формы
      const result = db.generatedAuthTokenByEmailAndPassword(this.emailInputValue, this.passwordInputValue)
      // Если токен был успешно сгенерирован, сохраняем его в localStorage и переходим на главную страницу
      if (result !== false) {
        localStorage.setItem('token', result)
        console.log("Token: " + result)
        this.$router.push("/")
      } else {// Если авторизация не прошла успешно, показываем ошибку в форме
        console.log("Login is not valid");
        this.cardErrorIsShown = true
      }
    }
  }
}
</script>

<style scoped>

.auth-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle!important;
  box-sizing: border-box;
  margin-left: auto!important;
  margin-right: auto!important;
  max-width: 500px !important;
  padding-left: 6px;
  padding-right: 6px;
  width: 50%;
  height: 100vh;
  direction: ltr
}

@media (min-width: 576px){
  .auth-container{
    flex: 0 0 auto;
    width: 83.33333333%;
  }
}

@media (min-width: 768px){
  .auth-container{
    flex: 0 0 auto;
    width: 66.66666667%;
  }
}

@media (min-width: 992px){
  .auth-container{
    flex: 0 0 auto;
    width: 50%;
  }
}

.text-center{
  text-align: center!important;
  margin-top: 1.5rem!important;
  box-sizing: border-box;
  display: block;
}

.text-center h1{
  font-size: 1.53125rem;
  color: #fff;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-top: 0;
}
.lead{
  font-size: 1.09375rem;
  font-weight: 300;
  margin-bottom: 1rem;
  margin-top: 0;
  color: #bdc0c5;
}

.card{
  word-wrap: break-word;
  background-clip: border-box;
  background-color: #222e3c;
  border: 0.25rem solid transparent;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

.card-body{
  flex: 1 1 auto;
  padding: 1.25rem 1.25rem;
}

.card-container{
  margin: 1.5rem!important;
}

.card-img{
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 50%!important;
}

form{
  margin-top: 0;
}

.email-field{
  margin-bottom: 1rem;
}
.email-field label{
  display: inline-block;
  margin-bottom: 0.5rem;
  color: #bdc0c5;
  font-family: "Inter", "Roboto",sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}
.email-field input{
  border-radius: 0.3rem;
  font-size: .925rem;
  min-height: calc(2.1875rem + 2px);
  padding: 0.4rem 1rem;
  appearance: none;
  background-clip: padding-box;
  background-color: #222e3c;
  border: 1px solid #7a828a;
  color: #bdc0c5;
  display: block;
  font-weight: 400;
  line-height: 1.5;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  width: 100%;
  font-family: inherit;
}

.email-field input:focus{
  background-color: #222e3c;
  border-color: #9dbeee;
  box-shadow: 0 0 0 0.2rem rgba(59,125,221,.25);
  color: #bdc0c5;
  outline: none;
}

.password-field{
  margin-bottom: 1rem;
}

.password-field label{
  margin-bottom: 0.5rem;
  display: inline-block;
  color: #bdc0c5;
  font: 400 0.875rem/1.5 "Inter", "Roboto", sans-serif;
}

.password-field input{
  border-radius: 0.3rem;
  font-size: .925rem;
  min-height: calc(2.1875rem + 2px);
  padding: 0.4rem 1rem;
  appearance: none;
  background-clip: padding-box;
  background-color: #222e3c;
  border: 1px solid #7a828a;
  color: #bdc0c5;
  display: block;
  font-weight: 400;
  line-height: 1.5;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  width: 100%;
  font-family: inherit;
  margin: 0;
}

.password-field input:focus{
  background-color: #222e3c;
  border-color: #9dbeee;
  box-shadow: 0 0 0 0.2rem rgba(59,125,221,.25);
  color: #bdc0c5;
  outline: 0;
}

.card-button{
  text-align: center;
  margin-top: 1.5rem;
}
.card-button a{
  color: #fff;
  background-color: #3b7ddd;
  border: 1px solid #3b7ddd;
  border-radius: 0.3rem;
  cursor: pointer;
  display: inline-block;
  font: 400 0.925rem/1.5 sans-serif;
  padding: 0.4rem 1rem;
  text-align: center;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
}

.card-button a:focus{
  box-shadow: 0 0 0 0.2rem rgba(55,113,197,0.5);
  outline: 0;
  background-color: #326abc;
  border-color: #2f64b1;
}

.card-button a:hover{
  background-color: #326abc;
  border-color: #2f64b1;
  text-decoration: none;
}
.card-error p{
  color: #cb2828;
  font: 400 0.925rem/1.5 sans-serif;
  margin-top: 8px;
  margin-bottom: 8px;
  text-align: center;
}
.card-error{
  display: none;
}
.login-error{
  display: block;
}
</style>
