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
          <div>
            <a-button class="btn" type="default" @click="showManageModal"
              ><a-icon type="folder-open" />管理学术成果</a-button
            >
            <a-modal
              width="600px"
              v-model="manageVisible"
              title="管理学术成果"
              ok-text="确认"
              cancel-text="取消"
              @ok="hideManageModal"
            >
              <div v-if="isDelete">
                <a-button type="default" @click="changePage">认领同名门户</a-button>
                <a-list item-layout="horizontal" :data-source="gotSList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="claimDataPortal(index)" v-if="item.scholarid == -1">认领</a>
                    <a slot="actions" @click="undoClaimDataPortal(index)" v-else>退领</a>
                    <a-list-item-meta :description="item.lastKnownAffiliationId">
                      <a slot="title" href="https://www.antdv.com/">{{ item.displayName }}</a>

                      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
              <div v-else>
                <a-button type="default" @click="changePage">退领已认领门户</a-button>
                <a-list item-layout="horizontal" :data-source="sameNameSlist">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="claimDataPortal(index)" v-if="item.scholarId === -1">认领</a>
                    <a slot="actions" @click="undoClaimDataPortal(index)" v-else>退领</a>
                    <a-list-item-meta :description="item.lastKnownAffiliationId">
                      <a slot="title" href="https://www.antdv.com/">{{ item.displayName }}</a>

                      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-modal>
          </div>
          <div class="info-modal">
            <a-button class="btn" @click="showEditInfoModal"><a-icon type="edit" />修改个人信息</a-button>
            <a-modal
              style="z-index:100000000;position:relative"
              title="修改门户信息"
              @cancel="handleInfoCancel"
              :visible="editInfoVisi"
              :footer="null"
            >
              <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="学者姓名" prop="scholarname">
                  <a-input v-model="form.scholarname" />
                </a-form-model-item>
                <a-form-model-item label="邮箱" prop="email">
                  <a-input v-model="form.email" />
                </a-form-model-item>
                <a-form-model-item label="工作机构" prop="instituition">
                  <a-input v-model="form.instituition" />
                </a-form-model-item>
                <a-form-model-item label="职务/身份" prop="position">
                  <a-input v-model="form.position" />
                </a-form-model-item>
                <a-form-item label="个人简介" prop="intro">
                  <a-textarea v-model="form.intro" placeholder :rows="4" />
                </a-form-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                  <a-button type="primary" @click="onSubmit">
                    保存
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-modal>
          </div>
          <div class="pop-modal">
            <a-button class="btn" type="primary" @click="showModal"><a-icon type="plus-circle" />添加个人经历</a-button>
            <a-modal
              style="z-index:100000000"
              title="添加个人经历"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
              cancelText="取消"
              okText="提交"
            >
              <div class="input-list">
                <div class="ex-input">
                  <label>单位名称：</label>
                  <a-input style="width:100px;" v-model="crtexperience.organization"> </a-input>
                </div>
                <div class="ex-input">
                  <label>职务/身份：</label>
                  <a-input style="width:100px;" v-model="crtexperience.position"> </a-input>
                </div>
                <div class="ex-input">
                  <label>起始时间：</label>
                  <a-input style="width:100px;" v-model="crtexperience.startyear"> </a-input>
                </div>
                <div class="ex-input">
                  <label>结束时间：</label>
                  <a-input style="width:100px;" v-model="crtexperience.endyear"> </a-input>
                </div>
              </div>
            </a-modal>
          </div>
        </div>
      </div>
      <div class="down-block">
        <a-tabs default-active-key="3" @change="callback">
          <a-tab-pane key="1" tab="主页" force-render>
            <div class="intro">
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
import { postData } from "@/api/webpost";
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { deleteData } from "@/api/webdelete";
import navSearch from "@/components/navSearch";
import scholarPaper from "@/components/scholarPaper.vue";
import scholarProject from "@/components/scholarProject.vue";
import scholarPatent from "@/components/scholarPatent.vue";
const data = [
  {
    title: "成果 1",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 2",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 3",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 4",
    description: "学术成果的摘要可以放在这里",
    src:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
];
export default {
  components: {
    navSearch,
    scholarPaper,
    scholarProject,
    scholarPatent,
  },
  data() {
    return {
      data,
      editInfoVisi: false,
      manageVisible: false,
      visible: false,
      pageid: 0,
      isDelete: true,
      user: {
        username: "陈志刚",
        ins: "中南大学",
        posi: "教授",
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
      scholarid: 13,
      userid: 18,
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
      coAuthors: {},
      workExperience: [],
      crtexperience: {
        position: "",
        organization: "",
        startyear: null,
        endyear: null,
      },
      sameNameSlist: [],
      gotSList: [],
      pos: 0, //从此处开始为同名已认领门户
      count: 10,
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      form: {
        email: "470935458@qq.com",
        position: "教授",
        scholarname: "陈志刚",
        instituition: "中南大学",
        intro: "哈哈哈哈哈",
      },
      rules: {
        position: [{ required: true, message: "Title is required!" }],
        instituition: [{ required: true, message: "Instituition is required!" }],
        scholarname: [{ required: true, message: "Username is required!" }],
        email: [{ required: true, message: "Please input your E-mail!" }],
      },

      paperList: [],
      paperTotal: 0,
      patentList: [],
      patentTotal: 0,
      projectList: [],
      projectTotal: 0,
    };
  },
  mounted() {
    this.initEchart();
    this.drawLine();
    this.getScholarInfo();
    this.getDataPortal();
    this.getSameNameScholar();
  },
  methods: {
    changePage() {
      this.isDelete = !this.isDelete;
      if (this.isDelete) {
        this.getDataPortal();
      } else {
        this.getSameNameScholar();
      }
    },
    initEchart() {
      let myChart = this.$echarts.init(document.getElementById("relation"));
      let option = {
        title: {
          text: "按年份展示发表情况",
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 20,
          },
          {
            type: "inside",
            xAxisIndex: 0,
            start: 0,
            end: 20,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            start: 0,
            end: 50,
          },
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 50,
          },
        ],
        legend: {
          data: ["项目", "专利", "文献"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
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
            "2020年",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "项目",
            type: "line",
            stack: "总量",
            data: [2, 3, 5, 10, 12, 2, 0, 2, 3, 5, 10, 12, 2, 0],
          },
          {
            name: "专利",
            type: "line",
            stack: "总量",
            data: [2, 3, 5, 10, 12, 2, 0, 2, 3, 5, 10, 12, 2, 0],
          },
          {
            name: "文献",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      myChart.setOption(option);
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "发表成果情况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["项目", "专利", "文献"],
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
              { value: 547, name: "文献" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      let currentIndex = -1;
      setInterval(function() {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 1500);
    },
    showModal() {
      this.visible = true;
    },
    showManageModal() {
      this.getSameNameScholar();
      this.manageVisible = true;
    },
    showEditInfoModal() {
      this.editInfoVisi = true;
    },
    hideManageModal() {
      this.manageVisible = false;
    },
    handleOk() {
      this.addWorkExp();
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleInfoCancel() {
      this.editInfoVisi = false;
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
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
          this.editScholarInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //待补充好多好多好多获取数据的函数接口调用
    //举个栗子：根据不同的条件检索，获取当前用户的各种学术成果，管理个人学术成果等

    //获取同名数据库门户
    getSameNameScholar() {
      let url = this.$urlPath.website.getSameNameScholar;
      getData(url + "/" + this.scholar.englishName + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.sameNameSlist = res.data.dataScholar;
          this.pos = res.data.pos;
          this.sameNameSlist.map((item, index) => {
            console.log(index, res.data.instituition[index]);
            item.lastKnownAffiliationId = res.data.instituition.get(index);

            return item;
          });
          console.log(this.sameNameSlist);
          console.log(this.pos);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //获取已认领数据库门户
    getDataPortal() {
      let url = this.$urlPath.website.getDataPortal;
      let params = {
        scholarId: this.scholarid,
      };
      JSON.stringify(params);
      getData(url, params).then((res) => {
        console.log(res.code);
        console.log("why got 400");
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.gotSList = res.data;
          console.log("获取成功");
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //认领数据库门户
    claimDataPortal(index) {
      let params = new URLSearchParams();
      let url = this.$urlPath.website.claimDataPortal;
      params.append("scholarId", 13);
      params.append("authorId", this.sameNameSlist[index].authorId);
      // let params = {
      //   scholarId: 1,
      //   authorId: this.sameNameSlist[index].authorId,
      // };
      // JSON.stringify(params);
      console.log(params);
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log("认领成功");
          this.getSameNameScholar();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //退领数据库门户
    undoClaimDataPortal(index) {
      console.log(index);
      let authorid = this.gotSList[index].authorId;
      console.log(authorid);
      let url = this.$urlPath.website.undoClaimDataPortal;
      let params = {
        scholarId: this.scholarid,
        authorId: authorid,
      };
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log("退领成功");
          this.getDataPortal();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //修改学者信息
    editScholarInfo() {
      let params = {
        name: this.form.scholarname,
        email: this.form.email,
        title: this.form.position,
        introduction: this.form.intro,
        instituition: this.form.instituition,
      };
      JSON.stringify(params);
      let url = this.$urlPath.website.editScholarInfo;
      putData(url + "/" + this.scholarid, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log("修改成功");
        } else {
          this.$message.error(res.message);
        }
      });
    },

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
          this.count = res.data.paperNum + res.data.patentNum + res.data.projectNum;
          console.log(this.scholar.citations);
          this.workExperience = res.data.workExperience.reverse();
          this.form.email = this.scholar.email;
          this.form.scholarname = this.scholar.name;
          this.form.position = this.scholar.title;
          this.form.instituition = this.scholar.organization;
          this.form.intro = this.scholar.introduction;

          this.projectTotal = res.data.projectNum;
          this.projectList = res.data.project;
          this.patentTotal = res.data.patentNum;
          this.patentList = res.data.patent;
          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          console.log(this.scholar);
          console.log(this.workExperience);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //添加学者工作经历
    addWorkExp() {
      let url = this.$urlPath.website.addWorkExp;
      let params = {
        scholarId: this.scholarid,
        introduction: this.crtexperience.position,
        organization: this.crtexperience.organization,
        yearStart: this.crtexperience.startyear,
        yearEnd: this.crtexperience.endyear,
      };
      JSON.stringify(params);
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log(this.this.workExperience);
          this.getScholarInfo();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //删除学者工作经历
    deleteWorkExp() {
      let url = this.$urlPath.website.deleteWorkExp;
      let params = {
        scholarId: this.scholarid,
        introduction: this.crtexperience.position,
        organization: this.crtexperience.organization,
        yearStart: this.crtexperience.startyear,
        yearEnd: this.crtexperience.endyear,
      };
      JSON.stringify(params);
      console.log(params);
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log(this.this.workExperience);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>
<style scoped>
.main-block {
  width: 1400px;
  height: 2500px;
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
  height: 1300px;
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
  padding-top: 40px;
  /* border: solid 1px black; */
  width: 150px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 20px 10px 10px;
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
  width: 140px;
  /* border: solid 1px black; */
  margin: 15px;
}
.intro {
  /* border: solid 1px black; */
  width: 750px;
  height: 1200px;
  margin: 10px;
}
.influence {
  /* border: solid 1px black; */
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
.experience {
  padding: 20px;
  width: 250px;
  /* border: solid 1px brown; */
  display: block;
  float: right;
  margin: -1210px 0 20px 0;
}

.ex-input {
  display: block;
  width: 200px;
  float: left;
  margin: 10px;
}
.input-list {
  height: 100px;
}
.manage-btn {
  float: right;
  margin: -35px 0 10px 0;
}
</style>
