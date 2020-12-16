<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar class="img" :size="100" icon="user" />
            <h1 class="info-content-name">{{ user.username }}</h1>
            <h4 class="info-content-ins">{{ user.ins }}</h4>
            <!-- 指数展示待优化 -->
            <ul class="index-table">
              <li class="index-item">
                <p class="top-word">H指数</p>
                <p class="index-number">{{ user.hindex }}</p>
              </li>
              <li class="index-item">
                <p class="top-word">G指数</p>
                <p class="index-number">{{ user.gindex }}</p>
              </li>
              <li class="index-item">
                <p class="top-word">成果数</p>
                <p class="index-number">{{ count }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="actions">
          <a-button class="btn">修改个人信息</a-button>
          <a-button class="btn" type="primary">添加个人经历</a-button>
        </div>
      </div>
      <div class="down-block">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="主页" force-render>
            <div class="intro">
              <div class="echart" id="main"></div>
              <a-divider></a-divider>
              <div class="relation-echart" id="relation"></div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="项目">
            <div class="selections">
              <a-menu
                style="width: 248px"
                :default-selected-keys="['1']"
                :open-keys.sync="openKeys"
                mode="inline"
                @click="handleClick"
              >
                <a-sub-menu key="sub1" @titleClick="titleClick">
                  <span slot="title"><span>Navigation One</span></span>
                  <a-menu-item-group key="g1">
                    <template slot="title"><span>Item 1</span> </template>
                    <a-menu-item key="1">
                      Option 1
                    </a-menu-item>
                    <a-menu-item key="2">
                      Option 2
                    </a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group key="g2" title="Item 2">
                    <a-menu-item key="3">
                      Option 3
                    </a-menu-item>
                    <a-menu-item key="4">
                      Option 4
                    </a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu key="sub2" @titleClick="titleClick">
                  <span slot="title"><span>Navigation Two</span></span>
                  <a-menu-item key="5">
                    Option 5
                  </a-menu-item>
                  <a-menu-item key="6">
                    Option 6
                  </a-menu-item>
                  <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="7">
                      Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                      Option 8
                    </a-menu-item>
                  </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                  <span slot="title"><span>Navigation Three</span></span>
                  <a-menu-item key="9">
                    Option 9
                  </a-menu-item>
                  <a-menu-item key="10">
                    Option 10
                  </a-menu-item>
                  <a-menu-item key="11">
                    Option 11
                  </a-menu-item>
                  <a-menu-item key="12">
                    Option 12
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
            <div class="results">
              <h3>发表项目</h3>
              <a-divider></a-divider>
              <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta :description="item.description">
                    <a slot="title" href="https://www.antdv.com/">{{
                      item.title
                    }}</a>
                    <img
                      style="height:50px;width:55px"
                      slot="avatar"
                      :src="item.src"
                    />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="成果">
            <div class="selections">
              <a-menu
                style="width: 248px"
                :default-selected-keys="['1']"
                :open-keys.sync="openKeys"
                mode="inline"
                @click="handleClick"
              >
                <a-sub-menu key="sub1" @titleClick="titleClick">
                  <span slot="title"><span>Navigation One</span></span>
                  <a-menu-item-group key="g1">
                    <template slot="title"><span>Item 1</span> </template>
                    <a-menu-item key="1">
                      Option 1
                    </a-menu-item>
                    <a-menu-item key="2">
                      Option 2
                    </a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group key="g2" title="Item 2">
                    <a-menu-item key="3">
                      Option 3
                    </a-menu-item>
                    <a-menu-item key="4">
                      Option 4
                    </a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu key="sub2" @titleClick="titleClick">
                  <span slot="title"><span>Navigation Two</span></span>
                  <a-menu-item key="5">
                    Option 5
                  </a-menu-item>
                  <a-menu-item key="6">
                    Option 6
                  </a-menu-item>
                  <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="7">
                      Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                      Option 8
                    </a-menu-item>
                  </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                  <span slot="title"><span>Navigation Three</span></span>
                  <a-menu-item key="9">
                    Option 9
                  </a-menu-item>
                  <a-menu-item key="10">
                    Option 10
                  </a-menu-item>
                  <a-menu-item key="11">
                    Option 11
                  </a-menu-item>
                  <a-menu-item key="12">
                    Option 12
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
            <div class="results">
              <h3>发表成果</h3>
              <a-divider></a-divider>
              <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta :description="item.description">
                    <a slot="title" href="https://www.antdv.com/">{{
                      item.title
                    }}</a>
                    <img
                      style="height:50px;width:55px"
                      slot="avatar"
                      :src="item.src"
                    />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="影响力">
            <div class="influence">Content of Tab Pane 4</div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
const data = [
  {
    title: "成果 1",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg"
  },
  {
    title: "成果 2",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg"
  },
  {
    title: "成果 3",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg"
  },
  {
    title: "成果 4",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg"
  }
];
export default {
  components: {
    // personNav,
  },
  data() {
    return {
      data,
      loginid: 0,
      pageid: 0,
      current: ["mail"],
      openKeys: ["sub1"],
      user: {
        username: "陈志刚",
        ins: "中南大学",
        hindex: 1,
        gindex: 2
      },
      count: 10
    };
  },
  mounted() {
    this.initEchart();
    this.drawLine();
  },
  methods: {
    initEchart() {
      let myChart = this.$echarts.init(document.getElementById("relation"));
      let option = {
        title: {
          text: "按年份展示发表情况"
        },
        tooltip: {
          trigger: "axis"
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 20
          },
          {
            type: "inside",
            xAxisIndex: 0,
            start: 0,
            end: 20
          },
          {
            type: "slider",
            yAxisIndex: 0,
            start: 0,
            end: 50
          },
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 50
          }
        ],
        legend: {
          data: ["项目", "专利", "文献"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2008年",
            "2009年",
            "2010年",
            "2011年",
            "2012年",
            "2013年",
            "2014年",
            "2015年",
            "2016年",
            "2017年",
            "2018年",
            "2019年",
            "2020年"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "项目",
            type: "line",
            stack: "总量",
            data: [2, 3, 5, 10, 12, 2, 0, 2, 3, 5, 10, 12, 2, 0]
          },
          {
            name: "专利",
            type: "line",
            stack: "总量",
            data: [2, 3, 5, 10, 12, 2, 0, 2, 3, 5, 10, 12, 2, 0]
          },
          {
            name: "文献",
            type: "line",
            stack: "总量",
            data: [
              150,
              232,
              201,
              154,
              190,
              330,
              410,
              150,
              232,
              201,
              154,
              190,
              330,
              410
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "发表成果情况",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["项目", "专利", "文献"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 2, name: "项目" },
              { value: 14, name: "专利" },
              { value: 547, name: "文献" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      let currentIndex = -1;
      setInterval(function() {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1500);
    },

    callback(key) {
      console.log(key);
    },
    toPro() {
      //跳转到项目展示页面，带参数
      // this.$router.push("/Pro");
    },
    toPaper() {
      //跳转到项目文献页面，带参数
      // this.$router.push("/Paper");
    },
    toPatent() {
      //跳转到专利展示页面，带参数
      // this.$router.push("/Patent");
    }

    //待补充好多好多好多获取数据的函数接口调用
    //举个栗子：根据不同的条件检索，获取当前用户的各种学术成果，管理个人学术成果等
  }
};
</script>
<style scoped>
.main-block {
  width: 1200px;
  height: 2500px;
  margin: auto;
  border: solid 1px grey;
}
.up-block {
  border: solid 1px red;
  width: 1100px;
  height: 250px;
  margin: auto;
  background-color: #f0f0f0f0;
}
.down-block {
  border: solid 1px blue;
  width: 1100px;
  height: 1300px;
  margin: auto;
}

.user-info {
  border: solid 1px black;
  width: 550px;
  height: 200px;
  margin: 10px;
}
.avatar {
  height: 120px;
  width: 500px;
  margin: 20px;
  /* border: solid 5px white; */
}
.img {
  margin: auto;
  /* border: solid 1px red; */
}
.info-content-name {
  width: 200px;
  /* border: solid 1px black; */
  margin: -100px auto 0 120px;
}
.info-content-ins {
  width: 100px;
  /* border: solid 1px red; */
  margin: -5px auto 10px 120px;
}
.info-content-index {
  width: 250px;
  /* border: solid 1px purple; */
  margin: 20px auto 10px 120px;
}
.actions {
  padding-top: 10px;
  border: solid 1px black;
  width: 150px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 10px 10px 10px;
}
.selections {
  border: solid 1px black;
  width: 250px;
  height: 800px;
  margin: 10px 10px 10px 10px;
}
.results {
  padding: 10px 15px 10px 15px;
  border: solid 1px black;
  width: 800px;
  height: 800px;
  display: block;
  float: right;
  margin: -810px 10px 35px 280px;
}
.btn {
  width: 120px;
  border: solid 1px black;
  margin: 15px;
}
.intro {
  border: solid 1px black;
  width: 750px;
  height: 1200px;
  margin: 10px;
}
.influence {
  border: solid 1px black;
  width: 1080px;
  height: 800px;
  margin: 10px;
}
ul,
li {
  list-style: none;
}
.index-table {
  /* border: solid 1px brown; */
  width: 310px;
  display: inline-block;
  height: 80px;
  margin: 10px 0px 18px 82px;
  overflow: hidden;
}
.index-item {
  float: left;
  margin-right: 10px;
  font-size: 20px;
  width: 78px;
  border-right: 1px solid rgb(239, 239, 239);
}
.top-word {
  font-size: 12px;
}
.index-number {
  font-size: 20px;
  color: black;
}
.echart {
  border: solid 1px blue;
  width: 700px;
  height: 300px;
  margin: 10px;
}
.relation-echart {
  border: solid 1px brown;
  width: 700px;
  height: 500px;
  margin: 10px;
}
</style>
