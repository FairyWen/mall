'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 登录
  async logining(admin) {
    // console.log(user);
    if (admin.account !== '' && admin.password !== '') { // 不为空时
      const searchAccount = await this.app.mysql.get('admin', { // 去数据库user表中查账该账号
        account: admin.account,
      });
      // 判断账号密码是否正确
      if (searchAccount && admin.account === searchAccount.account && admin.password === searchAccount.password) {
        return searchAccount;
      } else { // 账号或密码错误时
        return 0;
      }
    } else {
      return 0; // 为空时
    }
  }
}

module.exports = LoginService;
