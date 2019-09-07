'use strict';

const Service = require('egg').Service;

class StatisticsService extends Service {
  // 获取模糊查询到的商品列表
  async getallproductselled() {
    const productselledList = await this.app.mysql.select('product', {
      where: { ifdelete: 0 },
      columns: [ 'id', 'name', 'selled' ], // 要查询的表字段
    });
    return productselledList;
  }
  // 获取不同类型商品售出数量
  async getkindsofproductselled() {
    const kindsofproductselledList = await this.app.mysql.select('product', {
      where: { ifdelete: 0 },
      columns: [ 'selled', 'classification' ], // 要查询的表字段
    });
    const arr = [];
    const kinds1 = { name: '口红/唇膏/唇釉', value: 0 };
    const kinds2 = { name: '粉底液/气垫/隔离', value: 0 };
    const kinds3 = { name: '眉笔/眉粉/眼线笔/眼影', value: 0 };
    const kinds4 = { name: '柔肤水/乳/精华', value: 0 };
    const kinds5 = { name: '面霜/早晚霜', value: 0 };
    const kinds6 = { name: '眼精华/眼霜', value: 0 };
    const kinds7 = { name: '粉饼/散粉/腮红', value: 0 };
    const kinds8 = { name: '防晒霜/防晒喷雾', value: 0 };
    kindsofproductselledList.forEach(element => {
      if (element.classification === 1) {
        kinds1.value += element.selled;
      } else if (element.classification === 2) {
        kinds2.value += element.selled;
      } else if (element.classification === 3) {
        kinds3.value += element.selled;
      } else if (element.classification === 4) {
        kinds4.value += element.selled;
      } else if (element.classification === 5) {
        kinds5.value += element.selled;
      } else if (element.classification === 6) {
        kinds6.value += element.selled;
      } else if (element.classification === 7) {
        kinds7.value += element.selled;
      } else if (element.classification === 8) {
        kinds8.value += element.selled;
      }
    });
    arr.push(kinds1);
    arr.push(kinds2);
    arr.push(kinds3);
    arr.push(kinds4);
    arr.push(kinds5);
    arr.push(kinds6);
    arr.push(kinds7);
    arr.push(kinds8);
    return arr;
  }
}

module.exports = StatisticsService;
