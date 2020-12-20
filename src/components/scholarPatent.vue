<template>
  <div>
    <div class="result-main">
      <div class="topbar">
        <span style="display: inline-block; margin-top: 5px"> 检索到{{ patentTotal }}条结果</span>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="patentList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                <span v-html="item.inventor" /> <br />
                <span v-html="item.applicationDate" /> - <span v-html="item.state" /> -
                <span v-html="item.province" /> - <span v-html="item.applicationNumber" /> <br />
                <span v-html="item.classificationNumber" />
              </div>
              <a slot="title" class="searchResult-title" @click="toPatent(item.id)"
                ><span v-html="item.title"></span>
              </a>
            </a-list-item-meta>
            <div class="patent-abstract" v-html="item.Abstract"></div>
          </a-list-item>
        </a-list>
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
      currentPage: 1,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
    };
  },
  props: ["page", "scholarid", "patentList", "patentTotal"],
  methods: {
    toPatent(id) {
      this.$router.push("/patentDisplay/" + id);
    },
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage = 1;
      this.searchPatent();
    },
    changePage() {
      this.searchPatent();
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
