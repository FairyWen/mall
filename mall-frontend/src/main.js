// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import 'iview/dist/iview.min.js'
import 'ant-design-vue/dist/antd.css'
import router from './router/index.js'
import echarts from 'echarts'
Vue.prototype.$eCharts = echarts
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(Antd)
Vue.use(ElementUI)
Vue.config.productionTip = false

let bus = new Vue()
Vue.prototype.bus = bus

// 挂载路由

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
