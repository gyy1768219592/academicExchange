<template>
  <div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ paperTotal }}条结果</span>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="paperList">
          <a-list-item slot="renderItem" key="item.paperId" slot-scope="item, index">
            <a-list-item-meta
              :description="nameList[index] + ' - ' + item.journal + ' - 被引量: ' + item.citationCount"
            >
              <a slot="title" @click="toPaper(item.paperId)"><span v-html="item.paperTitle"></span> </a>
            </a-list-item-meta>
            <div class="abstract-paper">{{ item.abstract }}</div>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
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
  props: ["page", "scholarid", "paperList", "paperTotal", "nameList"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    toPaper(paperId) {
      let url = this.$router.resolve("/paperDisplay/" + paperId);
      window.open(url.href, "_blank");
    },
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
