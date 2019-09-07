<template>
<div class="rotatry">
  <!--轮播图-->
  <el-carousel indicator-position="outside">
    <el-carousel-item  v-for="(item, index) in rotary" :key="index">
      <img :src="item.img" height="400" alt="">
    </el-carousel-item>
  </el-carousel>
  <!--商品分类-->
  <ul class="classification">
    <li>商品分类</li>
    <li><a href="#lipstick">口红/唇膏/唇釉</a></li> <!--类型 数据库字段为1-->
    <li><a href="#foundation">粉底液/气垫/隔离</a></li> <!--类型 数据库字段为2-->
    <li><a href="#eyeshadow">眉笔/眉粉/眼线笔/眼影</a></li> <!--类型 数据库字段为3-->
    <li><a href="#essence">柔肤水/乳/精华</a></li> <!--类型 数据库字段为4-->
    <li><a href="#facecream">面霜/早晚霜</a></li> <!--类型 数据库字段为5-->
    <li><a href="#eyecream">眼精华/眼霜</a></li> <!--类型 数据库字段为6-->
    <li><a href="#loosepowder">粉饼/散粉/腮红</a></li> <!--类型 数据库字段为7-->
    <li><a href="#sunscreencream">防晒霜/防晒喷雾</a></li> <!--类型 数据库字段为8-->
  </ul>
  <div class="everyclass" name="lipstick" id="lipstick">
    <h3>口红/唇膏/唇釉</h3>
    <div class="everypro" v-for="(item,index) in lipstick" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
            加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="foundation" id="foundation">
    <h3>粉底液/气垫/隔离</h3>
    <div class="everypro" v-for="(item,index) in foundation" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="eyeshadow" id="eyeshadow">
    <h3>眉笔/眉粉/眼线笔/眼影</h3>
    <div class="everypro" v-for="(item,index) in eyeshadow" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="essence" id="essence">
    <h3>柔肤水/乳/精华</h3>
    <div class="everypro" v-for="(item,index) in essence" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="facecream" id="facecream">
    <h3>面霜/早晚霜</h3>
    <div class="everypro" v-for="(item,index) in facecream" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="eyecream" id="eyecream">
    <h3>眼精华/眼霜</h3>
    <div class="everypro" v-for="(item,index) in eyecream" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="loosepowder" id="loosepowder">
    <h3>粉饼/散粉/腮红</h3>
    <div class="everypro" v-for="(item,index) in loosepowder" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="everyclass" name="sunscreencream" id="sunscreencream">
    <h3>防晒霜/防晒喷雾</h3>
    <div class="everypro" v-for="(item,index) in sunscreencream" :key="index">
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
          <a href="javascript:void(0)" title="" @click="productDetail">{{item.name}}</a>
        </p>
        <div class="productStatus">
          <span>
            <em>{{item.selled}}</em>
            人已种草
          </span>
          <div class="right">
              加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
  <img src="../images/foot.png"  width="1210" alt="">
</div>
</template>

<script>
import Axios from 'axios';
const axios = require("axios");
export default {
  data () {
    return {
      lipstick: [],
      foundation: [],
      eyeshadow: [],
      essence: [],
      facecream: [],
      eyecream: [],
      loosepowder: [],
      sunscreencream: [],
      rotary: [
        {
          img:'//gdp.alicdn.com/imgextra/i3/2360209412/O1CN01N3ozGY2JOkJyBKmxK_!!2360209412.jpg'
        },{
          img:'//gdp.alicdn.com/imgextra/i2/2360209412/O1CN01zeHD4O2JOkJHV81J3_!!2360209412.jpg'
        },{
          img:'//gdp.alicdn.com/imgextra/i1/2360209412/O1CN019qpg892JOkK6NRy2d_!!2360209412.jpg'
        },{
          img:'//gdp.alicdn.com/imgextra/i4/2360209412/O1CN01to0NC52JOkJc3Eoda_!!2360209412.jpg'
        }
      ]
    }
  },
  methods: {
    productDetail(id){
      this.$router.push({
        path: '/productdetail',
        query: {id: id}
      })
    },
    getlipstick(){
      Axios.get('/apis/client/getlipstick').then(response => {
        this.lipstick = response.data.lipstickList;
      })
    },
    getfoundation(){
      Axios.get('/apis/client/getfoundation').then(response => {
        this.foundation = response.data.foundationList;
      })
    },
    getessence(){
      Axios.get('/apis/client/getessence').then(response => {
        this.essence = response.data.essenceList;
      })
    },
    geteyeshadow(){
      Axios.get('/apis/client/geteyeshadow').then(response => {
        this.eyeshadow = response.data.eyeshadowList;
      })
    },
    getfacecream(){
      Axios.get('/apis/client/getfacecream').then(response => {
        this.facecream = response.data.facecreamList;
      })
    },
    geteyecream(){
      Axios.get('/apis/client/geteyecream').then(response => {
        this.eyecream = response.data.eyecreamList;
      })
    },
    getloosepowder(){
      Axios.get('/apis/client/getloosepowder').then(response => {
        this.loosepowder = response.data.loosepowderList;
      })
    },
    getsunscreencream(){
      Axios.get('/apis/client/getsunscreencream').then(response => {
        this.sunscreencream = response.data.sunscreencreamList;
      })
    },
  },
  mounted() {
    this.getlipstick();
    this.getfoundation();
    this.getessence();
    this.geteyeshadow();
    this.getfacecream();
    this.geteyecream();
    this.getloosepowder();
    this.getsunscreencream();
  }
}
</script>

<style  scoped lang="less">
.rotatry{
  position: relative;
  width: 1210px;
  margin: 0 auto;
}
.classification{
  margin: 0;
  padding: 0;
  position: absolute;
  width: 200px;
  height: 300px;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.55);
  text-indent: 15px;
}
.classification li:first-child{
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 16px;
  background-color: #FF0036;
  color: #fff;
  list-style-type: none;
}
.classification li:not(:first-child){
  display: block;
  list-style-type: none;
  height: 31px;
  width: 200px;
  line-height: 31px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.classification li:not(:first-child):hover{
  background-color: #fff;
  font-weight: bold;
}
.rotatry > ul > li:hover a{
  color: #e54077
}
.classification li a{
  text-decoration: none;
  color: #fff;
}
.rotatry > ul > li > a:hover{
  color: #e54077;
  text-decoration: underline;
}
.everyclass{
  margin-bottom: 30px;
  height: 65vh;
}
.everyclass h3{
  color: #777;
  border-bottom: 2px solid #777;
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