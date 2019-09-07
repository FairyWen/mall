<template>
    <div class="layout">
        <Layout  :style="{width:'100vw',height:'100vh',position:'relative'}">
            <Sider breakpoint="md" collapsible :collapsed-width="78">
                <Menu active-name="1-3" theme="dark" width="auto">
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
                    <Button type="primary" class="add" @click="showModalAdd()">新增</Button>
                    <Input search enter-button style="width: auto;" placeholder="请输入搜索内容..." v-model="searchproduct"/>
                    <div class="productList">
                      <Table :loading="listLoading" :columns="columns1" :data="pageSearch" ref="table"></Table> <!-- 将table数据绑定在分页查询结果pageData上，而非整个列表上面 -->
                      <br />
                      <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="dataCount" :current="currentPage" :page-size="pageSize" show-total @on-change="changePage"></Page>
                        </div>
                      </div>
                    </div>
                    <a-modal v-model="visibleUpdate" title="修改商品信息" onOk="handleOk">  <!-- 在当前页面打开一个浮层，用于修改商品功能 -->
                      <template slot="footer">
                        <a-button key="back" @click="handleCancelUpdate">返回</a-button>
                        <a-button key="submit" type="primary" :loading="updateLoading" @click="updateHandleOk">提交</a-button>
                      </template>
                      <Form :model="updateProduct" label-position="left" :label-width="100">
                        <FormItem label="商品ID：">
                          <Input v-model="updateProduct.id" disabled/>
                        </FormItem>
                        <FormItem label="商品名称：">
                          <Input v-model="updateProduct.name" />
                        </FormItem>
                        <FormItem label="商品描述：">
                          <Input v-model="updateProduct.desc" />
                        </FormItem>
                        <FormItem label="商品规格">
                          <Input v-model="updateProduct.specification" />
                        </FormItem>
                        <FormItem label="商品售价：">
                          <InputNumber :min="0" v-model="updateProduct.retailprice"></InputNumber>
                        </FormItem>
                        <FormItem label="库存数量：">
                          <InputNumber :min="0" v-model="updateProduct.remainingamount"></InputNumber>
                        </FormItem>
                        <FormItem label="商品分类：">
                          <Select v-model="updateProduct.classification" style="width:100px">
                              <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="上传图片：">
                          <el-upload
                            class="upload-demo"
                            action="/apis/productimg"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :on-success="handleAvatarSuccess1"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </FormItem>
                      </Form>
                    </a-modal>
                    <a-modal v-model="visibleAdd" title="新增商品信息" onOk="handleOk"> <!-- 在当前页面打开一个浮层，用于新增商品功能 -->
                      <template slot="footer">
                        <a-button key="back" @click="handleCancelAdd">返回</a-button>
                        <a-button key="submit" type="primary" :loading="addLoading" @click="addHandleOk">提交</a-button>
                      </template>
                      <Form :model="addProduct" label-position="left" :label-width="100">
                        <FormItem label="商品名称：">
                          <Input v-model="addProduct.name" />
                        </FormItem>
                        <FormItem label="商品描述：">
                          <Input v-model="addProduct.desc" />
                        </FormItem>
                        <FormItem label="商品规格">
                          <Input v-model="addProduct.specification" />
                        </FormItem>
                        <FormItem label="商品售价：">
                          <InputNumber :min="0" v-model="addProduct.retailprice"></InputNumber>
                        </FormItem>
                        <FormItem label="库存数量：">
                          <InputNumber :min="0" v-model="addProduct.remainingamount"></InputNumber>
                        </FormItem>
                        <FormItem label="商品分类：">
                          <Select v-model="addProduct.classification" style="width:100px">
                              <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="上传图片：">
                          <el-upload
                            class="upload-demo"
                            action="/apis/productimg"
                            :limit=1
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :on-success="handleAvatarSuccess"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
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
      classList: [
        {
            value: '1',
            label: '口红/唇膏/唇釉'
        },
        {
            value: '2',
            label: '粉底液/气垫/隔离'
        },
        {
            value: '3',
            label: '眉笔/眉粉/眼线笔/眼影'
        },
        {
            value: '4',
            label: '柔肤水/乳/精华'
        },
        {
            value: '5',
            label: '面霜/早晚霜'
        },
        {
            value: '6',
            label: '眼精华/眼霜'
        },
        {
            value: '7',
            label: '粉饼/散粉/腮红'
        },
        {
            value: '8',
            label: '防晒霜/防晒喷雾'
        }
      ],
      // index: 0,
      dataCount: 0, // 数据总条数
      pageSize: 5, // 每一页多少条数据
      currentPage: 1, //当前第几页
      searchproduct: '', // 模糊查询的内容
      productList: [],  //商品列表
      updateProduct: {  //修改的商品的属性
        name: "",
        retailprice: 0,
        remainingamount: 0,
        imgurl: '',
        desc:'',
        specification:'',
        classification:'',
      },
      addProduct:{  //添加的商品的属性
        name: "",
        retailprice: 0,
        remainingamount: 0,
        imgurl:'',
        desc:'',
        specification:'',
        classification:'',
      },
      value1: 0,
      visibleUpdate: false,
      visibleAdd: false,
      listLoading: false,
      updateLoading: false,
      addLoading:false,
      columns1: [
        {
          title: "商品ID",
          key: "id",
          align: 'center',
        },{
          title: "商品名称",
          key: "name",
          align: 'center',
        },{
          title: "商品描述",
          key: "desc",
          align: 'center',
        },{
          title: "商品售价",
          key: "retailprice",
          sortable: true,
          align: 'center',
        },{
          title: "库存数量",
          key: "remainingamount",
          align: 'center',
          sortable: true
        },{
          title: "图片",
          key: "imgurl",
          align: 'center',
          columns: {
              'width':'50px'
          },
          render: (h, params) => {
              return h('div', [
                  h('img', {
                      attrs: {
                          src: params.row.imgurl
                      },
                      style: {
                          width: '120px',
                          height: '100px',
                          margin: '10px',
                          'border-radius': '5px'
                      }
                  }),
              ]);
          }
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
                      const id = params.row.id; //拿到需要删除商品的id
                      let api = "/apis/productdelete";
                      Axios.post(api, {
                        id: id
                      }).then(response => {
                        //判断后台是否删除商品成功，若成功，则前端界面也去删除该商品
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
                "下架"),
              h("Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.showModalUpdate(params.row.id); //参数为当前需要修改的商品的id
                    }
                  }
                },
                "修改")
            ]);
          }
        }
      ],
      fileList: []
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
    // 打开修改商品的浮层
    showModalUpdate(id) {
      let thisarr = this.productList.filter(item => {
        if(item.id === id){
          return true;
        } else {
          return false;
        }
      })
      this.updateProduct.id=id;
      this.updateProduct.name=thisarr[0].name;
      this.updateProduct.retailprice=thisarr[0].retailprice;
      this.updateProduct.remainingamount=thisarr[0].remainingamount;
      this.updateProduct.imgurl=thisarr[0].imgurl;
      this.updateProduct.desc=thisarr[0].desc;
      this.updateProduct.classification=String(thisarr[0].classification);
      this.updateProduct.specification=thisarr[0].specification;
      this.visibleUpdate = true;
    },

    // 打开新增商品的浮层
    showModalAdd(){
      this.visibleAdd = true;
      this.fileList = []; //上传图片之后清空历史列表
    },

    // 提交修改之后的商品信息
    updateHandleOk(e) {
      this.updateLoading = true;
      let api = "/apis/productupdate";
      Axios.post(api, {
        headers: {
          "Content-Type": "application/json"
        },
        id: this.updateProduct.id,
        name: this.updateProduct.name,
        retailprice: this.updateProduct.retailprice,
        remainingamount: this.updateProduct.remainingamount,
        imgurl: this.updateProduct.imgurl,
        desc: this.updateProduct.desc,
        classification: parseInt(this.updateProduct.classification),
        specification: this.updateProduct.specification
      }).then(response => {
        if (response.data.code === 1 && response.data.msg === "success") {
          this.updateLoading = false;
          this.visibleUpdate = false;
          this.getProductList();
        }
      }).catch(error => {
        console.log(error);
      });
    },

    // 提交新增的商品信息
    addHandleOk(e){
      console.log(parseInt(this.addProduct.classification));
      this.addLoading =true;
      let api = "/apis/productadd";
      Axios.post(api,{
        headers: {
          "Content-Type": "application/json"
        },
        num: this.addProduct.num,
        name: this.addProduct.name,
        desc: this.addProduct.desc,
        retailprice: this.addProduct.retailprice,
        remainingamount: this.addProduct.remainingamount,
        imgurl: this.addProduct.imgurl,
        desc: this.addProduct.desc,
        classification: parseInt(this.addProduct.classification),
        specification: this.addProduct.specification
      }).then(response => {
        this.fileList = [] 
        if(response.data.code === 1 && response.data.msg === "success"){
          this.addLoading = false;
          // 删除成功之后清空弹框内容
          this.addProduct.num="",
          this.addProduct.name="",
          this.addProduct.retailprice=0,
          this.addProduct.remainingamount=0,
          this.addProduct.imgurl="",
          this.addProduct.desc="",
          this.addProduct.specification="",
          this.addProduct.classification=0,

          this.visibleAdd = false;
          this.getProductList();
        }else if (response.data.code === 0 && response.data.msg === "fail"){
          alert("新增失败");
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 退出当前修改商品界面浮层，返回到列表界面
    handleCancelUpdate(e) {
      this.visibleUpdate = false;
    },

    // 退出当前新增商品界面浮层，返回到列表界面
    handleCancelAdd(e){
      this.visibleAdd = false;
    },

    //删除商品
    remove(index) {
      this.productList.splice(index, 1);
    },

    //导出商品列表到excel表
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "商品列表"
        });
      }
    },

    //获取商品列表
    getProductList() {
      let api = "/apis/productlist";
      axios.get(api).then(response => {
        console.log(response);
        this.productList = response.data.productList.reverse();
        this.dataCount = this.productList.length
      })
      .catch(error => {
        console.log(error);
      });
    },

    // 上传新增的图片
    handleAvatarSuccess(res, file) {//上传成功
      this.addProduct.imgurl = res.urling;
      console.log(res.data)
      console.log(res.urling);
    },
    // 上传修改的图片
    handleAvatarSuccess1(res, file) {//上传成功
      this.updateProduct.imgurl = res.urling;
      console.log(res.data)
      console.log(res.urling);
    },
    handleRemove(file, fileList) {  //移除图片
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    // 点击页码的时候触发，返回当前页码
    changePage(index){
      this.currentPage = index;
    }
  },
  computed: {

      // 模糊查询商品列表
    search(){
      let searchdata = this.searchproduct;
        if (searchdata) {
          return this.productList.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(searchdata) > -1
            })
          })
        }
      return this.productList;
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
    this.getProductList();
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
  .productList {
    margin-top: 20px;
  }
  .delete,.add {
    float: right;
    margin-right: 5px;
  }
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100vh;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 3px 2px;
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