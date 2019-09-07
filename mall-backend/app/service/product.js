'use strict';

const Service = require('egg').Service;

class ProductService extends Service {
  // 获取商品列表
  async production() {
    const productList = await this.app.mysql.select('product', {
      where: {
        ifdelete: 0,
      },
    });
    return { productList };
  }
  // 新品首发
  async newproductlist() {
    const productList = await this.app.mysql.query('select * from product where ifdelete=0 order by id desc limit 10');
    return { productList };
  }
  // 删除某条商品
  async productdelete(body) {
    const options = {
      where: {
        id: body.id,
      },
    };
    const row = {
      ifdelete: 1, // 删除之后将字段从0改为1
    };
    const result = await this.app.mysql.update('product', row, options);
    return { result };
  }
  // 修改商品信息
  async productupdate(body) {
    const row = {
      id: body.id,
      name: body.name,
      retailprice: body.retailprice,
      remainingamount: body.remainingamount,
      imgurl: body.imgurl,
      desc: body.desc,
      classification: body.classification,
      specification: body.specification,
    };
    const result = await this.app.mysql.update('product', row); // 更新 product 表中的记录
    return { result };
  }
  // 添加商品信息
  async productadd(body) {
    const row = {
      name: body.name,
      retailprice: body.retailprice,
      remainingamount: body.remainingamount,
      imgurl: body.imgurl,
      desc: body.desc,
      classification: body.classification,
      specification: body.specification,
    };
    const result = await this.app.mysql.insert('product', row); // 更新 product 表中的记录
    console.log(result);
    return { result };
  }
}

module.exports = ProductService;
