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
                  <a-input size="small" placeholder="学术成果关键词/学者姓名" />
                </a-form-item>
                <a-form-item style="margin: 0; padding: 0" label="科研机构">
                  <a-input
                    size="small"
                    placeholder="项目专利完成单位/学者工作单位"
                  />
                </a-form-item>
                <a-form-item style="margin: 0; padding: 0" label="学术成果作者">
                  <a-input size="small" placeholder="项目和专利的作者" />
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
      <div v-if="isLogin">
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
      isSelected: false,
      form: this.$form.createForm(this, { name: "advancedSearch" }),
      yearValue: [],
      isLogin: false,
    };
  },
  methods: {
    onSearch(value) {
      if (value.length == 0) {
        this.$message.error("请输入检索内容");
      } else {
        this.$router.push({ path: "/searchResult", query: { word: value } });
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
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
  border: solid 2px #1890ff;
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