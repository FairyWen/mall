<template>
  <div id="app">
    <div class="regsiter">
    	<div class="login">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#ff4400" background-color="#fef0f6">
          <el-menu-item index="1">登录</el-menu-item>
          <el-menu-item index="2">注册</el-menu-item>
        </el-menu>
        <!--登录-->
        <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="100px" class="demo-ruleForm3 newlogin" v-show="flag">
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm3.name" placeholder='请输入用户名'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm3.pass" autocomplete="off" placeholder='请输入密码'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLoginForm('ruleForm3')">登录</el-button>
          </el-form-item>
        </el-form>
        <!--忘记密码-->
        <p class="pass-register" v-show="flag">
          <a href="javascript:void(0)" @click="forgetPassword">忘记密码</a>
        </p>
        <!--注册-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm newregieter" v-show="!flag">
          <el-form-item label="账号" prop="name1">
            <el-input v-model="ruleForm.name1" placeholder='请输入用户名'></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder='请输入手机号'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass1">
            <el-input type="password" v-model="ruleForm.pass1" autocomplete="off" placeholder='请输入密码'></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder='请再次输入密码'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRegForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--密保验证-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm1" v-show="flag1" status-icon ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm1.user_account" @blur="handlerPageNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密保问题">
          <el-input v-model="ruleForm1.question" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密保答案">
          <el-input v-model="ruleForm1.answer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitPassProtect('ruleForm1')">下一步</el-button>
        </el-form-item>
      </el-form>
      <!--重置密码-->
      <el-form :model="ruleForm2" v-show='!flag1' status-icon :rules="rules1" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pass2">
          <el-input type="password" v-model="ruleForm2.pass2" autocomplete="off" placeholder='请输入新密码'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass1">
          <el-input type="password" v-model="ruleForm2.checkPass1" autocomplete="off" placeholder='请再次输入新密码'></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="setNewPass('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios';
import {isvalidPhone} from '../../config/validate' // 手机号验证
export default {
  data () {
    let validPhone=(rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
        callback()
      }
    }
    let validatePass5 = (rule, value, callback) => { // 登录密码验证
      if (value === '') {
        callback(new Error('请输入密码'));
      } else{
        callback()
      }
    };
    let validatePass = (rule, value, callback) => { // 注册验证密码
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => { // 注册验证两次密码是否一样
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatePass3 = (rule, value, callback) => { // 验证新密码 忘记密码
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass1 !== '') {
          this.$refs.ruleForm2.validateField('checkPass1');
        }
        callback();
      }
    };
    let validatePass4 = (rule, value, callback) => { // 忘记密码 重置 验证两次密码
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "1", // 默认选中登录而非注册
      flag: true, // 默认为显示登录框
      flag1: true, // 弹框内显示密保还是重置密码
      title: '忘记密码',
      account: '', // 记录下密保时候输入的账号，用于重置密码的时候拿去请求数据
      dialogFormVisible: false, // 修改密码的框框是否显示
      ruleForm: { //注册
        name1: '', 
        pass1:'',
        phone:'',
        checkPass: '',
      },
      ruleForm3: { //登录
        name: '',
        pass: ''
      },
      ruleForm1: { // 密保
        user_account: '',
        question: '',
        answer: '',
      },
      ruleForm2: { //忘记密码 重置密码
        pass2: '', // 密保新密码
        checkPass1: '' // 确认密保新密码
      },
      rules1:{ // 忘记密码的验证
        pass2: [  // 忘记密码 新密码
          { required: true, validator: validatePass3, trigger: 'blur' },
          { min: 6, message: '至少长度为6个字符', trigger: 'blur' }
        ],
        checkPass1: [ // 忘记密码 确认新密码
          { validator: validatePass4, trigger: 'blur' }
        ],
      },
      rules2:{
        name: [ //登录名字
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pass: [ // 登录密码
          { required: true, validator: validatePass5, trigger: 'blur' },
          { min: 6, message: '至少长度为6个字符', trigger: 'blur' }
        ]
      },
      rules: {
        name1: [ // 注册名字
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone } //这里需要用到全局变量
        ],
        pass1: [ // 注册密码
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, message: '至少长度为6个字符', trigger: 'blur' }
        ],
        checkPass: [ // 注册 密码确认
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // 在登录和注册中切换
    handleSelect(key, keyPath) {
      if (key === "1") {
        this.flag = true;
        this.$router.push({ path: "/login" });
      }else if (key === "2") {
        this.flag = false;
        this.$router.push({ path: "/login", query: { ifreg: "yes" }});
      }
    },
    // 提交登录表单
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('toLogin', {
            user_account:this.ruleForm3.name,
            password:this.ruleForm3.pass,
          }).then(response => {
            if (response.data.code === 1 && response.data.msg === '登录成功') {
              this.$store.commit('saveLoginUser',this.ruleForm3.name);
              this.$router.push({ path: '/home' }); // 登录成功跳转主页
            } else {
              this.$alert('账号或密码错误！', '提示', {
                confirmButtonText: '确定',
              });
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      });
    },
    // 提交注册表单
    submitRegForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let api="/apis/client/register"
          Axios.post(api,{
            user_account:this.ruleForm.name1,
            phone:this.ruleForm.phone,
            password:this.ruleForm.pass1,
          }).then(response=>{
            // console.log(response);
            if ((response.data.code === 1 && response.data.msg === 'success')) {
              this.ruleForm.name1 = '';
              this.ruleForm.phone = '';
              this.ruleForm.pass1 = '';
              this.ruleForm.checkPass = '';
              this.$message({
                message: '注册成功，去登录',
                type: 'success'
              });
              // this.activeIndex = "2"
              // this.$router.push({path: '/login'})
            } else if (response.data.code === 2 && response.data.msg === 'existed') {
              this.$message.error('该用户已存在，请更换用户名！');
            } else {
              this.$message.error('注册失败，建议重试！');
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      });
    },
    // 忘记密码（打开密保的弹窗）
    forgetPassword(){
      // 每次点击忘记密码 先清空之前imput框内的内容 不然会保留上次的
      this.ruleForm1.user_account = '',
      this.ruleForm1.question = '',
      this.ruleForm1.answer = '',
      this.flag1 = true; // 弹出密保弹窗
      this.dialogFormVisible = true;
    },
    // 输入用户名 失去焦点就触发
    handlerPageNo(){
      // console.log(this.ruleForm1.user_account)
      let api = '/apis/client/checkuseraccount'
      Axios.post(api,{
        user_account: this.ruleForm1.user_account,
      }).then(response => {
        if(response.data.code === 2){
          this.ruleForm1.question = '';
          this.$message.error('对不起，该账号不存在')
        } else if(response.data.code === 3){
          this.ruleForm1.question = '';
          this.$message.error('对不起，您未设置密保，无法进行密码重置')
        } else if(response.data.code === 1){
          this.ruleForm1.question = response.data.question;
        }
        // console.log(response.data.code === 2);
      }).catch(error => {
        console.log(error);
      })
    },
    // 提交密保验证
    submitPassProtect(){
      let api = '/apis/client/submitpassprotect';
      Axios.post(api,{
        user_account: this.ruleForm1.user_account,
        question: this.ruleForm1.question,
        answer: this.ruleForm1.answer
      }).then(response => {
        if (response.data.code === 1){
          this.account = this.ruleForm1.user_account;
          this.flag1 = !this.flag1; // 跳到重置密码弹框
        } else if (response.data.code === 2){
          this.$message.error('对不起，该账号不存在')
        } else if (response.data.code === 3){
          this.$message.error('您输入的答案不正确')
        }
        // console.log(response);
      }).catch(error => {
        console.log(error);
      })
    },
    // 重置密码
    setNewPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let api="/apis/client/forgrtpass"
          Axios.post(api,{
            user_account:this.account,
            password:this.ruleForm2.pass2,
          }).then(response=>{
            console.log(response);
            if ((response.data.code === 1 && response.data.msg === 'success')) {
              this.ruleForm2.pass2 = '';
              this.ruleForm2.checkPass1 = '';
              this.dialogFormVisible = false;
              this.$message({
                message: '重置密码成功！',
                type: 'success'
              });
            } else if (response.data === 2) {
              this.$message.error('该用户不存在');
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      });
    },
  },
  mounted() {
    // 路由跳转时，判断是注册还是登录
    if (this.$route.query.ifreg === "yes") {
      this.activeIndex = "2";
      this.flag = false;
    } else {
      this.activeIndex = "1";
      this.flag = true;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
  .regsiter{
    position:relative;
    height:590px;
    background-image:url('../images/loginbackground.jpg');
    background-repeat:no-repeat;
    background-position:center;
  }
  .regsiter .login{
    position:absolute;
    right:7%;
    top:0;
    bottom:0;
    width:325px;
    height:420px;
    margin:auto;
    padding:0 25px;
    background-color:#fef0f6;
    background-image:url('../images/2wm1.gif');
    background-repeat:no-repeat;
    background-position:right top;
    /* background:#fef0f6 url('../images/2wm1.gif') no-repeat right top/100px 100px; */ /*与前四行效果一样（合并写法) 100px 100px为背景图片的size 合并写时用/隔开*/
  }
  .el-form{
    @{deep} .el-form-item__label{
      width: 81px!important;
    }
  }
  .el-form{
    @{deep} .el-form-item__content{
      margin-left: 90px!important;
      // display: flex;
    }
  }
  .newregieter , .newlogin{
    @{deep} .el-button--primary{
      width: 315px;
      background-color: #ff0036;
      border-color: #ff0036;
      margin-left: -80px;
    }
  }
  .el-form-item__content{
    display: flex;
  }
  .pass-register a{
    color:#6c6c6c;
    margin: 0 10px;
    font-size:12px;
    cursor: pointer;
    float: right;
    text-decoration:none;
  }
  .pass-register a :hover{
    color:#ff4400!important;
  }
  .el-menu.el-menu--horizontal{
    width: 145px;
    margin-bottom: 20px;
  }
  .el-menu-item:hover{
    background-color:#fef0f6!important;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    background-color:#fef0f6!important;
  }

</style>
