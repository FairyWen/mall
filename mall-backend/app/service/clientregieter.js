'use strict';

const Service = require('egg').Service;

class ClientloginoginService extends Service {
  // 注册
  async register(body) {
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      if (!searchAccount) { // 如果当前注册的用户不存在
        const row = {
          user_account: body.user_account,
          phone: body.phone,
          password: body.password,
        };
        const result = await this.app.mysql.insert('user', row); // 更新 user 表中的记录
        return { result };
      }
      return 2;// 如果当前注册的用户已存在
    }
  }
}

module.exports = ClientloginoginService;
