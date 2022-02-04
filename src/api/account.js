import service from "@/utils/request.js";

/** 获取验证码 */
export function Send(data) {
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/send',   // `url` 是用于请求的服务器 URL
        method: 'post',  // `method` 是创建请求时使用的方法
        data,
        // //当key的名字和接收的形参名字一样时在es6里可以写成下面这样
        // data,
    })

}

/** 用户名检测 */
export function CheckUsername(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/check',
        method: 'post',
        data,
    })
}




/** 用户注册 */
export function Register(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/register',
        method: 'post',
        data,
    })
}

/** 用户登录 */
export function Login(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/login',
        method: 'post',
        data,
    })
}
