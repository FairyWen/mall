<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--立即购买之后填写订单页面-->
  <div class="bigsubmitorder">
    <div class="submitorder">
      <div class="steps">
        <el-steps :active="active" align-center>
          <el-step title="购物车"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="提交成功"></el-step>
        </el-steps>
      </div>
      <div class="checkshopchat">
        <h2 class="chattitle">填写订单</h2>
        <el-select v-model="value" placeholder="选择地址（必选）">    
          <el-option
            v-for="(item) in addressList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-button type="primary" @click="dialogFormVisible = true">新增地址</el-button>
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
        <div class="order-desc">
          <div class="buy-td td-0">宝贝</div>
          <div class="buy-td td-1">规格</div>
          <div class="buy-td td-2">单价</div>
          <div class="buy-td td-3">数量</div>
          <div class="buy-td td-4">积分</div>
          <div class="buy-td td-5">小计</div>
        </div>
        <div class="order-order">
          <div class="order-item">
            <div class="order-itemInfo">
              <div class="info-detail info-cell">
                <div class="info-cell">
                  <a href="javascript:void(0)" class="info-img">
                    <img :src="thisProduct.imgurl" alt="商品图片" class="info-img">
                  </a>
                </div>
                <div class="info-cell info-msg">
                  <a href="javascript:void(0)" class="info-title">{{thisProduct.name}}</a>
                </div>
              </div>
              <div class="info-sku info-cell">
                <p>{{thisProduct.specification}}</p>
              </div>
              <div class="info-price info-cell">{{thisProduct.retailprice}}</div>
            </div>
            <div class="order-quantity">{{thisProduct.amount}}</div>
            <div class="order-integral">{{thisProduct.retailprice*thisProduct.amount}}</div>
            <div class="order-itemPay">
              <span>{{thisProduct.retailprice*thisProduct.amount | fixed(2)}}</span>
            </div>
          </div>
        </div>
        <div class="settlement">
          <div class="float-bar-left">
            <div class="checkbox">
              <el-checkbox v-model="flag">使用积分可优惠：</el-checkbox>
              <p>￥{{discount}}</p>
            </div>
          </div>
          <div class="float-bar-right">
            <div class="price-sum">
              <span class="txt">合计：</span>
              <strong class="price">
                <em>{{total | fixed(2)}}</em>
              </strong>
              <span class="txt1">( 获积分:<em>{{idealistictotal | fixed(0)}}</em> )</span>
            </div>
            <div class="btn-area">
              <a href="javascript:void(0)" class="submit-btn" @click="submitOrder">提交订单</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="../images/foot.png"  width="1210" alt="">
  </div>
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
export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  data () {
    return {
      discount:0, // 使用积分可抵扣多少钱
      thisdiscountintegral:0, // 此单可以使用多少积分
      flag: true, // 是否选择使用积分抵消价格
      checked: 0, // 是否选择使用积分抵消价格(bit类型不方便存,用0/1存数据库)
      id: this.$route.query.id, // 当前商品的id
      amount: this.$route.query.amount, // 当前商品的id
      active: 2,
      thisProduct: {}, //存放立即购买的商品的信息
      value: '', // 当前选的地址框中的内容
      orderDetail: [], // 订单商品列表
      value: '', // 当前选的地址框中的内容
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: { // 新增地址表单
        name: '',
        phone: '',
        detailaddress: '',
      },
      addressList: [], // 获取到当前用户的地址
      selectedOptions: [],//存放选的地址
      options: options,   //存放城市数据
      orderid: null,
    }
  },
  filters: {
    fixed(value,num){  // 过滤器对管道符左侧的数据不操作，只改变在视图中的显示
      return '￥'+value.toFixed(num);
    }
  },
  computed: {
    // 计算购物车不算折扣的时候多少钱
    idealistictotal(){
      return this.thisProduct.retailprice*this.thisProduct.amount;
    },
    // 计算购物车实际总价
    total(){
      if(!this.flag){ // 未选择优惠
        this.checked = 0;
        return this.thisProduct.retailprice*this.thisProduct.amount
      } else { // 选择积分优惠之后
        this.checked = 1;
        return this.thisProduct.retailprice*this.thisProduct.amount-this.discount // -this.discount为pre初始的默认值
      }
    },
  },
  methods: {
    // 获取用户可用积分
    getCanUseIntegral(){
      instance.get('/client/canuseintegral').then(response => {
        // console.log(response);
        this.thisdiscountintegral = response.data.integral; // 能用多少积分
        this.discount = response.data.integral/100; // 该积分可以抵消多少钱
      }).catch(error => {
        console.log(error);
      })
    },
    // 获取当前用户的地址列表
    getAddress(){
      instance.get('/client/addresslist').then(response => {
        let arr = response.data.addressList;
        arr.forEach((value,i) => {
          let tempaddress = [];
          tempaddress.push(value.address)
          tempaddress.push(value.detailaddress)
          let justAddress = tempaddress.join(' ');
          let temporary = [];
          temporary.push(justAddress);
          temporary.push(value.receivephone);
          temporary.push(value.receiveperson);
          let newAddress = temporary.join('——');
          let addressObject = {value: value.id, label: newAddress}
          // this.addressList = [];
          this.addressList.push(addressObject);
          this.addressList.reverse();
        })
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
    // 提交订单
    submitOrder(){
      if(this.value){ // 地址已选的时候
        let arr = this.value.split('——');
        instance.post('/client/submitorder',{
          address: arr[0],
          receiveperson: arr[2],
          receivephone: arr[1],
          productlist: this.orderDetail,
          total: this.total, // 实付
          idealistictotal: this.idealistictotal, // 理想状态下需要付款金额(用于计算积分)
          checked: this.checked, // 提交订单的时候是否使用了折扣
          thisdiscountintegral: this.thisdiscountintegral, //记录此单可兑换优惠的积分(虽然不一定使用)
          // total: this.thisProduct.retailprice*this.thisProduct.amount
        }).then(response => {
          this.orderid = response.data.orderid;
          if(response.data.code === 1 && response.data.msg === 'success'){
            this.$message({
              message: '订单提交成功',
              type: 'success'
            });
            this.$router.push({path:'payment',
              query: {
                orderid: this.orderid
              }
            }); // 带着提交的订单id去付款页面
          }
        }).catch(error => {
          console.log(error)
        })
      }else{
          this.$alert('请先选择收货地址!', '提示', {
          confirmButtonText: '确定'
        });
      }
    },
    getProductDetail() { // 获取立即购买商品的详情
      let api='/apis/client/detail/'+this.id;
      Axios.get(api).then(response => {
        // console.log(response)
        this.thisProduct = response.data.productdetail;
        this.thisProduct.product_id = response.data.productdetail.id;
        this.thisProduct.amount = this.amount;
        this.orderDetail.push(this.thisProduct);
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getAddress();
    this.getProductDetail();
    this.getCanUseIntegral();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
.bigsubmitorder{
  width: 1210px;
  margin: 0 auto;
}
.submitorder{
  padding: 20px 5px;
  width: 1000px;
  margin: 20px auto;
}
.steps{
  margin: 0 auto;
  width: 1000px;
}
.checkshopchat{
  font-size: 12px;
  margin-top: 30px;
}
.chattitle{
  line-height: 25px;
  color: #333;
  font-weight: 700;
  font-size: 14px;
}
.order-desc{
  margin-top: 15px;
  color: #6C6C6C;
}
.buy-td{
  display: inline-block;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-bottom: 3px solid #b2d1ff;
  font-size: 12px;
  vertical-align: bottom;
}
.td-0{
  width: 255px;
}
.td-1, .td-5{
  width: 155px;
}
.td-2, .td-3, .td-4{
  width: 135px;
}
.order-order{
  border-bottom: 1px dotted #80b2ff;
  margin-top: 20px;
}
.order-item{
  // border-bottom: 1px dotted #ddd;
  border-bottom: 2px solid #fff;
  background-color: #fbfcff;
}
.order-itemInfo{
  display: inline-block;
}
.info-detail{
  width: 245px;
  padding: 10px 0 10px 10px;
}
.info-cell{
  display: inline-block;
  margin-right: 1px;
}
.info-msg{
  padding-left: 10px;
  vertical-align: top;
}
.info-img{
  display: block;
  width: 50px;
  height: 50px;
}
a{
  text-decoration: none;
  cursor: pointer;
  color: #666;
}
.info-title{
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.info-sku{
  display: inline-block;
  color: #6c6c6c;
  width: 155px;
  vertical-align: top;
  text-align: center;
  // padding: 10px 0;
}
.info-price{
  display: inline-block;
  color: #6c6c6c;
  width: 135px;
  vertical-align: top;
  padding: 10px 0;
  text-align: center;
}
.order-quantity, .order-integral{
  width: 135px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}
.order-itemPay{
  width: 155px;
  padding: 10px 0;
  text-align: right;
  display: inline-block;
  vertical-align: top;
  span{
    color: #ff0036;
    font-weight: 700;
    padding-right: 10px;
  }
}
.el-select-dropdown__item{
  padding-left: 10px;
}
.el-select{
  width: 50%;
  margin: 20px 20px 20px 0;
}
.el-cascader{
  width: 100%;
}
.settlement{
  position: relative;
  height: 50px;
  margin-top: 20px;
  background-color: #eee
}
.float-bar-left{
  width: 200px;
  height: 50px;
  float: left;
  position:absolute;
  left: 0;
  top: 0;
  z-index: 4;
  padding-left: 20px;
  .checkbox{
    float: left;
    line-height: 50px;
    p{
      display: inline;
      color: #ff0036
    }
  }
}
.float-bar-right{
  width: 415px;
  height: 50px;
  float: right;
  position:absolute;
  right: 0;
  top: 0;
  z-index: 4;
  padding-left: 20px;
  // background-color: #438ECF;
  .price-sum{
    float: left;
    height: 50px;
    width: 290px;
    color: #3c3c3c;
    line-height: 50px;
    .txt{
      float: left;
      padding-left: 10px;
    }
    .txt1{
      float: left;
      padding-left: 10px;
    }
    .price{
      float: left;
      color: #f40;
      font-weight: 700;
      font-size: 18px;
      vertical-align: middle;
      span{
        font-family: verdana
      }
      em{
        font-style: normal;
      }
    }
  }
  .btn-area{
    float: right;
    .submit-btn{
      display: inline-block;
      width: 120px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      background-color: #f40;
      text-align: center;
      font-size: 20px;
      text-decoration:none;
      border-radius: 2px;
      cursor: pointer;
      font-family: 'Lantinghei SC','Microsoft Yahei';
    }
  }
}
</style>
