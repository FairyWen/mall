'use strict';

const Service = require('egg').Service;

class VipService extends Service {
  // 获取会员列表
  async viplist() {
    const vipList = await this.app.mysql.select('user');
    return vipList;
  }
  // 删除会员
  async vipdelete(body) {
    const result = await this.app.mysql.delete('user', {
      id: body.id,
    });
    return { result };
  }
  // 修改会员
  async vipupdating(body) {
    console.log(body);
    const row = {
      id: body.id, // 注意：修改的时候主键必须为id,不能为user_id
      user_account: body.user_account,
      password: body.password,
      phone: body.phone,
      all_integral: body.all_integral,
      integral: body.integral,
    };
    const result = await this.app.mysql.update('user', row); // 更新 user 表中的记录
    return { result };
  }
}

module.exports = VipService;
