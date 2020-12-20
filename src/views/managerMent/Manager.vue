<template>
  <div>
    <topNav></topNav>
    <div class="card-container">
      <a-tabs
        type="card"
        tabBarStyle="text-align: center"
        tabBarGutter="30px"
        animated
      >
        <a-tab-pane key="1" tab="申诉信息">
          <div class="result-content">
            <appeal></appeal>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="管理门户">
          <div class="result-content">
            <manageScholarGate></manageScholarGate>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="管理成果">
          <div class="result-content">
            <manageAcademicAchivement :word="word"></manageAcademicAchivement>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/nav.vue";
import appeal from "@/components/appeal.vue";
import manageScholarGate from "@/components/manageScholarGate.vue";
import manageAcademicAchivement from "@/components/manageAcademicAchivement.vue";
export default {
  components: {
    topNav,
    appeal,
    manageScholarGate,
    manageAcademicAchivement,
  },
  data() {
    return {
      word: this.$route.query.word,
    };
  },
  mounted(){
    this.checkKey();
  },
  methods: {
    good() {
      alert(1);
    },
    checkKey(){
      if(localStorage.getItem("identification")<2){
        this.$message.error("没有权限！");
        this.$router.push({
          path: "/"
        });
      }
    }
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