'use strict';

const Service = require('egg').Service;

class ProclassificationService extends Service {
  // 商品分类

  // 口红/唇膏/唇釉
  async getlipstick() {
    const lipstickList = await this.app.mysql.select('product', {
      where: {
        classification: 1,
        ifdelete: 0,
      },
    });
    return { lipstickList };
  }
  // 粉底液/气垫/隔离
  async getfoundation() {
    const foundationList = await this.app.mysql.select('product', {
      where: {
        classification: 2,
        ifdelete: 0,
      },
    });
    return { foundationList };
  }
  // 眉笔/眉粉/眼线笔/眼影
  async geteyeshadow() {
    const eyeshadowList = await this.app.mysql.select('product', {
      where: {
        classification: 3,
        ifdelete: 0,
      },
    });
    return { eyeshadowList };
  }
  // 柔肤水/乳/精华
  async getessence() {
    const essenceList = await this.app.mysql.select('product', {
      where: {
        classification: 4,
        ifdelete: 0,
      },
    });
    return { essenceList };
  }
  // 面霜/早晚霜
  async getfacecream() {
    const facecreamList = await this.app.mysql.select('product', {
      where: {
        classification: 5,
        ifdelete: 0,
      },
    });
    return { facecreamList };
  }
  // 眼精华/眼霜
  async geteyecream() {
    const eyecreamList = await this.app.mysql.select('product', {
      where: {
        classification: 6,
        ifdelete: 0,
      },
    });
    return { eyecreamList };
  }
  // 粉饼/散粉/腮红
  async getloosepowder() {
    const loosepowderList = await this.app.mysql.select('product', {
      where: {
        classification: 7,
        ifdelete: 0,
      },
    });
    return { loosepowderList };
  }
  // 防晒霜/防晒喷雾
  async getsunscreencream() {
    const sunscreencreamList = await this.app.mysql.select('product', {
      where: {
        classification: 8,
        ifdelete: 0,
      },
    });
    return { sunscreencreamList };
  }
}

module.exports = ProclassificationService;
