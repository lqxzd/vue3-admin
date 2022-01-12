import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/account/Login.vue";

const routes = [
  //登录
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  
  //注册
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/account/Register.vue"),
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
