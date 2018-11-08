import Vue from 'vue';
import Vuex from 'vuex';
import {router} from '../router/index';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showContextMenu:false,
        //是否显示左侧菜单栏
        showLeftNav:true,
        activeTopNavIndex:0,
        activeLeftNavIndex:-1,
        topNav:[],
        leftNav:[],
        //选中的tab序号
        activeTabIndex:0,
        tabList:[{
            name:'主页',
            href:'/',
            notClose:true
        }],
        tabPosition:{
            width:0,
            left:0,
        },
        showArrow:false
    },
    mutations: {
        calcTabPosition(state,index){
           setTimeout(function () {
               let activTabs=document.querySelectorAll('#layout-content-tab .ivu-tabs-tab');
               if(activTabs.length>index){
                   state.tabPosition={left:activTabs[index].offsetLeft,width:activTabs[index].offsetWidth};
               }
           },0)
        },
        toggleContextMenu(state,bool){
            state.showContextMenu=bool;
        },
        judgeArrow(state){
            setTimeout(function () {
                let wrap=document.getElementById('layout-tabs-nav-wrap'),
                    nav=document.querySelector('#layout-tabs-nav-wrap .ivu-tabs-nav');

                if(wrap && nav ){
                    let wrapWidth=wrap.offsetWidth,
                        tabs=nav.offsetWidth;

                    state.showArrow=wrapWidth<tabs;

                    if(!state.showArrow){
                        nav.style.transform='translateX(0px)';
                    }
                }
            },0)
        },
    },
    actions: {
        findCurrentLeft(context,path){
            let state=context.state;
            setTimeout(function () {
                let leftNav=state.leftNav;
                state.activeLeftNavIndex=-1;
                for(let i in leftNav){
                    if(path===leftNav[i]['href']){
                        state.activeLeftNavIndex=i;
                        context.dispatch('addTabs',leftNav[i]);
                        break;
                    }
                }
            },0)
        },
        addTabs(context,menu){
            let state=context.state;
            let exit=-1;
            for(let index in state.tabList){
                if(menu.name===state.tabList[index]['name'] && menu.href===state.tabList[index]['href']){
                    exit=index;
                    break;
                }
            }
            if(exit>-1){
                state.activeTabIndex=exit;
            }else{
                state.activeTabIndex=state.tabList.length;
                state.tabList.push(menu);
            }
            router.push({path:menu.href});

            context.commit('judgeArrow');
            context.commit('toggleContextMenu',false);
            context.commit('calcTabPosition', state.activeTabIndex);
        },
        changeTabs(context,index){
            let state=context.state;
            state.activeTabIndex=index;
            context.commit('calcTabPosition', state.activeTabIndex);
        },
        deleteTabs(context,index){
            let state=context.state;
            index=index*1;
            state.activeTabIndex=parseInt(state.activeTabIndex);
            if(index>-1 && state.tabList.length>index){
                let tab= state.tabList[index];
                if(tab.notClose) return false;

                if(state.activeTabIndex===index){
                    state.activeTabIndex=index-1;
                }else if(state.activeTabIndex>index){
                    state.activeTabIndex=state.activeTabIndex-1;
                }
                state.tabList.splice(index,1);

                let activeMenu=state.tabList[state.activeTabIndex];
                router.push({path:activeMenu.href});

                context.commit('judgeArrow');
                context.commit('calcTabPosition', state.activeTabIndex);
            }
        },
        changeTopNav(context,index){
            let state=context.state;
            state.activeTopNavIndex=index;
            state.leftNav=state.topNav[index]['children']||[];

            context.commit('toggleContextMenu',false);
            context.dispatch('findCurrentLeft',router.history.current.path);
        },
        getTopNav(context){
            Vue.axios.get('TopMenu.json')
                .then(function (response) {
                    context.state.topNav=response.data.vos;

                    let menu=router.history.current
                        ,obj={}
                        ,flag=false;
                    for(let i in context.state.topNav){
                        obj=context.state.topNav[i];
                        if(menu.path===obj.href){
                            context.state.activeTopNavIndex=i;
                            break;
                        }else{
                            for(let j in obj['children']){
                                if(menu.path===obj['children'][j].href){
                                    context.state.activeTopNavIndex=i;
                                    flag=true;
                                    break;
                                }
                            }
                            if(flag){break;}
                        }
                    }
                    context.dispatch('changeTopNav',context.state.activeTopNavIndex);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    modules: {}
});

export default store;