'use strict';

const Service = require('egg').Service;

class ProductdetailService extends Service {
  // 获取商品详情
  async getdetail(pid) {
    const productdetail = await this.app.mysql.get('product', { id: pid });
    return { productdetail };
  }
}

module.exports = ProductdetailService;
