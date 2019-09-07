'use strict';

const Service = require('egg').Service;

class ShopchatService extends Service {
  // 添加至购物车
  async shopchatadd(body) {
    if (!body.user_account) { // 用户未登录
      return 3;
    } else if (body.user_account) { // 用户已登录
      const searchshopchat = await this.app.mysql.get('shopchat', { // 去查该用户的购物车中该商品是否存在
        user_account: body.user_account,
        product_id: body.id,
      });
      if (!searchshopchat) { // 如果该商品不存在（则去添加一条新的购物车记录）
        const row = {
          product_id: body.id,
          name: body.name,
          specification: body.specification,
          remainingamount: body.remainingamount,
          desc: body.desc,
          retailprice: body.retailprice,
          ifdelete: body.ifdelete,
          num: body.num,
          imgurl: body.imgurl,
          selled: body.selled,
          classification: body.classification,
          amount: body.amount,
          user_account: body.user_account,
        };
        const result = await this.app.mysql.insert('shopchat', row);
        return { result };
      } else if (searchshopchat) { // 该商品已存在（则找到该商品，用之前购物车数量 + 现在购物车新加数量）
        body.amount = searchshopchat.amount + body.amount;
        const result = await this.app.mysql.update('shopchat', {
          id: searchshopchat.id,
          amount: body.amount,
        });
        return { result };
      }
    }
  }
  // 购物车列表
  async shopchatlist(userAccount) {
    const shoplist = await this.app.mysql.select('shopchat', {
      where: { user_account: userAccount },
    });
    const integral = await this.app.mysql.select('user', { // 搜索 user 表
      where: { user_account: userAccount }, // WHERE 条件
      columns: [ 'integral' ], // 要查询的表字段(可用积分)
    });
    const result = {
      shopchatList: shoplist,
      searchintegral: integral,
    };
    return result;
  }
  // 修改购物车商品数量
  async updateshopchat(body) {
    if (body.user_account) {
      const row = {
        id: body.id,
        amount: body.amount,
      };
      const result = await this.app.mysql.update('shopchat', row);
      return result;
    }
  }
  // 删除购物车商品
  async deleteshopchat(body) {
    if (body.user_account) {
      const row = {
        id: body.id,
      };
      const result = await this.app.mysql.delete('shopchat', row);
      return result;
    }
  }
  // 清空购物车
  async emptyshoplist(body) {
    if (body.user_account) {
      const result = await this.app.mysql.delete('shopchat', {
        id: body.emptyproducts,
      });
      return result;
    }
  }
}

module.exports = ShopchatService;
