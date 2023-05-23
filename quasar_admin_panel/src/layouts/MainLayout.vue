<template>
  <div class="wrapper">
    <Sidebar :isOpenSidebar="isOpenSidebar" />
    <div class="main">
      <Navbar @navbar-clicked="navbarToggleClick" />
      <main class="content">
        <div class="content-container">
          <div class="title-container">
            <h1 class="content-title">{{ title }}</h1>
          </div>

          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Navbar from "components/Navbar.vue";
import Sidebar from "components/Sidebar.vue";
import db from "src/db";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  data() {
    return {
      isOpenSidebar: true,
    };
  },
  methods: {
    navbarToggleClick(data) {
      this.isOpenSidebar = data;
    },
  },
};
</script>

<style scoped>
*,
:after,
:before {
  box-sizing: border-box;
}

.wrapper {
  align-items: stretch;
  display: flex;
  width: 100%;
  background: #222e3c;
  direction: rtl;
}

.main {
  background: #19222c;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 0;
  overflow: hidden;
  transition: margin-left 0.35s ease-in-out, left 0.35s ease-in-out,
    margin-right 0.35s ease-in-out, right 0.35s ease-in-out;
  width: 100%;
  direction: rtl;
}

.content {
  direction: ltr;
  flex: 1;
  max-width: 100vw;
  padding: 1.5rem 1.5rem 0.75rem;
}

@media (min-width: 768px) {
  .content {
    max-width: auto;
    width: auto;
  }
}

@media (min-width: 992px) {
  .content {
    padding: 3rem 3rem 1.5rem;
  }
}

.content-container {
  padding: 0 !important;
  --bs-gutter-x: 0.75rem;
  --bs-gutter-y: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.title-container {
  padding: 0 !important;
  margin-bottom: 1rem !important;
  --bs-gutter-x: 0.75rem;
  --bs-gutter-y: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.content-title {
  display: inline !important;
  vertical-align: middle !important;
  font-size: 1.3125rem;
  color: #fff;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-top: 0;
}
</style>
