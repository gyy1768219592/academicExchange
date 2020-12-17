<template>
  <div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ total }}条结果</span>
      </div>
      <div class="result-list-project">
        <a-list item-layout="vertical" size="large" :data-source="projectList">
          <a-list-item slot="renderItem" key="item.projectId" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                {{ item.institution }} - {{ item.year }} <br />
                {{ item.author }}
              </div>
              <a slot="title" :href="item.href"><span v-html="item.title"></span> </a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <div class="result-list-pagination">
          <a-pagination simple :default-current="2" :total="total" v-model="currentPage" @change="changePage" />
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
      currentPage: "1",
      total: 203,
      projectList: [
        {
          title: "基于云<span class='highlight'>计算</span>的互联网艺术培训考级平台",
          institution: "华北水利水电大学",
          author: "徐勇; 焦宇翔; 陈蕙; 徐志健; 崔德伟; 刘海; 唐炯麟; 倪坚; 孙文力; 高阳; 阎帅; 王怡洁; 钱叶丹; 陈轶鸣",
          year: "2019",
        },
        {
          title: "基于大数据云<span class='highlight'>计算</span>的智慧刑侦信息研判分析平台",
          institution: "北京大学",
          author: "袁泉; 倪艳玉; 李志霞; 郑美英; 卢姗; 白建华; 郝亚昆; 古松景; 刁薪予; 王胤; 陈静",
          year: "2019",
        },
        {
          title: "自主可控的可信<span class='highlight'>计算</span>关键技术及应用",
          institution: "武汉大学",
          author: "张焕国;赵波;严飞;王鹃;余发江;张立强;王后珍;王张宜",
          year: "2019",
        },
        {
          title: "网络大数据<span class='highlight'>计算</span>的基础理论及其应用研究",
          institution: "中国科学院计算技术研究所",
          author: "	华云生;郑纬民;文继荣;赵生捷;李晓明;程学旗",
          year: "2018",
        },
        {
          title: "基于云<span class='highlight'>计算</span>与盲源分离的设备故障预测系统研发",
          institution: "西北工业大学",
          author: "何鹏举;张京妹;张家豪;折廷廷;李文辉;陈青霞;袁伟标",
          year: "2018",
        },
        {
          title: "	云<span class='highlight'>计算</span>架构下基于语义驱动的信息推荐理论和实证研究",
          institution: "同济大学",
          author: "黄震华",
          year: "2016",
        },
        {
          title: "基于云<span class='highlight'>计算</span>的互联网艺术培训考级平台",
          institution: "华北水利水电大学",
          author: "徐勇; 焦宇翔; 陈蕙; 徐志健; 崔德伟; 刘海; 唐炯麟; 倪坚; 孙文力; 高阳; 阎帅; 王怡洁; 钱叶丹; 陈轶鸣",
          year: "2019",
        },
        {
          title: "基于大数据云<span class='highlight'>计算</span>的智慧刑侦信息研判分析平台",
          institution: "清华大学",
          author: "袁泉; 倪艳玉; 李志霞; 郑美英; 卢姗; 白建华; 郝亚昆; 古松景; 刁薪予; 王胤; 陈静",
          year: "2019",
        },
        {
          title: "自主可控的可信<span class='highlight'>计算</span>关键技术及应用",
          institution: "武汉大学",
          author: "张焕国;赵波;严飞;王鹃;余发江;张立强;王后珍;王张宜",
          year: "2019",
        },
        {
          title: "网络大数据<span class='highlight'>计算</span>的基础理论及其应用研究",
          institution: "中国科学院计算技术研究所",
          author: "	华云生;郑纬民;文继荣;赵生捷;李晓明;程学旗",
          year: "2018",
        },
      ],
    };
  },
  props: ["scholarid"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    //获取学者信息
    getScholarInfo() {
      let url = this.$urlPath.website.getScholarInfo;
      getData(url + "/2/1").then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success("获取数据成功");
          this.scholar = res.data.scholar;
          this.workExperience = res.data.workExperience;
          console.log(this.scholar);
          console.log(this.this.workExperience);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {
    this.searchProject();
  },
};
</script>

<style>
.result-main {
  float: left;
  width: 930px;
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
