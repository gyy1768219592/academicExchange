<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar class="img" :size="100" icon="user" />
            <h1 class="info-content-name">{{ scholar.name }}</h1>
            <h4 class="info-content-ins">{{ scholar.organization }}</h4>
            <ul class="index-table">
              <li class="index-item">
                <p class="top-word">G指数</p>
                <p class="index-number">{{ scholar.gindex }}</p>
              </li>
              <li class="index-item">
                <p class="top-word">成果数</p>
                <p class="index-number">{{ count }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="actions">
          <a-button class="btn" @click="toPersonInfo">我要认证<a-icon type="user"/></a-button>
          <a-button v-if="!isFollow" class="btn" @click="subscribe">关注<a-icon type="star"/></a-button>
          <a-button v-else class="btn" @click="undoSubscribe">取消关注<a-icon type="star" theme="filled"/></a-button>
          <a-button class="btn" type="primary">发送私信<a-icon type="message"/></a-button>
        </div>
      </div>
      <div class="down-block">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="主页" force-render>
            <div class="intro">
              <div class="self-intro">
                <h2>个人简介</h2>
                <p>{{ scholar.introduction }}</p>
              </div>
              <a-divider></a-divider>
              <div class="echart" id="main"></div>
              <a-divider></a-divider>
              <div class="relation-echart" id="relation"></div>
            </div>
            <div class="experience">
              <a-timeline>
                <a-timeline-item v-for="(item, i) in workExperience" :key="i" :color="i == 0 ? 'blue' : 'gray'">
                  <div>
                    <p>{{ item.yearStart }} - {{ item.yearEnd }}</p>
                    <p>{{ item.organization }} - {{ item.introduction }}</p>
                  </div>
                </a-timeline-item>
              </a-timeline>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="项目">
            <div class="project-list">
              <scholarProject
                :projectTotal="projectTotal"
                :projectList="projectList"
                :scholarid="scholarid"
              ></scholarProject>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专利">
            <div class="patent-list">
              <scholarPatent :patentTotal="patentTotal" :patentList="patentList" :scholarid="scholarid"></scholarPatent>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="成果">
            <div class="paper-list">
              <scholarPaper :paperTotal="paperTotal" :paperList="paperList" :scholarid="scholarid"></scholarPaper>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
import navSearch from "@/components/navSearch";
import { postData } from "@/api/webpost";
import { getData } from "@/api/webget";
// import { putData } from "@/api/webput";
import scholarPatent from "@/components/scholarPatent.vue";
import scholarPaper from "@/components/scholarPaper.vue";
import scholarProject from "@/components/scholarProject.vue";
import { deleteData } from "@/api/webdelete";
import imgSrc from "../../assets/user.png";

export default {
  components: {
    navSearch,
    scholarProject,
    scholarPaper,
    scholarPatent,
  },
  data() {
    return {
      myChart: null,
      chartData: [],
      chartLink: [],
      pageid: 0,
      isFollow: false,
      scholarid: 13,
      userid: 18,
      user: {
        username: "陈志刚",
        ins: "中南大学",
        hindex: 1,
        gindex: 2,
        experience: [
          {
            position: "副教授",
            organization: "中科院",
            startyear: "2019",
            endyear: "2020",
          },
          {
            position: "研究员",
            organization: "中科院",
            startyear: "1998",
            endyear: "2019",
          },
          {
            position: "研究生",
            organization: "中科大",
            startyear: "1983",
            endyear: "1986",
          },
          {
            position: "本科生",
            organization: "中科大",
            startyear: "1979",
            endyear: "1983",
          },
        ],
      },
      workExperience: [],
      scholar: {
        scholarid: 13,
        name: "路路路",
        englishName: "lululu",
        title: "",
        organization: "",
        email: "",
        fans: 0,
        introduction: "",
        hindex: 0,
        gindex: 0,
        avatarUrl: "",
        citations: 0,
      },
      gotSList: [],
      count: 10,
      paperList: [],
      paperTotal: 0,
      patentList: [],
      patentTotal: 0,
      projectList: [],
      projectTotal: 0,
      barData: [],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    initEchart() {
      let dom = document.getElementById("relation");
      this.myChart = this.$echarts.init(dom);
      this.chartData = this.dataEChart();
      this.chartLink = this.linkEChart();
      let option = {
        title: { text: "合作学者图" },
        tooltip: {
          show: false,
        },
        series: [
          {
            edgeLabel: {
              normal: {
                formatter: "{c}",
                show: true,
              },
            },
            edgeSymbol: "circle",
            force: {
              repulsion: 2000,
            },
            layout: "force",
            roam: true,
            itemStyle: {
              normal: {
                color: "#6495ED",
              },
              //鼠标放上去有阴影效果
              emphasis: {
                shadowColor: "#3721db",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
              },
            },
            label: {
              normal: {
                show: true,
              },
            },
            //头像
            symbol: `image://${imgSrc}`,
            symbolSize: 86,
            type: "graph",
            links: this.chartLink,
            data: this.chartData,
          },
        ],
      };
      this.myChart.setOption(option);
      this.myChart.on("click", function(params) {
        console.log(params.data); //获取点击的头像的数据信息
      });
    },
    /**
     * 数据集合
     */
    dataEChart() {
      let data = [
        {
          name: "张1",
          symbolSize: 76,
          id: "1",
        },
        {
          name: "张2",
          symbolSize: 86,
          id: "2",
        },
        {
          name: "张3",
          symbolSize: 96,
          id: "3",
        },
        {
          name: "张4",
          symbolSize: 136,
          id: "4",
        },
        {
          name: "张5",
          id: "5",
        },
        {
          name: "张6",
          id: "6",
        },
        {
          name: "张7",
          id: "7",
        },
        {
          name: "张6",
          id: "8",
        },
      ];
      return data;
    },
    /**
     * 关系数据集合
     */
    linkEChart() {
      let dataLink = [
        { value: "合作学者", source: "1", target: "2" },
        { value: "合作学者", source: "1", target: "3" },
        { value: "合作学者", source: "1", target: "4" },
        { value: "合作学者", source: "1", target: "5" },
        { value: "合作学者", source: "1", target: "6" },
        { value: "合作学者", source: "1", target: "7" },
        { value: "合作学者", source: "1", target: "8" },
      ];
      return dataLink;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: { text: "发表成果数" },
        tooltip: {},
        xAxis: {
          data: ["专利", "项目", "文献"],
        },
        yAxis: {},
        series: [
          {
            name: "发表数",
            type: "bar",
            data: this.barData,
          },
        ],
      });
    },
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    callback(key) {
      console.log(key);
    },
    toPersonInfo() {
      this.$router.push("/personInfo");
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
    },

    //待补充好多好多好多获取数据的函数接口调用
    //举个栗子：根据不同的条件检索，获取当前用户的各种学术成果，管理个人学术成果等

    //获取学者信息
    getScholarInfo() {
      let url = this.$urlPath.website.getScholarInfo;
      getData(url + "/" + this.userid + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.scholar = res.data.scholar;
          if (this.scholar.gindex == null) {
            this.scholar.gindex = 0;
          }
          this.projectTotal = res.data.projectNum;
          this.projectList = res.data.project;
          this.patentTotal = res.data.patentNum;
          this.patentList = res.data.patent;
          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          this.barData[0] = this.patentTotal;
          this.barData[1] = this.projectTotal;
          this.barData[2] = this.paperTotal;
          this.count = res.data.paperNum + res.data.patentNum + res.data.projectNum;
          this.workExperience = res.data.workExperience.reverse();
          console.log(this.scholar);
          console.log(this.this.workExperience);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //关注学者
    subscribe() {
      let url = this.$urlPath.website.subscribe;
      postData(url + "/" + this.userid + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.isFollow = true;
          console.log(this.isFollow);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //取消关注学者
    undoSubscribe() {
      let params = new URLSearchParams();
      params.append("UserId", 2);
      params.append("ScholarId", 1);
      let url = this.$urlPath.website.undoSubscribe;
      deleteData(url + "/" + this.userid + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.isFollow = false;
          console.log(this.isFollow);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {
    this.getScholarInfo();
    this.initEchart();
    this.drawLine();
  },
};
</script>
<style scoped>
.main-block {
  width: 1400px;
  height: 2000px;
  margin: auto;
  /* border: solid 1px grey; */
}
.up-block {
  /* border: solid 1px red; */
  width: 1200px;
  height: 230px;
  margin: auto;
  background-color: #fafafa;
}
.down-block {
  /* border: solid 1px blue; */
  width: 1200px;
  height: 1500px;
  margin: auto;
}

.user-info {
  /* border: solid 1px black; */
  width: 550px;
  height: 200px;
  padding: 20px;
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
  padding-top: 30px;
  /* border: solid 1px black; */
  width: 130px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 10px 10px 10px;
}
.selections {
  /* border: solid 1px black; */
  width: 250px;
  height: 800px;
  margin: 10px 10px 10px 10px;
}
.results {
  padding: 10px 15px 10px 15px;
  /* border: solid 1px black; */
  width: 900px;
  height: 800px;
  display: block;
  float: right;
  margin: -810px 10px 35px 280px;
}
.btn {
  width: 100px;
  /* border: solid 1px black; */
  margin: 15px;
}
.intro {
  /* border: solid 1px black; */
  width: 750px;
  height: 1300px;
  margin: 10px;
}
.self-intro {
  /* border: solid 1px green; */
  width: 700px;
  height: 300px;
  margin: 10px;
}
.echart {
  /* border: solid 1px blue; */
  width: 700px;
  height: 300px;
  margin: 10px;
}
.relation-echart {
  /* border: solid 1px brown; */
  width: 700px;
  height: 500px;
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
.experience {
  padding: 20px;
  width: 250px;
  /* border: solid 1px brown; */
  display: block;
  float: right;
  margin: -1310px 0 20px 0;
}
.paper-list {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.project-list {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
