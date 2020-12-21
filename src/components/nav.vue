<template>
  <div class="topNav">
    <div class="topNav-box">
      <div class="topNav-logo">
        <img src="../assets/logo.png" @click="toHome" />
      </div>
      <div v-if="isLogin" class="topNav-right">
        <a-tooltip v-if="isManager" placement="bottom">
          <template slot="title">
            <span>管理员控制台</span>
          </template>
          <a-button
            icon="setting"
            size="large"
            shape="circle"
            class="topNav-otherButton"
            @click="toManager()"
          >
          </a-button>
        </a-tooltip>
        <a-tooltip v-if="!isManager" placement="bottom">
          <template slot="title">
            <span>我的收藏</span>
          </template>
          <a-button
            icon="star"
            size="large"
            shape="circle"
            class="topNav-otherButton"
            @click="toCollection()"
          >
          </a-button>
        </a-tooltip>
        <a-tooltip v-if="!isManager" placement="bottom">
          <template slot="title">
            <span>我的关注</span>
          </template>
          <a-button
            icon="heart"
            size="large"
            shape="circle"
            class="topNav-otherButton"
            @click="toConcern()"
          >
          </a-button>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>我的私信</span>
          </template>
          <a-button
            icon="mail"
            size="large"
            shape="circle"
            class="topNav-otherButton"
            @click="toMessage()"
          >
          </a-button>
        </a-tooltip>
        <a-tooltip v-if="!isManager" placement="bottom">
          <template slot="title">
            <span>我的主页</span>
          </template>
          <a-button
            icon="idcard"
            size="large"
            shape="circle"
            class="topNav-otherButton"
            @click="toUserIndex()"
          >
          </a-button>
        </a-tooltip>
        <a-dropdown placement="bottomRight">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-avatar
              v-if="avatar == '' || avatar == 'null'"
              :size="40"
              icon="user"
              class="topNav-otherButton"
            />
            <a-avatar
              v-else
              :size="40"
              :src="avatar"
              class="topNav-otherButton"
            />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="toPersonInfo()">个人设置</a>
            </a-menu-item>
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
      isManager: false,
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
      localStorage.removeItem("identification");
      localStorage.removeItem("avatarUrl");
      localStorage.removeItem("scholarId");
      this.$forceUpdate();
      this.$router.push("/");
    },
    toPersonInfo() {
      this.$router.push("/personInfo");
    },
    toUserIndex() {
      if (localStorage.getItem("scholarId")) {
        this.$router.push({
          path: "/userIndex",
          query: { scholarid: localStorage.getItem("scholarId") },
        });
      } else {
        this.$router.push("/personInfo");
        this.$message.info("请先进行学者认证");
      }
    },
    toMessage() {
      this.$router.push("/message");
    },
    toCollection() {
      this.$router.push("/collect");
    },
    toConcern() {
      this.$router.push("/concern");
    },
    toManager() {
      this.$router.push("/Manager");
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.avatar = localStorage.getItem("avatarUrl");
    }
    if (localStorage.getItem("identification") == 2) {
      this.isManager = true;
    }
  },
};
</script>

<style>
.topNav {
  width: 100%;
  height: 60px;
  /*border-bottom: solid 1px black;*/
  background-color: #f5f5f7;
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

.topNav-otherButton {
  margin: 10px 0;
  margin-right: 20px;
  vertical-align: bottom;
}
.topNav-LoginButton {
  float: right;
  font-size: 14px;
  margin: 14px 10px;
}
.topNav-right {
  float: right;
}
</style>