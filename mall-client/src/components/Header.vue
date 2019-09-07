<template>
<div id="app">
  <div class="header">
    <div class="header-content">
      <div class="header-container">
          <p class="left">
            <em>hi，欢迎来到仙女文的小铺</em>
            <a href="javascript:void(0)" @click="login">{{$store.state.loginUser}}</a>
            <a href="javascript:void(0)" v-if="flag" @click="register">{{toregister}}</a>
          </p>
          <span class="right">
            <i class="shoppingchat"></i> <!--<i>标签用来做小图标-->
            <!-- <a href="javascript:void(0)" @click="shopchat">购物车<span>{{shopchatnum}}</span>件</a> -->
            <a href="javascript:void(0)" @click="shopchat">购物车</a>
            <a href="javascript:void(0)" @click="myorder">我的订单</a>
            <a href="javascript:void(0)" @click="mycenter">个人中心</a>
            <a href="javascript:void(0)" v-if="!flag" @click="exit">退出</a>
          </span>
      </div>
    </div>
  </div>
  <!--logo 搜索框等-->
  <div class="panel">
    <div class="logo">
      <img src="../images/logo.jpg" width="240" height="130" alt="仙女美妆店">
    </div>
    <div class="mallSearch">
      <div class="search">
        <input type="text" v-model="inputName" :placeholder="this.placeholder">
        <button type="submit" @click="search">搜索</button>
      </div>
      <!-- <ul class="mostSearch">
        <li><a href="javascript:void(0)" target="_blank" >口红 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >粉底液 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >唇釉 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >防晒 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >遮瑕 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >眉粉 | </a></li>
        <li><a href="javascript:void(0)" target="_blank" >隔离霜 ……</a></li>
      </ul> -->
    </div>
    <div class="newProLogo">
      <img src="../images/newProductLogo.gif" height="130" alt="">
    </div>
  </div>
  <!--导航栏-->
  <div class="nav">
    <ul :class="navBarFixed == true ? 'navBarWrap' :''">
      <li>
        <a href="javascript:void(0)" @click="home">首页</a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="allPro">所有商品</a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="newPro">新品首发</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import Axios from 'axios';
export default {
  props: { // 接受父组件的值
    inputName: String, // 父组件从url query中取出的搜索内容 再传给本子组件
    required: true
  },
  data() {
    return {
      navBarFixed:false,
      flag:true,
      user_account: '亲，请登录',
      toregister: '免费注册',
      placeholder: '搜索 品牌/商品',
      shopchatnum: 0, // 购物车商品数量
      inputName: '', // 搜索内容
    }
  },
  methods: {
    watchScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //  当滚动超过 50 时，实现吸顶效果
        if (scrollTop > 183) {
          this.navBarFixed = true
        } else {
          this.navBarFixed = false
        }
     },
    // 登录
    login(){
      this.$router.push({ path: '/login' });
    },
    // 注册
    register(){
      this.$router.push({ path: "/login", query: { ifreg: "yes" }});
    },
    // 退出
    exit(){
      this.$store.dispatch('exit').then(response => {
        this.$router.push({ path: '/login' })
        this.$message({
          message: '退出成功',
          type: 'success'
        })
      })
    },
    // 搜索
    search(){
      if (!this.inputName){ // 输入为空时
        this.placeholder = '请输入关键字'
      }else{
        this.$router.push({ path: '/searchresult', query: {searchInput: this.inputName}});
      }
    },
    shopchat(){
      this.$router.push({ path: '/shopchat'});
    },
    mycenter(){
      this.$router.push({ path: '/personalcenter'});
    },
    myorder(){
      this.$router.push({ path: '/myorder'});
    },
    home(){
      this.$router.push({ path: '/home'});
    },
    allPro(){
      this.$router.push({ path: '/Allproduct'});
    },
    newPro(){
      this.$router.push({ path: '/Newproduct'});
    },
    hotPro(){
      this.$router.push({ path: '/Hotproduct'});
    }
  },
  mounted () {
    window.addEventListener('scroll', this.watchScroll);
    if(this.$store.state.loginUser !== '亲，请登录'){
      this.flag = false;
    };
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
.header{
  width: auto;
  height: 30px;
  background-color: #f2f2f2;
  z-index:1;
  border-bottom: 1px solid #e5e5e5;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.header-content{
  width: 990px;
  margin: auto;
}
.header-container{
  height: 30px;
  width: 100%;
  line-height: 30px;
  position: relative;
  color: #999;
  font-size: 12px;
}
.left{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin: 0 20px 0 0;
}
a{
  color: #999;
  text-decoration:none;
  cursor: pointer;
}
.left a{
  padding-left: 20px;
  font-size: 12px;
}
.left a:hover{
  color: #f40;
}
.shoppingchat{
  display: inline-block;
  width: 20px;
  height: 18px;
  background-image: url('../images/shopchat.png');
  background-position: center center;
  vertical-align: middle;
}
.right{
  position:absolute;
  right: 0;
}
.right a{
  margin-right: 20px;
}
.right a:hover{
  color: #f40;
}
.panel{
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  position: relative;
  width: 1200px;
  height: 130px;
  margin: 0 auto;
}
.logo{
  width: 290px;
  height: 130px;
}
.mallSearch{
  width: 625px;
  height: 130px;
  margin: 0 auto;
  padding-top: 45px;
  box-sizing: border-box;
  // background-color:aquamarine
}
.search{
  width: 625px;
  height: 44px;
  background-color:red
}
.search input{
  width: 500px;
  height: 36px;
  line-height: 36px;
  color: #000;
  margin: 3px;  
  border: none;
  outline: none;
  text-indent:15px;
  font-size: 14px;
  // font-weight: bold;
}
.search button{
  width: 100px;
  height: 36px;
  border: none;
  color: #fff;
  outline: none;
  font-weight: bold;
  background-color: red;
  cursor: pointer;
}
.mostSearch{
  list-style-type: none;
}
ul{
  padding: 0;
  margin: 0;
}
.mostSearch li{
  float: left;
  color: #999;
  padding: 5px;
  font-size: 12px;
  a{
    text-decoration:none;
    color: #999;
  }
  a:hover{
    color: red;
  }
}
.container{
  width: 100px;
  height: 100px;
  // background-color: aquamarine;
}
.nav{
  position: relative;
  width: 1210px;
  height: 40px;
  margin-top: 20px;
  margin: 20px auto 0;
  border-bottom:2px solid #999;
  z-index: 9;
}
.nav-active{
  position: fixed;
  top: 0;
}
.navBarWrap{
  position:fixed;
  top:0;
  z-index:999
}
.nav ul{
  width: 1210px;
  background-color: #f5f5f5;
  height: 40px;
  border-bottom:2px solid #999;
}
.nav ul li{
  float: left;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  padding-left: 50px;
  list-style-type: none;
  cursor: pointer;
}
.nav ul li a{
  color: #000;
  text-decoration-line: none;
}
.nav ul li a:hover{
  color:orangered;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
  /* WebKit browsers */ 
  color: #ddd; 
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
  /* Mozilla Firefox 4 to 18 */ 
  color: #ddd; 
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
  /* Mozilla Firefox 19+ */ 
  color: #ddd; 
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
  /* Internet Explorer 10+ */ 
  color: #ddd; 
}
</style>
