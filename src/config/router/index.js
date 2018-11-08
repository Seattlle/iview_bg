import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

import layout from "../../components/main/Index";
import login from "../../components/main/Login";
import index from "../../components/MyIndex";
import grid from "../../components/MyGrid";
import talbe from "../../components/MyTable";
import modify from "../../components/MyModify";
import tablePage from "../../components/MyTablePage";
import upload from "../../components/form/MyUpload";

Vue.use(Router);

const routes=[{
    path: '/',
    name: '首页',
    redirect: '/base'
},{
    path:'/login',
    component:login,
    name:'登录',
},{
    path:'/base',
    component:layout,
    // name:'基础',
    meta:{login:true},
    children:[
        { path: '/', name:'主页',component: index },
        { path: 'grid', name:'栅格',component: grid },
        { path: 'table', name:'表格', component: talbe },
        { path: 'modify',name:'弹窗',  component: modify },
    ]
},{
    path:'/other',
    component:layout,
    name:'高阶',
    meta:{login:true},
    children:[
        { path: 'tablePage', name:'数据表格页', component: tablePage },
        { path: 'upload', name:'上传', component: upload }
    ]
}];

export const router= new Router({
    routes
});
router.beforeEach((to, from, next) => {
    let shouldBeLogin=to.meta.login || (to.matched.length>0?to.matched[0].meta.login:false);
    if(shouldBeLogin){
        if(Cookies.get('token')){
            next()
        }else{
            next({path:'/login'})
        }
    }else{
        next();
    }
});