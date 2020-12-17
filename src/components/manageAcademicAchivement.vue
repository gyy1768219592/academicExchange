<template>
  <div>
    <div class="result-main-scholar">
      <div class="home-content">
        <div class = "left-block">
          <div v-bind:class="isSelected3 ? 'home-search-on' : 'home-search'">
            <a-input-search
              class="home-searchBox3"
              placeholder="通过ID搜索学术成果"
              @search="onSearch3"
              @focus="selected3"
              @blur="undoSelected3"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px">检索到的项目</span>
            </div>
            <div class="result-list">
                <a-list item-layout="vertical" size="large" :data-source="getProgList">
                  <a-list-item slot="renderItem" key="item.title" slot-scope="item" class = "item-list-item">
                    <a-button
                      type="link" 
                      icon="setting"  
                      slot="actions" 
                      class="result-list-button_r"
                      @click="changeMain(item)"
                    >管理学术成果</a-button>
                    <a-list-item-meta
                    class = "a-list-item-meta"
                    :description="
                        item.descrble
                    "
                    >
                    <a slot="title" :href="item.href"
                        ><span v-html="item.title"></span>
                    </a>
                    </a-list-item-meta>
                    <div class="abstract">{{ item.abstract }}</div>
                  </a-list-item>
                </a-list>
            </div>
            <div class="topbar">
              <span style="margin-left: 20px">检索到的专利</span>
            </div>
            <div class="result-list">
                <a-list item-layout="vertical" size="large" :data-source="getPatentList">
                  <a-list-item slot="renderItem" key="item.title" slot-scope="item" class = "item-list-item">
                    <a-button
                      type="link" 
                      icon="setting"  
                      slot="actions" 
                      class="result-list-button_r"
                      @click="changeMain(item)"
                    >管理学术成果</a-button>
                    <a-list-item-meta
                    class = "a-list-item-meta"
                    :description="
                        item.descrble
                    "
                    >
                    <a slot="title" :href="item.href"
                        ><span v-html="item.title"></span>
                    </a>
                    </a-list-item-meta>
                    <div class="abstract">{{ item.abstract }}</div>
                  </a-list-item>
                </a-list>
            </div>
          </div>
        </div>
        <div class = "middle-block">
          <a-list item-layout="vertical" size="large" :data-source="paperTopList">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item" class="item-list-item">
                <a-list-item-meta
                :description="
                    item.descrble
                "
                >
                <a slot="title" :href="item.href"
                    ><span v-html="item.title"></span>
                </a>
                </a-list-item-meta>
                <div class="abstract">{{ item.abstract }}</div>
            </a-list-item>
          </a-list>
          <div class="result-list-scholar">
            <div class="card-list">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in AuthorList.AuthorList1"
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
                      <a-col :span="10">研究领域：{{ item.field }}</a-col></span
                    >
                  </div>
                  <div class="card-button" @click="deleteAuthor(key)">
                    <p style="margin-top: 42px">
                      <a-tooltip>
                        <template slot="title">
                          删除已认领者
                        </template>
                        <a-button shape="circle" icon="close" />
                      </a-tooltip>
                    </p>
                  </div>
                </a-card-grid>
              </a-card>
            </div>
            <div class="result-list-pagination">
              <a-pagination
                simple
                :default-current="2"
                pageSize="6"
                :total="total"
                v-model="currentPage"
                @change="changePage"
              />
            </div>
          </div>
        </div>
        <div class = "right-block">
          <div v-bind:class="isSelected4 ? 'home-search-on' : 'home-search'">
            <a-input-search
              class="home-searchBox4"
              placeholder="通过ID查询搜索学者门户"
              @search="onSearch4"
              @focus="selected4"
              @blur="undoSelected4"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px"> 检索到{{ total }}个学者门户</span>
            </div>
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in AuthorList.AuthorList2"
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
                        <a-col :span="10">研究领域：{{ item.field }}</a-col></span
                      >
                    </div>
                    <div class="card-button" @click="addAuthor(key)">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            添加认领者
                          </template>
                          <a-button shape="circle" icon="plus" />
                        </a-tooltip>
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
              <div class="result-list-pagination">
                <a-pagination
                  simple
                  :default-current="2"
                  pageSize="6"
                  :total="total"
                  v-model="currentPage"
                  @change="changePage"
                />
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
      isSelected3: false,
      isSelected4: false,
      currentPage: "1",
      total: 203,
      src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      abstract:
            "可持续发展的定量测度是可持续发展战略得以实施的前提条件.加拿大学者Mathis Wackernagel发展完善的生态足迹模型就是一种测量可持续性的方法.该方法通过计算支持特定区域人类社会所有消费活动所需要的土地(生态足迹)与该区域可提供的生物生产性土地(生态承载力)相比较来判断区域发展的可持续性.简单介绍了生态足迹模型的基本概念,研究进展,计算方法;对中国历年的生态足迹进行了实证研究,结果表明:从1962～2001年,中国人均生态承载力逐步下降,人均生态足迹则逐步上升,目前中国人均生态足迹已经超过人均生态承载力,生态赤字出现,并持续扩大,中国目前的发展处于一种强不可持续状态.",
      paperTopList: [],
      getProgList: [],
      getPatentList: [],
      AuthorList:{
        AuthorList1: [
          {
            name: "张鹏",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "郑州大学第一附属医院",
            paper: 86,
            citation: 200,
            field: "肿瘤学",
          },
          {
            name: "张磊",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "中国电子科技集团公司",
            paper: 2148,
            citation: 16081,
            field: "通信与信息系统",
          },

          {
            name: "张庆玲",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "东北大学理学院",
            paper: 1360,
            citation: 18959,
            field: "系统工程",
          },
          {
            name: "张波",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "电子科技大学电子薄膜与集成器件国家重点实验室",
            paper: 1843,
            citation: 10602,
            field: "电路系统",
          },
        ],
        AuthorList2: [
          {
            name: "张帆",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "华中科技大学同济医学院附属同济医院",
            paper: 4349,
            citation: 70957,
            field: "肿瘤学",
          },
          {
            name: "张立群",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "北京化工大学",
            paper: 695,
            citation: 10067,
            field: "工业催化",
          },
          {
            name: "张鹏",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "郑州大学第一附属医院",
            paper: 86,
            citation: 200,
            field: "肿瘤学",
          },
          {
            name: "张磊",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "中国电子科技集团公司",
            paper: 2148,
            citation: 16081,
            field: "通信与信息系统",
          },

          {
            name: "张庆玲",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "东北大学理学院",
            paper: 1360,
            citation: 18959,
            field: "系统工程",
          },
          {
            name: "张波",
            src:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: "电子科技大学电子薄膜与集成器件国家重点实验室",
            paper: 1843,
            citation: 10602,
            field: "电路系统",
          },
        ],
      },
    };
  },
  props: ["word"],
  methods: {
    changeMain(item){
      if(this.paperTopList.length === 0){
        this.paperTopList.push(item);
      }
      else{
        this.$set(this.paperTopList,0,item);
      }
    },
    changePage() {
      console.log(this.currentPage);
    },
    selected3() {
      this.isSelected3 = true;
    },
    undoSelected3() {
      this.isSelected3 = false;
    },
    selected4() {
      this.isSelected4 = true;
    },
    undoSelected4() {
      this.isSelected4 = false;
    },
    onSearch3(value) {
      this.getProg(value);
      this.getPatent(value);
    },
    onSearch4(value) {
      this.$message.success(value+"右查找");
      
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
    deleteAuthor(key){
      this.AuthorList.AuthorList1.splice(key, 1);
      this.$set(this.AuthorList,"AuthorList1",this.AuthorList.AuthorList1);
      this.$message.success("学者门户已移除");
    },
    addAuthor(key){
      this.AuthorList.AuthorList1.push(this.AuthorList.AuthorList2[key]);
      this.$set(this.AuthorList,"AuthorList1",this.AuthorList.AuthorList1);
      this.AuthorList.AuthorList2.splice(key, 1);
      this.$set(this.AuthorList,"AuthorList2",this.AuthorList.AuthorList2);
      this.$message.success("学者门户已添加");
    },
    getProg(progID){
      let params = new URLSearchParams();
      params.append("projectId", parseInt(progID));
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getProjectById + progID;
      console.log(url);
      getData(url, params).then(res => {
        var newProg = {
          title: res.data.project.fundProject,
          author: res.data.project.authors,
          descrble: res.data.project.authors + ' - 机构: ' + res.data.project.organization,
          abstract: res.data.project.zhAbstract,
        }
        if(this.getProgList.length === 0){
          this.getProgList.push(newProg);
        }
        else{
          this.$set(this.getProgList,0,newProg);
        }
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    getPatent(patentID){
      let params = new URLSearchParams();
      params.append("patentID", parseInt(patentID));
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getPatentById + patentID;
      getData(url, params).then(res => {
        var newPatent = {
          title: res.data.patent.title,
          author: res.data.patent.inventor,
          descrble: res.data.patent.inventor + ' - 发布日期' + res.data.patent.publishDate + ' - 状态: ' + res.data.patent.state,
          abstract: res.data.patent.abstract,
        }
        if(this.getPatentList.length === 0){
          this.getPatentList.push(newPatent);
        }
        else{
          this.$set(this.getPatentList,0,newPatent);
        }
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style>
.left-block{
  width: 33%;
  height: 1350px;
  /* border: solid 1px black; */
}
.middle-block{
  width: 34%;
  height: 1350px;
  /* border: solid 1px black; */
  margin: -1350px 0px 0px 33%;
}
.right-block{
  width: 33%;
  height: 1350px;
  margin: -1350px 0px 0px 67%;
  /* border: solid 1px black; */
}
.result-main-scholar .topbar {
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  /* border: solid 1px black; */
  height: 40px;
}
.result-list-scholar .card-list {
  /* border: solid 1px black; */
  width: 90%;
  margin: 20px auto;
}
.result-list-scholar .card-list .card-avatar {
  float: left;
  width: 20%;
}
.result-list-scholar .card-list .card-info {
  float: left;
  margin-left: 5%;
  width: 65%;
}
.result-list-scholar .card-list .card-info span {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-list-scholar .card-list .card-button {
  float: right;
  width: 10%;
}
small-card-list{
  border: solid 1px rgb(180, 174, 174);
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
  height: 40px;
}

.home-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.home-search-on {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px #1890ff;
  width: 100%;
  height: 40px;
}
.home-searchBox3 {
  width: 99%;
  margin-left: 1%;
  height: 100%;
}
.home-searchBox4 {
  width: 99%;
  margin-left: 1%;
  height: 100%;
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

.home-searchBox3 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox3 .ant-input:focus {
  border: none;
  box-shadow: none;
}

.home-searchBox4 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox4 .ant-input:focus {
  border: none;
  box-shadow: none;
}

.home-searchCard {
  width: 663px;
}
.item-list-item{
  margin-right: 5%;
  margin-left: 5%;
}
.result-sider {
  float: left;
  width: 280px;
  margin-right: 20px;
}
.result-sider .sider-title {
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
}
.result-sider .sider-menu {
  margin-left: 20px;
  padding-right: 20px;
  border-right: 0;
}
.result-sider .sider-menu .ant-menu-submenu-title {
  border-bottom: 1px solid #e3e3e3;
}
.result-sider .sider-menu .ant-menu-item {
  margin: 0;
}
.result-sider .sider-menu .ant-menu-item-selected::after {
  border: 0;
}
.result-main {
  float: left;
  width: 980px;
  overflow: hidden;
  padding-left: 20px;
  border-left: 1px solid #e3e3e3;
}
.result-main .topbar {
  border-bottom: 1px solid #e3e3e3;
  height: 40px;
}
.result-main .topbar .topbar-select {
  float: right;
  width: 100px;
  margin-right: 60px;
}
.result-main .ant-list-item-action {
  margin-top: 5px;
}
.result-list{
  margin-right: 5px;
  margin-left: 5px;
}
.result-main .result-list .result-list-button {
  margin-right: 5px;
  padding: 0;
}
.result-main .result-list .ant-list-item {
  padding-left: 10px;
}
.result-main .result-list .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.abstract {
  height: 40px;
  width: 100%;
  /* margin-right: 5%;
  margin-left: 5%; */
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
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