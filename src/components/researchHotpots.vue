<template>
  <div>
    <div id="echart-wordbar"></div>
  </div>
</template>
<script>
import { getData } from "@/api/webget";

let echarts = require("echarts/lib/echarts");
require("echarts-wordcloud/dist/echarts-wordcloud.min");
require("echarts/lib/chart/bar");

export default {
  data() {
    return {
      chart: null,
      chart2: null,
      cloudData: [],
    };
  },
  methods: {
    initChart2() {
      let that = this;
      this.chart2 = echarts.init(document.getElementById("echart-wordbar"));
      var salvProName = [];
      var salvProValue = [];
      var salvProMax = []; //背景按最大值
      for (var i = 0; i < this.cloudData.length; i++) {
        salvProName[i] = this.cloudData[i].name;
        salvProValue[i] = this.cloudData[i].value;
      }
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax[i] = salvProValue[0];
      }
      var attackSourcesColor1 = ["#EB3B5A", "#FA8231", "#F7B731", "#3860FC"];
      var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#EB3B5A" },
          { offset: 1, color: "#FE9C5A" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#FA8231" },
          { offset: 1, color: "#FFD14C" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#F7B731" },
          { offset: 1, color: "#FFEE96" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#395CFE" },
          { offset: 1, color: "#2EC7CF" },
        ]),
      ];
      function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function (item, i) {
          let itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          };
          sss.push({
            value: item,
            itemStyle: itemStyle,
          });
        });
        return sss;
      }
      function contains(arr, dst) {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] == dst) {
            return i;
          }
          i += 1;
        }
        return false;
      }
      let option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0,
            },
          },
          formatter: function (params) {
            return params[0].name + "<br>热度: " + params[0].value;
          },
        },
        width: "100%",
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pdaaing: [5, 0, 0, 0],
            postion: "right",
            data: salvProName,
            axisLabel: {
              margin: 35,
              fontSize: 10,
              align: "left",
              padding: [2, 0, 0, 0],
              color: "#000",
              rich: {
                nt1: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[0],
                  width: 20,
                  height: 20,
                  fontSize: 16,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                  lineHeight: 5,
                },
                nt2: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[1],
                  width: 20,
                  height: 20,
                  fontSize: 16,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                  lineHeight: 5,
                },
                nt3: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[2],
                  width: 20,
                  height: 20,
                  fontSize: 16,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                  lineHeight: 5,
                },
                nt: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[3],
                  width: 20,
                  height: 20,
                  fontSize: 16,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                  lineHeight: 5,
                },
              },
              formatter: function (value, index) {
                index = contains(salvProName, value) + 1;
                if (index <= 3) {
                  return ["{nt" + index + "|" + index + "}"].join("\n");
                } else {
                  return ["{nt|" + index + "}"].join("\n");
                }
              },
            },
          },
          {
            type: "category",
            offset: -14,
            position: "left",
            axisLine: {
              show: false,
            },
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: ["black"],
              align: "left",
              verticalAlign: "bottom",
              lineHeight: 44,
              fontSize: 16,
            },
            data: salvProName,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
              },
            },
            barWidth: 20,
            data: attackSourcesDataFmt(salvProValue),
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: salvProMax,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,0.2)",
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
      this.chart2.setOption(option2);
      this.chart2.on("click", function (params) {
        that.$router.push({
          path: "/searchResult",
          query: {
            word: params.name,
            institution: "",
            author: "",
            startDate: "",
            endDate: "",
          },
        });
      });
    },
    getData() {
      getData(this.$urlPath.website.getHotFields).then((res) => {
        if (res.code === 1001) {
          console.log(res.data);
          const cloudData = [];
          res.data.forEach((item) => {
            const display = {};
            display["name"] = item.displayName;
            display["value"] = item.citationCount;
            cloudData.push(display);
          });
          this.cloudData = cloudData;
          this.initChart2();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
#echart-wordbar {
  width: 350px;
  height: 650px;
  margin-top: -20px;
}
</style>