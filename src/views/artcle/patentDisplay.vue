<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
            <div class="refer-num">
                <span class="refer-num-dis">状态：{{patentData.state}}</span>
            </div>
            <div class="title">
              <span class="title-name">{{patentData.title}}</span>
            </div>
            <div class="inventors">
                <a-list item-layout="vertical" :grid="{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }" :data-source="author_data">
                  <a-list-item slot="renderItem" slot-scope="item">
                      <div class="inventor">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                          <a-avatar class="img" :size="30" icon="user" />
                          <h1 class="inventor-name">{{ item }}</h1>
                        </a>
                      </div>
                  </a-list-item>
              </a-list>
            </div>
            <div class="actions">
              <a-button class="btn" @click="renling">{{renlingchar}}</a-button>
              <a-button class="btn" @click="shoucang">收藏</a-button>
              <a-button class="btn" type="primary" @click="fenxiang">分享</a-button>
            </div>
            <appeal-achievement :visible="visible" v-on:closeModal="closeModal"></appeal-achievement>
            <div class="date">
              <span class="date-num">主分类号： {{patentData.mainClassificationNumber}}</span>
            </div>
            <div class="date">
              <span class="date-num">分类号： {{patentData.classificationNumber}}</span>
            </div>
        </div>
      </div>
      <div class="down-block">
        <div class="down-left-block" >
          <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="专利内容" force-render>
            <div class="base-info">
              <a-icon type="pic-left" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="摘要" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Content-frame">
                    <span class="Content" >{{patentData.abstract}}</span>
                  </div>
                </a-descriptions-item >
              </a-descriptions>
              <a-icon type="pic-left" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="专利内容" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Content-frame">
                    <span class="Content" >{{patentData.content}}</span>
                  </div>
                </a-descriptions-item >
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="专利信息">
            <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="申请信息" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="source-frame">
                  <div class="source" >申请号：{{patentData.applicationNumber}}</div>
                  <div class="source" >申请人：{{patentData.applicant}}</div>
                  <div class="source" >申请日期：{{patentData.applicationDate}}</div>
                </div>
              </a-descriptions-item>
            </a-descriptions>
            <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="代理与权利人" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="source-frame">
                  <div class="source" >代理机构：{{patentData.agency}}</div>
                  <div class="source" >代理人：{{patentData.agent}}</div>
                  <div class="source" >当前权利人：{{patentData.currentObligee}}</div>
                </div>
              </a-descriptions-item>
            </a-descriptions>
            <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="公布信息" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="source-frame">
                  <div v-if="patentData.publishNumber!=''" class="source" >公布号：{{patentData.publishNumber}}</div>
                  <div v-if="patentData.publishDate!=''" class="source" >公布日期：{{patentData.publishDate}}</div>
                  <div v-if="patentData.publishDate==''" class="source" >尚未公布</div>
                </div>
              </a-descriptions-item>
            </a-descriptions>
            <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="地址" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="source-frame">
                  <div class="source" >省份：{{patentData.province}}</div>
                  <div class="source" >地址：{{patentData.location}}</div>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <!-- <a-tab-pane key="3" tab="推荐专利" style="margin: 10px">
            <a-icon type="share-alt" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="引用" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="new-quote_container" style="left: 172px; bottom: 168.5px;">
                  <span class="yinyong" onclick="oCopy(this)">
                    
                  </span>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane> -->
          </a-tabs>
        </div>
        <div class="down-right-block">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
// import { postData } from "@/api/webpost";
import appealAchievement from '../appeal/appealAchievement.vue'
import navSearch from "@/components/navSearch";
import { getData } from "@/api/webget";
import { postData } from "@/api/webpost";
export default {
  components: {
    navSearch,
    appealAchievement
  },
  data() {
    return {
      visible:false,
      confirmLoading: false,
      canClaim: false,
      nowClaimNumber: -1,
      maxClaimNumber: -1,
      renlingchar: "我要认领",
      haveRen: true,
      patentID: this.$route.params.id,
      patentData : {},
      author_data: [],
    }
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted(){
    this.getPatent();
    this.getRenlingStatus();
  },
  methods: {    
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
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
    gotoUser(){
      //去此人的主页
      this.$router.push("/scholarIndex");
    },
    checkrenling(){
      let params = new URLSearchParams();
      params.append("projectId", this.patentID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.checkNum + "2/" + this.patentID;
      console.log(url);
      getData(url, params).then(res => {
        if (res.code === 1001) {
          this.canClaim = res.data.canClaim;
          this.nowClaimNumber= res.data.nowClaimNumber;
          this.maxClaimNumber= res.data.maxClaimNumber;
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    renling(){
      this.showModal();
      let params = new URLSearchParams();
      params.append("projectId", this.patentID);
      //调用封装的postData函数，获取服务器返回值 
      if(!this.haveRen){
        if(this.canClaim){
          let url = this.$urlPath.website.renlingPatent + this.patentID;
          console.log(url);
          postData(url, params).then(res => {
            if (res.code === 1001) {
              this.$message.success("认领成功！");
              this.renlingchar = "我要退领"
              this.haveRen = true;
              this.nowClaimNumber ++;
              if(this.nowClaimNumber>=this.maxClaimNumber){
                this.canClaim = false;
              }
              //window.sessionStorage.setItem("UserId", res.data.userid);
              // const webAdrs = window.sessionStorage.getItem("WebAdrs");
            } else {
              console.log(res.code);
              this.$message.error(res.message);
            }
          });
        }
        else{
          this.$message.error("名额已满，不能认领");
        }
      }
      else{
        let url = this.$urlPath.website.disrenlingPatent + this.patentID;
        console.log(url);
        postData(url, params).then(res => {
          if (res.code === 1001) {
            this.$message.success("退领成功！");
            this.renlingchar = "我要认领"
            this.haveRen = false;
            this.nowClaimNumber --;
            if(this.nowClaimNumber<this.maxClaimNumber){
              this.canClaim = true;
            }
            //window.sessionStorage.setItem("UserId", res.data.userid);
            // const webAdrs = window.sessionStorage.getItem("WebAdrs");
          } else {
            console.log(res.code);
            this.$message.error(res.message);
          }
        });
      }
    },
    shoucang(){
      this.$message.success("已收藏");
      this.$message.success("已取消收藏");
    },
    fenxiang(){
      var domUrl = document.createElement("input");
      domUrl.value = window.location.href;
      domUrl.id = "creatDom";
      document.body.appendChild(domUrl);
      domUrl.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      let creatDom = document.getElementById("creatDom");
      creatDom.parentNode.removeChild(creatDom);
      this.$message.success("分享链接已复制");
    },
    getPatent(){
      let params = new URLSearchParams();
      params.append("patentID", this.patentID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getPatentById + this.patentID;
      getData(url, params).then(res => {
        if (res.code === 1001) {
          this.patentData = res.data.patent;
          this.author_data = res.data.patent.inventor.split(";");
          console.log(res.data.patent);
          console.log(this.author_data);
          //this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    getRenlingStatus(){
      let params = new URLSearchParams();
      params.append("patentID", this.patentID);
      let url2 = this.$urlPath.website.haveRenling + "2/" + this.patentID;
      getData(url2, params).then(res => {
        if (res.code === 1001) {
          this.haveRen = res.data.haveClaim;
          if(this.haveRen){
            this.renlingchar = "我要退领"
          }
          console.log(res.code);
        } else {
          console.log(res.code);
        }
      });
    },
    oCopy(obj){
        obj.select();    // 选中输入框中的内容
    }

  },
};
</script>
<style scoped>
.main-block {
  width: 1400px;
  /* height: 1400px; */
  margin: auto;
  /* border: solid 1px black; */
}
.up-block {
  /* border: solid 1px black; */
  width: 1200px;
  /* height: 220px; */
  margin: auto;
  background-color: #fafafa;
}
.down-block {
  /* border: solid 1px black; */
  width: 1200px;
  /* height: 900px; */
  margin: auto;
}
.down-left-block {
  /* border: solid 1px black; */
  width: 1200px;
  /* height: 900px; */
  margin: 0px 0px 0px 0px;
}
.down-right-block {
  /* border: solid 1px black; */
  width: 0px;
  height: 100px;
  /* margin: -1200px 10px 10px 750px; */
}
.artcle-info {
  /* border: solid 1px black; */
  width: 1050px;
  /* height: 180px; */
  margin: 10px;
}
.refer-num{
  /* border: solid 1px black; */
  /* width: 100px; */
  height: 25px;
  margin: 10px 10px 10px 10px;
  font-weight: 800;
}
.refer-num-dis{
  /* border: solid 1px black; */
  /* width: 100px; */
  height: 25px;
  margin: 10px 10px 10px 10px;
  font-weight: 800;
}
.date{
  /* border: solid 1px black; */
  /* width: 200px; */
  height: 25px;
  margin: 0px 0px 0px 0px;
}
.date-num{
  /* width: 200px; */
  height: 25px;
  margin: 10px;
  /* font-size: small; */
}
.title{
  /* border: solid 1px black; */
  width: 1000px;
  /* height: 50px; */
  margin: 10px;
}
.title-name{
  width: 1000px;
  /* height: 50px; */
  margin: 10px;
  font-size: x-large;
  font-weight: 650;
}
.inventors{
  /* border: solid 1px black; */
  width: 1000px;
  /* height: 50px; */
  margin: 10px;
}
.inventor {
  height: 40px;
  /* width: 130px; */
  margin: 5px;
  /*border: solid 1px black;*/
}
.inventor-name {
  /* width: 95px; */
  /*border: solid 1px black; */
  margin: -30px auto 0 35px;
  height: 40px;
  font-size: medium;
}
.yinyong {
    width: 80%;
    color: #333 !important;
    font-size: 14px;
    line-height: 20px;
    font-size: large;
}

.Content-frame{
  width: 1100px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.Content{
  width: 1000px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  /* font-size: medium; */
}
.Keyword-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.Keyword{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  /* font-size: medium; */
}
.DOI-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.DOI{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  /* font-size: medium; */
}
.source-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.source{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  /* font-size: medium; */
}
.url-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
}
.inventor-infor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 12px 0px;
}
.inventor-infor-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inventor-infor-item_cnt {
    color: #999;
    font-size: 14px;
}


.img {
  margin: auto;
  /* border: solid 1px red; */
}
.inventor-from {
    color: #999;
    /* border: solid 1px red; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
    margin: -30px 0px 0px 35px;
}
.actions {
  padding-top: 30px;
  /* border: solid 1px black; */
  width: 130px;
  height: 200px;
  display: block;
  float: right;
  margin: -180px -105px 10px 10px;
}
.btn {
  width: 100px;
  /* border: solid 1px black; */
  margin: 15px;
}

</style>
