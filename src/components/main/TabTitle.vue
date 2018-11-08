<template>
    <div class="ivu-tabs-bar" id="layout-content-tab">
        <div class="ivu-tabs-nav-container">
            <div class="ivu-tabs-nav-wrap" :class="{'ivu-tabs-nav-scrollable':$store.state.showArrow}" id="layout-tabs-nav-wrap">
                <span class="ivu-tabs-nav-prev" v-show="$store.state.showArrow" @click="arrowClick(1)">
                    <Icon type="ios-arrow-back"/>
                </span>
                <span class="ivu-tabs-nav-next" v-show="$store.state.showArrow" @click="arrowClick(-1)">
                    <Icon type="ios-arrow-forward"/>
                </span>
                <div class="ivu-tabs-nav-scroll">
                    <div class="nav-text ivu-tabs-nav">
                        <div class="ivu-tabs-ink-bar" :style="{visibility: $store.state.activeTabIndex>-1?'visible':'hidden',width:$store.state.tabPosition.width+'px',left:$store.state.tabPosition.left+'px'}"></div>
                        <div class="ivu-tabs-tab"
                             v-for="(tab,index) in $store.state.tabList"
                             :key="tab.href"
                             :class="{'ivu-tabs-tab-active':$store.state.activeTabIndex==index}"
                             @contextmenu.prevent="menuRight(tab,index)"
                             @click.self="choseTab(tab,index)">
                            {{tab.name}}
                            <i class="ivu-icon ivu-icon-ios-close"
                               v-if="!tab.notClose"
                               @click="closeTab(tab,index)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Card icon="ios-options"
              v-show="$store.state.showContextMenu"
              :padding="0"
              shadow
              class="layout-tabs-contextmenu" :style="{left:contextMenuLeft+5+'px'}" >
            <CellGroup @on-click="contextMenuClose">
                <Cell title="关闭其它" name="anther"/>
                <Cell title="关闭所有" name="all"/>
            </CellGroup>
        </Card>
    </div>

</template>

<script>
    export default {
        name: "TabTitle",
        data(){
            return {
                contextMenuLeft:0,
                currentMenuIndx:-1,
                translateX:0,
            }
        },
        mounted(){
          this.$nextTick(function () {
              this.$store.commit('calcTabPosition',this.$store.state.activeTabIndex);
              let _this=this;
              document.addEventListener('click',function () {
                  _this.$store.commit('toggleContextMenu',false);
              })
          })
        },
        methods:{
            //选中tab
            choseTab(tab,index){
                this.$store.dispatch('changeTabs',index);
                this.$router.push({path:tab.href});
            },
            //关闭tab
            closeTab(tab,index){
                this.$store.dispatch('deleteTabs',index);
            },
            //右键显示菜单
            menuRight(tab,index){
                let activTabs=document.querySelectorAll('#layout-content-tab .ivu-tabs-tab');
                if(activTabs.length>index){
                    this.contextMenuLeft=activTabs[index].offsetLeft+this.translateX;
                }
                this.currentMenuIndx=index;
                this.$store.commit('toggleContextMenu',true);
            },
            //右键关闭事件
            contextMenuClose(name){
                let _this=this,
                    tabList=[].concat(this.$store.state.tabList);
                if(name==='all'){
                    tabList.forEach(function (item) {
                        let i=_this.findTabIndex(item);
                        _this.$store.dispatch('deleteTabs',i);
                    })
                }else if(name==='anther'){
                    tabList.forEach(function (item,index) {
                        if(_this.currentMenuIndx!==index){
                            let i=_this.findTabIndex(item);
                            _this.$store.dispatch('deleteTabs',i);
                        }
                    })
                }
            },
            //根据tab查找所在位置
            findTabIndex(tab){
                for(let i in this.$store.state.tabList){
                    if(tab.name===this.$store.state.tabList[i]['name'] && tab.href===this.$store.state.tabList[i]['href']){
                        return i;
                    }
                }
                return -1;
            },
            //tab超出时滚动
            arrowClick(flag){
                let wrapWidth=document.getElementById('layout-tabs-nav-wrap').offsetWidth-24,
                    tabs=document.querySelector('#layout-tabs-nav-wrap .ivu-tabs-nav'),
                    tabsWidth=tabs.offsetWidth,
                    diff=tabsWidth-wrapWidth;

                let setValue=this.translateX+wrapWidth*flag;
                setValue=setValue>0?0:Math.abs(setValue)>diff?diff*flag:setValue;

                this.translateX=setValue;
                tabs.style.transform='translateX('+setValue+'px)';
            }
        }
    }
</script>

<style scoped>
    .ivu-tabs-bar{
        margin-bottom:0;
        position: relative;
    }
    .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
        font-size:22px;
        width: 22px;
        height: 22px;
        margin-right: 0;
    }
    .layout-tabs-contextmenu{
        position: absolute;
        top:44px;
        z-index: 1;
     }
</style>