'use strict';

const Controller = require('egg').Controller;

class ProductsearchController extends Controller {
  // 搜索商品
  async search() {
    const ctx = this.ctx;
    const productresult = await ctx.service.productsearch.getsearch();
    ctx.body = productresult;
  }
}

module.exports = ProductsearchController;
