import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

import layout from "@/components/main/Index";

Vue.use(Router);

const routes=[{
    path: '/',
    name: '首页',
    redirect: '/base'
},{
    path:'/login',
    component:resolve=>require(["@/components/main/Login"],resolve),
    name:'登录',
},{
    path:'/base',
    component:layout,
    // name:'基础',
    meta:{login:true},
    children:[
        { path: '/', name:'主页',component: resolve=>require(["@/components/MyIndex"],resolve) },
        { path: 'grid', name:'栅格',component: resolve=>require(["@/components/MyGrid"],resolve) },
        { path: 'table', name:'表格', component: resolve=>require(["@/components/MyTable"],resolve) },
        { path: 'modify',name:'弹窗',  component: resolve=>require(["@/components/MyModify"],resolve) },
    ]
},{
    path:'/other',
    component:layout,
    name:'高阶',
    meta:{login:true},
    children:[
        { path: 'tablePage', name:'数据表格页', component: resolve=>require(["@/components/MyTablePage"],resolve) },
        { path: 'upload', name:'上传', component: resolve=>require(["@/components/form/MyUpload"],resolve) }
    ]
}];
let router= new Router({
    routes
});
router.beforeEach((to, from, next) => {
    let shouldBeLogin=to.meta.login || (to.matched.length>0?to.matched[0].meta.login:false);
    if(shouldBeLogin){
        if(Cookies.get('token')){
            next()
        }else{
            next({path:'/login',query: { from: to.path }})
        }
    }else{
        next();
    }
});

export default router;
