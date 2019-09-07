'use strict';

const Controller = require('egg').Controller;

class IntegralController extends Controller {
  // 添加/减少积分(用户支付成功之后)
  async addallintegral() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.user_account = ctx.state.token.user_account;
    const gettotal = await ctx.service.integral.gettotal(body); // 用orderid去拿需要加/减的积分
    // console.log(gettotal);
    body.idealistictotal = Math.round(gettotal.aboutintegral.idealistictotal); // 四舍五入算要加的积分
    body.checked = gettotal.aboutintegral.checked; // 是否使用优惠
    body.thisdiscountintegral = Math.round(gettotal.aboutintegral.thisdiscountintegral); // 四舍五入算要减的积分
    const addallintegral = await ctx.service.integral.addallintegral(body); // 拿着可以加/减的积分去改user表的总积分
    if (addallintegral === 2 || addallintegral.affectedRows === 0) { // 添加积分失败
      const result = {
        code: 2,
        msg: 'updateIntegralError',
      };
      ctx.body = result;
    } else if (addallintegral.affectedRows === 1) { // 添加积分成功
      const result = {
        code: 1,
        msg: 'updateIntegralSuccess',
      };
      ctx.body = result;
    }
  }
  // 获取用户可用积分
  async canuseintegral() {
    const ctx = this.ctx;
    const user_account = ctx.state.token.user_account;
    const canuseintegral = await ctx.service.integral.canuseintegral(user_account); // 查询用户可用积分
    const result = {
      code: 1,
      msg: 'success',
      integral: canuseintegral,
    };
    ctx.body = result;
  }
}

module.exports = IntegralController;
