import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  //登录
  {
    path: "/",
    name: "Login",
    meta: {
      title: "登录"
    },
    hidden: true,
    component: () => import("../views/account/Login.vue"),
  },

  //注册
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册"
    },
    hidden: true,
    component: () => import("../views/account/Register.vue"),
  },
  //忘记密码
  {
    path: "/forget",
    name: "Forget",
    meta: {
      title: "忘记密码"
    },
    hidden: true,
    component: () => import("../views/account/Forget.vue"),
  },
  //后台管理 - 首页
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首页"
    },
    component: () => import("../views/layout/Index.vue"),
  },
  //后台管理 - 管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理"
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理"
        },
        component: () => import("../views/admin/User.vue"),
      },
    ],
  },
  //信息管理
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理"
    },
    component: () => import("../views/layout/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;