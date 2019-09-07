'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt();
  // 后台管理系统：
  router.post('/login', controller.login.logining); // 登录
  router.post('/logout', controller.login.logout); // 登出
  router.get('/productlist', controller.product.productlist); // 商品列表（后台管理系统和客户端共用）
  router.all('/productdelete', controller.product.productdelete); // 删除商品
  router.all('/productupdate', controller.product.productupdate); // 修改商品
  router.all('/productadd', controller.product.productadd); // 添加商品
  router.post('/productimg', controller.product.productimg); // 商品图片上传
  router.get('/orderproductlist', controller.order.orderProductList); // 订单列表
  router.get('/viplist', controller.vip.viplist); // 会员列表
  router.all('/vipdelete', controller.vip.vipdelete); // 会员删除
  router.all('/vipupdate', controller.vip.vipupdate); // 会员修改
  router.get('/getallproductselled', controller.statistics.getallproductselled); // 获取所有商品已售数量
  router.get('/getkindsofproductselled', controller.statistics.getkindsofproductselled); // 获取所有商品已售数量
  // 客户端：
  router.post('/client/login', controller.clientlogin.logining); // 登录
  router.post('/client/register', controller.clientregister.register); // 注册
  router.get('/client/getuserinfo', jwt, controller.clientlogin.getuserinfo); // 获取用户信息
  router.get('/client/newproductlist', controller.product.newproductlist); // 新品首发
  router.get('/client/detail/:id', controller.productdetail.detail); // 商品详情
  router.get('/client/getSearchProductList', controller.productsearch.search); // 商品搜索
  router.get('/client/getlipstick', controller.proclassification.lipstick); // 商品分类（口红/唇膏/唇釉）
  router.get('/client/getfoundation', controller.proclassification.foundation); // 商品分类（粉底液/气垫/隔离）
  router.get('/client/geteyeshadow', controller.proclassification.eyeshadow); // 商品分类（眉笔/眉粉/眼线笔/眼影）
  router.get('/client/getessence', controller.proclassification.essence); // 商品分类（柔肤水/乳/精华）
  router.get('/client/getfacecream', controller.proclassification.facecream); // 商品分类（面霜/早晚霜）
  router.get('/client/geteyecream', controller.proclassification.eyecream); // 商品分类（眼精华/眼霜）
  router.get('/client/getloosepowder', controller.proclassification.loosepowder); // 商品分类（粉饼/散粉/腮红）
  router.get('/client/getsunscreencream', controller.proclassification.sunscreencream); // 商品分类（防晒霜/防晒喷雾）
  router.all('/client/addshopchat', jwt, controller.shopchat.addshopchat); // 添加至购物车
  router.all('/client/emptyshoplist', jwt, controller.shopchat.emptyshoplist); // 清空购物车
  router.all('/client/updateshopchat', jwt, controller.shopchat.updateshopchat); // 修改购物车商品数量
  router.all('/client/deleteshopchat', jwt, controller.shopchat.deleteshopchat); // 删除购物车商品
  router.get('/client/shopchatlist', jwt, controller.shopchat.getshopchatlist); // 获取购物车列表
  router.all('/client/submitorder', jwt, controller.order.submitorder); // 提交订单
  router.all('/client/allorderlist', jwt, controller.order.getallorderlist); // 所有订单
  router.all('/client/waitpaylist', jwt, controller.order.getwaitpaylist); // 待支付订单
  router.all('/client/waitdeliverlist', jwt, controller.order.getwaitdeliverlist); // 待发货订单
  router.all('/client/waitreceivelist', jwt, controller.order.getwaitreceivelist); // 待收货订单
  router.all('/client/completelist', jwt, controller.order.completelist); // 已完成订单
  router.all('/client/seeorderdetail', jwt, controller.order.seeorderdetail); // 订单详情
  router.all('/client/topay', controller.order.topay); // 去付款
  router.all('/client/remindshipment', controller.order.remindshipment); // 提醒发货
  router.all('/client/todeliver', controller.order.todeliver); // 卖家发货
  router.all('/client/confirmreceipt', controller.order.confirmreceipt); // 确认收货
  router.all('/client/toevaluate', controller.order.toevaluate); // 去评价
  router.all('/client/addresslist', jwt, controller.address.addresslist); // 获取收货地址列表
  router.all('/client/addaddress', jwt, controller.address.addaddress); // 新增收货地址
  router.all('/client/updateaddress', jwt, controller.address.updateaddress); // 修改收货地址
  router.all('/client/deleteaddress', jwt, controller.address.deleteaddress); // 删除收货地址
  router.all('/client/updatepassword', jwt, controller.password.updatepassword); // 修改密码
  router.all('/client/passprotect', jwt, controller.password.passprotect); // 设置密保
  router.all('/client/forgrtpass', controller.password.forgrtpass); // 设置密保
  router.all('/client/checkuseraccount', controller.password.checkuseraccount); // 根据用户名拿密保问题
  router.all('/client/submitpassprotect', controller.password.submitpassprotect); // 验证密保是否正确
  router.all('/client/addallintegral', jwt, controller.integral.addallintegral); // 付款成功之后给用户加相应积分
  router.all('/client/canuseintegral', jwt, controller.integral.canuseintegral); // 获取用户的可用积分（下单时抵消金额）
};
