<template>
  <nav class="navbar">
    <a class="navbar-toggle" @click.prevent="navbarToggleClick" >
      <i class="hamburger"></i>
    </a>
    <form class="navbar-search">
      <div class="navbar-input-group">
        <input type="text" class="search-form" placeholder="Поиск…" aria-label="Поиск">
        <button class="search-btn" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    </form>
    <div class="navbar-collapse">
      <ul class="navbar-align">
        <li class="nav-item">
          <a @click.prevent="alertLinkClick" class="nav-icon" id="alert-link" href="#" data-bs-toggle="dropdown">
            <div  class="nav-alert">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span class="alert-indicator">4</span>
            </div>
          </a>
          <div :class="{'show': isDropdownAlertOpen}" class="dropdown-alert" aria-labelledby="alertsDropdown">
            <div class="dropdown-alert-header">
              4 New Notifications
            </div>
            <div class="alert-list-group">
              <a href="#" class="alert-list-item">
                <div class="item-container">
                  <div class="item-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-danger"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <div class="item-text">
                    <div class="text-header">Update completed</div>
                    <div class="small-text">Restart server 12 to complete the update.</div>
                    <div class="small-text">30m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="alert-list-item">
                <div class="item-container">
                  <div class="item-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-warning"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                  </div>
                  <div class="item-text">
                    <div class="text-header">Lorem ipsum</div>
                    <div class="small-text">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                    <div class="small-text">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="alert-list-item">
                <div class="item-container">
                  <div class="item-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-primary"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                  <div class="item-text">
                    <div class="text-header">Login from 192.186.1.8</div>
                    <div class="small-text">5h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="alert-list-item">
                <div class="item-container">
                  <div class="item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-success"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  </div>
                  <div class="item-text">
                    <div class="text-header">New connection</div>
                    <div class="small-text">Christina accepted your request.</div>
                    <div class="small-text">14h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="dropdown-alert-footer">
              <a href="#" class="menu-footer-text">Show all notifications</a>
            </div>
          </div>
        </li>
        <li class="nav-item">
          <a @click.prevent="avatarLinkClick" class="nav-icon" id="avatar-link" href="#" data-bs-toggle="dropdown">
            <img src="../assets/img/avatars/avatar.jpg" class="nav-avatar" alt="Charles Hall">
          </a>
          <div :class="{'show': isDropdownAvatarOpen}" class="dropdown-avatar">
            <a class="dropdown-avatar-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user align-middle me-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile</a>
            <a class="dropdown-avatar-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart align-middle me-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> Analytics</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-avatar-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings align-middle me-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Настройки</a>
            <a class="dropdown-avatar-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle align-middle me-1"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Справка</a>
            <div class="dropdown-divider"></div>
            <a @click.prevent="logout" class="dropdown-avatar-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out align-middle me-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Выход</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  data () {
    return {
      isSidebarOpen: true, // флаг для открытия/закрытия боковой панели
      isDropdownAvatarOpen: false, // флаг для открытия/закрытия выпадающего меню аватара
      isDropdownAlertOpen: false // флаг для открытия/закрытия выпадающего меню уведомлений
    }
  },
  mounted () {
    document.addEventListener('click', this.documentClick) // добавление обработчика события при монтировании компонента
  },
  beforeUnmount () {
    document.removeEventListener('click', this.documentClick) // удаление обработчика события при размонтировании компонента
  },
  methods: {
    navbarToggleClick () { // метод для открытия/закрытия боковой панели
      this.isSidebarOpen = !this.isSidebarOpen
      this.$emit('navbar-clicked', this.isSidebarOpen) // эмиттинг события при клике на навбар
    },
    alertLinkClick () { // метод для открытия/закрытия выпадающего меню уведомлений
      this.isDropdownAlertOpen = !this.isDropdownAlertOpen
      this.isDropdownAvatarOpen = false // закрытие выпадающего меню аватара
    },
    avatarLinkClick () { // метод для открытия/закрытия выпадающего меню аватара
      this.isDropdownAvatarOpen = !this.isDropdownAvatarOpen
      this.isDropdownAlertOpen = false // закрытие выпадающего меню уведомлений
    },
    documentClick (event) { // метод для обработки клика по документу
      const dropdownAvatar = document.querySelector('.dropdown-avatar')
      const avatarLink = document.getElementById('avatar-link')
      const dropdownAlert = document.querySelector('.dropdown-alert')
      const alertLink = document.getElementById('alert-link')
      if (!dropdownAvatar.contains(event.target) && !dropdownAlert.contains(event.target) && !alertLink.contains(event.target) && !avatarLink.contains(event.target)) { // если клик был не по выпадающим меню
        this.isDropdownAvatarOpen = false
        this.isDropdownAlertOpen = false
      }
    },
    logout () { // метод для выхода из системы
      console.log('Logout')
      localStorage.removeItem('token') // удаление токена из локального хранилища
      this.$router.push('/login?action=logout') // переход на страницу логина
    }
  }
}
</script>

<style scoped>

@-webkit-keyframes dropdownAnimation {
  0% {
    opacity:0;
    transform:translateY(-8px)
  }
  to {
    opacity:1;
    transform:translate(0)
  }
}
@keyframes dropdownAnimation {
  0% {
    opacity:0;
    transform:translateY(-8px)
  }
  to {
    opacity:1;
    transform:translate(0)
  }
}

.navbar{
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  border-bottom: 0;
  box-shadow: 0 0 2rem 0 rgba(34,46,60,.1);
  align-items: center;
  padding: 0.875rem 1.375rem;
  position: relative;
  height: 65px;
}

.navbar-toggle{
  cursor: pointer;
  display: flex;
  height: 26px;
  width: 26px;
  margin-left: 1rem;
  color: #3b7ddd;
  text-decoration: none;
}

.navbar-toggle:hover .hamburger, .navbar-toggle:hover .hamburger:after, .navbar-toggle:hover .hamburger:before{
  background: #2f64b1;
}

.hamburger, .hamburger:after, .hamburger:before{
  position: relative;
  align-self: center!important;
  background: #bdc0c5;
  border-radius: 1px;
  content: "";
  cursor: pointer;
  display: block;
  height: 3px;
  transition: background .1s ease-in-out,color .1s ease-in-out;
  width: 24px;
}

.hamburger:before{
  position: absolute;
  top: -7.5px;
  width: 24px;
}

.hamburger:after{
  bottom: -7.5px;
  position: absolute;
  width: 16px;
}

.navbar-search{
  display: none!important;
}

@media (min-width: 576px) {
  .navbar-search {
    display: inline-block !important;
  }
}

.navbar-input-group{
  direction: ltr;
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
}

.search-form{
  border-radius: 20px 0 0 20px;
  background: #222e3c;
  border: 0;
  box-shadow: none;
  height: calc(2.1875rem + 2px);
  padding: .4rem 1rem;
  flex: 1 1 auto;
  min-width: 0;
  position: relative;
  width: 1%;
  direction: ltr;
  appearance: none;
  background-clip: padding-box;
  color: #bdc0c5;
  display: block;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  margin: 0;
}

.search-form:focus{
  outline: 0;
}

.search-btn{
  border-radius: 0 20px 20px 0;
  color: #a7abb1;
  background: #222e3c;
  border: 0;
  box-shadow: none;
  height: calc(2.1875rem + 2px);
  padding: .4rem 1rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  text-transform: none;
  margin: 0 0 0 -1px;
}

.search-btn svg{
  height: 20px;
  width: 20px;
  stroke-width: 2;
  vertical-align: middle!important;
  touch-action: none;
}

.search-btn:hover svg{
  color: #2f64b1;
}
.navbar-collapse{
  display: flex!important;
  flex-basis: auto;
  align-items: center;
  flex-grow: 1;
  max-height: 65px;
  direction: rtl;
}

.navbar-align{
  margin-right: auto;
  flex-direction: row;
  direction: ltr;
  display: flex;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
  margin-top: 0;
  max-height: 65px;
}

.nav-item{
  position: relative;
}

.nav-icon{
  color: #a7abb1;
  display: block;
  font-size: 1.5rem;
  line-height: 1.4;
  padding: .1rem .8rem;
  transition: background .1s ease-in-out,color .1s ease-in-out;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  direction: ltr;
}

.nav-icon:focus{
  outline: 0;
}

.nav-icon:hover{
  text-decoration: underline;
}

.nav-icon:focus svg, .nav-icon:hover svg{
  color: #3b7ddd;
}

.nav-avatar{
  margin-bottom: -15px;
  margin-top: -15px;
  height: 40px;
  width: 40px;
  border-radius: 0.2rem!important;
  max-width: 100%;
  vertical-align: middle;
}

.nav-alert{
  position: relative!important;
  color: #a7abb1;
  font-size: 1.5rem;
  line-height: 1.4;
}
.nav-alert svg{
  height: 20px;
  width: 20px;
  stroke-width: 2;
  vertical-align: middle!important;
  touch-action: none;
}

.nav-alert>.alert-indicator{
  background: #3b7ddd;
  border-radius: 50%;
  box-shadow: 0 .1rem .2rem hsla(0,0%,100%,.05);
  color: #fff;
  display: block;
  font-size: .675rem;
  height: 18px;
  padding: 1px;
  position: absolute;
  right: -8px;
  text-align: center;
  top: 0;
  transition: top .1s ease-out;
  width: 18px;
}

.nav-icon:hover .alert-indicator{
  top: -4px;
}
.dropdown-alert{
  position: absolute;
  box-shadow: 0 .1rem .2rem hsla(0,0%,100%,.05);
  min-width: 20rem;
  top: auto;
  padding-bottom: 0!important;
  padding-top: 0!important;

  background-clip: padding-box;
  background-color: #222e3c;
  border: 1px solid hsla(0,0%,100%,.175);
  border-radius: 0.2rem;
  color: #bdc0c5;
  display: none;
  font-size: 0.875rem;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  text-align: left;
  z-index: 1000;
  left: 0;
  right: auto;
  margin-top: 0.125rem;
  top: 100%;
  min-width: 20rem;

  -webkit-animation-duration: .25s;
  animation-duration: .25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-name: dropdownAnimation;
  animation-name: dropdownAnimation;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}

.dropdown-alert.show{
  animation-duration: .25s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-name: dropdownAnimation;
  animation-timing-function: ease;
  display: block;
}

.dropdown-avatar-item{
  background-color: transparent;
  border: 0;
  clear: both;
  color: #bdc0c5;
  display: block;
  font-weight: 400;
  padding: 0.25rem 1.5rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  transition: background .1s ease-in-out,color .1s ease-in-out;
}

.dropdown-avatar-item:hover, .dropdown-avatar-item:focus{
  background-color: #384350;
  color: #aaadb1;
  text-decoration: none;
  outline: 0;
}

.dropdown-avatar-item:active{
  background-color: #3b7ddd;
  color: #222e3c;
  text-decoration: none;
}

.dropdown-avatar-item svg{
  stroke-width: 2;
  height: 18px;
  width: 18px;
  margin-right: 0.25rem!important;
  vertical-align: middle!important;
  touch-action: none;
  color: #bdc0c5;
  font-weight: 400;
  text-align: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.dropdown-divider{
  border-top: 1px solid hsla(0,0%,100%,.175);
  height: 0;
  margin: 0.5rem 0;
  opacity: 1;
  overflow: hidden;
}
.dropdown-alert-header{
  border-bottom: 1px solid #646d77;
  font-weight: 600;
  padding: .75rem;
  text-align: center;
}

.alert-list-group{
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  padding-left: 0;
}

.alert-list-item{
  border-radius: 0;
  border-width: 0 0 1px;
  margin-bottom: 0;
  text-decoration: none;
  background-color: #222e3c;
  border: 1px solid hsla(0,0%,100%,.125);
  color: #e9ecef;
  display: block;
  padding: 0.75rem 1.25rem;
  position: relative;
  cursor: pointer;
}

.alert-list-item:hover{
  background: #384350;
  color: #2f64b1;
}

.alert-list-item:focus{
  outline: 0;
}

.item-container{
  align-items: center!important;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}

.item-icon{
  flex: 0 0 auto;
  width: 16.66666667%;
  margin-top: 0;
  max-width: 100%;
  padding: 0;
}

.icon-danger{
  color: rgba(220,53,69,1)!important;
}

.icon-warning{
  color: rgba(252,185,44,1)!important;
}
.icon-primary{
  color: rgba(59,125,221,1)!important;
}

.icon-success{
  color: rgba(28,187,140,1)!important;
}

.item-icon svg{
  stroke-width: 2;
  height: 18px;
  width: 18px;
  --bs-text-opacity: 1;
  touch-action: none;
  vertical-align: middle;
}

.item-text{
  flex: 0 0 auto;
  width: 83.33333333%;
  flex-shrink: 0;
  margin-top: 0;
  max-width: 100%;
  padding: 0;
}

.text-header{
  color: rgba(233,234,236,1)!important;
  --bs-text-opacity: 1;
}

.small-text{
  color: #a7abb1!important;
  margin-top: .25rem!important;
  font-size: 80%;
  --bs-text-opacity: 1;
}

.dropdown-alert-footer{
  display: block;
  font-size: .75rem;
  padding: .5rem;
  text-align: center;
}

.menu-footer-text{
  --bs-text-opacity: 1;
  color: #a7abb1!important;
  cursor: pointer;
  text-decoration: none;
}

.menu-footer-text:focus{
  outline: 0;
}

.menu-footer-text:hover{
  text-decoration: underline;
}

.dropdown-avatar{
  position: absolute;
  box-shadow: 0 .1rem .2rem hsla(0,0%,100%,.05);
  left: 0;
  right: 0;
  margin-top: 0.125rem;
  top: 100%;
  --bs-position: end;

  --bs-dropdown-min-width: 10rem;
  --bs-dropdown-padding-x: 0;
  --bs-dropdown-padding-y: 0.5rem;
  --bs-dropdown-spacer: 0.125rem;
  --bs-dropdown-font-size: 0.875rem;
  --bs-dropdown-color: #bdc0c5;
  --bs-dropdown-bg: #222e3c;
  --bs-dropdown-border-color: hsla(0,0%,100%,.175);
  --bs-dropdown-border-radius: 0.2rem;
  --bs-dropdown-border-width: 1px;
  --bs-dropdown-inner-border-radius: calc(0.2rem - 1px);
  --bs-dropdown-divider-bg: hsla(0,0%,100%,.175);
  --bs-dropdown-divider-margin-y: 0.5rem;
  --bs-dropdown-box-shadow: 0 0.1rem 0.2rem hsla(0,0%,100%,.05);
  --bs-dropdown-link-color: #bdc0c5;
  --bs-dropdown-link-hover-color: #aaadb1;
  --bs-dropdown-link-hover-bg: #384350;
  --bs-dropdown-link-active-color: #222e3c;
  --bs-dropdown-link-active-bg: #3b7ddd;
  --bs-dropdown-link-disabled-color: #91979e;
  --bs-dropdown-item-padding-x: 1.5rem;
  --bs-dropdown-item-padding-y: 0.35rem;
  --bs-dropdown-header-color: #a7abb1;
  --bs-dropdown-header-padding-x: 1.5rem;
  --bs-dropdown-header-padding-y: 0.5rem;
  background-clip: padding-box;
  background-color: #222e3c;
  border: 1px solid hsla(0,0%,100%,.175);
  border-radius: 0.2rem;
  color: #bdc0c5;
  display: none;
  font-size: 0.875rem;
  list-style: none;
  margin: 0;
  min-width: 10rem;
  padding: 0.5rem 0;
  text-align: left;
  z-index: 1000;

  -webkit-animation-duration: .25s;
  animation-duration: .25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-name: dropdownAnimation;
  animation-name: dropdownAnimation;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
}

.dropdown-avatar.show{
  -webkit-animation-duration: .25s;
  animation-duration: .25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-name: dropdownAnimation;
  animation-name: dropdownAnimation;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
  display: table;
}
</style>
