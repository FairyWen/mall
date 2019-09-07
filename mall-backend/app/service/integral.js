'use strict';

const Service = require('egg').Service;

class IntegralService extends Service {
  // 添加/减少积分(用户支付成功之后)
  async addallintegral(body) {
    // console.log(body);
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      // console.log(searchAccount);
      if (searchAccount) {
        if (body.checked === 0) { // 用户未使用优惠
          const row = {
            id: searchAccount.id,
            all_integral: searchAccount.all_integral + body.idealistictotal, // 加总积分
            integral: searchAccount.integral + body.idealistictotal, // 剩余积分:可用积分也要加上
          };
          const result = await this.app.mysql.update('user', row);
          return result;
        } else if (body.checked === 1) { // 用户使用了优惠
          const row = {
            id: searchAccount.id,
            all_integral: searchAccount.all_integral + body.idealistictotal, // 加总积分
            integral: searchAccount.integral + body.idealistictotal - body.thisdiscountintegral, // 剩余积分:加上此单产生的积分,减去优惠消耗的积分
          };
          const result = await this.app.mysql.update('user', row);
          return result;
        }
      }
      return 2;
    }
  }
  // 用orderid去order表拿用户可以加/减的积分
  async gettotal(body) {
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('orderlist', { // 去数据库user表中查账该账号
        id: body.order_id,
      });
      return {
        aboutintegral: {
          idealistictotal: searchAccount.idealistictotal,
          checked: searchAccount.checked,
          thisdiscountintegral: searchAccount.thisdiscountintegral,
        },
      };
    }
  }
  // 获取用户可用积分
  async canuseintegral(userAccount) {
    if (userAccount) {
      const searchAccount = await this.app.mysql.select('user', { // 去数据库user表中查账该账号
        where: { user_account: userAccount },
        columns: [ 'integral' ], // 要查询的表字段
      });
      return searchAccount[0].integral; // 返回用户可用积分
    }
  }
}

module.exports = IntegralService;
