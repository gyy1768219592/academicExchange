<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        项目
        <a-button
          size="small"
          style="margin-top: 4px; float: right"
          @click="clearSelectedKey"
          >重置结果</a-button
        >
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        class="sider-menu"
        v-model="selectedKey"
      >
        <a-sub-menu key="sub2">
          <span slot="title"><span>发表年份</span></span>
          <template v-for="item in projectYearOptions">
            <a-menu-item :key="item.value" @click="selectYear(item.value)">
              {{ item.label }}
              <a-icon
                type="right"
                style="float: right; margin-top: 16px; font-size: 8px"
              />
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="result-main">
      <div class="topbar">
        <span style="display: inline-block; margin-top: 5px">
          检索到{{ total }}条结果</span
        >
        <a-select
          v-model="sortOption"
          @change="changeSortOption"
          class="topbar-select"
        >
          <a-icon slot="suffixIcon" type="swap" rotate="90" />
          <a-select-option :value="1"> 相关性 </a-select-option>
          <a-select-option :value="2"> 发表年份 </a-select-option>
        </a-select>
      </div>
      <div class="result-list-project">
        <a-list item-layout="vertical" size="large" :data-source="projectList">
          <a-list-item slot="renderItem" key="item.projectId" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                <span v-html="item.supportTypeName" /> -
                <span v-html="item.fundProject" /> <br />
                <span v-html="item.organization" /> -
                <span v-html="item.authors" /> -
                <span v-html="item.publishDate" /> -《<span
                  v-html="item.journal"
                />》<br />
                <span v-html="item.zhKeyword" />
              </div>
              <a
                class="searchResult-title"
                slot="title"
                @click="toProject(item.projectId)"
                ><span v-html="item.chineseTitle"></span>
              </a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
        <div class="result-list-pagination">
          <a-pagination
            simple
            :default-current="1"
            :total="total"
            v-model="currentPage"
            @change="changePage"
          />
        </div>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      projectList: [],
      projectYearOptions: [
        { label: "2019年", value: "2019" },
        { label: "2018年", value: "2018" },
        { label: "2017年", value: "2017" },
        { label: "2016年", value: "2016" },
        { label: "2015年", value: "2015" },
        { label: "2014年", value: "2014" },
        { label: "2013年", value: "2013" },
        { label: "2012年", value: "2012" },
        { label: "2011年", value: "2011" },
        { label: "2010年", value: "2010" },
        { label: "更早", value: "更早" },
      ],
      sortOption: 1,
      titleKW: "",
      abstractKW: "",
      organizationKW: "",
      authorKW: "",
      startDate: "",
      endDate: "",
      selectedKey: [],
    };
  },
  methods: {
    toProject(id) {
      this.$router.push("/progDisplay/" + id);
    },
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage = 1;
      this.searchProject();
    },
    changePage() {
      this.searchProject();
    },
    selectYear(value) {
      if (value == "更早") {
        this.startDate = "200000101";
        this.endDate = value + "20091231";
      } else {
        this.startDate = value + "0101";
        this.endDate = value + "1231";
      }
      this.currentPage = 1;
      this.searchProject();
    },
    searchProject() {
      let url;
      if (this.sortOption == 1) {
        url = this.$urlPath.website.searchProject;
      } else {
        url = this.$urlPath.website.searchProjectSortByDate;
      }
      let params = new URLSearchParams();
      params.append("titleKW", this.titleKW);
      params.append("abstractKW", "");
      params.append("organizationKW", this.organizationKW);
      params.append("authorKW", this.authorKW);
      params.append("startDate", this.startDate);
      params.append("endDate", this.endDate);
      params.append("page", this.currentPage);
      params.append("size", 10);
      getData(url, params).then((res) => {
        if (res.code === 1001) {
          this.projectList = res.data.projectList;
          this.total = res.data.total;
          console.log(this.projectList);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
    },
    clearSelectedKey() {
      this.selectedKey = [];
      this.currentPage = 1;
      this.sortOption = 1;
      this.startDate = this.$route.query.startDate;
      this.endDate = this.$route.query.endDate;
      this.searchProject();
    },
  },
  created() {
    this.titleKW = this.$route.query.word;
    this.abstractKW = this.$route.query.word;
    this.organizationKW = this.$route.query.institution;
    this.authorKW = this.$route.query.author;
    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;
    this.searchProject();
  },
  watch: {
    $route() {
      this.titleKW = this.$route.query.word;
      this.abstractKW = this.$route.query.word;
      this.organizationKW = this.$route.query.institution;
      this.authorKW = this.$route.query.author;
      this.startDate = this.$route.query.startDate;
      this.endDate = this.$route.query.endDate;
      this.currentPage = 1;
      this.selectedKey = [];
      this.sortOption = 1;
      this.searchProject();
    },
  },
};
</script>

<style>
.result-sider {
  float: left;
  width: 220px;
  margin-right: 20px;
}
.result-sider .sider-title {
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
}
.result-sider .sider-menu {
  margin-left: 20px;
  padding-right: 20px;
  border-right: 0;
}
.result-sider .sider-menu .ant-menu-submenu-title {
  border-bottom: 1px solid #e3e3e3;
}
.result-sider .sider-menu .ant-menu-item {
  margin: 0;
}
.result-sider .sider-menu .ant-menu-item-selected::after {
  border: 0;
}
.result-main {
  float: left;
  width: 1040px;
  overflow: hidden;
  padding-left: 20px;
  border-left: 1px solid #e3e3e3;
}
.result-main .topbar {
  border-bottom: 1px solid #e3e3e3;
  height: 40px;
}
.result-main .topbar .topbar-select {
  float: right;
  width: 100px;
  margin-right: 10px;
}
.result-main .ant-list-item-action {
  margin-top: 5px;
}
.result-main .result-list-project .result-list-button {
  margin-right: 5px;
  padding: 0;
}
.result-main .result-list-project .ant-list-item {
  padding-bottom: 0;
  padding-left: 10px;
}
.result-main .result-list-project .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.searchResult-title {
  font-weight: 600;
}
.result-list-project .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>