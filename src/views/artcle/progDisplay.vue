<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
            <div class="refer-num">
                <span class="refer-num-dis">{{progData.supportTypeName}}({{progData.fundProjectCode}})</span>
            </div>
            <div class="title">
              <span class="title-name">{{progData.fundProject}}</span>
            </div>
            <div class="refer-num1">
                <span class="refer-num-dis1">{{progData.chineseTitle}}</span>
            </div>
            <div class="authors">
              <a-list item-layout="vertical" :grid="{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }" :data-source="author_data">
                  <a-list-item slot="renderItem" slot-scope="item">
                      <div class="author">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                          <a-avatar class="img" :size="30" icon="user" />
                          <h1 class="author-name">{{ item }}</h1>
                        </a>
                      </div>
                  </a-list-item>
              </a-list>
            </div>
            <div class="actions">
              <a-button class="btn" @click="renling"><a-icon type="heart" :theme="haveRen?'outlined':'filled'"/>{{renlingchar}}</a-button>
              <a-button class="btn" @click="shoucang"><a-icon type="star" :theme="Like?'filled':'outlined'"/>{{LikeDisplay}}</a-button>
              <a-button class="btn" type="primary" @click="fenxiang"><a-icon type="fire" theme="filled"/>分享</a-button>
            </div>
            <appeal-achievement :visible="visible" v-on:closeModal="closeModal" :type='type' :achievement_id="patentID"></appeal-achievement>
            <div class="date">
              <span class="date-num">组织：{{progData.organization}}({{progData.organizationID}})</span>
            </div>
            <div class="organization">
              <span class="organization-num">公布日期： {{progData.publishDate}}</span>
            </div>
        </div>
      </div>
      <div class="down-block">
        <div class="down-left-block" >
          <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="基本信息" force-render>
            <div class="base-info">
              <a-icon v-if="progData.zhAbstract!=''" type="read" :style="{ fontSize: '16px', color: '#08c'}"/>
              <a-descriptions v-if="progData.zhAbstract!=''" title="摘要" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Abstract-frame">
                    <span class="Abstract" >{{progData.zhAbstract}}</span>
                  </div>
                </a-descriptions-item >
              </a-descriptions>
              <a-icon type="paper-clip" :style="{ fontSize: '16px', color: '#08c'}"/>
              <a-descriptions title="发表位置" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="source-frame">
                    <span class="source" >期刊：《{{progData.journal}}》</span>
                  </div>
                </a-descriptions-item>
              </a-descriptions>
              <a-icon type="branches" :style="{ fontSize: '16px', color: '#08c'}"/>
              <a-descriptions title="相关信息" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="source-frame">
                    <span class="source" >项目编号：{{progData.fundProjectNo}}</span>
                  </div>
                  <div class="source-frame">
                    <span class="source" >领域：{{progData.fieldName}}({{progData.fieldCode}})</span>
                  </div>
                  <div class="source-frame">
                    <span class="source" >产品类型：{{progData.productType}}</span>
                  </div>
                  <div class="source-frame">
                    <span class="source" >成果ID：{{progData.achievementID}}</span>
                  </div>
                  <div class="source-frame">
                    <span class="source" >来源：{{progData.source}}</span>
                  </div>
                  <div class="source-frame">
                    <span class="source" >DOI号：{{progData.doiUrl}}</span>
                  </div>
                </a-descriptions-item >
              </a-descriptions>
              <a-icon v-if="progData.zhKeyword!=''" type="key" :style="{ fontSize: '16px', color: '#08c'}"/>
              <a-descriptions v-if="progData.zhKeyword!=''" title="关键词" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Keyword-frame">
                   <span class="Keyword" >{{progData.zhKeyword}}</span>
                  </div>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="原文链接">
            <a-icon type="share-alt" :style="{ fontSize: '16px', color: '#08c'}"/>
            <a-descriptions title="全文链接" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="url-frame">
                  <a :href="progData.doi">{{progData.doi}}</a>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <!-- <a-tab-pane key="3" tab="推荐项目" style="margin: 10px">
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
import navSearch from "@/components/navSearch";
import { getData } from "@/api/webget";
import { postData } from "@/api/webpost";
import { putData } from "@/api/webput";
export default {
  components: {
    navSearch,
  },
  data() {
    return {
      visible:false,
      type: 'patent',
      Like: false,
      LikeDisplay:"收藏",
      canClaim: false,
      nowClaimNumber: -1,
      maxClaimNumber: -1,
      renlingchar: "我要认领",
      haveRen: true,
      progID : this.$route.params.id,
      progData : {},
      author_data: [],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted(){
    this.getProg();
    this.getRenlingStatus();
    this.checkrenling();
    this.getLikeStatus();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    getProg(){//haveRenling
      let params = new URLSearchParams();
      // params.append("projectId", this.progID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getProjectById + this.progID;
      console.log(url);
      getData(url, params).then(res => {
        if (res.code === 1001) {
          this.progData = res.data.project;
          if(this.progData.doi[0]=='h'){
            this.progData.doiUrl = this.progData.doi.substring(16,this.progData.doi.length+1);
          }
          else if(this.progData.doi[0]>'0'&&this.progData.doi[0]<'9'){
            this.progData.doiUrl = this.progData.doi;
            this.progData.doi = "https://doi.org/" + this.progData.doi;
          }
          this.author_data = this.progData.authors.split(";");
          console.log(res.data.project);
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
      params.append("projectId", this.progID);
      let url2 = this.$urlPath.website.haveRenling + "1/" + this.progID;
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
      params.append("projectId", this.progID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.checkNum + "1/" + this.progID;
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
      let params = new URLSearchParams();
      params.append("projectId", this.progID);
      //调用封装的postData函数，获取服务器返回值 
      if(!this.haveRen){
        if(this.canClaim){
          let url = this.$urlPath.website.renlingProg + this.progID;
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
          this.$message.error("名额已满，不能认领，请申诉");
          this.showModal();
        }
      }
      else{
        let url = this.$urlPath.website.disrenlingProg + this.progID;
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
    getLikeStatus(){
      let params = new URLSearchParams();
      params.append("paperId", this.progID);
      params.append("type", 2);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.gcLikeStatus ;//+ "1/" + this.progID;
      console.log(url);
      getData(url, params).then(res => {
        if (res.code === 1001) {
          // this.$message.success(res.message);
          console.log(res);
          this.Like = true;
          this.LikeDisplay = "取消收藏";
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else if(res.code === 404){
          this.Like = false;
          this.LikeDisplay = "收藏";
          console.log(res.code);
          // this.$message.success(res.message);
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    shoucang(){
      let params = new URLSearchParams();
      params={
        "paperId": this.progID,
        "type": 2,
      };
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.gcLikeStatus ;//+ "1/" + this.progID;
      console.log(url);
      putData(url,params).then(res => {
        if (res.code === 1001) {
          this.$message.success(res.message);
          console.log(res);
          if(this.Like){ 
            this.LikeDisplay = "收藏";
            // this.$message.success("已取消收藏");
            this.Like = false;
          }
          else {
            this.LikeDisplay = "取消收藏";
            // this.$message.success("已收藏");
            this.Like = true;
          }
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
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
.refer-num1{
  /* border: solid 1px black; */
  width: 1000px;
  height: 30px;
  margin: 10px 10px 10px 10px;
}
.refer-num-dis1{
  /* border: solid 1px black; */
  width: 1000px;
  height: 30px;
  margin: 10px 10px 10px 10px;
  font-size: medium;
}
.organization{
  /* border: solid 1px black; */
  width: 200px;
  height: 25px;
  margin: -25px 0px 0px 800px;
  /* margin-top: -25px;
  margin-right: 20px; */
  font-size: small;
}
.organization-num{
  width: 200px;
  height: 25px;
  margin-right: 10px;
  font-size: medium;
}
.date{
  /* border: solid 1px black; */
  /* width: 200px; */
  height: 25px;
  margin: 0px 0px 0px 0px;
  font-size: small;
}
.date-num{
  /* width: 200px; */
  height: 25px;
  margin: 10px;
  font-size: medium;
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
.authors{
  /* border: solid 1px black; */
  width: 1000px;
  /* height: 50px; */
  margin: 10px;
}
.author {
  height: 40px;
  /* width: 130px; */
  margin: 5px;
  /*border: solid 1px black;*/
}
.author-name {
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

.Abstract-frame{
  width: 1100px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.Abstract{
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
  /* margin: 0px 0px 0px 20px; */
  height: 30px;
  /* font-size: medium; */
}
.url-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
}

.img {
  margin: auto;
  /* border: solid 1px red; */
}
.author-from {
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
  margin: -21% -105px 10px 10px;
}
.btn {
  width: 100px;
  /* border: solid 1px black; */
  margin: 15px;
}
</style>
