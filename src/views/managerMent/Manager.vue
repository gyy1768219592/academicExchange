<template>
  <div><topNav></topNav><!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="left-block">
        <a-menu
        style="width: 300px"
        :default-selected-keys="['1']"
        :open-keys.sync="openKeys"
        mode="inline"
        @click="handleClick"
        >
        <a-sub-menu key="sub1" @titleClick="titleClick">
            <span slot="title"><a-icon type="mail" /><span>处理申诉信息</span></span>
            <a-menu-item-group key="g1">
            <template slot="title"> <a-icon type="qq" /><span>Item 1</span> </template>
            <a-menu-item key="1">
                Option 1
            </a-menu-item>
            <a-menu-item key="2">
                Option 2
            </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="g2" title="Item 2">
            <a-menu-item key="3">
                Option 3
            </a-menu-item>
            <a-menu-item key="4">
                Option 4
            </a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title"><a-icon type="appstore" /><span>管理学者门户</span></span>
            <a-menu-item key="5">
            Option 5
            </a-menu-item>
            <a-menu-item key="6">
            Option 6
            </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">
                Option 7
            </a-menu-item>
            <a-menu-item key="8">
                Option 8
            </a-menu-item>
            </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="setting" /><span>管理学术成果</span></span>
            <a-menu-item key="9">
            Option 9
            </a-menu-item>
            <a-menu-item key="10">
            Option 10
            </a-menu-item>
            <a-menu-item key="11">
            Option 11
            </a-menu-item>
            <a-menu-item key="12">
            Option 12
            </a-menu-item>
        </a-sub-menu>
        </a-menu>
      </div>
      <div class="right-block">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
                <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </a-list-item-meta>
            </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
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
      data,
      current: ['mail'],
      openKeys: ['sub1'],
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
.left-block {
  width: 300px;
  height: 1400px;
  margin: 0px 0px 0px 20px;
  border: solid 1px black;
}
.right-block {
  width: 860px;
  height: 1400px;
  margin: -1400px 0px 0px 320px;
  border: solid 1px black;
}
</style>
