<template>
  <nav id="sidebar" class="sidebar" :class="{ collapsed: !isOpenSidebar }">
    <span class="sidebar-text">Admin Panel</span>
    <ul class="sidebar-nav">
      <li
        v-for="route in this.$router
          .getRoutes()
          .filter((route) => route.meta.isMenu)"
        :key="route.name"
        v-bind:class="{ active: $route.path === route.path }"
        class="sidebar-item"
      >
        <router-link :to="route.path" class="sidebar-link">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            v-html="route.meta.svg"
          ></svg>
          <span>{{ route.meta.title }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
  props: {
    isOpenSidebar: Boolean, //определяет состояние боковой панели (открыта или закрыта)
  },
};
</script>

<style scoped>
.sidebar {
  direction: ltr;
  max-width: 264px;
  min-width: 264px;
  transition: margin-left 0.35s ease-in-out, left 0.35s ease-in-out,
    margin-right 0.35s ease-in-out, right 0.35s ease-in-out;
  background: #222e3c;
}

.collapsed {
  margin-right: -264px;
}

.sidebar-text {
  width: 100%;
  color: #f8f9fa;
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 1.15rem 1.5rem;
  text-decoration: none;
}
.sidebar-nav {
  width: 100%;
  flex-grow: 1;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  direction: inherit;
}
.sidebar-item.active > .sidebar-link {
  border-left-color: #3b7ddd;
  background: linear-gradient(
    90deg,
    rgba(59, 125, 221, 0.1),
    rgba(59, 125, 221, 0.088) 50%,
    hsla(0, 0%, 100%, 0)
  );
  color: #e9ecef;
  position: relative;
}

.sidebar-item.active > .sidebar-link:hover {
  background: linear-gradient(
    90deg,
    rgba(59, 125, 221, 0.1),
    rgba(59, 125, 221, 0.088) 50%,
    hsla(0, 0%, 100%, 0)
  );
}
.sidebar-link {
  background: #222e3c;
  color: rgba(233, 236, 239, 0.5);
  border-left: 3px solid transparent;
  cursor: pointer;
  display: block;
  font-weight: 400;
  padding: 0.625rem 1.625rem;
  position: relative;
  text-decoration: none;
  transition: background 0.1s ease-in-out;
}

.sidebar-link svg {
  stroke-width: 2;
  height: 18px;
  width: 18px;
  margin-right: 0.75rem;
  color: rgba(233, 236, 239, 0.5);
  vertical-align: middle !important;
}
.sidebar-link span {
  vertical-align: middle !important;
  color: rgba(233, 236, 239, 0.5);
}

.sidebar-link:hover span {
  border-left-color: transparent;
  color: rgba(233, 236, 239, 0.75);
}
.sidebar-link:hover svg {
  border-left-color: transparent;
  background: #222e3c;
  color: rgba(233, 236, 239, 0.75);
}
.sidebar-item.active > .sidebar-link span {
  color: #e9ecef;
}

.sidebar-item.active > .sidebar-link svg {
  color: #e9ecef;
  background: transparent;
}
</style>
