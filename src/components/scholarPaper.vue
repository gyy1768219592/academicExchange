<template>
  <div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ paperTotal }}条结果</span>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="paperList">
          <a-list-item slot="renderItem" key="item.paperId" slot-scope="item">
            <a-list-item-meta :description="scholarname + ' - ' + item.journal + ' - 被引量: ' + item.citationCount">
              <a slot="title" @click="toPaper(item.paperId)"><span v-html="item.paperTitle"></span> </a>
            </a-list-item-meta>
            <div class="abstract-paper">{{ item.abstract }}</div>
          </a-list-item>
        </a-list>
        <div class="result-list-pagination">
          <a-pagination simple :default-current="2" :total="paperTotal" v-model="currentPage" @change="changePage" />
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
      scholarname: "lululu",
      userid: 8,
    };
  },
  props: ["scholarid", "paperList", "paperTotal"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    toPaper(paperId) {
      this.$router.push("/paperDisplay/" + paperId);
    },
    //获取学者信息
    // getScholarInfo() {
    //   let url = this.$urlPath.website.getScholarInfo;
    //   getData(url + "/" + this.userid + "/" + this.scholarid).then((res) => {
    //     console.log(res.code);
    //     if (res.code === 1001) {
    //       // this.$message.success("获取数据成功");
    //       this.pList = res.data.paper;
    //       this.total = res.data.paperNum;
    //       this.scholarname = res.data.scholar.name;
    //       console.log(this.pList);
    //       console.log(this.total);
    //     } else {
    //       this.$message.error(res.message);
    //     }
    //   });
    // },
  },
};
</script>

<style>
.result-main {
  float: left;
  width: 1300px;
  overflow: hidden;
  padding-left: 20px;
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
.result-main .result-list .result-list-button {
  margin-right: 5px;
}
.result-main .result-list .ant-list-item {
  padding-left: 10px;
}
.result-main .result-list .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.abstract-paper {
  height: 60px;
  width: 880px;
  /* border: 1px blue solid; */
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>
