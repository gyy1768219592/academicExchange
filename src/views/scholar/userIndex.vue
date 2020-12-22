<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar" v-if="!loading">
            <a-spin :spinning="loading" />
            <uploadPhoto :imgUrl="scholar.avatarUrl"></uploadPhoto>
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
              style="z-index: 100000000; position: relative"
              width="600px"
              v-model="manageVisible"
              title="管理学术成果"
              ok-text="确认"
              cancel-text="取消"
              @ok="hideManageModal"
            >
              <div v-if="isDelete">
                <div>
                  <a-button style="float: right; margin-top: -40px" type="default" @click="changePage"
                    >认领同名门户<a-icon type="right-square"
                  /></a-button>
                </div>
                <a-list
                  style="margin-top: 30px"
                  :pagination="Upagination"
                  item-layout="horizontal"
                  :data-source="gotSList"
                >
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="claimDataPortal(index)" v-if="item.scholarid == -1">认领</a>
                    <a slot="actions" @click="undoClaimDataPortal(index)" v-else>退领</a>
                    <a-list-item-meta :description="item.lastKnownAffiliationId">
                      <a slot="title" @click="toAuthorIndex(item.authorId)"><span v-html="item.displayName"></span></a>
                      <a-avatar slot="avatar" :style="'backgroundColor: #c85554'">{{
                        item.displayName.substring(0, 3)
                      }}</a-avatar>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
              <div v-else>
                <a-button type="default" @click="changePage"><a-icon type="left-square" />退领已认领门户</a-button>
                <a-list item-layout="horizontal" :pagination="Cpagination" :data-source="sameNameSlist">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="claimDataPortal(index)" v-if="item.scholarId === -1">认领</a>
                    <a slot="actions" v-else>已被认领</a>
                    <a-list-item-meta :description="item.lastKnownAffiliationId">
                      <a slot="title" @click="toAuthorIndex(item.authorId)"><span v-html="item.displayName"></span></a>
                      <a-avatar slot="avatar" :style="'backgroundColor: #c85554'">{{
                        item.displayName.substring(0, 3)
                      }}</a-avatar>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-modal>
          </div>
          <div class="info-modal">
            <a-button class="btn" @click="showEditInfoModal"><a-icon type="edit" />修改个人信息</a-button>
            <a-modal
              style="z-index: 100000000; position: relative"
              title="修改门户信息"
              @cancel="handleInfoCancel"
              :visible="editInfoVisi"
              :footer="null"
            >
              <div v-if="isFirst">
                <div>
                  <a-button
                    style="float: right;margin-top:-40px;position: relative;"
                    type="default"
                    @click="changePageTwo"
                    >管理个人经历<a-icon type="right-square"
                  /></a-button>
                </div>
                <a-form-model
                  ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  style="margin-top:40px"
                >
                  <a-form-model-item label="学者姓名" prop="scholarname">
                    <a-input v-model="form.scholarname" />
                  </a-form-model-item>
                  <a-form-model-item label="组织/机构" prop="institution">
                    <a-input v-model="form.institution" />
                  </a-form-model-item>
                  <a-form-model-item label="职务/身份" prop="position">
                    <a-input v-model="form.position" />
                  </a-form-model-item>
                  <a-form-item label="个人简介" prop="intro">
                    <a-textarea v-model="form.intro" placeholder :rows="4" />
                  </a-form-item>
                  <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
                    <a-button type="primary" @click="onSubmit"> 保存 </a-button>
                  </a-form-model-item>
                </a-form-model>
              </div>

              <div v-else>
                <a-button type="default" @click="changePageTwo"><a-icon type="left-square" />管理基本信息</a-button>
                <a-table
                  :pagination="Bpagination"
                  style="margin-top:20px"
                  :columns="columns"
                  :data-source="workExperience"
                >
                  <a slot="yearStart" slot-scope="text">{{ text }}</a>
                  <a slot="yearEnd" slot-scope="text">{{ text }}</a>
                  <a slot="organization" slot-scope="text">{{ text }}</a>
                  <a slot="introduction" slot-scope="text">{{ text }}</a>
                  <span slot="action" slot-scope="text, record">
                    <a @click="deleteWorkExp(record)">删除</a>
                  </span>
                </a-table>
              </div>
            </a-modal>
          </div>
          <div class="pop-modal">
            <a-button class="btn" type="primary" @click="showModal"><a-icon type="plus-circle" />添加个人经历</a-button>
            <a-modal
              style="z-index: 100000000"
              title="添加个人经历"
              :visible="visible"
              @ok="handleOk"
              width="600px"
              @cancel="handleCancel"
              cancelText="取消"
              okText="提交"
            >
              <div class="input-list">
                <div class="ex-input">
                  <label>单位名称：</label>
                  <a-input style="width: 100px" v-model="crtexperience.organization"> </a-input>
                </div>
                <div class="ex-input">
                  <label>职务/身份：</label>
                  <a-input style="width: 100px" v-model="crtexperience.position"> </a-input>
                </div>
                <div class="ex-input">
                  <label>起始时间：</label>
                  <a-input style="width: 100px" v-model="crtexperience.startyear"> </a-input>
                </div>
                <div class="ex-input">
                  <label>结束时间：</label>
                  <a-input style="width: 100px" v-model="crtexperience.endyear"> </a-input>
                </div>
              </div>
            </a-modal>
          </div>
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
import { postData } from "@/api/webpost";
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { deleteData } from "@/api/webdelete";
import navSearch from "@/components/navSearch";
import scholarPaper from "@/components/scholarPaper.vue";
import scholarProject from "@/components/scholarProject.vue";
import scholarPatent from "@/components/scholarPatent.vue";
import uploadPhoto from "@/components/scholarUploadPhoto";

const columns = [
  {
    title: "起始年份",
    dataIndex: "yearStart",
    key: "yearStart",
    width: 70,
  },
  {
    title: "终止年份",
    dataIndex: "yearEnd",
    key: "yearEnd",
    width: 70,
  },
  {
    title: "组织/机构",
    dataIndex: "organization",
    key: "organization",
    width: 90,
    ellipsis: true,
  },
  {
    title: "职务/身份",
    dataIndex: "introduction",
    key: "introduction",
    width: 90,
    ellipsis: true,
  },
  {
    title: "操作",
    key: "action",
    width: 60,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  components: {
    navSearch,
    scholarPaper,
    scholarProject,
    scholarPatent,
    uploadPhoto,
  },
  data() {
    return {
      columns,
      editInfoVisi: false,
      manageVisible: false,
      visible: false,
      pageid: 0,
      isDelete: true,
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
      loading: true,
      coAuthors: new Map(),
      workExperience: [],
      crtexperience: {
        position: "",
        organization: "",
        startyear: null,
        endyear: null,
      },
      Upagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      Bpagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      Cpagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
      nameList: [],
      sameNameSlist: [],
      gotSList: [],
      pos: 0, //从此处开始为同名已认领门户
      count: 10,
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      form: {
        position: "",
        scholarname: "",
        institution: "",
        intro: "",
      },
      rules: {
        position: [{ required: true, message: "Title is required!" }],
        institution: [{ required: true, message: "Institution is required!" }],
        scholarname: [{ required: true, message: "Username is required!" }],
      },
      page: 1,
      paperList: [],
      paperTotal: 1,
      patentList: [],
      patentTotal: 2,
      projectList: [],
      projectTotal: 3,
      isFirst: Boolean,
      seriData: [
        { value: 0, name: "项目" },
        { value: 0, name: "专利" },
        { value: 0, name: "文献" },
      ],
      institution: [],
    };
  },
  created() {
    this.scholarid = localStorage.getItem("scholarId");
    this.getInfoByUser();

    this.seriData[0].value = this.projectTotal;
    this.seriData[1].value = this.patentTotal;
    this.seriData[2].value = this.paperTotal;
  },
  methods: {
    changePageTwo() {
      this.isFirst = !this.isFirst;
    },
    changePage() {
      this.isDelete = !this.isDelete;
      if (this.isDelete) {
        this.getDataPortal();
      } else {
        this.getSameNameScholar();
      }
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
            data: this.seriData,
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
          this.editInfoVisi = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toAuthorIndex(id) {
      let url = this.$router.resolve({
        path: "/authorIndex",
        query: {
          authorid: id,
        },
      });
      window.open(url.href, "_blank");
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
          console.log(res.data.institution);
          console.log(this.pos);
          this.sameNameSlist = res.data.dataScholar;
          this.pos = res.data.pos;
          console.log(res.data.institution);
          console.log(this.pos);
          this.sameNameSlist = this.sameNameSlist.map((item, index) => {
            item.lastKnownAffiliationId = "";
            item.lastKnownAffiliationId += "    成果数:" + item.paperCount + "   引用数:" + item.citationCount;
            if (res.data.institution != null)
              item.lastKnownAffiliationId = res.data.institution[index] + item.lastKnownAffiliationId;
            console.log(item.lastKnownAffiliationId);
            return item;
          });
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
          this.gotSList = res.data.dataScholars;
          this.institution = res.data.institution;
          console.log(res.data);
          this.gotSList = this.gotSList.map((item, index) => {
            item.lastKnownAffiliationId = "";
            item.lastKnownAffiliationId += "    成果数:" + item.paperCount + "    引用数:" + item.citationCount;
            console.log(item.lastKnownAffiliationId);
            console.log(this.institution);
            if (res.data.institution != null) {
              item.lastKnownAffiliationId = this.institution[index] + item.lastKnownAffiliationId;
              console.log(index);
            }
            return item;
          });
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
      params.append("scholarId", this.scholarid);
      params.append("authorId", this.sameNameSlist[index].authorId);
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
      this.getInfoByUser();
      let params = {
        name: this.form.scholarname,
        title: this.form.position,
        introduction: this.form.intro,
        organization: this.form.institution,
      };
      JSON.stringify(params);
      let url = this.$urlPath.website.editScholarInfo;
      putData(url + "/" + this.scholarid, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log("修改成功");
          this.getInfoByUser();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //获取学者信息
    getInfoByUser() {
      let url = this.$urlPath.website.getInfoByUser;
      getData(url + "/" + this.scholarid).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.scholar = res.data.scholar;
          if (this.scholar.gindex == null) {
            this.scholar.gindex = 0;
          }
          this.nameList = res.data.authorList;
          this.count = res.data.paperNum + res.data.patentNum + res.data.projectNum;
          console.log(this.scholar.citations);
          this.coAuthors = res.data.coAuthors;
          console.log(this.coAuthors);
          this.workExperience = res.data.workExperience.reverse();
          this.form.email = this.scholar.email;
          this.form.scholarname = this.scholar.name;
          this.form.position = this.scholar.title;
          this.form.institution = this.scholar.organization;
          this.form.intro = this.scholar.introduction;

          this.projectTotal = res.data.projectNum;
          this.projectList = res.data.project;
          this.patentTotal = res.data.patentNum;
          this.patentList = res.data.patent;
          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          this.seriData[0].value = this.projectTotal;
          this.seriData[1].value = this.patentTotal;
          this.seriData[2].value = this.paperTotal;
          this.getDataPortal();
          this.getSameNameScholar();
          this.drawLine();
          this.loading = false;
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
          this.getInfoByUser();
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //删除学者工作经历
    deleteWorkExp(item) {
      let url = this.$urlPath.website.deleteWorkExp;
      let params = {
        scholarId: this.scholarid,
        introduction: item.introduction,
        organization: item.organization,
        yearStart: item.yearStart,
        yearEnd: item.yearEnd,
      };
      JSON.stringify(params);
      console.log(params);
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.getInfoByUser();
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
  width: 1280px;
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
  /* border: solid 1px blue; */
  margin: 20px;
}
.img {
  margin: auto;
  /* border: solid 1px red; */
}
.info-content-name {
  width: 500px;
  text-overflow: ellipsis;
  /* border: solid 1px black; */
  margin: -70px auto 0 120px;
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
  padding-top: 40px;
  /* border: solid 1px black; */
  width: 150px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 20px 10px 10px;
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
.self-intro {
  /* border: solid 1px green; */
  width: 700px;
  min-height: 150px;
  margin: 10px;
}
</style>
