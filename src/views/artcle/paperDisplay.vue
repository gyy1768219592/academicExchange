<template>
  <div>
    <navSearch></navSearch>
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
          <div class="refer-num">
              <span class="refer-num-dis">{{CitationCount}}被引</span>
          </div>
          <div class="title">
            <span class="title-name">{{PaperTitle}}</span>
          </div>
          <div v-if="EngTitie!=''" class="refer-num1">
            <span v-if="EngTitie!=''" class="refer-num-dis1">{{EngTitie}}</span>
          </div>
          <div class="authors">
              <a-list item-layout="vertical" :grid="{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }" :data-source="author_data">
                  <a-list-item slot="renderItem" slot-scope="item">
                      <div class="author">
                        <a-dropdown>
                          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar class="img" :size="30" icon="user" />
                            <h1 class="author-name">{{ item.name }}</h1>
                          </a>
                          <a-menu slot="overlay">
                            <a-menu-item>
                              <div class="author" @click="gotoUser(item.scholarId,item.authorId)">
                                <a-avatar class="img" :size="30" icon="user" />
                                <h1 class="author-name2">{{ item.name }}</h1>
                              </div>
                            </a-menu-item>
                            <a-menu-item>
                              <div class="author-infor">
                                <div class="author-infor-item">
                                  <span class="author-infor-item_cnt">{{ item.paperCount }}</span> 
                                  <span class="author-infor-item_cnt">论文</span>
                                </div>
                                <div class="author-infor-item">
                                  <span class="author-infor-item_cnt">{{ item.citationCount }}</span> 
                                  <span class="author-infor-item_cnt">被引</span>
                                </div>
                                <div class="author-infor-item">
                                  <span class="author-infor-item_cnt">{{ item.HIndex }}</span> 
                                  <span class="author-infor-item_cnt">H指数</span>
                                </div>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                  </a-list-item>
              </a-list>
          </div>
          <div class="actions">
            <a-button class="btn" @click="shoucang">{{LikeDisplay}}</a-button>
            <a-button class="btn" type="primary" @click="fenxiang">分享</a-button>
          </div>
          <div class="date">
            <span class="date-num">发表时间： {{date}}</span>
          </div>
          <div class="DOI-frame">
            <span class="DOI" >DOI号：{{DOI}}</span>
          </div>
        </div>
      </div>
      <div class="down-block">
        <div class="down-left-block" >
          <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="基本信息" force-render>
            <div class="base-info">
              <a-icon type="pic-left" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="摘要" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Abstract-frame">
                    <span class="Abstract" >{{Abstract}}</span>
                  </div>
                </a-descriptions-item >
              </a-descriptions>
              <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="发表位置" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="source-frame">
                    <!-- <span class="source" >《{{Journal}}》-{{Volume}}卷-{{Issue}}期-{{FirstPage}}-{{LastPage}}</span> -->
                    <div class="source" v-if="Journal!=''">期刊：《{{Journal}}》</div>
                    <div class="source" v-if="Conference!=''">会议：《{{Conference}}》</div>
                    <div class="source" v-if="Volume!=''">卷号：第{{Volume}}卷</div>
                    <div class="source" v-if="Issue!=''">期号：第{{Issue}}期</div>
                    <div class="source" v-if="FirstPage!=''">开始页：{{FirstPage}}</div>
                    <div class="source" v-if="LastPage!=''">结束页：{{LastPage}}</div>
                  </div>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="原文链接">
            <a-icon type="share-alt" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="全文链接" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="url-frame">
                  <a v-if="SourceUrl!=''" :href="SourceUrl">{{SourceUrl}}</a>
                  <a v-if="SourceUrl==''" >暂时没有全文链接{{SourceUrl}}</a>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <!-- <a-tab-pane key="3" tab="推荐文献" style="margin: 10px">
            <a-icon type="share-alt" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="引用" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="new-quote_container" style="left: 172px; bottom: 168.5px;">
                  <span class="yinyong" onclick="oCopy(this)">
                    {{yinyong}}
                  </span>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane> -->
          </a-tabs>
        </div>
        <div class="down-right-block">
          <!-- <a-icon type="stock" :style="{ fontSize: '20px', color: '#08c'}"/>
          <span class = "title-echart">引用走势</span> -->
          <!-- <div class="echarts-infor-frame">
            <div class="echarts-infor">
              <div class="echarts-infor-item">
                <span class="echarts-infor-item_cnt" id="leijialiang">{{leijiliang}}</span> 
                <span class="echarts-infor-item_cnt">累计被引量</span>
              </div>
              <div class="echarts-infor-item">
                <span class="echarts-infor-item_cnt" id="mounianbeiyinliang">{{mounianbeiyinliang}}</span> 
                <span class="echarts-infor-item_cnt" id="mounian">{{mounian}}年被引量</span>
              </div>
            </div>
          </div> -->
          <!-- <div id="myChart" class="myChart"> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import navSearch from "@/components/navSearch";
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
  components: {
    navSearch,
  },
  data() {
    return {
      Like: false,
      LikeDisplay:"收藏",
      paperID: this.$route.params.id,
      author_data : [],
      PaperTitle : "",
      EngTitie: "",
      Abstract : "",
      DOI : "",
      DocType : "",
      CitationCount	:	0,
      date : "",
      Journal	: "",          //期刊名	
      Conference :	"", //会议名
      Volume :	"",          //卷号
      Issue :	"",       //期号
      FirstPage :	"",       //开始页
      LastPage :	"",       //结束页
      SourceUrl :"",
      yinyong: "杨玲,  陈志刚. 陈志刚教授辨病论治周围神经病经验[J]. 中国当代医药. 2018,(12):112-115. ",
      // leijiliang : 0,
      // mounian : 2000,
      // mounianbeiyinliang : 2,
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted(){
    // this.initCharts();
    this.getPaper();
    this.getLikeStatus();
  },
  methods: {
    // initCharts () {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById('myChart'));
    //   // 绘制图表
    //   myChart.setOption({
    //     title: {
    //         text: '',
    //         subtext: ''
    //     },
    //     tooltip: {
    //         trigger: 'axis'
    //     },
    //     legend: {
    //         data:['最高','最低']
    //     },
    //     splitLine:{//去掉网格线
    //       show: false
    //     },
    //     toolbox: {
    //         show: false,
    //         feature: {
    //             dataZoom: {
    //                 yAxisIndex: 'none'
    //             },
    //             dataView: {readOnly: false},
    //             magicType: {type: ['line', 'bar']},
    //             saveAsImage: {}
    //         }
    //     },
    //     xAxis:  {
    //         type: 'category',
    //         boundaryGap: false,
    //         axisLabel: {
    //             formatter: '{value}'
    //         },
    //         data: ['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
    //     },
    //     yAxis: {
    //         show: false,
    //         type: 'value',
    //         axisLabel: {
    //             formatter: '{value}'
    //         }
    //     },
        
    //     series: [
    //       {
    //         name:'',
    //         type:'line',
    //         data:[0, 0, 1, 2, 4, 8, 9, 12, 14, 15, 19, 20, 21, 22, 23, 24, 26, 34, 46, 52, 60, 67],
    //         markPoint: {
    //           data: [
    //             {type: 'max', name: '最大值'},
    //             {type: 'min', name: '最小值'}
    //           ]
    //         },
    //         markLine: {
    //           data: [
    //             // {type: 'average', name: '平均值'}
    //           ]
    //         },
    //         tooltip: {
    //           show: true,
    //           trigger: 'axis',
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "#386db3",//折线点的颜色
    //             lineStyle: {
    //             color: "#386db3"//折线的颜色
    //             }
    //           }
    //         }
    //       },
          
    //     ]
    //   });
    //   myChart.getZr().on('mousemove', function (params) { 
    //   var pointInPixel= [params.offsetX, params.offsetY];
    //     if (myChart.containPixel('grid',pointInPixel)) {
    //       this.leijiliang = 10;
    //       var pointInGrid=myChart.convertFromPixel({seriesIndex:0},pointInPixel);
    //       var xIndex=pointInGrid[0];
    //       var op=myChart.getOption();
    //       var month = op.xAxis[0].data[xIndex];
    //       var value = op.series[0].data[xIndex];
    //       var num=0;
    //       for (var i=0; i<=xIndex; i++){
    //           num+=op.series[0].data[i];
    //       }
    //       this.mounian=month;
    //       if(isNaN(num)){
    //         num=0;
    //       }
    //       if(typeof(this.mounianbeiyinliang) == undefined){
    //         this.mounianbeiyinliang = 0;
    //       }
    //       if(typeof(this.mounian) == undefined){
    //         this.mounian = "0000";
    //       }
    //       this.mounianbeiyinliang = value;
    //       var span = document.getElementById("leijialiang");
    //       span.innerHTML = num;
    //       span = document.getElementById("mounianbeiyinliang");
    //       span.innerHTML = this.mounianbeiyinliang;
    //       span = document.getElementById("mounian");
    //       span.innerHTML = this.mounian+"年被引量";
    //     }
    //   });
      
    // },
    
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    callback(key) {
      console.log(key);
    },
    gotoUser(scholarId,authorId){
      //去此人的主页
      if(scholarId==-1){
        this.$router.push("/authorIndex/" + authorId);
      }
      else if(authorId == -1){
        this.$router.push("/scholarIndex/" + scholarId);
      }
    },
    getLikeStatus(){
      let params = new URLSearchParams();
      params.append("paperId", this.paperID);
      params.append("type", 0);
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
        "paperId": this.paperID,
        "type": 0,
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
    getPaper(){
      let params = new URLSearchParams();
      // params.append("paperId", this.paperID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getPaperById + this.paperID;
      console.log(url);
      getData(url, params).then(res => {
        if (res.code === 1001) {
          // this.progData = res.data.project;
          // this.author_data = this.progData.authors.split("; ");
          console.log(res.data);
          this.PaperTitle = res.data.paper.paperTitle;
          this.Abstract = res.data.paper.paper_abstract;
          this.DOI = res.data.paper.doi,
          this.DocType = res.data.paper.doctype;
          this.CitationCount = res.data.paper.citationCount;
          this.date = res.data.paper.date;
          this.Journal	= res.data.paper.journal;
          this.Conference = res.data.paper.conference;
          this.Volume = res.data.paper.volume;
          this.Issue = res.data.paper.issue;
          this.FirstPage = res.data.paper.firstPage;
          this.LastPage = res.data.paper.lastPage;
          this.SourceUrl = res.data.paper.sourceUrl==""?"https://doi.org/" + this.DOI:res.data.paper.sourceUrl;
          var qiege = this.PaperTitle.length;
          for(var k = this.PaperTitle.length; k >= 0; k --){
            console.log(this.PaperTitle[k]);
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(this.PaperTitle[k])){
              qiege = k+1;
              break;
            }
          }
          if(qiege == 0){
            this.EngTitie = "";
          }
          else if(qiege != this.PaperTitle.length){
            this.EngTitie = this.PaperTitle.substring(qiege,this.PaperTitle.length+1);
            this.PaperTitle = this.PaperTitle.substring(0,qiege);
          }
          else{
            this.EngTitie = "";
          }
          // this.$message.success(res.message);
          for(var i = 0; i < res.data.paperMap.authorList.length; i ++){
            var temp = {
              name: res.data.paperMap.authorList[i].name,
              paperCount: res.data.paperMap.authorList[i].paperCount,
              citationCount: res.data.paperMap.authorList[i].citationCount,
              HIndex: res.data.paperMap.authorList[i].HIndex,
              src: "https:///resmod/smate-pc/img/logo_psndefault.png",
              authorId: res.data.paperMap.authorList[i].authorId,
              scholarId: -1,
            }
            this.author_data.push(temp);
          } 
          for(var j = 0; j < res.data.paperMap.scholarList.length; j ++){
            var temp1 = {
              name: res.data.paperMap.scholarList[j].name,
              paperCount: res.data.paperMap.scholarList[j].paperCount,
              citationCount: res.data.paperMap.scholarList[j].citationCount,
              HIndex: res.data.paperMap.scholarList[j].HIndex,
              src: "https:///resmod/smate-pc/img/logo_psndefault.png",
              authorId: -1,
              scholarId: res.data.paperMap.scholarList[j].scholarId,
            }
            this.author_data.push(temp1);
          } 
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
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
  width: 1200px;
  height: 100px;
  /* margin: 0px 10px 10px 750px; */
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
.date{
  /* border: solid 1px black; */
  width: 200px;
  height: 25px;
  margin: 10px 0px 0px 0px;
}
.date-num{
  width: 200px;
  height: 25px;
  margin: 10px;
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
.author-name2 {
  width: 120px;
  /*border: solid 1px black; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* width: 80%; */
  margin: -30px auto 0 40px;
  height: 50px;
  font-size: medium;
}
.myChart {
  /* border: solid 1px blue; */
  width: 320px;
  height: 300px;
  margin: -60px 0px 0px 0px;
}
.yinyong {
    width: 80%;
    color: #333 !important;
    font-size: 14px;
    line-height: 20px;
    font-size: large;
}
.title-echart{
  font-size: medium;
}

.Abstract-frame{
  width: 1000px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
.Abstract{
  width: 900px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  /* font-size: medium; */
}
.DOI-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: -25px 0px 0px 750px;
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
  /* margin: 30px 0px 0px 20px; */
  height: 30px;
  /* font-size: medium; */
}
.url-frame{
  width: 700px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
}
.author-infor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 12px 0px;
}
.author-infor-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.author-infor-item_cnt {
    color: #999;
    font-size: 14px;
}

/* .echarts-infor-frame{
  width: 50%;
  margin: 0px 0px 0px 0px;
}
.echarts-infor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 12px 0px;
}
.echarts-infor-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.echarts-infor-item_cnt {
    color: #999;
    font-size: 14px;
} */
.img {
  margin: auto;
  /* border: solid 1px red; */
}
.actions {
  padding-top: 30px;
  /* border: solid 1px black; */
  width: 130px;
  height: 200px;
  display: block;
  float: right;
  margin: -170px -105px 10px 10px;
}
.btn {
  width: 100px;
  /* border: solid 1px black; */
  margin: 15px;
}
</style>
