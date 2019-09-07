/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563848785015_2204';

  // add your middleware config here
  // config.middleware = [ 'login' ];

  config.security = {
    csrf: {
      enable: false,
      useSession: true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: [ 'GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH' ],
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'wmy1112',
      // 数据库名
      database: 'mall',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // static files and cache files
  config.static = {
    prefix: '/public/', // 访问静态化的url前缀
    dir: path.join(appInfo.baseDir, 'app/public'), // 需要设置静态化的目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和preload配合使用；
    preload: false, // 项目启动的时候是否需要将静态资源缓存，和dynamic配合使用；
    maxAge: 31536000, // 默认在prod环境缓存31536000秒，其他环境0秒（不缓存,防止修改代码后给自己挖坑）；
    buffer: false, // 是否将缓存文件保存在内存中
  };

  // // 配置session
  // config.session = {
  //   key: 'EGG_SESS',
  //   maxAge: 24 * 3600 * 1000, // 1 天
  //   httpOnly: true,
  //   encrypt: true,
  // };

  config.api = 'http://localhost:7001';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: 'wmy', // 自己设置的token加密条件字符串
  };

  return {
    ...config,
    ...userConfig,
  };
};
