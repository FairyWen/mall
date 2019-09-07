'use strict';

const Controller = require('egg').Controller;

class VipController extends Controller {
  // 获取会员列表
  async viplist() {
    const ctx = this.ctx;
    const vip = await ctx.service.vip.viplist();
    const arr = [];
    vip.forEach(element => {
      const result = {};
      result.id = element.id;
      result.user_account = element.user_account;
      result.phone = element.phone;
      result.all_integral = element.all_integral;
      result.integral = element.integral;
      result.money = element.integral / 100;
      if (element.all_integral >= 0 && element.all_integral < 500) {
        result.vip = 'vip0 (青铜会员)';
      } else if (element.all_integral >= 500 && element.all_integral < 3000) {
        result.vip = 'vip1 (白银会员)';
      } else if (element.all_integral >= 3000 && element.all_integral < 8000) {
        result.vip = 'vip2 (黄金会员)';
      } else if (element.all_integral >= 8000 && element.all_integral < 20000) {
        result.vip = 'vip3 (铂金会员)';
      } else if (element.all_integral >= 20000 && element.all_integral < 50000) {
        result.vip = 'vip4 (钻石会员)';
      } else if (element.all_integral >= 50000 && element.all_integral < 100000) {
        result.vip = 'vip5 (星曜会员)';
      } else if (element.all_integral >= 100000) {
        result.vip = 'vip6 (王者会员)';
      }
      arr.push(result);
    });
    // console.log(arr);
    ctx.body = arr;
  }

  // 删除会员
  async vipdelete() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // console.log(body);
    const vipdelete = await ctx.service.vip.vipdelete(body);
    console.log(vipdelete);
    if (vipdelete.result.affectedRows === 1) { // 删除成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (vipdelete.result.affectedRows === 0) { // 删除失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

  // 修改会员
  async vipupdate() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    console.log(body);
    const vipupdate = await ctx.service.vip.vipupdating(body);
    if (vipupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (vipupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
}

module.exports = VipController;
