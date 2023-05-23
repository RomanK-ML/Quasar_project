import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import db from "src/db";
import VueCookies from "vue-cookies";
import async from "async";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // history: createWebHistory(),
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    console.log('requiresAuth: ' + requiresAuth)
    if (requiresAuth) {
      console.log("requiresAuthTrue");
      const isAuth = await db.verificationToken();
      console.log("isAuth: " + isAuth)
      if (isAuth) {
        next();
      }
      else {
        next({ name: "login" });
      }
    }else if (to.matched.some((record) => record.name === "login")){
      const isAuth = await db.verificationToken();
      if (isAuth) {
        next({ name: "dashboard" });
      }
    }
    next();
  });

  return Router;
});
