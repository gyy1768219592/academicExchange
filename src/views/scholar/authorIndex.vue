<template>
  <div>
    <navSearch></navSearch>
    <!-- <div><a-icon type="left" @click="goBack" /></div> -->
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar :size="100" :style="'backgroundColor: #c85554;font-size:26px'">{{
              dataScholar.displayName.substring(0, 3)
            }}</a-avatar>
            <h1 class="info-content-name">{{ dataScholar.displayName }}</h1>
            <h2 class="info-content-ins">{{ institution }}</h2>
            <ul class="index-table">
              <li class="index-item">
                <p class="top-word">成果数</p>
                <p class="index-number">{{ dataScholar.paperCount }}</p>
              </li>
              <li class="index-item">
                <p class="top-word">引用数</p>
                <p class="index-number">{{ dataScholar.citationCount }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="actions" v-if="isLogin">
          <a-button v-if="!isClaim" @click="claimDataPortal" class="btn">我要认领<a-icon type="skin"/></a-button>
          <a-button v-if="isClaim" class="btn" disabled>已被认领<a-icon type="skin" theme="filled"/></a-button>
          <a-button v-if="isClaim" @click="showModal" class="btn" type="primary"
            >我要申诉<a-icon type="question-circle"
          /></a-button>
          <appealGateway
            :visible="appealVisible"
            v-on:closeModal="closeModal"
            :type="type"
            :dataScholar_id="authorid"
          ></appealGateway>
        </div>
      </div>
      <div class="down-block">
        <div class="paper-list">
          <dataScholarPaper
            :page="page"
            :paperTotal="paperTotal"
            :nameList="nameList"
            :paperList="paperList"
            :scholarid="scholarid"
          ></dataScholarPaper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
import navSearch from "@/components/navSearch";
import dataScholarPaper from "@/components/dataScholarPaper.vue";
import { getData } from "@/api/webget";
import { postData } from "@/api/webpost";
import appealGateway from "@/views/appeal/appealGateway.vue";

export default {
  components: {
    navSearch,
    dataScholarPaper,
    appealGateway,
  },
  data() {
    return {
      appealVisible: false,
      type: "dataScholar",
      pageid: 0,
      authorid: 2889275216,
      isClaim: false,
      isLogin: false,
      nameList: [],
      institution: "",
      scholarid: 13,
      dataScholar: {
        scholarId: 13,
        displayName: "",
        normalizedName: "",
        introduction: "",
        avatarUrl: "",
        citationCount: 0,
        paperCount: 0,
      },
      page: 1,
      gotSList: [],
      count: 10,
      paperList: [],
      paperTotal: 0,
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    closeModal() {
      this.appealVisible = false;
    },
    showModal() {
      this.appealVisible = true;
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
    getAuthorInfo() {
      let id = this.$route.query.authorid;
      let url = this.$urlPath.website.getAuthorInfo;
      getData(url + "/" + id).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.dataScholar = res.data.dataScholar;
          console.log(res.data);
          if (this.dataScholar.scholarId == -1) {
            this.isClaim = false;
          } else {
            this.isClaim = true;
          }
          this.nameList = res.data.authorList;
          this.institution = res.data.institution;

          this.paperList = res.data.paper;
          this.paperTotal = res.data.paperNum;
          console.log(res.data);
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //认领数据库门户
    claimDataPortal() {
      let params = new URLSearchParams();
      let url = this.$urlPath.website.claimDataPortal;
      params.append("scholarId", this.scholarid);
      params.append("authorId", this.authorid);
      console.log(params);
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          console.log("认领成功");
          this.isClaim = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.authorid = this.$route.query.authorid;
    if (localStorage.getItem("scholarId")) {
      this.isLogin = true;
    }
    this.scholarid = localStorage.getItem("scholarId");
    this.getAuthorInfo();
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
  /* float: left; */
  margin-right: 10px;
  padding-left: 10px;
  font-size: 20px;
  width: 78px;
  /* border-left: 1px solid rgb(239, 239, 239); */
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
