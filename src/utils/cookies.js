import Cookie from "js-cookie"

const token = "tokenAdmin";
const username = "username";

//token
export function setToken(params){
    Cookie.set(token, params.token);
}
export function getToken(){
    return Cookie.get(token);
}
export function removeToken(){
    Cookie.remove(token);
}

//用户名
export function setUsername(params){
    Cookie.set(username, params.username);
}
export function getUsername(){
    return Cookie.get(username);
}
export function removeUsername(){
    Cookie.remove(username);
}