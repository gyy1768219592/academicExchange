<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar class="img" :size="100" icon="user" />
            <h1 class="info-content-name">{{ user.username }}</h1>
            <h4 class="info-content-ins">{{ user.ins }}</h4>
            <h3 class="info-content-index">
              H指数:{{ user.hindex + "    " }} G指数:{{ user.gindex + "    " }} 成果数:{{ count }}
            </h3>
          </div>
        </div>
        <div class="actions">
          <a-button class="btn">关注</a-button>
          <a-button class="btn" type="primary">发送私信</a-button>
        </div>
      </div>
      <div class="down-block">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="主页" force-render>
            <div class="intro">Content of Tab Pane 1</div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="项目">
            <div class="selections"></div>
            <div class="results">Content of Tab Pane 2</div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="成果">
            <div class="selections"></div>
            <div class="results">Content of Tab Pane 3</div>
          </a-tab-pane>
        </a-tabs>
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
      user: {
        username: "陈志刚",
        ins: "中南大学",
        hindex: 1,
        gindex: 2,
      },
      count: 10,
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
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
  height: 1400px;
  margin: auto;
  border: solid 1px grey;
}
.up-block {
  border: solid 1px red;
  width: 1100px;
  height: 250px;
  margin: auto;
  background-color: #f0f0f0f0;
}
.down-block {
  border: solid 1px blue;
  width: 1100px;
  height: 900px;
  margin: auto;
}

.user-info {
  border: solid 1px black;
  width: 550px;
  height: 200px;
  margin: 10px;
}
.avatar {
  height: 120px;
  width: 500px;
  margin: 20px;
  /* border: solid 5px white; */
}
.img {
  margin: auto;
  /* border: solid 1px red; */
}
.info-content-name {
  width: 200px;
  /* border: solid 1px black; */
  margin: -100px auto 0 120px;
}
.info-content-ins {
  width: 100px;
  /* border: solid 1px red; */
  margin: -5px auto 10px 120px;
}
.info-content-index {
  width: 250px;
  /* border: solid 1px purple; */
  margin: 20px auto 10px 120px;
}
.actions {
  padding-top: 10px;
  border: solid 1px black;
  width: 130px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 10px 10px 10px;
}
.selections {
  border: solid 1px black;
  width: 250px;
  height: 600px;
  margin: 10px 10px 10px 10px;
}
.results {
  border: solid 1px black;
  width: 800px;
  height: 600px;
  display: block;
  float: right;
  margin: -610px 10px 35px 280px;
}
.btn {
  width: 100px;
  border: solid 1px black;
  margin: 15px;
}
.intro {
  border: solid 1px black;
  width: 750px;
  height: 800px;
  margin: 10px;
}
</style>
