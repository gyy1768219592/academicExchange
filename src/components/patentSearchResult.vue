<template>
  <div>
    <div class="homes-result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        专利
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
          <span slot="title"><span>申请日期</span></span>
          <template v-for="item in patentYearOptions">
            <a-menu-item :key="item.label" @click="selectYear(item)">
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
    <div
      v-if="isok == false"
      class="homes-result-main"
      style="text-align: center; height: 700px"
    >
      <a-spin style="margin-top: 300px" tip="数据加载中，请稍候" size="large" />
    </div>
    <div v-else class="homes-result-main">
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
          <a-select-option :value="2"> 申请日期 </a-select-option>
        </a-select>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="patentList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta>
              <div slot="description">
                <span v-html="item.inventor" /> <br />
                <span v-html="item.applicationDate" /> -
                <span v-html="item.state" /> - <span v-html="item.province" /> -
                <span v-html="item.applicationNumber" /> <br />
                <span v-html="item.classificationNumber" />
              </div>
              <a
                slot="title"
                class="searchResult-title"
                @click="toPatent(item.id)"
                ><span v-html="item.title"></span>
              </a>
            </a-list-item-meta>
            <div class="searchResult-abstract" v-html="item.abstract"></div>
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
      patentList: [],
      patentYearOptions: [
        // { label: "2020年12月", startDate: "20201201", endDate: "20201231" },
        { label: "2020年11月", startDate: "20201101", endDate: "20201130" },
        { label: "2020年10月", startDate: "20201001", endDate: "20201031" },
        { label: "2020年9月", startDate: "20200901", endDate: "20200930" },
        // { label: "更早", startDate: "20200101", endDate: "20200831" },
      ],
      sortOption: 1,
      titleKW: "",
      abstractKW: "",
      organizationKW: "",
      authorKW: "",
      startDate: "",
      endDate: "",
      selectedKey: [],
      isok: false,
    };
  },
  methods: {
    toPatent(id) {
      let url = this.$router.resolve("/patentDisplay/" + id);
      window.open(url.href, "_blank");
    },
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage = 1;
      this.searchPatent();
    },
    changePage() {
      this.searchPatent();
    },
    selectYear(value) {
      this.startDate = value.startDate;
      this.endDate = value.endDate;
      this.currentPage = 1;
      this.searchPatent();
    },
    searchPatent() {
      this.isok = false;
      let url;
      if (this.sortOption == 1) {
        url = this.$urlPath.website.searchPatent;
      } else {
        url = this.$urlPath.website.searchPatentSortByDate;
      }
      let params = new URLSearchParams();
      params.append("titleKW", this.titleKW);
      params.append("abstractKW", this.abstractKW);
      params.append("organizationKW", this.organizationKW);
      params.append("authorKW", this.authorKW);
      params.append("startDate", this.startDate);
      params.append("endDate", this.endDate);
      params.append("page", this.currentPage);
      params.append("size", 10);
      getData(url, params).then((res) => {
        if (res.code === 1001) {
          this.patentList = res.data.patenList;
          this.total = res.data.total;
          this.isok = true;
          console.log(this.patentList);
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
      this.searchPatent();
    },
  },
  created() {
    this.titleKW = this.$route.query.word;
    this.abstractKW = this.$route.query.word;
    this.organizationKW = this.$route.query.institution;
    this.authorKW = this.$route.query.author;
    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;
    this.searchPatent();
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
      this.sortOption = 1;
      this.selectedKey = [];
      this.searchPatent();
    },
  },
};
</script>

<style>
.homes-result-sider {
  float: left;
  width: 220px;
  margin-right: 20px;
}
.homes-result-sider .sider-title {
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
}
.homes-result-sider .sider-menu {
  margin-left: 20px;
  padding-right: 20px;
  border-right: 0;
}
.homes-result-sider .sider-menu .ant-menu-submenu-title {
  border-bottom: 1px solid #e3e3e3;
}
.homes-result-sider .sider-menu .ant-menu-item {
  margin: 0;
}
.homes-result-sider .sider-menu .ant-menu-item-selected::after {
  border: 0;
}
.searchResult-title {
  font-weight: 600;
}
.homes-result-main {
  float: left;
  width: 1040px;
  overflow: hidden;
  padding-left: 20px;
  border-left: 1px solid #e3e3e3;
}
.homes-result-main .topbar {
  border-bottom: 1px solid #e3e3e3;
  height: 40px;
}
.homes-result-main .topbar .topbar-select {
  float: right;
  width: 100px;
  margin-right: 10px;
}
.homes-result-main .ant-list-item-action {
  margin-top: 5px;
}
.homes-result-main .result-list .result-list-button {
  margin-right: 5px;
  padding: 0;
}
.homes-result-main .result-list .ant-list-item {
  padding-left: 10px;
}
.homes-result-main .result-list .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.searchResult-abstract {
  height: 40px;
  width: 1000px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.homes-result-main .result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
</style>