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
      title: "首页",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首页",
          icon: "icon-aside-home"
        },
        component: () => import("../views/home/Index.vue"),
      }
    ]
  },
  //后台管理 - 管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台",
      icon: "icon-aside-console"
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
      title: "信息管理",
      icon: "icon-aside-information"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [],
  },
  //会员管理
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "icon-aside-member"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [],
  },
  //产品管理
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "icon-aside-product"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;