<template>
    <div class="modify">
        <Button @click="modal2 = true">Custom header and footer</Button>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>Delete confirmation</span>
            </p>
            <div style="text-align:center">
                <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
                <p>Will you delete it?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
            </div>
        </Modal>



        <Button @click="formDialog">表单弹窗</Button>

        <Button @click="modal6 = true">表格弹窗</Button>
        <Modal
                v-model="modal6"
                title="表格弹窗"
                width="800"
                :styles="{top: '64px'}">
            <table-page
                    :search="search"
                    :button="button"
                    :table="table"
                    ref="tablePageComponent"
            ></table-page>
        </Modal>
    </div>
</template>
<script>
    import tablePage from './table/tablePage'
    export default {
        name:'modify',
        components:{
            tablePage
        },
        data () {
            return {
                modal2: false,
                modal_loading: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6:false,
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
        methods: {
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.success('Successfully delete');
                }, 2000);
            },
            formDialog(){
                this.$dialog({
                    title:'表单弹窗',
                    data:[{
                        label:'头像',
                        field:'head',
                        type:'upload',
                        preview:true,
                        maxLength:2,
                        options:{
                            multiple:false,
                            auto:false,
                            action:'http://192.168.1.6:8500/user/sys/sysFile/upload',
                            defaultList:[
                                {
                                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                                }
                            ],
                            onDel:function (item) {
                                console.log(item);
                            }
                        }
                    },{
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
                        label:'地址',
                        value:[],
                        field:'address',
                        type:'cascader',
                        data: [{
                            value: 'beijing',
                            label: '北京',
                            children: [
                                {
                                    value: 'gugong',
                                    label: '故宫'
                                },
                                {
                                    value: 'tiantan',
                                    label: '天坛'
                                },
                                {
                                    value: 'wangfujing',
                                    label: '王府井'
                                }
                            ]
                        }, {
                            value: 'jiangsu',
                            label: '江苏',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: '南京',
                                    children: [
                                        {
                                            value: 'fuzimiao',
                                            label: '夫子庙',
                                        }
                                    ]
                                },
                                {
                                    value: 'suzhou',
                                    label: '苏州',
                                    children: [
                                        {
                                            value: 'zhuozhengyuan',
                                            label: '拙政园',
                                        },
                                        {
                                            value: 'shizilin',
                                            label: '狮子林',
                                        }
                                    ]
                                }
                            ],
                        }],
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
                    },{
                        label:'评分',
                        value:3,
                        field:'evaluate',
                        type:'rate',
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
            }
        }
    }
</script>


<style scoped>
    .modify{
        height:1000px;
    }
</style>
