<template>
    <div class="layout">
        <Layout>
            <Header>
                <topNav></topNav>
            </Header>
            <Layout :style="'height:'+height+'px'">
                <Sider v-if="$store.state.showLeftNav">
                    <leftNav></leftNav>
                </Sider>
                <Content>
                    <tabTitle></tabTitle>
                    <div class="layout-container"  :style="'height:'+(height-38)+'px'">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import topNav from './TopNav';
    import leftNav from './LeftNav';
    import tabTitle from './TabTitle';

    export default {
        computed:{
           height () {
               return window.innerHeight-64;
           }
        },
        components: {leftNav,topNav,tabTitle},
    }
</script>

<style scoped>
    .ivu-layout-content{
        overflow: hidden;
    }
    .layout-container{
        padding:15px 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .ivu-layout-header{
        padding:0;
    }
</style>