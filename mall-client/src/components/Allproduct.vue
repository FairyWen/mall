<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--所有商品页-->
  <div class="allpro">
    <div class="everypro" v-for="(item,index) in allProductList" :key="index">
      <div class="product-iWap">
        <div class="productImg" @click="productDetail(item.id)">
          <img :src="item.imgurl" width="210" height="210" alt="无法显示">
        </div>
        <p class="productPrice">
          <a class="tag">
            <img src="http://tmallfans.cn-hangzhou.oss-pub.aliyun-inc.com/pifu/files/110363/20180912020647.png" alt="">
          </a>
          <em title="420.00">
            <b>￥</b>
            {{item.retailprice}}
          </em>
        </p>
        <p class="productTitle">
          <a href="javascript:void(0)" title="" @click="productDetail(item.id)">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <!-- <div class="left"> -->
            <span>
              <em>{{item.selled}}</em>
              人已种草
            </span>
          <!-- </div> -->
          <div class="right" @click="addToShopChat(index)">
              加入购物车
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
const axios = require("axios");
import shopHeader from './Header'
import rightNav from './Rightnav'
import rotary from './Rotary'
import { instance } from '../api/index'
export default {
  components: {
    shopHeader,
    rotary,
    rightNav,
  },
  data(){
    return{
      allProductList:[]
    }
  },
  methods: {
    addToShopChat(index){ // 添加到购物车
      // console.log(index);
      let api = "/client/addshopchat";
      instance.post(api,{
        headers: {
          "Content-Type": "application/json"
        },
        id: this.allProductList[index].id,
        name: this.allProductList[index].name,
        specification: this.allProductList[index].specification,
        remainingamount: this.allProductList[index].remainingamount,
        retailprice: this.allProductList[index].retailprice,
        desc: this.allProductList[index].desc,
        ifdelete: this.allProductList[index].ifdelete,
        num: this.allProductList[index].num,
        imgurl: this.allProductList[index].imgurl,
        selled: this.allProductList[index].selled,
        classification: this.allProductList[index].classification,
        amount: 1, // 购买数量
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
    productDetail(id){
      this.$router.push({
        path: '/productdetail',
        query: {
          id: id
        }
      })
    },
    getAllProductList(){
      Axios.get('/apis/productlist').then(response => {
        // console.log(response.data.productList);
        this.allProductList = response.data.productList;
      })
    }
  },
  mounted() {
    this.getAllProductList();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.allpro{
  padding: 20px 5px;
  width: 1210px;
  // height: 100vh;
  margin: 0 auto;
}
.everypro{
  position: relative;
  width: 220px;
  height: 333px;
  margin: 0 20px 20px 0;
  float: left;
  border: 1px solid #eee;
}
.product-iWap{
  width: 210px;
  min-height: 98%;
  padding: 4px 4px 0;
  font-size: 12px;
  // border-radius:5px;
}
.product-iWap:hover{
  border: 1px solid red;
}
.productImg{
  position: relative;
  width: 100%;
  height: 210px;
  margin: 0 0 5px;
  cursor: pointer;
}
.productPrice{
  color: #ff0036;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin: 0 0 5px;
  overflow: inherit!important;
  white-space: nowrap;
}
.productPrice .tag, .productPrice i{
  position: relative;
  top: 0;
  right: 0;
  float: right;
  width: 30px;
  height: 30px;
  background-position: center 0;
  margin-right: -6px;
}
.productPrice em{
  float: left;
  font-family: arial;
  font-weight: 400;
  font-size: 20px;
  font-style:normal;
  color: #ff0036;
}
.productPrice em b{
  margin-right: 2px;
  font-weight: 700;
  font-size: 14px;
  vertical-align:middle
}
.productTitle{
  display: block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #666;
  height: 14px;
  line-height: 12px;
  margin-bottom: 3px;
}
.productTitle a{
  color: #333;
  text-decoration: none;
}
.productTitle a:visited{
  color: #551A8B!important;
}
.productTitle a:hover{
  color:#ff0036!important;
  text-decoration:underline;
}
.productStatus{
  position: relative;
  height: 32px;
  line-height: 32px;
  color: #999;
  border-top: 1px solid #eee;
  margin-bottom: 0;
}
.productStatus span{
  // float: left;
  // display: inline-block;
  white-space:nowrap;
  width: 50%;
  padding: 10px 1px;
  margin-right: 6px;
  line-height: 12px;
}
.productStatus em{
  color: #b57c5b;
  margin-top:-8px;
  font-family: arial;
  font-size: 12px;
  font-weight: 700;
  font-style:normal;
}
.right{
  display: inline-block;
  width: 100px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  font-size: 14px;
  background-color: #ff0036;
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  margin-left: 20px;
}
</style>
