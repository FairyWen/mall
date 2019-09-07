'use strict';

const Service = require('egg').Service;

class ProductsearchService extends Service {
  // 获取模糊查询到的商品列表
  async getsearch() {
    const searchContent = this.ctx.query.search; // 获取get参数(查询输入的内容)
    const result = await this.app.mysql.query(`select * from product where name like '%` + searchContent + `%' `)
    return { result };
  }
}

module.exports = ProductsearchService;
