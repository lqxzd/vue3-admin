import Router from "./index";
//导入cookies
import { getToken } from "../utils/cookies";

// 前置路由
Router.beforeEach((to, from, next) => {
    /**
     * 1、如果 token 存在，直接确认进入下一个路由
     * 2、如果 token 不存在，跳回登录页；
     *    判断当前路由是否为登录页，如果是直接进入，否则跳回登录页
     */
    if(getToken()){
        next();
    }else{
        if(to.name === "Login"){
            next(); //确认进入
        }else{
            next({ name: "Login" }); //确认进入跳转
        }
    }
})