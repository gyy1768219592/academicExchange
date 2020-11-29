<template>
  <div class="topNav">
    <div class="topNav-box">
      <div class="topNav-logo">
        <img src="../assets/logo.png" @click="toHome" />
      </div>
      <a-dropdown class="topNav-dropDown">
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          <a-avatar :size="50" icon="user" class="topNav-avatar" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="#">个人设置</a>
          </a-menu-item>
          <a-menu-item>
            <a href="#">我的主页</a>
          </a-menu-item>
          <a-menu-item>
            <a href="#">我的私信</a>
          </a-menu-item>
          <a-menu-item>
            <a href="#">我的收藏</a>
          </a-menu-item>
          <a-menu-item>
            <a href="#">我的关注</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <a href="#/">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.topNav {
  width: 100%;
  height: 60px;
  border-bottom: solid 1px black;
}
.topNav-box {
  width: 1280px;
  margin: 0 auto;
}

.topNav-logo {
  float: left;
}
.topNav-logo img {
  margin: 0 10px;
  height: 60px;
  cursor: pointer;
}
.topNav-dropDown {
  float: right;
}

.topNav-avatar {
  margin: 5px 20px;
}
</style>