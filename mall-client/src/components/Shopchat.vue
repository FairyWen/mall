<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--购物车页面-->
  <div class="shopcart">
  <div class="shopchat">
    <div class="steps">
      <el-steps :active="active" align-center>
        <el-step title="购物车"></el-step>
        <el-step title="填写订单"></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
    </div>
    <div class="checkshopchat">
      <h2 class="chattitle">购物车</h2>
      <div class="order-desc">
        <!-- <input type="checkbox"> -->
        <div class="buy-td td-0">宝贝</div>
        <div class="buy-td td-1">规格</div>
        <div class="buy-td td-2">单价</div>
        <div class="buy-td td-3">数量</div>
        <div class="buy-td td-4">金额</div>
        <div class="buy-td td-5">操作</div>
      </div>
      <div class="order-order">
        <div class="order-item" v-for="(item,index) in shopChatList" :key="index">
          <div class="order-itemInfo">
            <div class="info-detail info-cell">
              <div class="info-cell">
                <a href="javascript:void(0)" class="info-img">
                  <img :src="item.imgurl" alt="商品图片" class="info-img">
                </a>
              </div>
              <div class="info-cell info-msg">
                <a href="javascript:void(0)" class="info-title">{{item.name}}</a>
              </div>
            </div>
            <div class="info-sku info-cell">
              <p>{{item.specification}}</p>
            </div>
            <div class="info-price info-cell"><em>￥</em>{{item.retailprice}}</div>
          </div>
          <div class="order-quantity">
            <el-input-number v-model="item.amount" @change="handleChange(index,item.id)" :min="1" :max="20" size="mini" label="描述文字"></el-input-number>
          </div>
          <div class="order-itemPay">
            <span>{{item.retailprice*item.amount | fixed(2)}}</span>
          </div>
          <div class="order-action">
            <a href="javascript:void(0)" @click="deletePro(index,item.id)">删除</a>
          </div>
        </div>
      </div>
      <div class="settlement">
        <div class="float-bar-right">
          <div class="price-sum">
            <span class="txt">合计：</span>
            <strong class="price">
              <em>{{total | fixed(2)}}</em> <!--计算属性-->
            </strong>
          </div>
          <div class="btn-area">
            <a href="javascript:void(0)" @click="settlement()" class="submit-btn">结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <img src="../images/foot.png"  width="1210" alt=""> -->
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
export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  data () {
    return {
      active: 1, // 步骤条到了哪一步
      // num: 1, // 商品数量
      shopChatList: [], //购物车列表
    }
  },
  filters: {
    fixed(value,num){  // 过滤器对管道符左侧的数据不操作，只改变在视图中的显示
      return '￥'+value.toFixed(num);
    }
  },
  computed: {
    // 计算购物车总价
    total(){
      return this.shopChatList.reduce((pre,next) => {
        return pre + next.retailprice * next.amount
      },0) // 0为pre初始的默认值
    }
  },
  methods: {
    // 购物车数量改变时
    handleChange(index,id) {
      let api = "/apis/client/updateshopchat";
      Axios.post(api,{
        id: id, // 当前商品在购物车表的id
        amount: this.shopChatList[index].amount, // 当前商品修改之后的数量
      }).then(response => {
        if(response.data.code === 0){
          this.$message.error('修改数量失败');
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除购物车商品
    deletePro(index,id){
      this.$confirm('确定删除此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let api = "/apis/client/deleteshopchat";
        Axios.post(api,{
          id: id, // 当前商品在购物车表的id
        }).then(response => {
          if(response.data.code === 1){ // 删除成功
            this.shopChatList.splice(index,1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else if(response.data.code === 0) {
            this.$message.error('删除失败');
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 获取购物车列表
    getShopList(){
      instance.get('/client/shopchatlist').then(response => {
        this.shopChatList = response.data.shopchatList;
      })
    },
    // 结算
    settlement(){
      this.$router.push({path:'submitorder'});
    }
  },
  created () {
    this.getShopList();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
*{
  margin: 0;
  padding: 0;
}
.shopcart{
  width: 1210px;
  padding: 20px 5px;
  margin: 0 auto;
}
.shopchat{
  // padding: 20px 5px;
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
  // border-bottom: 3px solid #b2d1ff;
  font-size: 12px;
  vertical-align: bottom;
  background-color: #f5f5f5;
}
.td-0{
  width: 270px;
}
.td-1{
  width: 155px;
}
.td-5{
  width: 150px;
}
.td-2, .td-3, .td-4{
  width: 135px;
}
.order-order{
  border: 1px solid #ccc;
  margin-top: 20px;
}
.order-item{
  border-bottom: 1px solid #eee;
}
.order-itemInfo{
  display: inline-block;
}
.info-detail{
  width: 260px;
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
  width: 90px;
  height: 90px;
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
  text-align: center;
  vertical-align: top;
  padding: 10px 0;
}
.info-price{
  display: inline-block;
  color: #3c3c3c;
  font-weight: 700;
  font-family: Verdana,Tahoma,arial;
  width: 135px;
  vertical-align: top;
  padding: 10px 0;
  text-align: center;
  em{
    font-style: normal;
  }
}
.order-quantity, .order-itemPay{
  width: 135px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  span{
    color: #ff0036;
    font-weight: 700;
    padding-right: 10px;
  }
}
.order-action{
  width: 140px;
  padding: 10px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  a{
    text-decoration: none;
    cursor: pointer;
    color: #438ECF;
  }
}
.settlement{
  position: relative;
  height: 50px;
  margin-top: 20px;
  background-color: #eee
}
.float-bar-right{
  width: 290px;
  height: 50px;
  float: right;
  position:absolute;
  right: 0;
  top: 0;
  z-index: 4;
  padding-left: 20px;
  .price-sum{
    float: left;
    height: 50px;
    width: 160px;
    color: #3c3c3c;
    .txt{
      float: left;
      line-height: 50px;
    }
    .price{
      color: #f40;
      font-weight: 700;
      font-size: 18px;
      line-height: 50px;
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
