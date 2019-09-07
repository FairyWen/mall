'use strict';

const JWT = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const authorization = ctx.request.header.authorization; // 拿到请求头中的authorization字段
    if (authorization === undefined) {
      ctx.throw(401, 'no token detected in http header "Authorization"'); // 返回401 前端设有response拦截 重定向到登录页
    }
    const token = authorization.split(' ')[1]; // 获取token
    let originToken;
    try {
      originToken = await JWT.verify(token, 'wmy'); // 解密
      ctx.state.token = originToken; // 解密后的用户名传给controller
    } catch (err) {
      ctx.throw(401, 'invalid token');
    }
    await next();
  };
};
