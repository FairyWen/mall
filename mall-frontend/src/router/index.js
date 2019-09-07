import Vue from 'vue'
// 创建组件
import Login from '../components/Login.vue'
import Vip from '../components/Vip.vue'
import Order from '../components/Order.vue'
import Product from '../components/Product.vue'
import Statistics from '../components/Statistics.vue'

import Router from 'vue-router'
Vue.use(Router)

// 配置路由
const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/vip', name: 'vip', component: Vip },
  { path: '/order', name: 'order', component: Order },
  { path: '/product', name: 'product', component: Product },
  { path: '/statistics', name: 'statistics', component: Statistics }
]
// 实例化vueRouter
const router = new Router({
  base: '/',
  mode: 'history',
  routes
})
// 暴露路由
export default router
