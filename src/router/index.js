import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage";
import Admin from "../views/Admin";
import Logout from "../views/Logout";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: {
      loginPage: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (localStorage.getItem("role") !== "1") {
          console.log("*");
          next("/");
          return;
        }
      }

      next();
      return;
    }
    next("/login");
  }
  if (to.matched.some(record => record.meta.loginPage)) {
    if (store.getters.isLoggedIn) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
