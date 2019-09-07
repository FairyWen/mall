import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js'
import { instance, login, getUserInfo } from '../api'
import 'babel-polyfill'
Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 存放所有组件都可以使用的数据
    token: window.localStorage.getItem('token'),
    userInfo: {},
    loginStatus: false,
    loginUser: localStorage.getItem('user'),
  },

  // 放置同步修改state数据的方法
  mutations: {
    [types.LOGIN]: (state, value) => {
      state.token = value
    },
    [types.USERINFO]: (state, info) => {
      state.userInfo = info
    },
    [types.LOGINSTATUS]: (state, bool) => {
      state.loginStatus = bool
    },
    saveLoginUser (state, value) { // 第一个参数是state对象 第二个参数是传过来的值
      state.loginUser = value
      window.localStorage.setItem('user', value) // 把登录的用户存储到本地
    },
    deleteLoginUser (state, value) { // 退出登录之后更改用户名显示
      state.loginUser = value
      window.localStorage.setItem('user', value)
    }
  },

  // 放置异步修改state数据的方法
  actions: {
    toLogin ({ commit }, info) {
      return new Promise((resolve, reject) => {
        login(info).then(res => {
          if (res.data.code === 1) {
            // 将后台传来的token通过mutations存进vuex的state里面
            commit(types.LOGIN, res.data.token)
            // 将登录状态改为true,存进vuex的state里面
            commit(types.LOGINSTATUS, true)
            // 登录成功之后给每个请求的请求头加上Authorization字段（携带着token）
            instance.defaults.headers.common['Authorization'] = `Bearer ` + res.data.token
            // 将token和登录状态存进localstorage
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('islogin', true)
          }
          resolve(res)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 退出登录
    exit ({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.USERINFO, null)
        commit(types.LOGINSTATUS, false)
        commit(types.LOGIN, '')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('islogin')
        window.localStorage.removeItem('user')
        instance.defaults.headers.common['Authorization'] = ''
        commit('deleteLoginUser', '亲，请登录') //退出登录之后更改界面显示的用户名
        resolve()
      })
    },
  }
})
