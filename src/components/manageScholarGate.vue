<template>
  <div>
    <div class="result-main-scholar">
      <div class="home-content">
        <div class = "left-block">
          <div v-bind:class="isSelected1 ? 'home-search-on' : 'home-search'">
            <a-input-search
              class="home-searchBox-1"
              placeholder="通过ID搜索学者门户"
              @search="onSearch1"
              @focus="selected1"
              @blur="undoSelected1"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px"> 检索到的学者门户</span>
            </div>
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in scholarList.scholarList1"
                    :key="key"
                  >
                    <div class="card-avatar">
                      <a-avatar :size="80" :src="item.src" />
                    </div>
                    <div class="card-info">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.name }} </span
                      ><br />
                      <span>{{ item.institution }}</span
                      ><br />
                      <span>
                        <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                      ><br />
                      <span
                        ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                      ><br />
                      <span>
                        <a-col :span="10">研究领域：{{ item.Hindex }}</a-col></span
                      >
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            管理学者门户
                          </template>
                          <a-button shape="circle" icon="setting" @click="changeMain(key)"/>
                        </a-tooltip>
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
            </div>
          </div>
        </div>
        <div class = "middle-block">
          <div class="result-list-scholar">
            <div class="card-list">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in scholarListMain"
                  :key="key"
                >
                  <div class="card-avatar">
                    <a-avatar :size="80" :src="item.src" />
                  </div>
                  <div class="card-info">
                    <span style="font-size: 16px; font-weight: 600"
                      >{{ item.name }} </span
                    ><br />
                    <span>{{ item.institution }}</span
                    ><br />
                    <span>
                      <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                    ><br />
                    <span
                      ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                    ><br />
                    <span>
                      <a-col :span="10">研究领域：{{ item.Hindex }}</a-col></span
                    >
                  </div>
                </a-card-grid>
              </a-card>
            </div>
          </div>
          <div class="topbar">
            <span style="margin-left: 20px"> 下属的数据库门户</span>
          </div>
          <div class="result-list-scholar">
            <div class="card-list">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in scholarList.scholarList2"
                  :key="key"
                >
                  <div class="card-avatar">
                    <a-avatar :size="80" :src="item.src" />
                  </div>
                  <div class="card-info">
                    <span style="font-size: 16px; font-weight: 600"
                      >{{ item.name }} </span
                    ><br />
                    <span>{{ item.institution }}</span
                    ><br />
                    <span>
                      <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                    ><br />
                    <span
                      ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                    ><br />
                    <span>
                      <a-col :span="10">研究领域：{{ item.Hindex }}</a-col></span
                    >
                  </div>
                  <div class="card-button" @click="deleteScholar(key)">
                    <p style="margin-top: 42px">
                      <a-tooltip>
                        <template slot="title">
                          删除数据库门户
                        </template>
                        <a-button shape="circle" icon="close" />
                      </a-tooltip>
                    </p>
                  </div>
                </a-card-grid>
              </a-card>
            </div>
          </div>
        </div>
        <div class = "right-block">
          <div v-bind:class="isSelected2 ? 'home-search-on' : 'home-search'">
            <a-input-search
              class="home-searchBox-2"
              placeholder="通过ID搜索数据库门户"
              @search="onSearch2"
              @focus="selected2"
              @blur="undoSelected2"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px"> 检索到的数据库门户</span>
            </div>
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in scholarList.scholarList3"
                    :key="key"
                  >
                    <div class="card-avatar">
                      <a-avatar :size="80" :src="item.src" />
                    </div>
                    <div class="card-info">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.name }} </span
                      ><br />
                      <span>{{ item.institution }}</span
                      ><br />
                      <span>
                        <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                      ><br />
                      <span
                        ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                      ><br />
                      <span>
                        <a-col :span="10">H指数：{{ item.Hindex }}</a-col></span
                      >
                    </div>
                    <div class="card-button" @click="addScholar(key)">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            添加数据库门户
                          </template>
                          <a-button shape="circle" icon="plus" />
                        </a-tooltip>
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
export default {
  data() {
    return {
      visible: false,
      isSelected1: false,
      isSelected2: false,
      currentPage: "1",
      total: 203,
      src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      scholarListMain:[
        {
          name: "张帆",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "华中科技大学同济医学院附属同济医院",
          paper: 4349,
          citation: 70957,
          Hindex: "肿瘤学",
        },  
      ],
      scholarList:{
        scholarList1: [
          {
            name: "张帆",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "华中科技大学同济医学院附属同济医院",
            paper: 4349,
            citation: 70957,
            Hindex: "肿瘤学",
          },
          {
            name: "张立群",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "北京化工大学",
            paper: 695,
            citation: 10067,
            Hindex: "工业催化",
          },
          {
            name: "张鹏",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "郑州大学第一附属医院",
            paper: 86,
            citation: 200,
            Hindex: "肿瘤学",
          },
        ],
        scholarList2: [
          {
            name: "张帆",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "华中科技大学同济医学院附属同济医院",
            paper: 4349,
            citation: 70957,
            Hindex: "肿瘤学",
          },
          {
            name: "张立群",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "北京化工大学",
            paper: 695,
            citation: 10067,
            Hindex: "工业催化",
          },
          {
            name: "张鹏",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "郑州大学第一附属医院",
            paper: 86,
            citation: 200,
            Hindex: "肿瘤学",
          },
        ],
        scholarList3: [],
      }
    };
  },
  props: ["word"],
  methods: {
    changeMain(key){
      this.$set(this.scholarListMain,0,this.scholarList.scholarList1[key]);
    },
    deleteScholar(key){
      this.scholarList.scholarList2.splice(key, 1);
      this.$set(this.scholarList,"scholarList2",this.scholarList.scholarList2);
      this.$message.success("数据库门户已移除");
    },
    addScholar(key){
      this.scholarList.scholarList2.push(this.scholarList.scholarList3[key]);
      this.$set(this.scholarList,"scholarList2",this.scholarList.scholarList2);
      this.scholarList.scholarList3.splice(key, 1);
      this.$set(this.scholarList,"scholarList3",this.scholarList.scholarList3);
      this.$message.success("数据库门户已添加");
    },
    changePage() {
      console.log(this.currentPage);
    },
    selected1() {
      this.isSelected1 = true;
    },
    selected2() {
      this.isSelected2 = true;
    },
    undoSelected1() {
      this.isSelected1 = false;
    },
    undoSelected2() {
      this.isSelected2 = false;
    },
    onSearch1(value) {//查找之后要结果
      this.$message.success(value+"左查找");
      // this.$router.push({ path: "/searchResult", query: { word: value } });
    },
    onSearch2(value) {//查找之后要结果
      let params = new URLSearchParams();
      params.append("value", value);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.getScholarByID + value;
      getData(url, params).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          var newAuthor = {
            name: res.data.dataScholar.displayName,
            src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: res.data.institution,
            paper: res.data.dataScholar.paperCount,
            citation: res.data.dataScholar.citationCount,
            Hindex: res.data.dataScholar.hindex,
          };
          if(this.scholarList.scholarList3.length === 0){
            this.scholarList.scholarList3.push(newAuthor);
          }
          else{
            this.$set(this.scholarList.scholarList3,0,newAuthor);
          }
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style>
.left-block{
  width: 33%;
  height: 1350px;
  border: solid 1px white;
}
.middle-block{
  width: 34%;
  height: 1350px;
  border: solid 1px white;
  /* margin: -1350px 0px 0px 33%; */
}
.right-block{
  width: 33%;
  height: 1350px;
  /* margin: -1350px 0px 0px 67%; */
  border: solid 1px white;
}
.result-main-scholar .topbar {
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  /* border: solid 1px black; */
  height: 40px;
}
.result-list-scholar .card-list {
  /* border: solid 1px black; */
  width: 100%;
  margin: 20px auto;
}
.result-list-scholar .card-list .card-avatar {
  float: left;
  width: 20%;
}
.result-list-scholar .card-list .card-avatar-main {
  float: left;
  width: 20%;
}
.result-list-scholar .card-list .card-info {
  float: left;
  margin-left: 5%;
  width: 65%;
}
.result-list-scholar .card-list .card-info-main {
  float: left;
  margin-left: 5%;
  width: 50%;
}
.result-list-scholar .card-list .card-info span {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-list-scholar .card-list .card-button {
  float: right;
  width: 10%;
}

/* .main-scholar-name{
  margin: -100px -100px -100px 100px;
} */
.small-card-list{
  border: solid 1px black;
  width: 600px;
  height: 1000px;
  /* margin: auto; */
}
.result-list-scholar .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.home-content {
  width: 1280px;
  margin: 0 auto;
}

.home-search {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 50px;
}

.home-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.home-search-on {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px #1890ff;
  width: 100%;
  height: 50px;
}
.home-searchBox-1 {
  margin-left: 2%;
  width: 98%;
}
.home-searchBox-2 {
  margin-left: 2%;
  width: 98%;
}
.home-searchButton {
  font-size: 14px;
  margin-top: 7px;
  height: 32px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

.home-searchBox-1 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox-1 .ant-input:focus {
  border: none;
  box-shadow: none;
}

.home-searchBox-2 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox-2 .ant-input:focus {
  border: none;
  box-shadow: none;
}
.home-searchCard {
  width: 663px;
}

.topNav-search {
  float: left;
  margin: 12px 0 8px 50px;
  border-radius: 10px;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 400px;
}

.topNav-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}
.topNav-search-on {
  float: left;
  margin: 12px 0 8px 50px;
  border-radius: 10px;
  border: solid 2px #1890ff;
  width: 400px;
}
.topNav-searchBox {
  width: 305px;
}
.topNav-searchButton {
  font-size: 14px;
  height: 22px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.topNav-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.topNav-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

</style>