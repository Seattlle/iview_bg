<template>
    <div>
        <div class="layout-logo"></div>
        <div class="layout-nav">
            <div class="layout-nav-wrap">
                <Menu mode="horizontal" :theme="theme" :active-name="$store.state.activeTopNavIndex" @on-select="clickTopMenu">
                    <template v-for="(menu,index) in $store.state.topNav" >
                        <MenuItem v-if="menu.children.length===0 || $store.state.showLeftNav" :name="index+''">
                            <Icon v-if="menu.icon" :type="menu.icon"/>
                            {{menu.name}}
                        </MenuItem>
                        <Submenu v-if="!$store.state.showLeftNav && menu.children.length>0"  :name="index">
                            <template slot="title">
                                <Icon v-if="menu.icon" :type="menu.icon"/>
                                {{menu.name}}
                            </template>
                            <MenuItem v-for="(item,ii) in menu.children" :name="index+'-'+ii"  :to="item.href">
                                <Icon v-if="item.icon" :type="item.icon"/>
                                {{item.name}}
                            </MenuItem>
                        </Submenu>
                    </template>
                </Menu>
            </div>
            <div class="layout-header">
                <Menu mode="horizontal" :theme="theme">
                    <Submenu name="userInfo">
                        <template slot="title">
                            <Avatar icon="ios-person" size="large" />
                        </template>
                        <MenuItem
                            v-for="item in userMenu"
                            :name="item.name"
                            :to="item.href"
                        >{{item.text}}</MenuItem>
                    </Submenu>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopMenu",
        data(){
            return {
                theme:'dark',
                userMenu:[{
                    name:'loginout',
                    text:'退出登录',
                    href:'/login'
                }]
            }
        },
        created(){
           this.$store.dispatch('getTopNav');
        },
        methods:{
            clickTopMenu(index){
                this.$store.dispatch('changeTopNav',index);
            }
        }
    }
</script>
<style>
    .layout-header .ivu-icon{
        margin-right: 0;
    }
</style>
<style scoped>
    .layout-logo{
        float:left;
        width:200px;
        height: 64px;
        display: inline-block;
    }
    .layout-nav-wrap{
        float:left;
    }
    .layout-header{
        float:right;
    }
</style>
