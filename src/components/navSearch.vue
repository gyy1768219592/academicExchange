<template>
  <div class="topNav">
    <div class="topNav-box">
      <div class="topNav-logo">
        <img src="../assets/logo.png" @click="toHome" />
      </div>
      <div v-bind:class="isSelected ? 'topNav-search-on' : 'topNav-search'">
        <a-popover trigger="click" placement="bottomLeft">
          <template slot="content">
            <div class="topNav-searchCard">
              <a-form
                :form="form"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 15 }"
                @submit="handleSubmit"
              >
                <a-form-item
                  style="margin: 0; padding: 0"
                  label="检索词/检索学者"
                >
                  <a-input
                    size="small"
                    placeholder="学术成果关键词/学者姓名"
                    v-decorator="['word']"
                  />
                </a-form-item>
                <a-form-item style="margin: 0; padding: 0" label="科研机构">
                  <a-input
                    size="small"
                    placeholder="项目和专利的完成单位"
                    v-decorator="['institution']"
                  />
                </a-form-item>
                <a-form-item style="margin: 0; padding: 0" label="学术成果作者">
                  <a-input
                    size="small"
                    placeholder="项目和专利的作者"
                    v-decorator="['author']"
                  />
                </a-form-item>
                <a-form-item style="margin: 0; padding: 0" label="发表日期">
                  <a-range-picker
                    popupStyle="width:226.88px"
                    size="small"
                    allowClear
                    :placeholder="['开始日期', '结束日期']"
                    format="YYYY-MM-DD"
                    :value="yearValue"
                    :mode="['date', 'date']"
                    @panelChange="handlePanelChange2"
                    @change="handleChange"
                  />
                </a-form-item>
                <a-form-item
                  style="margin: 0; padding: 0"
                  :wrapper-col="{ span: 23, offset: 0 }"
                >
                  <a-button
                    type="primary"
                    html-type="submit"
                    block
                    size="small"
                  >
                    检索
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </template>
          <a-button
            class="topNav-searchButton"
            type="link"
            @click="selected"
            @blur="undoSelected"
            >高级检索</a-button
          >
        </a-popover>
        <a-input-search
          class="topNav-searchBox"
          @search="onSearch"
          @focus="selected"
          @blur="undoSelected"
        />
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
        <a-tooltip placement="bottom">
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
        <a-tooltip placement="bottom">
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
        <a-tooltip placement="bottom">
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
import moment from "moment";
export default {
  data() {
    return {
      isSelected: false,
      form: this.$form.createForm(this, { name: "advancedSearchTop" }),
      yearValue: [],
      isManager: false,
      isLogin: false,
      avatar: null,
    };
  },
  methods: {
    onSearch(value) {
      if (value.length == 0) {
        this.$message.error("请输入检索内容");
      } else {
        this.$router.push({
          path: "/searchResult",
          query: {
            word: value,
            institution: "",
            author: "",
            startDate: "",
            endDate: "",
          },
        });
      }
    },
    selected() {
      this.isSelected = true;
    },
    undoSelected() {
      this.isSelected = false;
    },
    toHome() {
      this.$router.push({ name: "Home" });
    },
    toPersonInfo() {
      this.$router.push("/personInfo");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let word = values.word === undefined ? "" : values.word;
        let institution =
          values.institution === undefined ? "" : values.institution;
        let author = values.author === undefined ? "" : values.author;
        let startDate =
          this.yearValue[0] === undefined
            ? ""
            : moment(this.yearValue[0]).format("YYYYMMDD");
        let endDate =
          this.yearValue[1] === undefined
            ? ""
            : moment(this.yearValue[1]).format("YYYYMMDD");
        if (
          word.length == 0 &&
          institution.length == 0 &&
          author.length == 0 &&
          startDate.length == 0 &&
          endDate.length == 0
        ) {
          this.$message.error("请输入检索内容");
        } else {
          this.$router.push({
            path: "/searchResult",
            query: {
              word: word,
              institution: institution,
              author: author,
              startDate: startDate,
              endDate: endDate,
            },
          });
        }
      });
    },
    handleChange(value) {
      this.yearValue = value;
      console.log(this.yearValue);
    },
    handlePanelChange2(value) {
      this.yearValue = value;
      console.log(this.yearValue);
    },
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      this.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("aaa");
      localStorage.removeItem("identification");
      localStorage.removeItem("avatarUrl");
      localStorage.removeItem("scholarId");
      this.$forceUpdate();
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
    if (localStorage.getItem("identification") == 2){
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
  background-color: #F5F5F7;
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
.topNav-search {
  float: left;
  margin: 12px 0 8px 50px;
  border-radius: 10px;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 400px;
}

.topNav-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.topNav-search-on {
  float: left;
  margin: 12px 0 8px 50px;
  border-radius: 10px;
  border: solid 2px #B22222;
  width: 400px;
}
.topNav-searchBox {
  width: 305px;
}
.topNav-searchButton {
  font-size: 14px;
  height: 22px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.topNav-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.topNav-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

.topNav-searchBox .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.topNav-searchBox .ant-input:focus {
  border: none;
  box-shadow: none;
}

.topNav-searchCard {
  width: 363px;
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
