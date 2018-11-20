<template>
   <div class="formItem" :class="{inlineBlock:inline}">
       <FormItem v-for="item in items"
                 :label="item.label"
                 :key="item.label">

           <Input v-if="item.type==='input'"
                  v-model="item.value"
                  type="text"
                  :disabled="item.disabled"
                  :placeholder="item.holder?item.holder:'请输入'+item.label"/>

           <Select  v-if="item.type==='select'"
                    filterable
                    v-model="item.value"
                    :disabled="item.disabled"
                    :label-in-value="labelInValue"
                    :placeholder="item.holder?item.holder:'请选择'+item.label"
                    @on-change="onChange(item)"
                    style="min-width:120px;">
               <Option :value="'empty'">请选择</Option>
               <Option v-for="ii in item.data"
                       :value="ii.value"
                       :key="ii.value">{{ ii.label }}</Option>
           </Select>

           <Cascader v-if="item.type==='cascader'"
                     :data="item.data"
                     :disabled="item.disabled"
                     v-model="item.value"
                     @on-change="onChange(item)"
           >
           </Cascader>

           <DatePicker  v-if="item.type==='date'"
                        v-model="item.value"
                        type="date"
                        :disabled="item.disabled"
                        :placeholder="item.holder?item.holder:'请选择'+item.label"
                        @on-change="onChange(item)">
           </DatePicker>

           <RadioGroup  v-if="item.type==='radio'"
                        v-model="item.value"
                        :disabled="item.disabled"
                        @on-change="onChange(item)"
                         type="button">
               <Radio v-for="ii in item.options"
                      :label="ii.value">{{ii.label}}</Radio>
           </RadioGroup>

           <CheckboxGroup  v-if="item.type==='checkbox'"
                           v-model="item.value"
                           :disabled="item.disabled"
                           @on-change="onChange(item)">
               <Checkbox v-for="ii in item.options"
                         :label="ii.value">{{ii.label}}</Checkbox>
           </CheckboxGroup>

           <i-switch v-if="item.type==='switch'"
                     v-model="item.value"
                     :disabled="item.disabled"
                     @on-change="onChange(item)"/>

           <Rate v-if="item.type==='rate'"
                 show-text
                 v-model="item.value"
                 @on-change="onChange(item)"
           />
           <upload  v-if="item.type==='upload'"
                    :preview="item.preview"
                    :format="item.format"
                    :maxSize="item.maxSize"
                    :max-length="item.maxLength"
                    :upload="item.options"
           ></upload>
       </FormItem>
   </div>
</template>

<script>
    import upload from './MyUpload';
    export default {
        name: "MyFormItem",
        components:{
            upload
        },
        props:{
           inline:{
               default:true
           },
           items:{
               default:function () {
                   return [];
               }
           }
        },
        data(){
            return{
                labelInValue:true
            }
        },
        watch:{
            items(){
                this.handleSelect();
            }
        },
        created(){
           this.handleSelect();
        },
        methods:{
            onChange(item){
                item.onChange && item.onChange(item);
            },
            //获取下拉框的值
            handleSelect(){
                for(let i in this.items){
                    let item=this.items[i];

                    if(item.type==='select' && (!item.data||item.data.length===0) && item.options){
                        this.ajax.get(item.options.url).then(function (res) {
                            let _rows=res.vos
                                ,data=[]
                                ,name=item.options.labelField ||'label'
                                ,value=item.options.valueField ||'value';
                            for(let jj in _rows){
                                let obj={};
                                obj['label']=_rows[jj][name];
                                obj['value']=_rows[jj][value];
                                data.push(obj);
                            }
                            item.data=data;
                        });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .inlineBlock{
        display: inline-block;
    }
    .ivu-form-item{
        margin-bottom:15px;
    }
    .ivu-date-picker{
        width:100%;
    }
</style>