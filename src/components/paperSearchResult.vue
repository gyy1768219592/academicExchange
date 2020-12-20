<template>
  <div>
    <div class="homes-result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        论文
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
        <a-sub-menu key="sub1">
          <span slot="title"><span>论文类型</span></span>
          <template v-for="item in paperTypeOptions">
            <a-menu-item :key="item.value" @click="selectDocType(item.value)">
              {{ item.label }}
              <a-icon
                type="right"
                style="float: right; margin-top: 16px; font-size: 8px"
              />
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><span>发表年份</span></span>
          <template v-for="item in paperYearOptions">
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
          <a-select-option :value="2"> 发表日期 </a-select-option>
          <a-select-option :value="3"> 被引量 </a-select-option>
        </a-select>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large">
          <a-list-item v-for="(item, index) in paperList" :key="index">
            <a-list-item-meta>
              <div slot="description">
                <span
                  v-for="(aitem, aindex) in authorList[index]"
                  :key="aindex"
                >
                  <a
                    class="result-name"
                    @click="toScholar(aitem.type, aitem.authorId)"
                  >
                    {{ aitem.name }}
                  </a>
                  <span v-if="aindex != authorList[index].length - 1">
                    &nbsp;,</span
                  >
                </span>

                <div v-if="item.doctype == 'Journal'">
                  <span v-html="item.journal" /> - <span v-html="item.date" /> -
                  被引量:{{ item.citationCount }}
                </div>
                <div v-else>
                  <span v-html="item.conference" /> -
                  <span v-html="item.date" /> - 被引量:{{ item.citationCount }}
                </div>
                <span v-html="item.doi" />
              </div>
              <a
                slot="title"
                class="searchResult-title"
                @click="toPaper(item.paperId)"
                ><span v-html="item.paperTitle"></span>
              </a>
            </a-list-item-meta>
            <div class="searchResult-abstract" v-if="item.paper_abstract != ''">
              <span v-html="item.paper_abstract" />
            </div>
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
      paperList: [],
      authorList: [],
      selectedKey: [],
      paperTypeOptions: [
        {
          label: "期刊论文",
          value: 1,
        },
        {
          label: "会议论文",
          value: 2,
        },
      ],
      paperYearOptions: [
        { label: "2020年", value: "2020" },
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
      doctype: 0,
      titleKW: "",
      abstractKW: "",
      organizationKW: "",
      authorKW: "",
      startDate: "",
      endDate: "",
      isok: false,
    };
  },
  methods: {
    toPaper(paperId) {
      this.$router.push("/paperDisplay/" + paperId);
    },
    selectDocType(value) {
      this.doctype = value;
      this.currentPage = 1;
      this.searchPaper();
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
      this.searchPaper();
    },
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage = 1;
      this.searchPaper();
    },
    changePage() {
      this.searchPaper();
    },
    searchPaper() {
      this.isok = false;
      let url;
      if (this.sortOption == 1) {
        url = this.$urlPath.website.searchPaper;
      } else if (this.sortOption == 2) {
        url = this.$urlPath.website.searchPaperSortByDate;
      } else {
        url = this.$urlPath.website.searchPaperSortByCitation;
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
      params.append("doctype", this.doctype);
      getData(url, params).then((res) => {
        if (res.code === 1001) {
          this.paperList = res.data.paperList;
          this.authorList = res.data.author;
          this.total = res.data.total;
          this.isok = true;
          console.log(res.data);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
    },
    toScholar(type, id) {
      if (type == 0) {
        this.$router.push({ path: "/authorIndex", query: { authorid: id } });
      } else {
        if (id == localStorage.getItem("scholarId")) {
          this.$router.push({ path: "/userIndex", query: { scholarid: id } });
        } else {
          this.$router.push({
            path: "/scholarIndex",
            query: { scholarid: id },
          });
        }
      }
    },
    clearSelectedKey() {
      this.selectedKey = [];
      this.currentPage = 1;
      this.sortOption = 1;
      this.doctype = 0;
      this.startDate = this.$route.query.startDate;
      this.endDate = this.$route.query.endDate;
      this.searchPaper();
    },
  },
  created() {
    this.titleKW = this.$route.query.word;
    this.abstractKW = this.$route.query.word;
    this.organizationKW = this.$route.query.institution;
    this.authorKW = this.$route.query.author;
    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;
    this.searchPaper();
  },
  watch: {
    $route() {
      this.currentPage = 1;
      this.sortOption = 1;
      this.doctype = 0;
      this.titleKW = this.$route.query.word;
      this.abstractKW = this.$route.query.word;
      this.organizationKW = this.$route.query.institution;
      this.authorKW = this.$route.query.author;
      this.startDate = this.$route.query.startDate;
      this.endDate = this.$route.query.endDate;
      this.selectedKey = [];
      this.searchPaper();
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
.result-name {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}
.result-name:hover {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: underline;
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
.homes-result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.searchResult-title {
  font-weight: 600;
}
</style>