<template>
    <div class="upload">
        <div class="demo-upload-list" v-for="(item,index) in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" v-if="preview" @click.native="handleView(index)"></Icon>
                    <Icon type="ios-trash-outline" v-if="upload.onDel" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                v-show="uploadList.length<maxLength"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :format="format"
                :max-size="maxSize"
                :multiple="upload.multiple"
                :action="upload.action"
                :default-file-list="upload.defaultList"
                type="drag"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="大图预览"
               v-model="visible"
               draggable
               cancel-text=""
               ok-text="关闭"
        >
            <img :src="uploadList[showImgIndex].url" v-if="visible && showImgIndex>-1" style="width: 100%;display:block;">
            <div class="imageMenu" v-if="uploadList.length>1">
                <Icon type="ios-arrow-back" @click="nextPic(-1)"/>
                <Icon type="ios-arrow-forward" @click="nextPic(1)"/>
            </div>
            <div slot="footer">
                <Button @click="visible=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name:"MyUpload",
        props:{
            preview:{
                default:true
            },
            format:{
                default:function () {
                    return ['jpg','jpeg','png'];
                }
            },
            maxSize:{
                default:2048
            },
            maxLength:{
               default:3
            },
            upload:{
               default:function () {
                   return {
                       multiple:false,
                       auto:false,
                       action:'http://192.168.1.6:8500/user/sys/sysFile/upload',
                       defaultList:[
                           {
                               'name': 'a42bdcc1178e62b4694c830f028db5c0',
                               'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                           },
                           {
                               'name': 'bc7521e033abdd1e92222d733590f104',
                               'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                           }
                       ],
                       onDel:null
                   }
               }
            }
        },
        data () {
            return {
                showImgIndex: -1,
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleView (index) {
                this.showImgIndex = index;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);

                this.upload.onDel && this.upload.onDel(file);
            },
            handleSuccess (res, file) {
                console.log(res,file)
                this.upload.onSuccess && this.upload.onSuccess(res, file);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '文件 ' + file.name + ' 格式错误，请重新选择！.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '文件  ' + file.name + ' 太大，请重新选择!'
                });
            },
            handleBeforeUpload (file) {
                let _this=this;
                if(_this.preview && !_this.upload.auto){
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(){
                        _this.uploadList.push({
                            percentage: 100,
                            status: "finished",
                            name:file.name,
                            url:this.result
                        });
                    };
                }
                const check = this.uploadList.length <this.maxLength;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 '+this.maxLength+' 个文件'
                    });
                }
                return this.upload.auto && check;
            },
            nextPic(index){
                this.showImgIndex+=index;
                this.showImgIndex=this.showImgIndex>(this.uploadList.length-1)?0:this.showImgIndex<0?(this.uploadList.length-1):this.showImgIndex;

            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style scoped lang="scss">
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;

        img{
            width: 100%;
            height: 100%;
        }

        &:hover  .demo-upload-list-cover{
            display: block;
        }

    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);

        i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
    }

    .imageMenu{
        text-align:center;
        font-size:18px;
        .ivu-icon{
            margin:0 10px;
            cursor: pointer;
        }

    }
</style>
