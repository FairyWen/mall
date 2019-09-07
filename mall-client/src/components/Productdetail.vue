<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--商品详情页-->
  <div class="detail">
    <div class="detail-meta">
      <div class="detail-left">
        <div class="detail-img">
          <img :src="this.thisProduct.imgurl" width="420" height="420" alt="图片在此">
        </div>
      </div>
      <div class="detail-right">
        <div class="detail-title">{{this.thisProduct.name}}</div>
        <div class="detail-price">
          <span class="price-left">价格</span>
          <em>￥</em>
          <span class="price-right">{{this.thisProduct.retailprice}}</span>
        </div>
        <ul class="info">
          <li>
            <span class="info-name">已售</span>
            <span class="info-number">{{this.thisProduct.selled}}</span>
          </li>
          <!-- <li>
            <span class="info-name">累计评价</span>
            <span class="info-number">{{this.thisProduct.evaluate}}</span>
          </li> -->
          <li>
            <span class="info-name">送仙女积分</span>
            <span class="info-integral">{{this.thisProduct.retailprice}}</span>
          </li>
        </ul>
        <div class="specification">
          <div class="specification-left">化妆品净含量</div>
          <div class="specification-right">{{this.thisProduct.specification}}</div>
        </div>
        <div class="detail-amount">
          <div class="amount-name">数量</div>
          <el-input-number size="small" v-model="num" :min="1" :max="20" label="描述文字"></el-input-number>
          <div class="amount-remain">
            <span>库存</span>
            <span>{{this.thisProduct.remainingamount}}</span>
            <span>件</span>
          </div>
        </div>
        <div class="dec">
          <div class="dec-left">简述</div>
          <div class="dec-right">{{this.thisProduct.desc}}</div>
        </div>
        <div class="detail-action">
          <div class="left-button" @click="toBuyImmediate">
            <a href="javascript:void(0)">立即购买</a>
          </div>
          <div class="right-button" @click="addToShopChat">
            <a href="javascript:void(0)">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--评论等-->
  <div class="moredetail">
    <div class="detailcontent">
      <p>商品详情</p>
      <div class="alert">
        <b>消费提醒：</b>
        <span>国家药监局提示您：请正确认识化妆品功效，化妆品不能替代药品，不能治疗皮肤病等疾病。</span>
      </div>
      <img :src="this.thisProduct.imgurl" width="900" height="900" alt="图片在此">
    </div>
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
export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  data () {
    return {
      num: 1, // 商品购买数量
      id: this.$route.query.id, // 当前商品的id
      thisProduct: {}, // 当前商品详情数据
    }
  },
  methods: {
    buyImmediately() { // 提交订单 立即购买
      this.$router.push({path:'/buyimmediately'})
    },
    getProductDetail() { // 获取商品详情
      let api='/apis/client/detail/'+this.id;
      Axios.get(api).then(response => {
        this.thisProduct = response.data.productdetail;
      }).catch(error => {
        console.log(error)
      })
    },
    toBuyImmediate(){ // 立即购买
      this.$router.push({
        path: '/buyimmediately',
        query: {
          id: this.thisProduct.id,
          amount: this.num, // 购买数量
        }
      })
    },
    addToShopChat(){ // 添加到购物车
      let api = "/client/addshopchat";
      instance.post(api,{
        headers: {
          "Content-Type": "application/json"
        },
        id: this.thisProduct.id,
        name: this.thisProduct.name,
        specification: this.thisProduct.specification,
        remainingamount: this.thisProduct.remainingamount,
        retailprice: this.thisProduct.retailprice,
        desc: this.thisProduct.desc,
        ifdelete: this.thisProduct.ifdelete,
        num: this.thisProduct.num,
        imgurl: this.thisProduct.imgurl,
        selled: this.thisProduct.selled,
        classification: this.thisProduct.classification,
        amount: this.num, // 购买数量
      }).then(response => {
        if(response.data.code === 1 || response.data.code === 2){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        }else if (response.data.code === 0 || response.data.msg === "fail"){
          this.$message.error('添加失败');
        }else if(response.data.code === 3 || response.data.msg === "notLogin"){
          this.$message.error('您还未登录，请先登录！');
          this.$router.push({ path: '/login' });
        };
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getProductDetail()
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.detail{
  padding: 20px 5px;
  width: 1190px;
  margin: 20px auto;
}
.detail-meta{
  position: relative;
  width: 990px;
  overflow: hidden;
}
.detail-left{
  float: left;
  width: 420px;
  margin-right: 20px;
}
.detail-right{
  float: left;
  width: 540px;
}
.detail-img{
  width: 420px;
  height: 420px;
  padding-bottom: 20px;
}
.detail-title{
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 16px;
}
.detail-price{
  background-image: url('../images/pricelogo.png');
  height: 50px;
  line-height: 40px;
  padding: 5px;
}
.price-left{
  color: #999;
  font-size: 12px;
  margin-right: 10px;
  vertical-align: middle;
}
.detail-price em{
  color: #FF0036;
  font-size: 18px;
  font-style: normal;
  margin-left: 20px;
  vertical-align: middle;
}
.price-right{
  color: #FF0036;
  font-size: 24px;
  font-weight: bolder;
  margin-right: 10px;
  vertical-align: middle;
}
.info{
  position: relative;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border: 1px dotted #c9c9c9;
  border-width: 1px 0;
}
.info li{
  list-style-type: none;
  width: 50%;
  text-align: center;
  border-left: 1px solid #eee;
}
.info-name{
  color: #999;
  font-size: 12px
}
.info-number{
  color: #FF0036;
  font-size: 12px;
  font-weight: 700;
  margin-left: 3px;
}
.info-integral{
  color: #280;
  font-size: 12px;
  font-weight: 700;
  margin-left: 3px;
}
.specification, .dec{
  height: 35px;
  line-height: 35px;
  padding: 5px;
  // background-color: #280
}
.specification-left{
  float: left;
  width: 80px;
  color: #838383;
  font-size: 12px;
}
.specification-right{
  float: left;
  width: 80px;
  height: 30px;
  line-height: 30px;
  // border: 1px solid #DCDFE6;
  margin-left: 5px;
  font-size: 12px;
  text-align: center;
}
.dec-left, .dec-right{
  float: left;
  color: #838383;
  font-size: 12px;
}
.dec-left{
  width: 80px;
}
.dec-right{
  margin-left: 5px;
}
.detail-amount{
  height: 40px;
  line-height: 40px;
  padding: 5px;
}
.amount-name, .amount-remain{
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #838383;
  font-size: 12px;
}
 .amount-remain{
  margin-left: 4em
 }
 .left-button, .right-button{
  float: left;
  width: 180px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
 }
 .right-button{
   cursor: pointer;
  background-color: #ff0036;
 }
 .left-button{
   cursor: pointer;
   border: 1px solid #FF0036;
   background-color: #ffeded;

 }
 .left-button a, .right-button a{
   color: #fff;
   text-decoration: none;
 }
  .left-button a{
    color: #FF0036
  }
 .detail-action{
  height: 40px;
  line-height: 40px;
  padding: 5px 5px 5px 90px;
  margin-top: 10px;
 }
 .moredetail{
  padding: 20px 5px;
  width: 1190px;
  border-top: 2px solid #999;
  margin: 0 auto;
  p{
    font-weight:bold;
  }
 }
 .alert{
   height: 40px;
   line-height: 40px;
   color: #7F1911;
   background-color: #FFF8F5;
   font-size: 12px;
   margin-bottom: 30px;
 }
 .detailcontent{
  width: 900px;
  margin: 0 auto;
 }
</style>
