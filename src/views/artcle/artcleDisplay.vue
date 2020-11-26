<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
            <div class="refer-num">
                <h3>0被引</h3>
            </div>
            <div class="title">
                <h3>陈志刚教授辨病论治周围神经病经验</h3>
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
              <!-- <h1>{{data.abstract}}</h1> -->
              <a-descriptions title="摘要">
                <a-descriptions-item >
                  <span class="abstract" >{{abstract}}</span>
                </a-descriptions-item >
              </a-descriptions>
              <a-descriptions title="关键词">
                <a-descriptions-item >
                  <span class="keyword" >{{keyword}}</span>
                </a-descriptions-item>
              </a-descriptions>
              <a-descriptions title="DOI">
                <a-descriptions-item >
                  <span class="DOI" >{{DOI}}</span>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="原文来源">
            <a-descriptions title="全文链接">
              <a-descriptions-item >
                <a :href="zhiwang">知网</a>
              </a-descriptions-item>
              <a-descriptions-item >
                <a :href="weipu">维普</a>
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="3" tab="引用助手">
               
          </a-tab-pane>
          </a-tabs>
        </div>
        <div class="down-right-block">
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
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  components: {
    
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
      abstract : "  经济分权同垂直的政治管理体制紧密结合是中国式分权的核心内涵,本文在此背景下讨论地方政府支出结构偏向的激励根源,并通过构造财政分权指标和政府竞争指标、利用1994～2004年的省级面板数据对我们的推断进行实证检验.本文主要结论是:中国的财政分权以及基于政绩考核下的政府竞争,造就了地方政府公共支出结构\"重基本建设、轻人力资本投资扣公共服务\"的明显扭曲;并且,政府竞争会加剧财政分权对政府支出结构的扭曲,竞争对支出结构的最终影响则取决于分权程度,而1994年之后包括科教兴国、西部大开发在内的现行重大政策并没有缓解这种状况.这意味着,中国式分权在推动市场化和激发地方政府\"为增长而竞争\"的同时,与之伴随的成本可能正在上升.",
      keyword : "财政支出结构 中国式分权 政府竞争",
      DOI : "CNKI:SUN:GLSJ.0.2007-03-001",
      year : "2007",
      zhiwang : "http://www.cnki.com.cn/Article/CJFDTotal-GLSJ200703001.htm",
      weipu: "http://www.cqvip.com/QK/71135X/201107/24066042.html",
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
            show: true,
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
          // {
          //   name:'最低',
          //   type:'line',
          //   data:[1, -2, 2, 5, 3, 2, 0],
          //   markPoint: {
          //       data: [
          //           {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
          //       ]
          //   },
          //   markLine: {
          //     data: [
          //       {type: 'average', name: '平均值'},
          //       [{
          //         symbol: 'none',
          //         x: '90%',
          //         yAxis: 'max'
          //       }, {
          //         symbol: 'circle',
          //         label: {
          //           normal: {
          //             position: 'start',
          //             formatter: '最大值'
          //           }
          //         },
          //         type: 'max',
          //         name: '最高点'
          //       }]
          //     ]
          //   }
          // }
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
      import { postData } from "@/api/webpost";
      let params = new URLSearchParams();
      params.append("PaperId",values);
      postData(url, param).then(res=>{
        
      })
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
.title{
  border: solid 1px black;
  width: 800px;
  height: 50px;
  margin: 10px;
  font-size: x-large;
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
