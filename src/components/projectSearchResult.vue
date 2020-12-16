<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        项目
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        multiple
        class="sider-menu"
      >
        <a-sub-menu key="sub2">
          <span slot="title"><span>发表年份</span></span>
          <template v-for="item in projectYearOptions">
            <a-menu-item :key="item.value">
              {{ item.value }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ total }}条结果</span>
        <a-select
          default-value="1"
          @change="handleChange"
          class="topbar-select"
        >
          <a-icon slot="suffixIcon" type="swap" rotate="90" />
          <a-select-option value="1"> 相关性 </a-select-option>
          <a-select-option value="2"> 发表年份 </a-select-option>
        </a-select>
      </div>
      <div class="result-list-project">
        <a-list item-layout="vertical" size="large" :data-source="projectList">
          <a-list-item slot="renderItem" key="item.projectId" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                {{ item.institution }} - {{ item.year }} <br />
                {{ item.author }}
              </div>
              <a slot="title" :href="item.href"
                ><span v-html="item.title"></span>
              </a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <div class="result-list-pagination">
          <a-pagination
            simple
            :default-current="2"
            :total="total"
            v-model="currentPage"
            @change="changePage"
          />
        </div>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
// import { getData } from "@/api/webget";
export default {
  data() {
    return {
      currentPage: "1",
      total: 203,
      projectList: [
        {
          title:
            "基于云<span class='highlight'>计算</span>的互联网艺术培训考级平台",
          institution: "华北水利水电大学",
          author:
            "徐勇; 焦宇翔; 陈蕙; 徐志健; 崔德伟; 刘海; 唐炯麟; 倪坚; 孙文力; 高阳; 阎帅; 王怡洁; 钱叶丹; 陈轶鸣",
          year: "2019",
        },
        {
          title:
            "基于大数据云<span class='highlight'>计算</span>的智慧刑侦信息研判分析平台",
          institution: "北京大学",
          author:
            "袁泉; 倪艳玉; 李志霞; 郑美英; 卢姗; 白建华; 郝亚昆; 古松景; 刁薪予; 王胤; 陈静",
          year: "2019",
        },
        {
          title:
            "自主可控的可信<span class='highlight'>计算</span>关键技术及应用",
          institution: "武汉大学",
          author: "张焕国;赵波;严飞;王鹃;余发江;张立强;王后珍;王张宜",
          year: "2019",
        },
        {
          title:
            "网络大数据<span class='highlight'>计算</span>的基础理论及其应用研究",
          institution: "中国科学院计算技术研究所",
          author: "	华云生;郑纬民;文继荣;赵生捷;李晓明;程学旗",
          year: "2018",
        },
        {
          title:
            "基于云<span class='highlight'>计算</span>与盲源分离的设备故障预测系统研发",
          institution: "西北工业大学",
          author: "何鹏举;张京妹;张家豪;折廷廷;李文辉;陈青霞;袁伟标",
          year: "2018",
        },
        {
          title:
            "	云<span class='highlight'>计算</span>架构下基于语义驱动的信息推荐理论和实证研究",
          institution: "同济大学",
          author: "黄震华",
          year: "2016",
        },
        {
          title:
            "基于云<span class='highlight'>计算</span>的互联网艺术培训考级平台",
          institution: "华北水利水电大学",
          author:
            "徐勇; 焦宇翔; 陈蕙; 徐志健; 崔德伟; 刘海; 唐炯麟; 倪坚; 孙文力; 高阳; 阎帅; 王怡洁; 钱叶丹; 陈轶鸣",
          year: "2019",
        },
        {
          title:
            "基于大数据云<span class='highlight'>计算</span>的智慧刑侦信息研判分析平台",
          institution: "清华大学",
          author:
            "袁泉; 倪艳玉; 李志霞; 郑美英; 卢姗; 白建华; 郝亚昆; 古松景; 刁薪予; 王胤; 陈静",
          year: "2019",
        },
        {
          title:
            "自主可控的可信<span class='highlight'>计算</span>关键技术及应用",
          institution: "武汉大学",
          author: "张焕国;赵波;严飞;王鹃;余发江;张立强;王后珍;王张宜",
          year: "2019",
        },
        {
          title:
            "网络大数据<span class='highlight'>计算</span>的基础理论及其应用研究",
          institution: "中国科学院计算技术研究所",
          author: "	华云生;郑纬民;文继荣;赵生捷;李晓明;程学旗",
          year: "2018",
        },
      ],
      projectYearOptions: [
        {
          value: "2020",
          count: 55,
        },
        {
          value: "2019",
          count: 34,
        },
        {
          value: "2018",
          count: 61,
        },
        {
          value: "2017",
          count: 23,
        },
        {
          value: "2016",
          count: 17,
        },
        {
          value: "2015",
          count: 13,
        },
      ],
    };
  },
  props: ["word", "institution", "author", "startDate", "endDate"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    searchProject() {
      // let url = this.$urlPath.website.searchProject + "/" + this.word + "/0/10";
      // getData(url).then((res) => {
      //   if (res.code === 1001) {
      //     this.projectList = res.data.projectList;
      //     console.log(this.projectList);
      //   } else {
      //     console.log(res.code);
      //     this.$message.error("服务器返回出错");
      //   }
      // });
    },
  },
  mounted() {
    this.searchProject();
  },
};
</script>

<style>
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
.result-main .result-list-project .result-list-button {
  margin-right: 5px;
  padding: 0;
}
.result-main .result-list-project .ant-list-item {
  padding-bottom: 0;
  padding-left: 10px;
}
.result-main .result-list-project .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.abstract {
  height: 40px;
  width: 940px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.result-list-project .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>