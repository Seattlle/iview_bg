<template>
    <table-page
            :search="search"
            :button="button"
            :table="table"
            @add="add"
            @del="del"
            @modify="modify"
            ref="tablePageComponent"
    ></table-page>
</template>

<script>
    import tablePage from './table/tablePage';

    export default {
        name: 'initPage',
        data() {
            return {
                value:'',
                search:[{
                    label:'名称',
                    value:'',
                    field:'name',
                    type:'input',
                    holder:'请输入名称',
                },{
                    label:'类型',
                    value:'',
                    field:'type',
                    type:'select',
                    data:[],
                    options:{
                      url:'./SelectData.json',
                      labelField:'name',
                      valueField:'value'
                    },
                    holder:'',
                    onChange:function (obj) {
                        console.log(obj);
                    }
                },{
                    label:'日期',
                    value:'',
                    field:'date',
                    type:'date',
                    format:'yyyy-MM-dd',
                    holder:'',
                }],
                button:'/PageButtons.json',
                table:{
                    // page:true,
                    url:'/TableData.json',
                    columns:[
                        {
                            type: 'index',
                            width: 50,
                            align: 'center'
                        },
                        {
                            type: 'selection',
                            width: 45,
                            align: 'center'
                        },
                        {
                            title: 'Name',
                            key: 'name'
                        },
                        {
                            title: 'Age',
                            key: 'age'
                        },
                        {
                            title: 'Sex',
                            key: 'sex',
                            render:(h,params)=>{
                                return h('span',params.row.sex===1?"男":"女");
                            }
                        },
                        {
                            title: 'Address',
                            key: 'address'
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            width: 150,
                            align: 'center',
                            render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                console.log(params);
                                            }
                                        }
                                    }, '查看'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {}
                                        }
                                    }, '删除')
                                ]);
                            }
                        }
                    ]
                }
            }
        },
        components:{
            tablePage
        },
        methods:{
            add(data){
                this.$dialog({
                    title:'新增',
                    data:[{
                        label:'名称',
                        value:'',
                        field:'name',
                        type:'input',
                        holder:'请输入名称',
                    },{
                        label:'类型',
                        value:'',
                        field:'type',
                        type:'select',
                        data:[],
                        options:{
                            url:'./SelectData.json',
                            labelField:'name',
                            valueField:'value'
                        },
                        holder:'',
                        onChange:function (obj) {
                            console.log(obj);
                        }
                    },{
                        label:'日期',
                        value:'2018-10-29',
                        field:'date',
                        type:'date',
                        format:'yyyy-MM-dd',
                        holder:'',
                    },{
                        label:'城市',
                        value:'',
                        field:'city',
                        type:'radio',
                        options:[{
                            label:'北京',
                            value:'0'
                        },{
                            label:'上海',
                            value:'1'
                        },{
                            label:'广州',
                            value:'2'
                        }]
                    },{
                        label:'水果',
                        value:[],
                        field:'fruit',
                        type:'checkbox',
                        options:[{
                            label:'苹果',
                            value:'0'
                        },{
                            label:'香蕉',
                            value:'1'
                        },{
                            label:'梨',
                            value:'2'
                        }]
                    },{
                        label:'默认',
                        value:true,
                        field:'_default',
                        type:'switch',
                        onChange:function (item) {
                            console.log(item.value);
                        }
                    }],
                    onOk(obj){
                        console.log('ok',obj)
                    },
                    onCancel(obj){
                        console.log('cancel',obj)
                    }
                });
                //刷新子组件表格数据
                // this.$refs.tablePageComponent.searchEvent();
            },
            modify(data){
                this.$Modal.confirm({
                    title: 'Title',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            },
            del(data){
                console.log('del')
            }
        }
    }
</script>

<style scoped>

</style>
