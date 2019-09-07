<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--我的订单-->
  <div class="myorder">
    <div class="nav">
      <!-- active-text-color="#ff6000" -->
      <el-menu
        :default-active="defaultactive"
        class="el-menu-vertical-demo"
        @select="handleMenuSelected">
        <el-menu-item :index="page[0]">
          <i class="el-icon-document-checked"></i>
          <span slot="title">所有订单</span>
        </el-menu-item>
        <el-menu-item :index="page[1]">
          <i class="el-icon-document-remove"></i>
          <span slot="title">待付款</span>
        </el-menu-item>
        <el-menu-item :index="page[2]">
          <i class="el-icon-document-copy"></i>
          <span slot="title">待发货</span>
        </el-menu-item>
        <el-menu-item :index="page[3]">
          <i class="el-icon-document"></i>
          <span slot="title">待收货</span>
        </el-menu-item>
        <el-menu-item :index="page[4]">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">已完成</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <component :is="current"></component>
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
import Allorder from '../components/Allorder'
import Waitpay from '../components/Waitpay'
import Waitdeliver from '../components/Waitdeliver'
import Waitreceive from '../components/Waitreceive'
import Complete from '../components/Complete'
import rightNav from '../components/Rightnav'

export default {
  components: {
    shopHeader,
    rotary,
    Allorder,
    Waitpay,
    Waitdeliver,
    Waitreceive,
    Complete,
    rightNav,
  },
  data () {
    return {
      page: ['/allorder', '/waitpay', '/waitdeliver', '/waitreceive','/complete'],
      components: ['Allorder', 'Waitpay', 'Waitdeliver', 'Waitreceive','Complete'],
      defaultactive: '/allorder',
      current: 'Allorder',
    }
  },
  methods: {
    handleMenuSelected (index) {
      this.defaultactive = index
      this.current = this.components[this.page.indexOf(index)]
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@deep: ~">>>";
.myorder{
  padding: 20px 5px;
  width: 1210px;
  height: 100vh;
  position: relative;
  margin: 0 auto;
}
.nav{
  float: left;
  width: 160px;
  height: 100%;
}
.right{
  float: left;
}
.el-menu{
  height: 100vh;
  border-right: solid 1px #ccc;
}
</style>
