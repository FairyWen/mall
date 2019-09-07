'use strict';

const Controller = require('egg').Controller;

class StatisticController extends Controller {
  // 获取所有商品的售出数量
  async getallproductselled() {
    const ctx = this.ctx;
    const productselledresult = await ctx.service.statistics.getallproductselled();
    ctx.body = productselledresult;
  }
  // 获取不同类型商品售出数量
  async getkindsofproductselled() {
    const ctx = this.ctx;
    const kindsproductselledresult = await ctx.service.statistics.getkindsofproductselled();
    ctx.body = kindsproductselledresult;
  }
}

module.exports = StatisticController;
