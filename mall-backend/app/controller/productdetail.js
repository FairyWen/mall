'use strict';

const Controller = require('egg').Controller;

class ProductdetailController extends Controller {
  // 商品详情
  async detail() {
    const ctx = this.ctx;
    const productId = ctx.params.id; // 拿到商品id
    const prodetail = await ctx.service.productdetail.getdetail(productId);
    ctx.body = prodetail;
  }
}

module.exports = ProductdetailController;
