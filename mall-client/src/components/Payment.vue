<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--提交成功页面-->
  <div class="submitorder">
    <div class="steps">
      <el-steps :active="active" align-center>
        <el-step title="购物车"></el-step>
        <el-step title="填写订单"></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
    </div>
    <div class="submitSuccess">
      <h2 class="chattitle">提交成功</h2>
      <div class="alertsuccess">
        <p class="alert">订单提交成功，请尽快付款！</p>
        <el-button type="primary" @click="toPay()">立即支付</el-button>
      </div>
    </div>
  </div>
  <img src="../images/foot.png"  width="1210" alt="">
  <rightNav></rightNav>
</div>
</template>

<script>
import Axios from 'axios';
import shopHeader from './Header'
import rotary from './Rotary'
import rightNav from './Rightnav'
import { instance } from '../api/index'
import options from '../../static/country-data'
import { setTimeout } from 'timers';
export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  data () {
    return {
      active: 3, // 步骤条位置
      seconds: 0,
      orderid: this.$route.query.orderid
    }
  },
  methods: {
    // 给用户加积分(付款成功之后)
    addAllIntegral(orderid){
      let api = "/apis/client/addallintegral";
      Axios.post(api, {
        order_id: this.orderid,
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    // 支付
    toPay() {
      this.updateLoading = true;
      let api = "/apis/client/topay";
      Axios.post(api, {
        order_id: this.orderid,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.addAllIntegral(this.orderid) // 付款成功之后才去改数据库user的总积分(添加相应积分)
          this.$message({
            message: '付款成功,三秒后将跳转到到我的订单……',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push({ path: '/myorder'});
          },3000)
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
  mounted() {
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
.submitorder{
  padding: 20px 5px;
  width: 1000px;
  margin: 20px auto;
}
.steps{
  margin: 0 auto;
  width: 1000px;
}
.submitSuccess{
  font-size: 12px;
  margin-top: 30px;
}
.chattitle{
  line-height: 25px;
  color: #333;
  font-weight: 700;
  font-size: 14px;
}
.alertsuccess{
  height: 100px;
  padding: 30px;
  border: 1px solid #ccc;
  p{
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    color: #777;
  }
  .smallalert{
    font-size: 16px;
  }
  .red{
    color: red;
  }

}
</style>
