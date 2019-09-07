


<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--我的订单-->
  <div class="personalcenter">
  <el-tabs :tab-position="tabPosition" style="height: 100vh;">
    <el-tab-pane label="我的资料">
      <div class="mymsg">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>我的资料</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="mymessage">
          <div class="top">
            <p>您的基本信息</p>
            <ul class="msg">
              <li>
                <span class="sp1">会员名</span>
                <span>{{this.userinfo.user_account}}</span>
              </li>
              <li>
                <span class="sp2">会员等级</span>
                <span><em>{{this.userinfo.vip}}</em></span>
              </li>
              <li>
                <span class="sp2">可兑现积分</span>
                <span>{{this.userinfo.integral}}</span>
              </li>
            </ul>
            <ul class="msg">
              <li>
                <span class="sp1">手机号</span>
                <span>{{this.userinfo.phone | formatPhone}}</span>
              </li>
              <li>
                <span class="sp2">会员总积分</span>
                <span>{{this.userinfo.all_integral}}</span>
              </li>
              <li>
                <span class="sp2">可兑现金额</span>
                <span>￥{{this.userinfo.money}}</span>
              </li>
            </ul>
            <!-- <ul class="msg">
              <li>
                <span class="sp4"><a href="javascript:void(0)" >修改</a></span>
              </li>
            </ul>             -->
          </div>
          <div class="bottom">
            <p>您的安全服务</p>
            <ul class="security">
              <li class="li1">
                <span class="sp5">登录密码</span>
                <span class="sp6">安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个长度超过6位以上的密码。</span>
                <span class="sp4"><a href="javascript:void(0)" @click="updatepassword" >修改</a></span>
              </li>
              <li>
                <span class="sp5">密保问题</span>
                <span class="sp6">是您找回登录密码的方式之一。建议您设置一个容易记住，且最不容易被他人获取的问题及答案，更有效保障您的密码安全。</span>
                <span class="sp4"><a href="javascript:void(0)" @click="passprotect">设置</a></span>
              </li>
            </ul>
            <!--修改密码-->
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible2">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldpass">
                  <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>        
            <!--密保设置-->
            <el-dialog title="设置密保" :visible.sync="dialogFormVisible3">
              <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密保问题">
                  <el-select v-model="value" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="密保答案">
                  <el-input v-model="ruleForm1.answer" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitPassProtect('ruleForm1')">提交</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </el-dialog>        
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="地址管理">
      <div class="mymsg">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>地址管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="abbbutton">
          <el-button type="primary" @click="dialogFormVisible = true">新增地址</el-button>
        </div>
        <!--添加地址-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="收货人地址" :label-width="formLabelWidth">
              <el-cascader
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                v-model="selectedOptions"
                :separator="' '">
              </el-cascader>
            </el-form-item>
            <el-form-item label="具体地址" :label-width="formLabelWidth">
              <el-input v-model="form.detailaddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收货人手机" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAddress">确 定</el-button>
          </div>
        </el-dialog>
        <div class="myaddress">
          <div class="address-desc">
            <div class="buy-td td-0">收货人</div>
            <div class="buy-td td-1">所在地区</div>
            <div class="buy-td td-2">详细地址</div>
            <div class="buy-td td-3">电话/手机</div>
            <div class="buy-td td-4">交易操作</div>
          </div>
          <div class="address-address">
            <div class="address-item" v-for="(item,index) in addressList" :key="index">
              <div class="info-sku td-0">
                <p>{{item.receiveperson}}</p>
              </div>
              <div class="info-sku td-1">
                <p>{{item.address}}</p>
              </div>
              <div class="info-sku td-2">
                <p>{{item.detailaddress}}</p>
              </div>
              <div class="info-sku td-3">
                <p>{{item.receivephone}}</p>
              </div>
              <div class="address-action td-4">
                <el-link type="primary" @click="openUpdateAddress(index)">修改</el-link>
                <el-link type="danger" @click="deleteAddress(item.id)">删除</el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  <img src="../images/foot.png"  width="1210" alt="">
  </div>
  <!--修改地址-->
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible1">
    <el-form :model="form1">
      <el-form-item label="收货人地址" :label-width="formLabelWidth">
        <el-cascader
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          v-model="form1.address"
          :separator="' '">
        </el-cascader>
      </el-form-item>
      <el-form-item label="具体地址" :label-width="formLabelWidth">
        <el-input v-model="form1.detailaddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人姓名" :label-width="formLabelWidth">
        <el-input v-model="form1.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人手机" :label-width="formLabelWidth">
        <el-input v-model="form1.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="updateAddress">确 定</el-button>
    </div>
  </el-dialog>
  <rightNav></rightNav>
</div>
</template>

<script>
import Axios from 'axios';
import { instance } from '../api/index'
import shopHeader from './Header'
import rotary from './Rotary'
import rightNav from './Rightnav'
import options from '../../static/country-data'

export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  data () {
    let validatePass1 = (rule, value, callback) => { // 旧密码验证
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => { // 新密码验证
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => { // 确认新密码
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userinfo: {}, // 用户信息
      tabPosition: 'left',
      addressList: [], // 地址列表
      dialogFormVisible: false, // 添加地址的框框
      dialogFormVisible1: false, //修改地址的框框
      dialogFormVisible2: false, //修改密码的框框
      dialogFormVisible3: false, //设置密保的框框
      formLabelWidth: '120px',
      selectedOptions: [],//存放选的地址(添加)
      selectedOptions1: [],//存放选的地址(修改)
      options: options,   //存放城市数据
      index: 0, //记录当前需要修改的某条地址的index
      form: { // 新增地址表单
        name: '',
        phone: '',
        detailaddress: '',
      },
      form1: { // 修改地址表单
        id: 0,
        name: '',
        phone: '',
        address: [],
        detailaddress: '',
      },
      ruleForm: { // 修改密码表单
        oldpass: '',
        pass: '',
        checkPass: '',
      },
      ruleForm1: { // 设置密保的表单
        // question: '',
        answer: '',
      },
      value: '', // 下拉框选中的选项
      options1: [{
        value: '选项1',
        label: '您祖母叫什么名字？'
      }, {
        value: '选项2',
        label: '您祖父叫什么名字？'
      }, {
        value: '选项3',
        label: '您的生日是什么时候？（例如：1980/01/01）'
      }, {
        value: '选项4',
        label: '您母亲的名字？'
      }, {
        value: '选项5',
        label: '您父亲的名字？'
      }, {
        value: '选项6',
        label: '您的宠物叫什么名字'
      }, {
        value: '选项7',
        label: '您的车牌号是什么？'
      }, {
        value: '选项8',
        label: '您的小学叫什么名字？'
      }, {
        value: '选项9',
        label: '您最喜欢的颜色？'
      }, {
        value: '选项10',
        label: '您最尊敬的老师叫什么名字？'
      }, {
        value: '选项5',
        label: '谁是您儿时最好的伙伴？'
      }],
      rules: { // 修改密码校验规则
        oldpass: [
          { validator: validatePass, trigger: 'blur' } // 旧密码
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }, // 新密码
          { min: 6, message: '至少长度为6个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' } // 确认新密码
        ]
      }
    }
  },
  filters: {
    formatPhone(value){  // 过滤器对管道符左侧的数据不操作，只改变在视图中的显示
      return value.substring(0,3) + '****' + value.substring(value.length-4)
    }
  },
  methods: {
    // 打开修改密码的框框
    updatepassword(){
      this.dialogFormVisible2 = true;
    },
    // 打开设置密保的框框
    passprotect(){
      this.dialogFormVisible3 = true;
    },
    // 提交修改密码表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          instance.post("/client/updatepassword", {
            oldpassword: this.ruleForm.oldpass,
            password: this.ruleForm.pass,
          }).then(response => {
            if (response.data.code === 1 && response.data.msg === "success") {
              this.ruleForm.oldpass = '';
              this.ruleForm.pass = '';
              this.ruleForm.checkPass = '';
              this.$message({
                message: '密码修改成功',
                type: 'success'
              });
              this.dialogFormVisible2 = false;
            } else if (response.data.code === 2 && response.data.msg === "oldpassError") {
              this.$message.error('旧密码错误，无法修改');
            }
          }).catch(error => {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置密码
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交密保问题表单
    submitPassProtect(){
      instance.post("/client/passprotect", {
        question: this.value,
        answer: this.ruleForm1.answer,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.$message({
            message: '设置密保成功',
            type: 'success'
          });
          this.value = '';
          this.ruleForm1.answer = '';
          this.dialogFormVisible3 = false;
        } else if (response.data.code === 2) {
          this.$message.error('密保设置失败，请重试');
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 获取当前用户的地址列表
    getAddress(){
      instance.get('/client/addresslist').then(response => {
        this.addressList = response.data.addressList;
      })
    },
    // 获取当前用户的信息
    getUserInfo(){
      instance.get('/client/getuserinfo').then(response => {
        this.userinfo = response.data;
      })
    },
    // 新增地址
    addAddress(){
      let arr=this.selectedOptions;
      let str=arr.join(' ')
      instance.post('/client/addaddress',{
        address: str,
        detailaddress: this.form.detailaddress,
        receiveperson: this.form.name,
        receivephone: this.form.phone,
      }).then(response => {
        if(response.data.code === 1 && response.data.msg === 'success'){
          this.$message({
            message: '新增地址成功',
            type: 'success'
          });
          this.getAddress();
          this.dialogFormVisible = false // 添加成功之后让对话框消失
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 打开修改地址的框框
    openUpdateAddress(index){
      let address = this.addressList[index].address.split(' '); // 将字符串转化为数组
      this.form1.id = this.addressList[index].id;
      this.form1.name = this.addressList[index].receiveperson;
      this.form1.phone = this.addressList[index].receivephone;
      this.form1.address = address;
      this.form1.detailaddress = this.addressList[index].detailaddress;
      this.index = index;
      this.dialogFormVisible1 = true;
    },
    // 提交修改地址
    updateAddress(){
      let arr=this.form1.address;
      let str=arr.join(' ')
      instance.post("/client/updateaddress", {
        id: this.form1.id,
        receiveperson: this.form1.name,
        receivephone: this.form1.phone,
        address: str,
        detailaddress: this.form1.detailaddress,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogFormVisible1 = false;
          this.getAddress();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    // 删除地址
    deleteAddress(id){
      instance.post("/client/deleteaddress", {
        id: id
      }).then(response => {
        console.log(response);
        if (response.data.code === 1 && response.data.msg === "success") {
          this.getAddress();
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  created() {
    this.getAddress();
    this.getUserInfo();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
.personalcenter{
  padding: 20px 5px;
  width: 1210px;
  height: 70vh;
  position: relative;
  margin: 0 auto;
}
// 怎么还调不了啊啊啊啊啊
// .el-tabs--left .el-tabs__nav-wrap.is-left{
//   @{deep} .el-tabs__item{
//     padding: 0 52px!important;
//   }
// }
.mymsg{
  width: 950px;
  margin: 20px auto;
}
.msg{
  float: left;
}
.mymessage{
  height: 350px;
  margin-top: 30px;
  padding: 10px;
  border:1px solid #c4d5e0
}
.myaddress{
  overflow-y: auto;
  margin-top: 10px;
  height: 350px;
  padding: 10px;
  border:1px solid #c4d5e0
}
.mymessage p{
  font-size: 14px;
  font-weight: bold;
}
.mymessage li{
  list-style-type: none;
}
.mymessage li span{
  display: inline-block;
  font-size: 12px;
  padding: 10px;
}
.sp4, .sp5{
  width: 100px;
}
.sp6{
  width: 400px;
  color: #777;
}
.security a, .msg a{
  font-size: 12px;
  color: #409EFF;
  text-decoration:none;
  font-weight: bold;
}
.security a:hover{
  color: #f40;
}
.security ul{
  line-height: 40px;
}
.security .li1{
  height: 60px;
  border-bottom: 1px dashed #e1e1e1
}
.security span{
  vertical-align: top;
}
.top{
  height: 170px;
  border-bottom: 1px solid #c4d5e0
}
.address-desc{
  color: #6C6C6C;
}
.buy-td{
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
  vertical-align: bottom;
  background-color: #f5f5f5;
}
.td-0{
  width: 120px;
}
.td-1{
  width: 240px;
}
.td-2{
  width: 210px;
}
.td-3, .td-4{
  width: 160px;
}
.td-5{
  width: 165px;
}
.address-address{
  border: 1px solid #ccc;
  margin-top: 20px;
}
.address-item{
  border-bottom: 1px solid #eee;
  font-size: 12px;
}
.info-sku{
  display: inline-block;
  color: #6c6c6c;
  vertical-align: top;
  margin-right: 1px;
  text-align: center;
}
.address-action{
  width: 140px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
.addaddress{
  width: 100px;
  height: 60px;
}
.el-cascader{
  width: 100%;
}
.el-breadcrumb{
  margin-bottom: 10px;
}
.abbbutton{
  text-align: right;
}
.el-select{
  width: 100%
}
.el-link.el-link--danger{
  margin-left: 10px;
}
</style>
