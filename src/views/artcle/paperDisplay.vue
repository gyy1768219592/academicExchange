<template>
  <div><topNav></topNav><!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
            <div class="refer-num">
                <span class="refer-num-dis">{{CitationCount}}被引</span>
            </div>
            <div class="date">
                <span class="date-num">发表时间： {{date}}</span>
            </div>
            <div class="title">
              <span class="title-name">{{PaperTitle}}</span>
            </div>
            <div class="authors">
                <a-list item-layout="vertical" :grid="{ gutter: 6, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="author_data">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <div class="author">
                            <a-avatar class="img" :size="35" icon="user" />
                            <h1 class="author-name">{{ item.username }}</h1>
                        </div>
                    </a-list-item>
                </a-list>
            </div>
        </div>
        <div class="tool">
            <div class="collect">
                <a-icon type="star" :style="{ fontSize: '30px', color: '#08c' }" class="star"/>
                <span class="collect-word">收藏</span>
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
              <a-icon type="key" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="关键词" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="Keyword-frame">
                   <span class="Keyword" >{{keyword}}</span>
                  </div>
                </a-descriptions-item>
              </a-descriptions>
              <a-icon type="snippets" :style="{ fontSize: '20px', color: '#08c'}"/>
              <a-descriptions title="DOI" style="margin: -25px 0px 0px 20px">
                <a-descriptions-item >
                  <div class="DOI-frame">
                    <span class="DOI" >{{DOI}}</span>
                  </div>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="原文来源">
            <a-icon type="disconnect" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="原文出处" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="source-frame">
                  <span class="source" >《{{Journal}}》-{{Volume}}卷-{{Issue}}期-{{FirstPage}}-{{LastPage}}</span>
                </div>
              </a-descriptions-item>
            </a-descriptions>
            <a-icon type="share-alt" :style="{ fontSize: '20px', color: '#08c'}"/>
            <a-descriptions title="全文链接" style="margin: -25px 0px 0px 20px">
              <a-descriptions-item >
                <div class="url-frame">
                  <a :href="SourceUrl">链接</a>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="3" tab="引用助手" style="margin: 10px">
               
          </a-tab-pane>
          </a-tabs>
        </div>
        <div class="down-right-block">
          <a-icon type="stock" :style="{ fontSize: '20px', color: '#08c'}"/>
          <span>引用走势</span>
          <div id="myChart" class="myChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
// import { postData } from "@/api/webpost";
import topNav from "@/components/nav.vue";
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  components: {
    topNav,
  },
  data() {
    return {
      author_data : [
        {
            username: "谭火彬",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "宋友",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "贾经冬",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "原仓周",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
      ],
      PaperTitle : "陈志刚教授辨病论治周围神经病经验",
      Abstract : "  经济分权同垂直的政治管理体制紧密结合是中国式分权的核心内涵,本文在此背景下讨论地方政府支出结构偏向的激励根源,并通过构造财政分权指标和政府竞争指标、利用1994～2004年的省级面板数据对我们的推断进行实证检验.本文主要结论是:中国的财政分权以及基于政绩考核下的政府竞争,造就了地方政府公共支出结构\"重基本建设、轻人力资本投资扣公共服务\"的明显扭曲;并且,政府竞争会加剧财政分权对政府支出结构的扭曲,竞争对支出结构的最终影响则取决于分权程度,而1994年之后包括科教兴国、西部大开发在内的现行重大政策并没有缓解这种状况.这意味着,中国式分权在推动市场化和激发地方政府\"为增长而竞争\"的同时,与之伴随的成本可能正在上升.",
      keyword : "财政支出结构 中国式分权 政府竞争",
      DOI : "CNKI:SUN:GLSJ.0.2007-03-001",
      DocType : "会议",
      CitationCount	:	123,
      date : "2001-01-09",
      Journal	: "SCI",          //期刊名	
      Conference :	"高级会议", //会议名
      Volume :	"23",          //卷号
      Issue :	"2001-23",       //期号
      FirstPage :	"213",       //开始页
      LastPage :	"223",       //结束页
      SourceUrl :"http://www.cnki.com.cn/Article/CJFDTotal-GLSJ200703001.htm",
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted(){
    this.initCharts();
  },
  methods: {
    initCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高','最低']
        },
        splitLine:{//去掉网格线
          show: false
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                formatter: '{value}'
            },
            data: ['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
        },
        yAxis: {
            show: false,
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        
        series: [
          {
            name:'',
            type:'line',
            data:[0, 0, 1, 2, 4, 8, 9, 12, 14, 15, 19, 20, 21, 22, 23, 24, 26, 34, 46, 52, 60, 67],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                // {type: 'average', name: '平均值'}
              ]
            }
          },
        ]
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
    getPaper(){
      // let params = new URLSearchParams();
      // params.append("PaperId",values);
      // postData(url, param).then(res=>{
        
      // })
    }

  },
};
</script>
<style scoped>
.main-block {
  width: 1200px;
  height: 1400px;
  margin: auto;
  border: solid 1px black;
}
.up-block {
  border: solid 1px black;
  width: 1100px;
  height: 250px;
  margin: auto;
  background-color: #f0f0f0f0;
}
.down-block {
  border: solid 1px black;
  width: 1100px;
  height: 900px;
  margin: auto;
}
.down-left-block {
  border: solid 1px black;
  width: 750px;
  height: 900px;
  margin: 0px 0px 0px 0px;
}
.down-right-block {
  border: solid 1px black;
  width: 350px;
  height: 900px;
  margin: -900px 10px 10px 750px;
}
.artcle-info {
  border: solid 1px black;
  width: 950px;
  height: 180px;
  margin: 10px;
}
.tool{
  border: solid 1px black;
  width: 950px;
  height: 40px;
  margin: 10px;
}
.collect{
  border: solid 1px black;
  width: 100px;
  height: 40px;
  margin: 0px;
}
.collect-word{
  border: solid 1px black;
  width: 100px;
  height: 35px;
  margin: 0px;
  font-size: x-large;
}
.star{
  /*border: solid 1px black;*/
  width: 40px;
  height: 40px;
  margin: 5px 0px 0px 0px;
}
.refer-num{
  border: solid 1px black;
  width: 85px;
  height: 25px;
  margin: 10px;
  font-size: small;
}
.refer-num-dis{
  width: 85px;
  height: 25px;
  margin: 10px;
  font-size: medium;
}
.date{
  border: solid 1px black;
  width: 200px;
  height: 25px;
  margin: -35px 0px 0px 750px;
  font-size: small;
}
.date-num{
  width: 200px;
  height: 25px;
  margin: 10px;
  font-size: medium;
}
.title{
  border: solid 1px black;
  width: 800px;
  height: 50px;
  margin: 10px;
  font-size: x-large;
}
.title-name{
  width: 800px;
  height: 50px;
  margin: 10px;
  font-size: xx-large;
}
.authors{
  border: solid 1px black;
  width: 900px;
  height: 50px;
  margin: 10px;
}
.author {
  height: 40px;
  width: 130px;
  margin: 5px;
  /*border: solid 1px black;*/
}
.author-name {
  width: 95px;
  /*border: solid 1px black; */
  margin: -37px auto 0 35px;
  height: 40px;
  font-size: x-large;
}
.myChart {
  border: solid 1px blue;
  width: 320px;
  height: 300px;
  margin: 10px;
}


.Abstract-frame{
  width: 700px;
  border: solid 1px black;
  margin: 0px 0px 0px 0px;
}
.Abstract{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  font-size: medium;
}
.Keyword-frame{
  width: 700px;
  border: solid 1px black;
  margin: 0px 0px 0px 0px;
}
.Keyword{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  font-size: medium;
}
.DOI-frame{
  width: 700px;
  border: solid 1px black;
  margin: 0px 0px 0px 0px;
}
.DOI{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  font-size: medium;
}
.source-frame{
  width: 700px;
  border: solid 1px black;
  margin: 0px 0px 0px 0px;
}
.source{
  width: 600px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 20px;
  height: 30px;
  font-size: medium;
}
.url-frame{
  width: 700px;
  border: solid 1px black;
  margin: 0px 0px 0px 20px;
}

.img {
  margin: auto;
  /* border: solid 1px red; */
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
</style>
