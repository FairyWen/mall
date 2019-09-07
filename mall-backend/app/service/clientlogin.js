'use strict';

const Service = require('egg').Service;

class ClientloginoginService extends Service {
  // 登录
  async logining(user) {
    if (user.user_account !== '' && user.password !== '') { // 不为空时
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: user.user_account,
      });
      // 判断账号密码是否正确
      if (searchAccount && user.user_account === searchAccount.user_account && user.password === searchAccount.password) {
        return searchAccount;
      } else { // 账号或密码错误时
        return 0;
      }
    } else {
      return 0; // 为空时
    }
  }

  // 客户端获取用户信息
  async getuserinfo(account) {
    const result = await this.app.mysql.get('user', { user_account: account });
    // console.log(result);
    return result;
  }
}

module.exports = ClientloginoginService;
