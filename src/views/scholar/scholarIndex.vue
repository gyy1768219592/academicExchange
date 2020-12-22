<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar v-if="scholar.avatarUrl != ''" :src="scholar.avatarUrl" :size="100" />
            <a-avatar v-else :size="100" :style="'backgroundColor: #c85554;font-size:26px'">{{
              scholar.name.substring(0, 3)
            }}</a-avatar>
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
        <div class="actions" v-if="isLogin">
          <a-button v-if="!scholar.isSubscribed" class="btn" @click="subscribe">关注<a-icon type="star"/></a-button>
          <a-button v-if="scholar.isSubscribed" class="btn" @click="undoSubscribe"
            >取消关注<a-icon type="star" theme="filled"
          /></a-button>
          <a-button class="btn" type="primary" @click="sendMsg">发送私信<a-icon type="message"/></a-button>
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
                :page="page"
                :projectTotal="projectTotal"
                :projectList="projectList"
                :scholarid="scholarid"
              ></scholarProject>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专利">
            <div class="patent-list">
              <scholarPatent
                :page="page"
                :patentTotal="patentTotal"
                :patentList="patentList"
                :scholarid="scholarid"
              ></scholarPatent>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="成果">
            <div class="paper-list">
              <scholarPaper
                :page="page"
                :paperTotal="paperTotal"
                :nameList="nameList"
                :paperList="paperList"
                :scholarid="scholarid"
              ></scholarPaper>
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
      isLogin: false,
      myChart: null,
      chartData: [],
      chartLink: [],
      page: 1,
      nameList: [],
      scholarid: 13,
      userid: 18,
      coAuthors: [],
      workExperience: [],
      scholar: {
        scholarId: 13,
        name: "",
        englishName: "",
        title: "",
        organization: "",
        email: "",
        fans: 0,
        introduction: "",
        hindex: 0,
        gindex: 0,
        avatarUrl: "",
        citations: 0,
        isSubscribed: Boolean,
      },
      gotSList: [],
      count: 10,
      paperList: [],
      paperTotal: 0,
      patentList: [],
      patentTotal: 0,
      projectList: [],
      projectTotal: 0,
      barData: [1, 2, 3],
      coData: [],
      dataLink: [],
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
      let data = this.coData;
      return data;
    },
    /**
     * 关系数据集合
     */
    linkEChart() {
      let dataLink = this.dataLink;
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
    sendMsg() {
      this.$router.push({
        path: "/sendMessage",
        query: {
          name: this.scholar.name,
          ScholarId: this.scholar.scholarId,
        },
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

    //登录用户获取学者信息
    getInfoByUser() {
      this.scholarid = this.$route.query.scholarid;
      let id = this.$route.query.scholarid;
      let url = this.$urlPath.website.getInfoByUser;
      getData(url + "/" + id).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.scholar = res.data.scholar;
          this.scholar.isSubscribed = res.data.isSubscribed;
          console.log(this.scholar.isSubscribed);
          if (this.scholar.gindex == null) {
            this.scholar.gindex = 0;
          }
          this.nameList = res.data.authorList;
          this.projectTotal = res.data.projectNum;
          this.projectList = res.data.project;
          this.patentTotal = res.data.patentNum;
          this.patentList = res.data.patent;
          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          this.count = res.data.paperNum + res.data.patentNum + res.data.projectNum;
          this.workExperience = res.data.workExperience.reverse();
          console.log(res.data);
          this.coAuthors = res.data.coAuthors;
          console.log(this.coAuthors);
          this.barData[0] = this.patentTotal;
          this.barData[1] = this.projectTotal;
          this.barData[2] = this.paperTotal;
          console.log(this.barData);
          let high = 8;
          if (this.coAuthors.length / 2 < 8) high = this.coAuthors.length / 2;
          for (let i = 0; i <= high; i++) {
            if (i == 0) {
              let tmp = {
                name: this.scholar.name,
                symbolSize: 60,
                id: 1,
              };
              this.coData[i] = tmp;
            } else {
              let tmp = {
                name: this.coAuthors[2 * (i - 1)],
                symbolSize: this.coAuthors[2 * (i - 1) + 1] + 60,
                id: i + 1,
              };
              this.coData[i] = tmp;
              let link = {
                value: "合作学者",
                source: 0,
                target: i,
              };
              this.dataLink[i - 1] = link;
            }
          }
          console.log(this.coData);
          console.log(this.dataLink);
          this.initEchart();
          this.drawLine();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //游客获取学者信息
    getInfoByTourist() {
      this.scholarid = this.$route.query.scholarid;
      let id = this.$route.query.scholarid;
      let url = this.$urlPath.website.getInfoByTourist;
      getData(url + "/" + id).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.scholar = res.data.scholar;
          if (this.scholar.gindex == null) {
            this.scholar.gindex = 0;
          }
          this.nameList = res.data.authorList;
          this.projectTotal = res.data.projectNum;
          this.projectList = res.data.project;
          this.patentTotal = res.data.patentNum;
          this.patentList = res.data.patent;
          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          this.count = res.data.paperNum + res.data.patentNum + res.data.projectNum;
          this.workExperience = res.data.workExperience.reverse();
          console.log(res.data);
          this.coAuthors = res.data.coAuthors;
          console.log(this.coAuthors);
          this.barData[0] = this.patentTotal;
          this.barData[1] = this.projectTotal;
          this.barData[2] = this.paperTotal;
          console.log(this.barData);
          let high = 8;
          if (this.coAuthors.length / 2 < 8) high = this.coAuthors.length / 2;
          for (let i = 0; i <= high; i++) {
            console.log(i);
            if (i == 0) {
              debugger;
              let tmp = {
                name: this.scholar.name,
                symbolSize: 60,
                id: i + 1,
              };
              this.coData[i] = tmp;
              let link = {
                value: "合作学者",
                source: 1,
                target: 1,
              };
              this.dataLink[0] = link;
              console.log(this.dataLink);
            } else {
              let tmp = {
                name: this.coAuthors[2 * (i - 1)],
                symbolSize: this.coAuthors[2 * (i - 1) + 1] + 60,
                id: i + 1,
              };
              console.log(i + 1);
              this.coData[i] = tmp;
              let link = {
                value: "合作学者",
                source: 1,
                target: i + 1,
              };
              this.dataLink[i] = link;
            }
          }
          console.log(this.coData);
          this.initEchart();
          this.drawLine();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //关注学者
    subscribe() {
      let url = this.$urlPath.website.subscribe;
      postData(url + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          this.$message.success("已关注");
          this.scholar.isSubscribed = !this.scholar.isSubscribed;
          console.log(this.scholar.isSubscribed);

          this.getInfoByUser();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //取消关注学者
    undoSubscribe() {
      let url = this.$urlPath.website.undoSubscribe;
      deleteData(url + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          this.$message.success("已取消关注");
          this.scholar.isSubscribed = !this.scholar.isSubscribed;
          this.getInfoByUser();
          console.log(this.scholar.isSubscribed);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {
    this.scholarid = this.$route.query.scholarid;
    if (localStorage.getItem("identification")) this.isLogin = true;
    if (this.isLogin == true) {
      this.getInfoByUser();
    } else {
      this.getInfoByTourist();
    }
  },
};
</script>
<style scoped>
.main-block {
  width: 1280px;
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
  width: 500px;
  text-overflow: ellipsis;
  /* border: solid 1px black; */
  margin: -100px auto 0 120px;
}
.info-content-ins {
  width: 500px;
  text-overflow: ellipsis;
  /* border: solid 1px red; */
  margin: 0px auto 10px 120px;
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
  min-height: 150px;
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
