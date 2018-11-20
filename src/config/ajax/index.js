import Vue from "vue";
import router from '../router/index';
import ajax from 'flyio';

Vue.prototype.ajax=ajax;

//添加请求拦截器
ajax.interceptors.request.use((request)=>{
    //打印出请求体
    // console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
ajax.interceptors.response.use(function (response) {
    let result=response.data;
    switch(result.code){
        case 500:
            router.push({path:'/login', query: { from: router.history.current.path}});
            return Promise.reject(result);
        default: return result;
    }
}, function (error) {
    return Promise.reject(error);
})

export default ajax;