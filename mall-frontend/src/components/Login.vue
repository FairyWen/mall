<template>
    <div id="app">
        <div class="titlename">
            仙女美妆店后台管理商城
        </div>
        <div class="login">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="name">
                    <Input type="text" v-model="formInline.name" placeholder="请输入账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary" @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    data() {
        return {
            array:[],
            token:"",
            formInline: {
                name: '',
                password: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码.', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      // 登录
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            let api = "/apis/login";
            Axios.post(api,{
              account: this.formInline.name,
              password: this.formInline.password,
            }).then(response => {
              console.log(response)
                if ((response.data.code === 1 && response.data.msg === '登录成功')) {
                  this.$router.push({ path: '/statistics' });
                } else {
                  this.$alert('账号或密码错误！', '提示', {
                    confirmButtonText: '确定',
                  });
                }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      },
    },
}
</script>

<style scoped lang="less">
#app{
    width: 100%;
    height: 100%;
}
.titlename{
    text-align: center;
    padding-top: 50px;
    font-size: 40px;
    font-weight: bolder
}
.login{
    display: flex;
    justify-content:center;
    align-items:center;
    width: 300px;
    height: 300px;
    margin: 100px auto;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0px 0px 20px #ccc;
    text-align: center
}

FormItem{
    display: flex
}
</style>




