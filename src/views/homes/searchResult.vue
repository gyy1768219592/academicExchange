<template>
  <div>
    <navSearch></navSearch>
    <div class="card-container">
      <a-tabs
        type="card"
        tabBarStyle="text-align: center"
        tabBarGutter="30px"
        animated
      >
        <a-tab-pane key="1" tab="论  文">
          <div class="result-content">
            <paperSearchResult :word="word"></paperSearchResult>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="专  利">
          <div class="result-content">
            <patentSearchResult :word="word"></patentSearchResult>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="项  目">
          <div class="result-content">
            <projectSearchResult :word="word"></projectSearchResult>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="学  者">
          <div class="result-content">
            <scholarSearchResult :word="word"></scholarSearchResult>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import navSearch from "@/components/navSearch.vue";
import paperSearchResult from "@/components/paperSearchResult.vue";
import patentSearchResult from "@/components/patentSearchResult.vue";
import projectSearchResult from "@/components/projectSearchResult.vue";
import scholarSearchResult from "@/components/scholarSearchResult.vue";
export default {
  components: {
    navSearch,
    paperSearchResult,
    patentSearchResult,
    projectSearchResult,
    scholarSearchResult,
  },
  data() {
    return {
      word: this.$route.query.word,
    };
  },
  methods: {
    good() {
      alert(1);
    },
  },
};
</script>

<style>
.result-content {
  width: 1280px;
  margin: 0 auto;
  overflow: hidden;
}
.card-container {
  overflow: hidden;
  margin-top: 20px;
}
.card-container > .ant-tabs-card > .ant-tabs-bar {
  min-width: 1280px;
  border-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  height: 30px;
  line-height: 30px;
  border-color: #d9d9d9;
  background: #ebf4ff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #d9d9d9;
  background: #1890ff;
  color: #fff;
}
</style>