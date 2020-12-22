<template>
  <div>
    <div id="app" style="min-height: 850px">
      <router-view v-if="isAlive"></router-view>
    </div>
    <a-layout-footer style="padding: 15px 50px">
      <div class="app-footer">
        <p>
          NOsearch具有独家权威的学术成果数据库，海量资源定期更新，为广大科研工作者提供准确快捷的检索服务，积极推动科研交流。
          想你所想，行你所行。————Not Only Search.
        </p>
        <p>Copyright ©2020 NOsearch. All rights reserved</p>
      </div>
    </a-layout-footer>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isAlive: true,
    };
  },
  methods: {
    reload() {
      this.isAlive = false;
      this.$nextTick(function () {
        this.isAlive = true;
      });
    },
  },
};
</script>
<style>
body {
  overflow-y: scroll;
}
.app-footer {
  width: 1280px;
  margin: 0 auto;
  text-align: center;
}
</style>
