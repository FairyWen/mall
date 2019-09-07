<template>
    <div class="layout">
        <Layout  :style="{width:'100vw',height:'100vh',position:'relative'}">
            <Sider breakpoint="md" collapsible :collapsed-width="78">
                <Menu active-name="1-2" theme="dark" width="auto">
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
                    <Button type="primary" @click="exportData(1)" style="float:right">
                      <Icon type="ios-download-outline"></Icon>导出原始数据
                    </Button>
                    <Input search enter-button style="width: auto;" placeholder="请输入搜索内容..." v-model="searchvip"/>
                    <div class="vipList">
                      <!-- 将search查询的结果绑定在模糊查询结果search上，而非整个列表上面 -->
                      <Table :loading="listLoading" :columns="columns1" :data="pageSearch" ref="table"></Table>
                      <br/>
                      <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="dataCount" :current="currentPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
                        </div>
                      </div>
                    </div>
                    <a-modal v-model="visibleUpdate" title="修改会员信息" onOk="handleOk">  <!-- 在当前页面打开一个浮层，用于修改会员信息 -->
                      <template slot="footer">
                        <a-button key="back" @click="handleCancelUpdate">返回</a-button>
                        <a-button key="submit" type="primary" :loading="updateLoading" @click="updateHandleOk">提交</a-button>
                      </template>
                      <Form :model="updateVip" label-position="left" :label-width="100">
                        <FormItem label="用户账号：">
                          <Input disabled v-model="updateVip.user_account" />
                        </FormItem>
                        <FormItem label="用户电话：">
                          <Input v-model="updateVip.phone" />
                        </FormItem>
                        <FormItem label="用户总积分：">
                          <InputNumber :min="0" v-model="updateVip.all_integral"></InputNumber>
                        </FormItem>
                        <FormItem label="剩余积分：">
                          <InputNumber :min="0" v-model="updateVip.integral"></InputNumber>
                        </FormItem>
                      </Form>
                    </a-modal>
                  </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Axios from "axios";
const axios = require("axios");
import img1 from "../images/m1.jpg";
export default {
  data() {
    return {
      // index: 0,
      vipList: [],  //会员列表
      value1: 0,
      searchvip: '', //模糊查询搜索内容
      dataCount: 0, // 数据总条数
      pageSize: 10, // 每一页多少条数据
      currentPage: 1, //当前第几页
      listLoading: false,
      visibleUpdate: false,// 修改弹窗界面是否显示
      updateLoading: false,// 修改时加载是否启动
      updateVip: {  //修改的会员的属性
        id: 0,
        user_account: "",
        password: "",
        phone: "",
        all_integral: 0,
        integral: 0,
      },
      columns1: [
        {
          title: "会员ID",
          key: "id",
          align: 'center',
        },{
          title: "会员账号",
          key: "user_account",
          align: 'center',
        },{
          title: "会员电话",
          key: "phone",
          align: 'center',
        },{
          title: "会员等级",
          key: "vip",
          align: 'center',
        },{
          title: "会员总积分",
          key: "all_integral",
          align: 'center',
        },{
          title: "剩余积分",
          key: "integral",
          align: 'center',
        },{
          title: "可抵金额(元)",
          key: "money",
          align: 'center',
        },{
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      const id = params.row.id; //拿到需要删除会员的id
                      let api = "/apis/vipdelete";
                      Axios.post(api, {
                        id: id
                      }).then(response => {
                        console.log(response);
                        //判断后台是否删除会员成功，若成功，则前端界面也去删除该商品
                        if (
                          response.data.msg === "success" &&
                          response.data.code === 1
                        ) {
                          this.remove(params.index);
                        }
                      }).catch(error => {
                        console.log(error);
                      });
                    }
                  }
                },
                "删除"),
              h("Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showModalUpdate(params.row.id); //参数为当前需要修改的商品的索引值
                    }
                  }
                },
                "修改")
            ]);
          }
        }
      ]
    };
  },
  methods: {
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

    //导出会员列表到excel表
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "会员列表"
        });
      }
    },

    //获取会员列表
    getVipList() {
      let api = "/apis/viplist";
      axios.get(api).then(response => {
        this.vipList = response.data.reverse();
        this.dataCount = this.vipList.length
      })
      .catch(error => {
        console.log(error);
      });
    },

    //删除会员
    remove(index) {
      this.vipList.splice(index, 1);
    },

    // 打开修改商品的浮层
    showModalUpdate(id) {
      let thisarr = this.vipList.filter(item => {
        if(item.id === id){
          return true;
        } else {
          return false;
        }
      })
      this.updateVip.id = id;
      this.updateVip.user_account = thisarr[0].user_account;
      this.updateVip.password = thisarr[0].password;
      this.updateVip.phone = thisarr[0].phone;
      this.updateVip.all_integral = thisarr[0].all_integral;
      this.updateVip.integral = thisarr[0].integral;
      this.visibleUpdate = true;
    },

    // 退出当前修改界面浮层，返回到列表界面
    handleCancelUpdate(e) {
      this.visibleUpdate = false;
    },

    // 提交修改之后的会员信息
    updateHandleOk(e) {
      this.updateLoading = true;
      let api = "/apis/vipupdate";
      Axios.post(api, {
        headers: {
          "Content-Type": "application/json"
        },
        id: this.updateVip.id,
        user_account: this.updateVip.user_account,
        password: this.updateVip.password,
        phone: this.updateVip.phone,
        all_integral: this.updateVip.all_integral,
        integral: this.updateVip.integral,
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.updateLoading = false;
          this.visibleUpdate = false;
          this.getVipList();
        }
      }).catch(error => {
        console.log(error);
      });
    },

    // 点击页码的时候触发，返回当前页码
    changePage(index){
      this.currentPage = index;
    }
  },

  computed: {
    //  模糊查询会员列表
      search(){
      let searchdata = this.searchvip;
        if (searchdata) {
          return this.vipList.filter(function(vip) {
            return Object.keys(vip).some(function(key) {
              return String(vip[key]).toLowerCase().indexOf(searchdata) > -1
            })
          })
        }
      return this.vipList;
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
  mounted() {
    this.getVipList();
  }
};
</script>

<style scoped>
  .table{
    margin-right:10px;
  }
  .logout{
    float:right;
    font-weight: bold;
    color: #515a6e;
    cursor: pointer;
  }
  .logout :hover{
    color: #ccc
  }
  .vipList {
    margin-top: 20px;
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
</style>