<template>
        <Menu :theme="'dark'" :width="'auto'" :active-name="$store.state.activeLeftNavIndex" @on-select="choseMenu">
            <template v-for="(menu,index) in $store.state.leftNav">
                <Submenu :name="index" v-if="menu.children.length>0">
                    <template slot="title">
                        <Icon v-if="menu.icon" :type="menu.icon"/>
                        {{menu.name}}
                    </template>
                    <MenuItem v-for="(item,ii) in menu.children" :name="index+'-'+ii">
                        <Icon v-if="item.icon" :type="item.icon"/>
                        {{item.name}}
                    </MenuItem>
                </Submenu>
                <MenuItem :name="index+''" v-if="menu.children.length===0">
                    <Icon v-if="menu.icon" :type="menu.icon"/>
                    {{menu.name}}
                </MenuItem>
            </template>
        </Menu>
</template>

<script>
    export default {
        name: "LeftMenu",
        data(){
            return {}
        },
        mounted(){
            this.$nextTick(function () {})
        },
        watch: {
            '$route' (to, from) {
                this.$store.dispatch('findCurrentLeft',to.path);
            }
        },
        methods:{
            choseMenu(name){
                let choseArr=isNaN(name)?name.split('-'):[name]
                    ,menu={};

                for(let i=0;i<choseArr.length;i++){
                    if(i===0){
                        menu=this.$store.state.leftNav[choseArr[i]];
                    }else{
                        menu=menu['children'][choseArr[i]];
                    }
                }
                this.$store.dispatch('addTabs',menu);
            }
        }
    }
</script>

<style scoped>

</style>