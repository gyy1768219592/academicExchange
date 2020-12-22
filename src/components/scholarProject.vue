<template>
  <div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ projectTotal }}条结果</span>
      </div>
      <div class="result-list-project">
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="projectList">
          <a-list-item slot="renderItem" key="item.fundProjectCode" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                {{ item.organization }} - {{ item.publishDate }} <br />
                {{ item.authors }}
              </div>
              <a slot="title" @click="toProject(item.projectId)"><span v-html="item.fundProject"></span> </a>
            </a-list-item-meta>
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
      currentPage: "1",
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      },
    };
  },
  props: ["page", "scholarid", "projectList", "projectTotal"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    toProject(id) {
      let url = this.$router.resolve("/progDisplay/" + id);
      window.open(url.href, "_blank");
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
.result-list-project .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>
