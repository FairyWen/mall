'use strict';

const Controller = require('egg').Controller;

class ProclassificationController extends Controller {
  // 商品分类

  // 口红/唇膏/唇釉
  async lipstick() {
    const ctx = this.ctx;
    const lipstickList = await ctx.service.proclassification.getlipstick();
    ctx.body = lipstickList;
  }
  // 粉底液/气垫/隔离
  async foundation() {
    const ctx = this.ctx;
    const foundationList = await ctx.service.proclassification.getfoundation();
    ctx.body = foundationList;
  }
  // 眉笔/眉粉/眼线笔/眼影
  async eyeshadow() {
    const ctx = this.ctx;
    const eyeshadowList = await ctx.service.proclassification.geteyeshadow();
    ctx.body = eyeshadowList;
  }
  // 柔肤水/乳/精华
  async essence() {
    const ctx = this.ctx;
    const essenceList = await ctx.service.proclassification.getessence();
    ctx.body = essenceList;
  }
  // 面霜/早晚霜
  async facecream() {
    const ctx = this.ctx;
    const facecreamList = await ctx.service.proclassification.getfacecream();
    ctx.body = facecreamList;
  }
  // 眼精华/眼霜
  async eyecream() {
    const ctx = this.ctx;
    const eyecreamList = await ctx.service.proclassification.geteyecream();
    ctx.body = eyecreamList;
  }
  // 粉饼/散粉/腮红
  async loosepowder() {
    const ctx = this.ctx;
    const loosepowderList = await ctx.service.proclassification.getloosepowder();
    ctx.body = loosepowderList;
  }
  // 防晒霜/防晒喷雾
  async sunscreencream() {
    const ctx = this.ctx;
    const sunscreencreamList = await ctx.service.proclassification.getsunscreencream();
    ctx.body = sunscreencreamList;
  }
}

module.exports = ProclassificationController;
