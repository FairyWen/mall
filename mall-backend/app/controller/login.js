'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 登录并设置session
  async logining() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const result = await ctx.service.login.logining(body);
    if (result === 0) {
      ctx.body = {
        code: 0,
        msg: '登录失败',
      };
    } else {
      ctx.session = result; // 设置session
      // console.log(ctx.session);
      ctx.body = {
        code: 1,
        msg: '登录成功',
      };
    }
  }
  // 退出登录，清除session
  async logout() {
    const ctx = this.ctx;
    ctx.session = null;
    ctx.body = {
      code: 1,
      msg: '退出成功',
    };
  }
}

module.exports = LoginController;
