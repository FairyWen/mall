'use strict';

const Controller = require('egg').Controller;
class ClientloginController extends Controller {
  // 登录
  async logining() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const result = await ctx.service.clientlogin.logining(body);
    if (result === 0) {
      ctx.body = {
        code: 0,
        msg: '登录失败',
      };
    } else {
      const token1 = this.app.jwt.sign({
        user_account: body.user_account,
      }, this.app.config.jwt.secret, {
        expiresIn: '84600s',
      });
      // console.log(token1);
      ctx.body = {
        code: 1,
        msg: '登录成功',
        token: token1,
      };
    }
  }
  // 用户信息
  async getuserinfo() {
    const ctx = this.ctx;
    const user_account = ctx.state.token.user_account;
    const userinfo = await this.service.clientlogin.getuserinfo(user_account);
    // console.log(userinfo);
    const result = {};
    result.id = userinfo.id;
    result.user_account = userinfo.user_account;
    result.phone = userinfo.phone;
    result.all_integral = userinfo.all_integral;
    result.integral = userinfo.integral;
    result.money = userinfo.integral / 100;
    if (userinfo.all_integral >= 0 && userinfo.all_integral < 500) {
      result.vip = 'vip0 (青铜会员)';
    } else if (userinfo.all_integral >= 500 && userinfo.all_integral < 3000) {
      result.vip = 'vip1 (白银会员)';
    } else if (userinfo.all_integral >= 3000 && userinfo.all_integral < 8000) {
      result.vip = 'vip2 (黄金会员)';
    } else if (userinfo.all_integral >= 8000 && userinfo.all_integral < 20000) {
      result.vip = 'vip3 (铂金会员)';
    } else if (userinfo.all_integral >= 20000 && userinfo.all_integral < 50000) {
      result.vip = 'vip4 (钻石会员)';
    } else if (userinfo.all_integral >= 50000 && userinfo.all_integral < 100000) {
      result.vip = 'vip5 (星曜会员)';
    } else if (userinfo.all_integral >= 100000) {
      result.vip = 'vip6 (王者会员)';
    }
    // console.log(result);
    ctx.body = result;
  }
}

module.exports = ClientloginController;
