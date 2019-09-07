'use strict';

const Service = require('egg').Service;

class AddService extends Service {
  // 添加新的收货地址
  async addressadd(body) {
    const row = {
      id: body.id,
      user_account: body.user_account,
      address: body.address,
      detailaddress: body.detailaddress,
      receiveperson: body.receiveperson,
      receivephone: body.receivephone,
    };
    const result = await this.app.mysql.insert('address', row); // 更新 address 表中的记录
    console.log(result);
    return { result };
  }
  // 获取当前用户的地址列表
  async getaddresslist(userAccount) {
    const addressList = await this.app.mysql.select('address', {
      where: {
        user_account: userAccount,
      },
    });
    return { addressList };
  }
  // 修改收货地址
  async updateaddress(body) {
    console.log(body);
    const row = {
      id: body.id,
      user_account: body.user_account,
      receiveperson: body.receiveperson,
      receivephone: body.receivephone,
      address: body.address,
      detailaddress: body.detailaddress,
    };
    const result = await this.app.mysql.update('address', row); // 更新 product 表中的记录
    return { result };
  }
  // 删除收货地址
  async deleteaddress(body) {
    const result = await this.app.mysql.delete('address', {
      id: body.id,
    });
    return { result };
  }
}

module.exports = AddService;
