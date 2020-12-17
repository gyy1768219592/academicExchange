<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        专利
      </div>
    </div>
    <div class="result-main">
      <div class="topbar">
        <span style="display: inline-block; margin-top: 5px"> 检索到{{ total }}条结果</span>
        <a-select v-model="sortOption" @change="changeSortOption" class="topbar-select">
          <a-icon slot="suffixIcon" type="swap" rotate="90" />
          <a-select-option :value="1"> 相关性 </a-select-option>
          <a-select-option :value="2"> 申请日期 </a-select-option>
        </a-select>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="patentList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                <span v-html="item.inventor" /> <br />
                <span v-html="item.applicationDate" /> - <span v-html="item.state" /> -
                <span v-html="item.province" /> - <span v-html="item.applicationNumber" /> <br />
                <span v-html="item.classificationNumber" />
              </div>
              <a slot="title" class="searchResult-title" :href="item.href"><span v-html="item.title"></span> </a>
            </a-list-item-meta>
            <div class="patent-abstract" v-html="item.abstract"></div>
          </a-list-item>
        </a-list>
        <div class="result-list-pagination">
          <a-pagination simple :default-current="1" :total="total" v-model="currentPage" @change="changePage" />
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
      currentPage: 1,
      total: 0,
      patentList: [],
      titleKW: "",
      abstractKW: "",
      organizationKW: "",
      authorKW: "",
      startDate: "",
      endDate: "",
      selectedKey: [],
    };
  },
  methods: {
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage = 1;
      this.searchPatent();
    },
    changePage() {
      this.searchPatent();
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
};
</script>

<style>
.searchResult-title {
  font-weight: 600;
}
.result-main {
  float: left;
  width: 1040px;
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
  margin-right: 10px;
}
.result-main .ant-list-item-action {
  margin-top: 5px;
}
.result-main .result-list .result-list-button {
  margin-right: 5px;
  padding: 0;
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
.patent-abstract {
  height: 40px;
  width: 1000px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>
