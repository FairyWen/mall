'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // 订单功能
  async orderProductList() {
    const ctx = this.ctx;
    const orderproduct1 = await ctx.service.order.orderproduct();
    ctx.body = orderproduct1;
  }
  // 提交订单
  async submitorder() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.account = ctx.state.token.user_account;
    const submitorder = await ctx.service.order.submitorder(body);
    ctx.body = submitorder;
  }
  // 订单详情
  async seeorderdetail() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    body.account = ctx.state.token.user_account;
    // console.log(body);
    const result = await ctx.service.order.seeorderdetail(body);
    ctx.body = result;
  }

  // 所有订单
  async getallorderlist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account; // 拿到解密后的用户账号
    const result = await ctx.service.order.allorderlist(userAccount);
    // console.log(result);
    const arr = result.allorderList;
    arr.forEach(everyorder => {
      if (everyorder.state === 1) {
        everyorder.state2 = '待支付';
        everyorder.action = '立即支付';
      } else if (everyorder.state === 2) {
        everyorder.state2 = '待发货';
        everyorder.action = '提醒发货';
      } else if (everyorder.state === 3) {
        everyorder.state2 = '待收货';
        everyorder.action = '确认收货';
      } else if (everyorder.state === 4) {
        everyorder.state2 = '已完成';
        everyorder.action = '';
      }
    });
    // console.log(arr);
    ctx.body = arr;
  }
  // 待支付订单
  async getwaitpaylist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account;
    const result = await ctx.service.order.waitpaylist(userAccount);
    const arr = result.waitpayList;
    arr.forEach(everyorder => {
      everyorder.state2 = '待支付';
      everyorder.action = '立即支付';
    });
    // console.log(arr);
    ctx.body = arr;
  }

  // 待发货订单
  async getwaitdeliverlist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account;
    const result = await ctx.service.order.waitdeliverlist(userAccount);
    const arr = result.waitdeliverList;
    arr.forEach(everyorder => {
      everyorder.state2 = '待发货';
      everyorder.action = '提醒发货';
    });
    // console.log(arr);
    ctx.body = arr;
  }

  // 待收货订单
  async getwaitreceivelist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account;
    const result = await ctx.service.order.waitreceivelist(userAccount);
    const arr = result.waitreceiveList;
    arr.forEach(everyorder => {
      everyorder.state2 = '待收货';
      everyorder.action = '确认收货';
    });
    // console.log(arr);
    ctx.body = arr;
  }
  // 已完成订单
  async completelist() {
    const ctx = this.ctx;
    const userAccount = ctx.state.token.user_account;
    const result = await ctx.service.order.completelist(userAccount);
    const arr = result.waitreceiveList;
    arr.forEach(everyorder => {
      everyorder.state2 = '已完成';
      everyorder.action = '';
    });
    // console.log(arr);
    ctx.body = arr;
  }

  // 去支付
  async topay() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const orderupdate = await ctx.service.order.topay(body);
    if (orderupdate.result.affectedRows === 1) { // 支付成功
      // 支付成功之后去修改已售数量selled
      const selledupdate = await ctx.service.order.selledupdate(body.order_id); // 支付成功之后去添加数量
      if (selledupdate === 1) { // 已售数量添加成功
        const result = {
          code: 1,
          msg: 'success',
        };
        ctx.body = result;
      } else {
        const result = {
          code: 2,
          msg: 'selledAddFaill',
        };
        ctx.body = result;
      }
    } else if (orderupdate.result.affectedRows === 0) { // 支付失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

  // 提醒发货
  async remindshipment() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const orderupdate = await ctx.service.order.remindshipment(body);
    if (orderupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (orderupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 卖家去发货
  async todeliver() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const orderupdate = await ctx.service.order.todeliver(body);
    if (orderupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (orderupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 确认收货
  async confirmreceipt() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const orderupdate = await ctx.service.order.confirmreceipt(body);
    if (orderupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (orderupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
  // 去评价
  async toevaluate() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const orderupdate = await ctx.service.order.toevaluate(body);
    if (orderupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (orderupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }
}

module.exports = OrderController;
