<template>
<!--待支付订单-->
  <div id="allorder">
    <div class="order-desc">
      <div class="buy-td td-0">订单编号</div>
      <div class="buy-td td-1">下单时间</div>
      <div class="buy-td td-2">收货人</div>
      <div class="buy-td td-3">总金额</div>
      <div class="buy-td td-4">交易状态</div>
      <div class="buy-td td-5">交易操作</div>
    </div>
      <div class="order-order">
        <div class="order-item" v-for="(item,index) in waitPayList" :key="index">
          <div class="info-sku td-0">
            <p>{{item.id}}</p>
          </div>
          <div class="info-sku td-1">
            <p>{{item.createtime}}</p>
          </div>
          <div class="info-sku td-2">
            <p>{{item.receiveperson}}</p>
          </div>
          <div class="info-price td-3">
            <em>￥</em>
            {{item.total}}
          </div>
          <div class="order-itemPay td-4">
            <span>{{item.state2}}</span>
          </div>
          <div class="order-action td-5">
            <el-link type="primary" @click="toPay(item.id)">{{item.action}}</el-link>
            <el-link type="success" @click="seeOrderDetail(item.id)">查看详情</el-link>
          </div>
        </div>
      </div>
      <!--详情-->
      <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
        <p>订单Id：{{thisdetail.order_id}}</p>
        <p>总价：<span class="deleteprice">￥{{thisdetail.all_price}}</span> <span class="realpay">￥{{thisdetail.total}}</span></p>
        <p>订单状态：{{thisdetail.state}}</p>
        <p>下单账号：{{thisdetail.account}}</p>
        <p>收货人姓名：{{thisdetail.receiveperson}}</p>
        <p>收货人电话：{{thisdetail.receivephone}}</p>
        <p>收货地址：{{thisdetail.address}}</p>
        <p>创建时间：{{thisdetail.createtime}}</p>
        <p><b>商品详情：</b></p>
        <el-table :data="thisdetail.aboutThisOrder">
          <el-table-column property="name" label="商品名" width="150"></el-table-column>
          <el-table-column property="retailprice" label="单价" width="200"></el-table-column>
          <el-table-column property="product_number" label="数量"></el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios';
import { instance } from '../api/index'
export default {
  data () {
    return {
      waitPayList: [], // 待支付订单
      dialogTableVisible: false,
      thisdetail: { // 详情
        account: '',
        address: '',
        all_price: 0,
        total:0,
        createtime:'',
        order_id: 0,
        receiveperson: '',
        receivephone: '',
        reminder: 0,
        state: '',
        aboutThisOrder: [],
      },
    }
  },
  methods: {
    // 获取待支付订单列表
    getWaitPayList(){
      instance.get('/client/waitpaylist').then(response => {
        this.waitPayList = response.data;
      })
    },
    // 查看订单详情
    seeOrderDetail(id){
      // console.log(id);
      // this.updateLoading = true;
      let api = "/apis/client/seeorderdetail";
      Axios.post(api, {
        id: id,
      }).then(response => {
        this.thisdetail.account = response.data.account;
        this.thisdetail.address = response.data.address;
        this.thisdetail.all_price = response.data.all_price;
        this.thisdetail.total = response.data.total;
        this.thisdetail.createtime = response.data.createtime;
        this.thisdetail.order_id = response.data.order_id;
        this.thisdetail.receiveperson = response.data.receiveperson;
        this.thisdetail.receivephone = response.data.receivephone;
        this.thisdetail.reminder = response.data.reminder;
        this.thisdetail.state = response.data.state;
        this.thisdetail.aboutThisOrder = response.data.aboutThisOrder;
        // console.log(this.thisdetail);
        this.dialogTableVisible = true
      }).catch(error => {
        console.log(error);
      });
    },
    // 给用户加积分(付款成功之后)
    addAllIntegral(orderid){
      let api = "/apis/client/addallintegral";
      Axios.post(api, {
        order_id: orderid,
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    // 去付款
    toPay(id){
      this.updateLoading = true;
      let api = "/apis/client/topay";
      Axios.post(api, {
        order_id: id,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.getWaitPayList();
          this.addAllIntegral(id) // 付款成功之后才去改数据库user的总积分(添加相应积分)
          this.$message({
            message: '付款成功',
            type: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    }
    
  },
  mounted () {
    this.getWaitPayList();
  }
}
</script>

<style scoped lang="less">
#allorder{
  padding: 20px 5px;
  width: 950px;
  margin-left: 10px;
}
.order-desc{
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
  width: 230px;
}
.td-5{
  width: 165px;
}
.td-2, .td-3, .td-4{
  width: 130px;
}
.order-order{
  border: 1px solid #ccc;
  margin-top: 20px;
}
.order-item{
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
.info-price{
  display: inline-block;
  color: #3c3c3c;
  font-family: Verdana,Tahoma,arial;
  width: 135px;
  vertical-align: top;
  padding: 10px 0;
  text-align: center;
  em{
    font-style: normal;
  }
}
.order-itemPay{
  width: 135px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  span{
    padding-right: 10px;
  }
}
.order-action{
  width: 140px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
.deleteprice{
  text-decoration: line-through;
}
.realpay{
  color: #ff0036
}
</style>