<template>
<div id="app">
  <!--头部组件-->
  <shopHeader></shopHeader>
  <!--首页轮播图、商品分类-->
  <rotary></rotary>
  <rightNav></rightNav>
</div>
</template>

<script>
import Axios from 'axios';
import shopHeader from './Header'
import rotary from './Rotary'
import rightNav from './Rightnav'
export default {
  components: {
    shopHeader,
    rotary,
    rightNav
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
