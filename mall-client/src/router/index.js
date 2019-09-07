import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Allproduct from '@/components/Allproduct'
import Newproduct from '@/components/Newproduct'
import Shopchat from '@/components/Shopchat'
import Productdetail from '@/components/Productdetail'
import Submitorder from '@/components/Submitorder'
import Buyimmediately from '@/components/Buyimmediately'
import Searchresult from '@/components/Searchresult'
import Personalcenter from '@/components/Personalcenter'
import Payment from '@/components/Payment'
import Myorder from '@/components/Myorder'
// import Allorder from '@/components/Allorder'
// import Waitpay from '@/components/Waitpay'
// import Waitdeliver from '@/components/Waitdeliver'
// import Waitreceive from '@/components/Waitreceive'
// import Complete from '@/components/Complete'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/login',name: 'login',component: Login}, //登录注册页面
    {path: '/home',name: 'home',component: Home}, // 首页
    {path: '/searchresult',name: 'searchresult',component: Searchresult}, // 搜索结果页面
    {path: '/personalcenter',name: 'personalcenter',component: Personalcenter,meta: {requiresAuth: true}}, // 个人中心页面
    {path: '/allproduct',name: 'allproduct',component: Allproduct}, // 全部商品
    {path: '/newproduct',name: 'newproduct',component: Newproduct}, // 新品首发
    {path: '/productdetail',name: 'productdetail',component: Productdetail}, // 商品详情页面
    {path: '/shopchat',name: 'shopchat',component: Shopchat,meta: {requiresAuth: true}}, // 购物车页面
    {path: '/buyimmediately',name: 'buyimmediately',component: Buyimmediately,meta: {requiresAuth: true}}, // 购物车页面
    {path: '/submitorder',name: 'submitorder',component: Submitorder,meta: {requiresAuth: true}}, // 填写订单页面
    {path: '/payment',name: 'payment',component: Payment,meta: {requiresAuth: true}}, // 付款页面
    {path: '/myorder',name: 'myorder',component: Myorder,meta: {requiresAuth: true}}, // 我的订单
    // {path: '/allorder',name: 'allorder',component: Allorder,meta: {requiresAuth: true}}, // 所有订单
    // {path: '/waitpay',name: 'waitpay',component: Waitpay,meta: {requiresAuth: true}}, // 待付款
    // {path: '/waitdeliver',name: 'waitdeliver',component: Waitdeliver,meta: {requiresAuth: true}}, // 待发货
    // {path: '/waitreceive',name: 'waitreceive',component: Waitreceive,meta: {requiresAuth: true}}, // 待收货
    // {path: '/complete',name: 'complete',component: Complete,meta: {requiresAuth: true}}, // 已完成订单
    {path: '*', redirect: '/home' } /*默认跳转路由*/
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      // store.dispatch('getUser')
      next()
    } else {
      store.dispatch('exit')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router