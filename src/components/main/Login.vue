<template>
    <div class="grid-wrap">
        <div class="grid"  @keyup.enter="handleSubmit('formInline')">
            <Row type="flex" justify="center">
                <Col  :xs="12" :sm="8" :md="6" :lg="4">
                    <h1 class="login-title">用户登录</h1>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                        <FormItem prop="user">
                            <Input type="text" v-model="formInline.user" placeholder="用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    export default {
        name:'Login',
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '用户名不能为空！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度有误！', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
          pageFrom(){
              return this.$router.history.current.query.from;
          }
        },
        created(){
            Cookies.remove('token');
            this.$store.dispatch('deleteAllTabs');
        },
        mounted(){
          this.$nextTick(function () {
              if(this.pageFrom){
                  this.$Message.error('请先登录!');
              }
          })
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('登录成功!');
                        Cookies.set('token',this.formInline.user,{ expires: 1 });

                        if(this.pageFrom){
                            this.$router.push({ path: this.pageFrom});
                        }else{
                            this.$router.push({ path: '/base' });
                        }
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .grid-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        background: #515a6e;
    }
    .login-title{
        color:#fff;
        margin-bottom:15px;
        text-align:center;
    }
    .grid{
        width: 100%;
        position: absolute;
        left:0;
        top:35%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>
