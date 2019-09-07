# mall

### 项目介绍
- 面向客户的商城客户端、面向管理员的后台管理系统
***
### 项目技术栈
- 数据库：mysql
- 服务端：egg.js
- 前端：vue
***
### 项目运行
```
git clone https://github.com/FairyWen/mall.git
后台: cd mall-backend, npm install, npm run dev   // 127.0.0.1:7001
客户端：cd mall-client, npm install, npm run dev    // 127.0.0.1:8081
管理端：cd mall-frontend, npm install, npm run dev    // 127.0.0.1:8080
```
***
### 目录架构
```
ttp5-mall-mengyue.wen/
  |
  ├──mall-backend/                * 后台代码目录
  |   |
  |   ├──app/                     * egg代码主目录
  |   │   │
  |   │   │──controller/          * 业务逻辑主要代码
  |   │   │   │
  |   │   │   └──home.js          * 渲染静态文件
  |   │   │
  |   │   │──middleware/          * egg中间件
  |   │   │
  |   │   │──public/              * egg默认静态文件目录
  |   │   │
  |   │   │──service/             * egg业务逻辑文件目录
  |   │   │
  |   │   └──router.js            * egg路由文件
  |   │
  |   ├──config/
  |   │   │──config.default.js    * egg默认配置文件
  |   │   │
  |   │   └──plugin.js            * egg插件配置
  |   │
  |   │──.gitignore               * Git忽略文件配置
  |   │
  |   │──package.json             * 包信息
  |   │
  |   └──README.md                * readme
  |   
  ├──mall-client/                 * 客户端前端代码主目录       
  │   │
  │   │──build/                   * 打包目录
  │   │
  │   ├──config/                  * 配置文件目录
  │   │   │
  │   │   │──dev.env.js
  |   │   │
  │   │   │──index.js
  │   │   │
  │   │   │──test.env.js
  │   │   │
  |   │   └──prod.env.js
  │   │
  │   ├──src/
  |   │   │
  |   │   └──api                 * 客户端接口的业务层
  |   │   │   │
  |   │   │   └──api.js          * 项目专门配置的axios
  |   │   │  
  │   │   │──assets/             * 静态文件包含图片等
  |   │   │
  │   │   │──images/             * 图片
  |   │   │
  │   │   │──router/             * 路由
  |   │   │   │
  |   |   │   └──index.js        * vue路由配置文件
  |   │   │
  │   │   │──services/
  |   │   │   │
  |   |   │   └──date.js         * 日期格式转换文件
  |   |   │  
  │   │   │──components/         * 页面和组件
  |   │   │   │
  |   │   │   │──Login.vue       * 具体页面等
  |   │   │   │
  |   │   │   │──……
  |   │   │  
  │   │   │──store/              * 状态管理vuex
  |   │   │   │
  |   |   │   └──index.js        * 状态管理vuex
  |   │   │
  │   │   │──style/              * 样式文件
  |   │   │
  │   │   │──App.vue             * 根组件
  |   │   │
  │   │   └──main.js             * 入口文件，初始化vue实例，并引入所需要的插件
  |   │
  │   ├──.gitignore              * Git忽略文件配置
  |   │
  │   ├──index.html              * 文件入口
  |   │
  │   ├──package.json            * 打包信息
  |   │
  │   └──README.md
  |
  └──README.md
```
***
  以上目录展示了egg后台（mall-backend）和客户端商城前端(mall-client)的目录，后台管理系统前端(mall-frontend)目录与客户端商城前端一致（此处不再累赘）


