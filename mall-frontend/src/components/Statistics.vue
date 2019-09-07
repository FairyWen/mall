<template>
    <div class="layout">
        <Layout  :style="{width:'100vw',height:'100vh',position:'relative'}">
            <Sider breakpoint="md" collapsible :collapsed-width="78">
                <Menu active-name="1-1" theme="dark" width="auto">
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
                    <div class="kindsOfProductSelled">
                      <p class="statitle">每类商品售出比例</p>
                      <div class="body" ref="kindsOfProductSelled"></div>
                    </div>
                    <div class="allProductSelled">
                      <p class="statitle">所有商品售量</p>
                      <div class="body" ref="allProductSelled"></div> <!--所有商品售量统计表格-->
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
        chart3: null,
        arrayX1: [], // 所有产品名称
        arrayY1: [], //所有产品售量
        allProductSelledList:[], // 所有产品名称和数量
        kindsOfProductSelledList:[], // 不同类型商品售出数量
      }
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
    initChart() {
      this.chart3 = this.$eCharts.init(this.$refs.allProductSelled) // 所有商品售量
      this.chart2 = this.$eCharts.init(this.$refs.kindsOfProductSelled) // 商品分类售出比例
    },
    kindsOfProductSelled() {
      let api = '/apis/getkindsofproductselled';
      return Axios.get(api).then((response) => {
        console.log(response);
        this.kindsOfProductSelledList = response.data;
      }).catch((error) => {
        console.log(error);
      }).finally(()=>{
        this.setChart2Option()
      })
    },
    allProductSelled() {
      let api = '/apis/getallproductselled';
      return Axios.get(api).then((response) => {
        // console.log(response);
        this.allProductSelledList = response.data;
        for (let i = 0; i < this.allProductSelledList.length; i++) {
          this.arrayX1[i] = this.allProductSelledList[i].name;
          this.arrayY1[i] = this.allProductSelledList[i].selled;
        }
      }).catch((error) => {
        console.log(error);
      }).finally(()=>{
        this.setChart3Option()
      })
    },
    setChart1Option(){
      this.chart1.setOption({
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
          // top: '10%',
          left: '1%',
          right: '20%',
          bottom: '3%',  
          containLabel: true
        },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
      });
    },
    setChart2Option(){
      this.chart2.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
          top: '2%',
          left: '1%',
          right: '8%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          // left: 'left',
          left: 20,
          // top: 20,
          bottom: 20,
          data: ['口红/唇膏/唇釉','粉底液/气垫/隔离','眉笔/眉粉/眼线笔/眼影','柔肤水/乳/精华','面霜/早晚霜','眼精华/眼霜','粉饼/散粉/腮红','防晒霜/防晒喷雾']
        },
        series : [
          {
            name: '种类',
            type: 'pie',
            radius : '80%',
            center: ['50%', '50%'],
            data: this.kindsOfProductSelledList,
            itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    setChart3Option(){
      this.chart3.setOption({
        color: ['#1e95cd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          // top: '10%',
          left: '1%',
          right: '20%',
          bottom: '3%',  
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.arrayX1,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: { // 坐标轴文本标签
            show: true,
            interval: 0,
            textStyle: {
              color: '#1e95cd',
              fontSize: 12,
              fontFamily: 'Verdana'
            },
            rotate:30,
          },
          axisLine: {
            lineStyle: {
              color: '#46879c',
              opacity: 0.3,
              type: 'solid',
              width: 2
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {//表格中的横线
            lineStyle: {
              color: '#46879c',
              opacity: 0.3,
            }
          },
          axisLabel: { // 纵坐标轴文本标签
            show: true,
            interval: 0,
            textStyle: {
              color: '#1e95cd',
              fontSize: 12,
              fontFamily: 'Verdana'
            }
          },
          axisLine: {
            lineStyle: {//Y轴那根线
              color: 'rgba(0,0,0,0)',
              type: 'solid',
              width: 2,
              shadowOffsetY: 3
            }
          }
        },
        series: [{
          name: '售出',
          barWidth: '20%',
          data: this.arrayY1,
          type: 'bar',
          itemStyle: {
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [4, 4, 0, 0],
              label: {
                // show: true,
                position: 'top',//放在顶部
                textStyle: {
                  color: '#a5b3c7',
                  fontSize: '12',
                  fontFamily: '微软雅黑',
                }
              }
            }
          },
        }]
      });
    }
  },
  mounted(){
    this.initChart()
    this.allProductSelled()
    this.kindsOfProductSelled()
    this.setChart1Option()
    this.sevenDayOrders()
  }
};
</script>

<style scoped lang="less">
.table{
  position: relative;
  width: 100%;
  margin-right: 10px;
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
.allProductSelled, .sevenDayOrders, .kindsOfProductSelled{
  display: inline-block;
  height: 300px;
  width: 98%;
  border-radius: 10px;
  border: solid 1px #ccc;
  margin:10px;
  padding: 10px;
}
.statitle{
  font-size: 16px;
  letter-spacing: 1px;
  color: #777777;
  font-weight: bold;
}
.body{
  float: left;
  width: 100%;
  height: 80%;
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