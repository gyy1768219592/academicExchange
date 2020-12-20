<template>
  <div class="al">
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:1%">我的收藏</h2>
    <a-tabs style="margin-left: 250px;margin-top:1%" default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="copy" />
          文献
        </span>
        <Collect :ch="0"></Collect>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="pie-chart" />
          专利
        </span>
        <Collect :ch="1"></Collect>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="appstore" />
          项目
        </span>
        <Collect :ch="2"></Collect>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>

import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";
import Collect from "./collectInfo.vue";
export default {
  data() {
    return {
     
    }
  },
  components: {
    Nav,
    SiderNav,
    Collect
  },
  mounted() {
    
  },
  methods: {
    dataChange(){
        this.choose = 1
    }

  }
};
</script>
<style scoped>
.al ::-webkit-scrollbar{
  display: none;
}
.al{
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.ant-table-wrapper {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>