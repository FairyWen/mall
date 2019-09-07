'use strict';

const Controller = require('egg').Controller;

class PasswordController extends Controller {
  // 修改密码
  async updatepassword() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const updatepassword = await ctx.service.password.updatepassword(body);
    console.log(updatepassword);
    if (updatepassword === 2) { // 旧密码错误，无法修改
      const result = {
        code: 2,
        msg: 'oldpassError',
      };
      ctx.body = result;
    } else if (updatepassword.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    }
  }
  // 设置密保
  async passprotect() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const passprotect = await ctx.service.password.passprotect(body);
    console.log(passprotect);
    if (passprotect === 2) { // 设置失败
      const result = {
        code: 2,
        msg: 'fail',
      };
      ctx.body = result;
    } else if (passprotect.affectedRows === 1) { // 设置成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    }
  }
  // 根据用户名拿密保问题
  async checkuseraccount() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // console.log(body);
    const checkuseraccount = await ctx.service.password.checkuseraccount(body);
    // console.log(checkuseraccount);
    if (checkuseraccount === 2) { // 设置失败
      const result = {
        code: 2,
        msg: 'accountNotExisted',
      };
      ctx.body = result;
    } else if (checkuseraccount === 3) { // 用户未设置密保
      const result = {
        code: 3,
        msg: 'notSetted',
      };
      ctx.body = result;
    } else {
      const result = {
        code: 1,
        msg: 'success',
        question: checkuseraccount,
      };
      ctx.body = result;
    }
  }
  // 验证密保是否正确
  async submitpassprotect() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // console.log(body);
    const passprotect = await ctx.service.password.submitpassprotect(body);
    if (passprotect === 1) { // 用户存在且密保答案正确
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (passprotect === 3) { // 用户存在但密保答案错误
      const result = {
        code: 3,
        msg: 'answerFail',
      };
      ctx.body = result;
    } else if (passprotect === 2) { // 用户不存在
      const result = {
        code: 2,
        msg: 'accountNotExisted',
      };
      ctx.body = result;
    }
  }
  // 忘记密码
  async forgrtpass() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // body.user_account = ctx.state.token.user_account;
    const forgetpass = await ctx.service.password.forgrtpass(body);
    console.log(forgetpass);
    if (forgetpass === 2) { // 用户不存在
      const result = {
        code: 2,
        msg: 'accountNotExisted',
      };
      ctx.body = result;
    } else if (forgetpass.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    }
  }
}

module.exports = PasswordController;
