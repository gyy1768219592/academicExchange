<template>
  <div class="irank-main">
    <a-tabs
      default-active-key="all"
      tab-position="left"
      @prevClick="callback"
      @nextClick="callback"
      :tabBarGutter="0"
      :style="{ height: '580px' }"
    >
      <a-tab-pane key="all" tab="总体排名">
        <div class="irank-orgtitle">自然指数排名</div>
        <div id="echart-rankbar"></div>
      </a-tab-pane>
      <a-tab-pane
        v-for="(item, index) in arealist"
        :key="index"
        :tab="item.areaname"
      >
        <div class="irank-orgtitle">{{ item.areaname }}领域</div>
        <a-table
          class="irank-table"
          size="middle"
          :columns="columns"
          :data-source="ranklist"
          @change="onChange"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { getData } from "@/api/webget";

let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
export default {
  data() {
    return {
      chart: null,
      arealist: [
        {
          areaname: "高性能计算",
        },
        {
          areaname: "分布式系统",
        },
        {
          areaname: "人工智能",
        },
        {
          areaname: "图像处理",
        },
        {
          areaname: "数据挖掘",
        },
        {
          areaname: "软件工程",
        },
        {
          areaname: "计算机科学理论",
        },
        {
          areaname: "计算机网络",
        },
        {
          areaname: "分布式系统",
        },
        {
          areaname: "人工智能",
        },
        {
          areaname: "图像处理",
        },
        {
          areaname: "数据挖掘",
        },
        {
          areaname: "软件工程",
        },
        {
          areaname: "计算机科学理论",
        },
        {
          areaname: "计算机网络",
        },
      ],
      ranklist: [
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 139,
          firstAuthor: 23,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 60,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 169,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 29,
          firstAuthor: 34,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
        {
          institution: "北京航空航天大学",
          paperCount: 129,
          firstAuthor: 30,
        },
      ],
      columns: [
        {
          title: "科研机构",
          width: "350px",
          dataIndex: "institution",
          ellipsis: true,
        },
        {
          title: "论文数",
          width: "155px",
          align: "center",
          dataIndex: "paperCount",
          sorter: (a, b) => a.paperCount - b.paperCount,
        },
        {
          title: "第一作者数",
          width: "155px",
          align: "center",
          dataIndex: "firstAuthor",
          sorter: (a, b) => a.firstAuthor - b.firstAuthor,
        },
      ],
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("echart-rankbar"));
      let option = {
        width: "600px",
        grid: {
          top: "5%",
          right: "0%",
          left: "9.2%",
          bottom: "17.5%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0.6,
              width: 1,
            },
          },
          formatter: function (params) {
            return params[0].name + "<br>NatureIndex: " + params[0].value;
          },
        },
        xAxis: {
          data: this.names,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 129, 109, 0.1)",
              width: 2, //这里是为了突出显示加上的
            },
          },
          axisLabel: {
            color: "#999",
            fontSize: 12,
            margin: 20,
            interval: 0,
            formatter: function (value) {
              var result = "";
              if (value == "Chinese Academy of Sciences") {
                result = "Chinese Academy\nof Sciences";
                return result;
              } else if (
                value == "Harvard University" ||
                value == "Max Planck Society" ||
                value == "University of Michigan" ||
                value == "University of Tokyo" ||
                value == "Stanford University" ||
                value == "University of Washington" ||
                value == "University of São Paulo"
              ) {
                return value;
              } else if (
                value == "Centre national de la recherche scientifique"
              ) {
                result = "Centre national de la\nrecherche scientifique";
                return result;
              } else if (value == "Russian Academy of Sciences") {
                result = "Russian Academy\nof Sciences";
                return result;
              } else {
                var maxLength = 16; //每项显示文字个数
                var valLength = value.length; //X轴类目项的文字个数
                var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowNumber > 1) {
                  for (var i = 0; i < rowNumber; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    temp = value.substring(start, end) + "\n";
                    result += temp; //拼接生成最终的字符串
                  }
                  return result;
                } else {
                  return value;
                }
              }
            },
            rotate: 28,
          },
        },
        yAxis: [
          {
            splitNumber: 2,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 129, 109, 0.1)",
                width: 2, //这里是为了突出显示加上的
              },
            },
            axisLabel: {
              textStyle: {
                color: "#999",
              },
            },
            splitArea: {
              areaStyle: {
                color: "rgba(255,255,255,.5)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 129, 109, 0.1)",
                width: 1,
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "0%",
            barWidth: "70px",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#DB5E6A",
              fontSize: 12,
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(232, 94, 106, .8)", //  0%  处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(232, 94, 106, .1)", //  100%  处的颜色
                    },
                  ],
                  global: false, //  缺省为  false
                },
              },
              emphasis: {
                opacity: 1,
              },
            },
            // data: [363, 123, 60, 46, 30, 25, 23, 22, 19, 12],
            data: this.natures,
            z: 10,
          },
        ],
      };
      this.chart.setOption(option);
    },
    get() {
      const url = this.$urlPath.website.getTopInstitution;
      getData(url).then((res) => {
        if (res.code === 1001) {
          const names = [];
          const natures = [];
          res.data.forEach((item) => {
            // console.log(item)
            names.push(item.institutionName);
            natures.push(item.natureIndex);
          });
          this.names = names;
          this.natures = natures;
          this.initChart();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style>
.irank-main {
  width: 850px;
  margin-top: 20px;
}
.irank-main .ant-tabs-left-bar .ant-tabs-nav .ant-tabs-tab {
  padding-top: 0;
  padding-bottom: 0;
  height: 50px;
  width: 130px;
  line-height: 50px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.irank-main .ant-tabs-left-bar .ant-tabs-nav .ant-tabs-tab-active {
  padding-left: 23px;
  border: solid 1px #d5d5d5;
  border-left: solid 2px #dc143c;
  padding-top: 0;
  padding-bottom: 0;
  height: 50px;
  width: 133px;
  line-height: 50px;
  font-weight: 700;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.irank-main .ant-tabs-ink-bar {
  background: #ffffff;
}
.irank-main .irank-orgtitle {
  font-weight: 700;
  padding-bottom: 10px;
}
.irank-main .irank-table {
  width: 650px;
  margin-left: 20px;
}
#echart-rankbar {
  width: 690px;
  height: 520px;
}
</style>
