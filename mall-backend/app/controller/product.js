'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class ProductController extends Controller {
  // 获取商品列表
  async productlist() {
    const ctx = this.ctx;
    const product = await ctx.service.product.production();
    ctx.body = product;
  }
  // 新品首发
  async newproductlist() {
    const ctx = this.ctx;
    const newproduct = await ctx.service.product.newproductlist();
    ctx.body = newproduct;
  }

  // 删除某一条商品
  async productdelete() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // console.log(body);
    const productdelete = await ctx.service.product.productdelete(body);
    if (productdelete.result.affectedRows === 1) { // 删除成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (productdelete.result.affectedRows === 0) { // 删除失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

  // 修改商品信息
  async productupdate() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const productupdate = await ctx.service.product.productupdate(body);
    if (productupdate.result.affectedRows === 1) { // 修改成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (productupdate.result.affectedRows === 0) { // 修改失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

  // 新增商品信息
  async productadd() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    console.log(body);
    const productadd = await ctx.service.product.productadd(body);
    if (productadd.result.affectedRows === 1) { // 新增成功
      const result = {
        code: 1,
        msg: 'success',
      };
      ctx.body = result;
    } else if (productadd.result.affectedRows === 0) { // 新增失败
      const result = {
        code: 0,
        msg: 'fail',
      };
      ctx.body = result;
    }
  }

  // 上传商品图片
  async productimg() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    // 文件名:随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 图片存放在静态资源public/img文件夹下
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    this.ctx.body = {
      code: 0,
      data: filename, // 文件名
      urling: this.config.api + '/public/img/' + filename, // 图片的url
      msg: '',
    };
  }
}

module.exports = ProductController;
