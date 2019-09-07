<template>
    <div class="layout">
        <Layout  :style="{width:'100vw',height:'100vh',position:'relative'}">
            <Sider breakpoint="md" collapsible :collapsed-width="78">
                <Menu active-name="1-4" theme="dark" width="auto">
                  <MenuItem name="1-1" to="/statistics">
                      <Icon type="ios-search"></Icon>
                      <span>统计</span>
                  </MenuItem>
                  <MenuItem name="1-2" to="/vip">
                      <Icon type="ios-search"></Icon>
                      <span>会员</span>
                  </MenuItem>
                  <MenuItem name="1-3" to="/product">
                      <Icon type="ios-settings"></Icon>
                      <span>商品</span>
                  </MenuItem>
                  <MenuItem name="1-4" to="/order">
                      <Icon type="ios-settings"></Icon>
                      <span>订单</span>
                  </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout :style="{paddingBottom:'5px'}">
                <Header class="layout-header-bar">
                  <div class="logout" @click="exit">
                    <span>退出登录</span>
                  </div>
                </Header>
                <Content :style="{width:'97%', height: '100%',margin: '20px', padding: '20px', background: '#fff', minHeight: '220px',overflowY:'auto',borderRadius:'6px',border:'1px solid #dcdee2' }">
                  <div class="table">
                      <Button type="primary"  @click="exportData(1)" style="float:right"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button>
                      <Input search enter-button style="width: auto;" placeholder="请输入搜索内容..." v-model="searchorder"/>
                      <div class="orderList">
                        <!-- 将search查询的结果绑定在模糊查询结果search上，而非整个列表上面 -->
                        <Table :loading="loading" :columns="columns1" :data="pageSearch" ref="table"></Table>
                        <br>
                          <!-- Change Loading Status <Switch v-model="loading"></Switch> -->
                      <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="dataCount" :current="currentPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
                        </div>
                      </div>
                      </div>
                  </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Axios from "axios";
const axios = require("axios");
export default {
  data () {
      return {
        modal1:false,
        loading: false,
        searchorder: '', // 模糊查询的内容
        orderList: [], // 商品列表
        dataCount: 0, // 数据总条数
        pageSize: 10, // 每一页多少条数据
        currentPage: 1, //当前第几页
        columns1: [
            {
                title: '订单ID',
                key: 'order_id',
                align: 'center'
            },
            {
                title: '商品名称',
                key: 'productNames',
                align: 'center'
            },
            {
                title: '商品总价',
                key: 'all_price',
                align: 'center'
            },
            {
                title: '下单账号',
                key: 'account',
                align: 'center'
            },
            {
                title: '创建时间',
                key: 'createtime',
                align: 'center'
            },
            {
                title: '订单状态',
                key: 'state',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                  if (params.row.state === '待发货' && params.row.reminder === 1) {
                  return h("div", [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => { // 催单发货
                            this.toDeliver(params.row.order_id); // 带着订单id去发货
                          }
                        }
                      },
                      "发货（已催单）"
                    ),
                    h('Button', {
                      props: {
                        type: 'info',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                            this.show(params.index)
                        }
                      }
                    }, '详情'),
                  ]);
                } else if (params.row.state === '待发货' && params.row.reminder === 0) {
                  return h("div", [
                    h(
                      "Button",
                      {
                        props: {
                          type: "warning",
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => { // 普通发货
                            this.toDeliver(params.row.order_id); // 带着订单id去发货
                          }
                        }
                      },
                      "发货"
                    ),
                    h('Button', {
                      props: {
                        type: 'info',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                            this.show(params.index)
                        }
                      }
                    }, '详情'),
                  ]);
                } else if (params.row.state !== '待发货') {
                  return h("div", [
                    h('Button', {
                      props: {
                        type: 'info',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                            this.show(params.index)
                        }
                      }
                    }, '详情'),
                  ]);
                }
                }
            }
        ],
      }
  },

  methods: {
    // 去发货
    toDeliver(id){
      this.updateLoading = true;
      let api = "/apis/client/todeliver";
      Axios.post(api, {
        order_id: id,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          // this.getWaitDeliverList();
          this.orderproductlist();
          this.$message({
            message: '发货成功',
            type: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
      });
    },
    exit(){
      let api = "/apis/logout";
      Axios.post(api, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response);
        if(response.data.code === 1 && response.data.msg === '退出成功'){ //
          this.$router.push({ path: '/' });
        }
      }).catch(error => {
        console.log(error);
      });

    },
    // 订单详情
    show (index) {
        this.$Modal.info({
            title: '订单详情',
            // width="300",
            content:
            `
            订单号：${this.orderList[index].order_id}<br>
            下单账号：${this.orderList[index].account}<br>
            创建时间：${this.orderList[index].createtime}<br>
            商品总价：${this.orderList[index].all_price}<br>
            商品名称：${this.orderList[index].productNames}<br>
            商品数量：${this.orderList[index].productNumbers}<br>
            商品单价：${this.orderList[index].productRetailprice}<br>
            订单状态：${this.orderList[index].state}<br>
            收货人姓名：${this.orderList[index].receiveperson}<br>
            收货人电话：${this.orderList[index].receivephone}<br>
            收货人地址：${this.orderList[index].address}<br>
            `
        })
    },

    // 导出数据
    exportData (type) {
        if (type === 1) {
            this.$refs.table.exportCsv({
                filename: '订单列表'
            });
        }
    },

    // 获取订单列表
    orderproductlist(){
      let api='/apis/orderproductlist';
      axios.get(api)
      .then((response)=>{
        console.log(response);
        this.orderList=response.data.reverse();
        this.dataCount = this.orderList.length
      })
      .catch((error)=> {
          console.log(error);
      });
    },
    // 点击页码的时候触发，返回当前页码
    changePage(index){
      this.currentPage = index;
    }
  },
  computed: {
    //  模糊查询订单列表
      search(){
      let searchdata = this.searchorder;
        if (searchdata) {
          return this.orderList.filter(function(order) {
            return Object.keys(order).some(function(key) {
              return String(order[key]).toLowerCase().indexOf(searchdata) > -1
            })
          })
        }
      return this.orderList;
    },

    // 分页查询
    pageSearch(){
      let _start = ( this.currentPage - 1 ) * this.pageSize;
      let _end = this.currentPage * this.pageSize;
      let pageData = [];
      pageData = this.search.slice(_start,_end);
      // console.log()
      return pageData;
    }
  },
  mounted(){
    this.orderproductlist();
  }
};
</script>

<style>
  .logout{
    float:right;
    font-weight: bold;
    color: #515a6e;
    cursor: pointer;
  }
  .logout :hover{
    color: #ccc
  }
  .table{
    margin-right:10px;
  }
  .orderList{
    margin-top: 20px
  }
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100vh;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 3px 2px
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .ivu-modal{
    width: 60%!important;
    height: 70%!important;
    margin: 40px auto!important;
  }
</style>