import { message } from "ant-design-vue";
import axios from "axios";

const service = axios.create({
    baseURL: "",  //接口地址
    timeout: 5000,
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    /**
     * 1.约定的属性：resCode,errorCode,code,apiCode
     * 2.resCode的什么值代表成功；业务逻辑有问题的情况代表失败，否则就成功：0
     */
    const data = response.data;
    if(data.error_code === 0){
        return Promise.resolve(data);
    }else{
        message.info(data.msg);
        return Promise.reject(data);
    }

}, function (error) {
    const data = JSON.parse(error.request.response);
    // console.log(data);
    message.error(data.msg);
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;