<template>
  <div class="topNav">
    <div class="topNav-box">
      <div class="topNav-logo">
        <img src="../assets/logo.png" @click="toHome" />
      </div>
      <div v-if="isLogin">
        <a-dropdown class="topNav-dropDown">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-avatar
              v-if="avatar == '' || avatar == 'null'"
              :size="50"
              icon="user"
              class="topNav-avatar"
            />
            <a-avatar v-else :size="50" :src="avatar" class="topNav-avatar" />
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
              <a @click="logout()">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div v-else>
        <a-button
          type="primary"
          ghost
          class="topNav-LoginButton"
          @click="toLogin()"
        >
          登录
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      avatar: null,
    };
  },
  methods: {
    toHome() {
      this.$router.push({ name: "Home" });
    },
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      this.isLogin = false;
      localStorage.removeItem("token");
      this.$forceUpdate();
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.avatar = localStorage.getItem("avatarUrl");
    }
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
.topNav-LoginButton {
  float: right;
  font-size: 14px;
  margin: 14px 10px;
}
</style>