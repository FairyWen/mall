'use strict';

const Controller = require('egg').Controller;

class ClientregisterController extends Controller {
  // 用户注册
  async register() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const user = await ctx.service.clientregieter.register(body);
    if (user === 2) { // 注册的用户名已存在时
      const result = {
        code: 2,
        msg: 'existed',
      };
      ctx.body = result;
    } else if (user.result.affectedRows === 1) { // 注册成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (user.result.affectedRows === 0) { // 注册失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
}

module.exports = ClientregisterController;
