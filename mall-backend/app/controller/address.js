'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {
  // 新增收获地址
  async addaddress() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const addressadd = await ctx.service.address.addressadd(body);
    if (addressadd.result.affectedRows === 1) { // 新增成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (addressadd.result.affectedRows === 0) { // 新增失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 获取地址列表
  async addresslist() {
    const ctx = this.ctx;
    const user_account = ctx.state.token.user_account;
    const address = await ctx.service.address.getaddresslist(user_account);
    ctx.body = address;
  }
  // 修改收货地址
  async updateaddress() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const updateaddress = await ctx.service.address.updateaddress(body);
    console.log(updateaddress);
    if (updateaddress.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (updateaddress.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 删除收货地址
  async deleteaddress() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const deleteaddress = await ctx.service.address.deleteaddress(body);
    if (deleteaddress.result.affectedRows === 1) { // 删除成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (deleteaddress.result.affectedRows === 0) { // 删除失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

}

module.exports = AddressController;
