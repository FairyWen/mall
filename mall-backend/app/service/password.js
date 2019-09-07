'use strict';

const Service = require('egg').Service;

class PasswordService extends Service {
  // 修改密码
  async updatepassword(body) {
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      if (searchAccount && (searchAccount.password === body.oldpassword)) { // 如果旧密码匹配
        const row = {
          id: searchAccount.id,
          password: body.password,
        };
        const result = await this.app.mysql.update('user', row);
        return { result };
      }
      return 2;// 如果旧密码不匹配
    }
  }
  // 设置密保
  async passprotect(body) {
    // console.log(body);
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      if (searchAccount) { // 该账户存在数据库中
        const row = {
          id: searchAccount.id,
          question: body.question,
          answer: body.answer,
        };
        const result = await this.app.mysql.update('user', row);
        console.log(result);
        return result;
      }
      return 2;// 如果账号不存在
    }
  }
  // 用账号去拿密保问题
  async checkuseraccount(body) {
    // console.log(body);
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      // console.log(searchAccount);
      if (searchAccount) { // 该账户存在数据库中
        if (searchAccount.question) { // 当用户设置了密保
          return searchAccount.question;
        }
        return 3; // 用户未设置密保
      }
      return 2;// 如果账号不存在
    }
  }
  // 验证密保是否正确
  async submitpassprotect(body) {
    // console.log(body);
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      // console.log(searchAccount);
      if (searchAccount && body.answer === searchAccount.answer) { // 该账户存在数据库中且密保正确
        return 1;
      } else if (searchAccount && body.answer !== searchAccount.answer) { // 账号存在但用户密保答案错误
        return 3;
      }
      return 2;// 如果账号不存在
    }
  }

  // 忘记密码
  async forgrtpass(body) {
    // console.log(body);
    if (body.user_account) {
      const searchAccount = await this.app.mysql.get('user', { // 去数据库user表中查账该账号
        user_account: body.user_account,
      });
      // console.log(searchAccount);
      if (searchAccount) { // 如果旧密码匹配
        const row = {
          id: searchAccount.id,
          password: body.password,
        };
        const result = await this.app.mysql.update('user', row);
        // console.log(result);
        return result;
      }
      return 2;// 该用户不存在
    }
  }
}

module.exports = PasswordService;
