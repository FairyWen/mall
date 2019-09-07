'use strict';

const Service = require('egg').Service;
// 日期格式
function formatDateTime(inputTime) {
  const date = new Date(inputTime);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

class OrderService extends Service {
  // 订单表、商品表，多表联查
  async orderproduct() {
    // orderproductResult：每个商品对应的订单号等信息（多表联查）
    const orderproductResult = await this.app.mysql.query('select orderlist.id,product_id,name,retailprice,product_number,account,address,reminder,receivephone,receiveperson,total,state,createtime from orderlist inner join order_product on orderlist.id=order_product.order_id inner join product on product.id=order_product.product_id order by orderlist.id');
    // console.log(orderproductResult);
    const orderList = [];
    orderproductResult.forEach(element => {
      let everyProduct = orderList.find(item => item.order_id === element.id);
      if (!everyProduct) { // 如果该订单id还未放进订单表
        everyProduct = {
          order_id: 0, // 订单id
          // productNums: [], // 该订单下的商品编号
          productNames: [], // 该订单下的商品数组
          productRetailprice: [], // 该订单下每个商品的单价
          productNumbers: [], // 每个商品买了多少数量
          all_price: 0, // 该订单下的商品总价
          account: '', // 该订单的用户
          createtime: '', // 该订单的创建时间
          reminder: 0, // 该订单是否被提醒发货
          state: '', // 该订单的状态
          address: '', // 该订单的收货地址
          receivephone: '', // 该订单的收货人联系电话
          receiveperson: '', // 该订单的收货人姓名
        };
        orderList.push(everyProduct); // 则在订单列表中加入一个该订单
      }
      if (element.state === 1) {
        everyProduct.state = '待付款';
      } else if (element.state === 2) {
        everyProduct.state = '待发货';
      } else if (element.state === 3) {
        everyProduct.state = '待收货';
      } else if (element.state === 4) {
        everyProduct.state = '已完成';
      }
      everyProduct.order_id = element.id;
      everyProduct.reminder = element.reminder;
      everyProduct.productNames.push(element.name);
      // everyProduct.productNums.push(element.num);
      everyProduct.productNumbers.push(element.product_number);
      everyProduct.productRetailprice.push(element.retailprice);
      everyProduct.all_price += element.retailprice * element.product_number;
      everyProduct.account = element.account;
      everyProduct.createtime = element.createtime;
      everyProduct.address = element.address;
      everyProduct.receivephone = element.receivephone;
      everyProduct.receiveperson = element.receiveperson;
    });
    // console.log(orderList);
    return orderList;
  }
  // 提交订单
  async submitorder(body) {
    body.createtime = formatDateTime(new Date());
    const userinfo = await this.app.mysql.get('user', { user_account: body.account });
    const uid = userinfo.id;
    body.uid = uid;
    // console.log(Math.round(body.thisdiscountintegral));
    const row = {
      createtime: body.createtime,
      uid: body.uid,
      account: body.account,
      address: body.address,
      receivephone: body.receivephone,
      receiveperson: body.receiveperson,
      total: body.total,
      idealistictotal: Math.round(body.idealistictotal),
      checked: body.checked,
      thisdiscountintegral: body.thisdiscountintegral,
    };
    const order = await this.app.mysql.insert('orderlist', row); // 向orderlist表加数据
    // console.log(order.insertId); // 返回订单id
    // 拿到上面的订单id,向关联表加数据
    const arr = [];
    body.productlist.forEach(everyproduct => {
      this.app.mysql.insert('order_product', {
        order_id: order.insertId,
        product_id: everyproduct.product_id,
        product_number: everyproduct.amount,
      });
      arr.push(everyproduct.product_id);
    });
    if (arr.length) {
      const result = {
        code: 1,
        msg: 'success',
        orderid: order.insertId,
      };
      return result;
    }
  }

  // 所有订单
  async allorderlist(userAccount) {
    const allorderList = await this.app.mysql.select('orderlist', {
      where: { account: userAccount },
    });
    return { allorderList };
  }
  // 订单详情
  async seeorderdetail(body) {
    // console.log(body.id);
    const orderproductResult = await this.app.mysql.query(`select orderlist.id,orderlist.total,product_id,name,retailprice,product_number,account,address,reminder,receivephone,receiveperson,state,createtime from orderlist inner join order_product on orderlist.id=order_product.order_id inner join product on product.id=order_product.product_id where orderlist.id='${body.id}'`);
    console.log(orderproductResult);
    const orderList = [];
    orderproductResult.forEach(element => {
      let everyProduct = orderList.find(item => item.order_id === element.id);
      if (!everyProduct) { // 如果该订单id还未放进订单表
        everyProduct = {
          order_id: 0, // 订单id
          aboutThisOrder: [], // 存放该订单下的所有商品（每个商品以{}形式呈现）
          all_price: 0, // 该订单下的商品总价
          total: 0, // 该订单实付
          account: '', // 该订单的用户
          createtime: '', // 该订单的创建时间
          reminder: 0, // 该订单是否被提醒发货
          state: '', // 该订单的状态
          address: '', // 该订单的收货地址
          receivephone: '', // 该订单的收货人联系电话
          receiveperson: '', // 该订单的收货人姓名
        };
        orderList.push(everyProduct); // 则在订单列表中加入一个该订单
      }
      if (element.state === 1) {
        everyProduct.state = '待付款';
      } else if (element.state === 2) {
        everyProduct.state = '待发货';
      } else if (element.state === 3) {
        everyProduct.state = '待收货';
      } else if (element.state === 4) {
        everyProduct.state = '已完成';
      }
      everyProduct.order_id = element.id;
      everyProduct.reminder = element.reminder;
      const aboutThisPro = {
        product_id: 0,
        name: '',
        product_number: 0,
        retailprice: 0,
      };
      aboutThisPro.product_id = element.product_id;
      aboutThisPro.name = element.name;
      aboutThisPro.product_number = element.product_number;
      aboutThisPro.retailprice = element.retailprice;
      everyProduct.aboutThisOrder.push(aboutThisPro);
      everyProduct.all_price += element.retailprice * element.product_number; // 原价(未使用积分优惠)
      everyProduct.total = element.total; // 实际价格(可能使用了积分优惠)
      everyProduct.account = element.account;
      everyProduct.createtime = element.createtime;
      everyProduct.address = element.address;
      everyProduct.receivephone = element.receivephone;
      everyProduct.receiveperson = element.receiveperson;
    });
    orderList[0].all_price = orderList[0].all_price.toFixed(2);
    // console.log(orderList);
    return orderList[0];
  }

  // 待支付订单
  async waitpaylist(userAccount) {
    const waitpayList = await this.app.mysql.select('orderlist', {
      where: { account: userAccount, state: 1 },
    });
    return { waitpayList };
  }
  // 待发货订单
  async waitdeliverlist(userAccount) {
    const waitdeliverList = await this.app.mysql.select('orderlist', {
      where: { account: userAccount, state: 2 },
    });
    return { waitdeliverList };
  }
  // 待收货订单
  async waitreceivelist(userAccount) {
    const waitreceiveList = await this.app.mysql.select('orderlist', {
      where: { account: userAccount, state: 3 },
    });
    return { waitreceiveList };
  }
  // 已完成订单
  async completelist(userAccount) {
    const waitreceiveList = await this.app.mysql.select('orderlist', {
      where: { account: userAccount, state: 4 },
    });
    return { waitreceiveList };
  }
  // 去支付
  async topay(body) {
    const row = {
      id: body.order_id,
      state: 2, // 待发货
    };
    const result = await this.app.mysql.update('orderlist', row); // 修改订单状态为2
    return { result };
  }

  // 去改变已售商品数量
  async selledupdate(body) {
    // 给商品表加数量selled
    const proArray = await this.app.mysql.select('order_product', { // 购买的商品数组（id和number）
      where: { order_id: body },
    });
    let resultLength = 0;
    for (let i = 0; i < proArray.length; i++) {
      const searchselled = await this.app.mysql.get('product', { // 查商品表 为了拿到每个商品的selled
        id: proArray[i].product_id,
      });
      const row = {
        id: proArray[i].product_id,
        selled: searchselled.selled + proArray[i].product_number,
      };
      const selledresult = await this.app.mysql.update('product', row);
      if (selledresult.affectedRows === 1) {
        resultLength++;
      }
    }
    if (resultLength === proArray.length) { // 订单中的商品数量都加完了
      return 1;
    }
  }
  // 提醒发货
  async remindshipment(body) {
    const row = {
      id: body.order_id,
      reminder: 1, // 确认收货
    };
    const result = await this.app.mysql.update('orderlist', row); // 更新 orderlist 表中的记录
    return { result };
  }
  // 卖家发货
  async todeliver(body) {
    const row = {
      id: body.order_id,
      state: 3, // 待收货
    };
    const result = await this.app.mysql.update('orderlist', row); // 更新 orderlist 表中的记录
    return { result };
  }
  // 确认收货
  async confirmreceipt(body) {
    const row = {
      id: body.order_id,
      state: 4, // 已完成
    };
    const result = await this.app.mysql.update('orderlist', row); // 更新 orderlist 表中的记录
    return { result };
  }
}

module.exports = OrderService;
