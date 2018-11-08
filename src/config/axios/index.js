import Vue from 'vue'

import {router} from '../router/index';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

//响应拦截器
axios.interceptors.response.use(function (response) {
    let result=response.data;
    switch(result.code){
        case 500:
            router.push({path:'/login', query: { from: router.history.current.path}});
            return Promise.reject(result);
        default: return response;
    }
}, function (error) {
    return Promise.reject(error);
});

