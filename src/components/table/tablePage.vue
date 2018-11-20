<template>
    <div class="initPage">
        <div class="page-search" v-if="search.length>0">
            <Form inline :label-width="60">
                <formItem :items="search"></formItem>
                <FormItem :label-width="20">
                    <Button type="primary" @click="searchEvent">搜素</Button><Button @click="resetSearch">重置</Button>
                </FormItem>
            </Form>
        </div>
        <div class="page-button" v-if="buttons.length>0">
            <Button v-for="item in buttons"
                    :key="item.name"
                    :type="item.class"
                    @click="clickBtn(item)">{{item.name}}</Button>
        </div>
        <div class="page-table">
            <Table :loading="loading"
                   :columns="table.columns"
                   :data="table.data"
                   @on-selection-change="selectTableRows" ></Table>
            <Page v-if="table.page"
                  :current="page.curr"
                  :total="page.total"
                  :show-elevator="page.elevator"
                  :show-sizer="page.size"
                  @on-change="changePage"
                  @on-page-size-change="changePageSize"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import formItem from '../form/MyFormItem';

    export default {
        name: 'tablePage',
        components:{
            formItem
        },
        props:{
            search:{
                default:[]
            },
            button:'',
            table:{
                default:function () {
                    return {
                        page:true,
                        columns:[],
                        data:[],
                        url:''
                    }
                }
            }
        },
        data() {
            return {
                loading:false,
                selected:[],
                page:{
                    curr:1,
                    rows:10,
                    total:0,
                    elevator:true,
                    size:true,
                },
                buttons:[],
                condition:{}
            }
        },
        mounted(){
          this.$nextTick(function () {
              if(this.table.page===undefined){
                  Vue.set(this.table,'page',true);
              }
          })
        },
        created(){
            if(this.button){
                this.getButtons();
            }
            this.getTableData();
        },
        methods:{
            //搜索
            searchEvent(){
                this.page.curr=1;
                this.condition=Vue.transDataToJson(this.search);
                this.getTableData();
            },
            //重置表单
            resetSearch(){
                for(let i in this.search){
                    this.search[i]['value']='';
                }
            },
            //获取表格按钮
            getButtons(){
                this.ajax.get(this.button).then(res=>this.buttons=res.vos);
            },
            //获取表格数据
            getTableData(){
                let _this=this;

                this.condition.page=this.page.curr;
                this.condition.rows=this.page.rows;

                this.loading=true;

                if(this.table.url){
                    this.ajax.get(this.table.url,{
                        params: this.condition
                    }).then(function (res) {
                        Vue.set(_this.table,'data',res.vos);
                        Vue.set(_this.page,'total',res.total);
                        _this.loading=false;
                    });
                }
            },
            //改变页码
            changePage(index){
                Vue.set(this.page,'curr',index);
                this.getTableData();
            },
            //改变条数
            changePageSize(size){
                Vue.set(this.page,'rows',size);
                this.getTableData();
            },
            //选中行
            selectTableRows(rows){
                this.selected=rows;
            },
            //点击按钮
            clickBtn(item){
                if(this.button){
                    this.$emit(item.handler,this.selected);
                }else{
                    item.onClick && item.onClick(this.selected);
                }
            }
        }
    }
</script>

<style scoped>
    .page-button,.page-table,.ivu-form-item{
        margin-bottom:20px;
        position: relative;
    }
    .ivu-page{
        margin:10px auto;
    }
    .page-search .ivu-btn,.page-button .ivu-btn{
        margin-right:10px;
    }
</style>
