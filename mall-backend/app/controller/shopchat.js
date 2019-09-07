'use strict';

const Controller = require('egg').Controller;

class ShopchatController extends Controller {
  // 添加至购物车
  async addshopchat() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account; // 拿到解密后的用户账号
    const body = ctx.request.body;
    body.user_account = userAccount;
    const shopchatadd = await ctx.service.shopchat.shopchatadd(body);
    if (shopchatadd.result.affectedRows === 1 && shopchatadd.result.changedRows === 0) { // 购物车此商品不存在，添加新数据成功
      const result = {
        code: 1,
        msg: 'addSuccess',
      };
      ctx.body = result;
    } else if (shopchatadd.result.affectedRows === 1 && shopchatadd.result.changedRows === 1) { // 购物车此商品已存在，改变原数据成功
      const result = {
        code: 2,
        msg: 'changeSuccess',
      };
      ctx.body = result;
    } else if (shopchatadd.result.affectedRows === 0) { // 新增失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    } else if (shopchatadd === 3) { // 用户未登录
      const result = {
        code: 3,
        msg: 'notLogin',
      };
      ctx.body = result;
    }
  }
  // 修改购物车数量
  async updateshopchat() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const updateshopchat = await ctx.service.shopchat.updateshopchat(body);
    if (updateshopchat.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (updateshopchat.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 删除购物车商品
  async deleteshopchat() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const result = await ctx.service.shopchat.deleteshopchat(body);
    if (result.affectedRows === 1) { // 删除成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (result.affectedRows === 0) { // 删除失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 购物车列表
  async getshopchatlist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account; // 拿到解密后的用户账号
    const result = await ctx.service.shopchat.shopchatlist(userAccount);
    ctx.body = result;
  }
  // 清空购物车
  async emptyshoplist() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const result = await ctx.service.shopchat.emptyshoplist(body);
    if (result.affectedRows > 0) { // 清空成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (result.affectedRows === 0) { // 清空失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
}

module.exports = ShopchatController;
