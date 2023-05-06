<template>
  <q-page-container class="auth-container">
    <div class="text-center">
      <h1>Авторизация</h1>
      <p class="lead">
        Пожалуйста, авторизируйтесь
      </p>
    </div>
    <q-page class="form-block">
      <div class="form-container">
        <div class="form-sub-container">
          <div class="img-container">
            <img src="../assets/img/quasar_logo.png" alt="Logo" class="img-logo"/>
          </div>
          <form>
            <div class="email-field">
              <label class="form-label">Email</label>
              <input ref="emailInput" class="form-control form-control-lg" type="email" name="email" placeholder="Введите свой email"/>
            </div>
            <div class="password-field">
              <label class="form-label">Password</label>
              <input ref="passwordInput" class="form-control form-control-lg" type="password" name="password"
                     placeholder="Введите свой пароль"/>
            </div>
            <div ref="cardError" class="card-error">
              <p>Неверное имя пользователя или пароль</p>
              <p>Убедитесь, что данные введены правильно</p>
            </div>

            <div class="card-button">
              <a @click.prevent="validationButtonClick"  class="btn btn-lg btn-primary">Войти</a>
              <!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
            </div>
          </form>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
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
p.lead{
  font-size: 1.09375rem;
  font-weight: 300;
  margin-bottom: 1rem;
  margin-top: 0;
  color: #bdc0c5;
}

.form-block{
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

.form-container{
  flex: 1 1 auto;
  padding: 1.25rem 1.25rem;
}

.form-sub-container{
  margin: 1.5rem!important;
}

.img-container{
  margin: auto;
}

.img-logo{
  display: flex;
  justify-content: center;
  width: 140px;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 50%!important;
  margin: auto;
}

form{
  display: block;
  margin-top: 0em;
}

.email-field{
  margin-bottom: 1rem!important;
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
  margin: 0;
}

.email-field input:focus{
  background-color: #222e3c;
  border-color: #9dbeee;
  box-shadow: 0 0 0 0.2rem rgba(59,125,221,.25);
  color: #bdc0c5;
  outline: 0;
}

.password-field{
  margin-bottom: 1rem!important;
}

.password-field label{
  margin-bottom: 0.5rem;
  display: inline-block;
  color: #bdc0c5;
  font-family: "Inter", "Roboto",sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
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
  text-align: center!important;
  margin-top: 1.5rem!important;
}
.card-button a{
  color: #fff;
  background-color: #3b7ddd;
  border: 1px solid #3b7ddd;
  border-radius: 0.3rem;
  cursor: pointer;
  display: inline-block;
  font-size: 0.925rem;
  font-weight: 400;
  line-height: 1.5;
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
.card-error{
  display: none;
}
.card-error p{
  color: #cb2828;
  font-size: .925rem;
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 8px;
  text-align: center;

}

.login-error{
  display: block;
}
</style>
