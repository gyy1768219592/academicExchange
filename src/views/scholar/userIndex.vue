<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="user-info"></div>
        <div class="actions"></div>
      </div>
      <div class="down-block">
        <div class="selections"></div>
        <div class="results"></div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
export default {
  components: {
    // personNav,
  },
  data() {
    return {
      loginid: 0,
      pageid: 0,
    };
  },
  methods: {
    toPro() {
      //跳转到项目展示页面，带参数
      // this.$router.push("/Pro");
    },
    toPaper() {
      //跳转到项目文献页面，带参数
      // this.$router.push("/Paper");
    },
    toPatent() {
      //跳转到专利展示页面，带参数
      // this.$router.push("/Patent");
    },

    //待补充好多好多好多获取数据的函数接口调用
    //举个栗子：根据不同的条件检索，获取当前用户的各种学术成果，管理个人学术成果等
  },
};
</script>
<style scoped>
.main-block {
  width: 1200px;
  height: 1000px;
  margin: auto;
  border: solid 1px grey;
}
.up-block {
  border: solid 1px red;
  width: 1000px;
  height: 300px;
  margin: auto;
}
.down-block {
  border: solid 1px blue;
  width: 1000px;
  height: 650px;
  margin: auto;
}

.user-info {
  border: solid 1px black;
  width: 300px;
  height: 250px;
  margin: 10px;
}
.actions {
  border: solid 1px black;
  width: 250px;
  height: 250px;
  display: block;
  float: right;
  margin: -260px 10px 10px 10px;
}
.selections {
  border: solid 1px black;
  width: 250px;
  height: 600px;
  margin: 10px 10px 10px 10px;
}
.results {
  border: solid 1px black;
  width: 700px;
  height: 600px;
  display: inline-block;
  margin: -610px 10px 35px 280px;
}
</style>
