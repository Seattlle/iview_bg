<template>
    <Modal
            v-model="show"
            :title="options.title"
            @on-ok="onOk"
            @on-cancel="options.onCancel">
        <Form>
            <formItem :items="options.data" :inline="0"></formItem>
        </Form>
    </Modal>
</template>

<script>
    import Vue from 'vue'
    import formItem from './MyFormItem';

    export default {
        name: "MyDialogForm",
        components:{
            formItem
        },
        props:{
            show:false,
            options:{
                default(){
                    return {
                        onOk:function () {
                            
                        },
                        onCancel:function () {
                            
                        }
                    }
                }
            }
        },
        data(){
            return{}
        },
        methods:{
            onOk(){
                this.options.onOk(Vue.transDataToJson(this.options.data));
            },
            onchange(item){
                item.onChange && item.onChange(item);
            },
        }
    }
</script>

<style scoped>
    .ivu-form-item{
        margin-bottom:15px;
    }
    .ivu-date-picker{
        width:100%;
    }
</style>