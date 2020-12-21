<template>
  <div>
    <div class="result-main-scholar">
      <div>
        <a-tabs
          default-active-key="2"
          tab-position="top"
          tabBarStyle="margin-left:10px"
        >
          <a-tab-pane key="1" :tab="'已认证学者(' + this.total1 + ')'">
            <div
              v-if="isok1 == false"
              class="result-list-scholar"
              style="text-align: center; height: 600px"
            >
              <a-spin
                style="margin-top: 300px"
                tip="数据加载中，请稍候"
                size="large"
              />
            </div>
            <div v-else class="result-list-scholar">
              <div v-if="scholarList.length == 0" class="card-list">
                <a-empty />
              </div>
              <div v-else class="card-list">
                <a-card>
                  <a-card-grid
                    @click="toScholar(item.ScholarId)"
                    style="width: 50%; height: 180px"
                    v-for="(item, index) in scholarList"
                    :key="index"
                  >
                    <div class="card-avatar">
                      <a-avatar
                        v-if="item.AvatarUrl != null"
                        :size="80"
                        :src="item.AvatarUrl"
                      />
                      <a-avatar
                        v-else
                        :size="80"
                        :style="'backgroundColor: #c85554'"
                        >{{ item.Name.substring(0, 3) }}</a-avatar
                      >
                    </div>
                    <div class="card-info">
                      <div
                        style="font-size: 16px; font-weight: 600; height: 30px"
                      >
                        <span
                          style="
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                        >
                          {{ item.Name }}</span
                        >
                      </div>
                      <div
                        v-if="
                          item.Institution != '' && item.Institution != null
                        "
                        style="
                          height: 30px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                      >
                        {{ item.Institution }}
                      </div>
                      <div v-else style="height: 30px">暂无科研机构数据</div>
                      <a-col :span="7">
                        <a-statistic
                          class="result-scholar-number"
                          title="论文数"
                          :value="item.PaperCount == null ? 0 : item.PaperCount"
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                      <a-col :span="7">
                        <a-statistic
                          class="result-scholar-number"
                          title="被引量"
                          :value="
                            item.CitationCount == null ? 0 : item.CitationCount
                          "
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-button
                          shape="circle"
                          icon="arrow-right"
                          @click="toScholar(item.ScholarId)"
                        />
                      </p>
                      <p style="margin-top: -5px">
                        <a-button shape="circle" icon="mail" />
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
              <div class="result-list-pagination">
                <a-pagination
                  simple
                  :default-current="1"
                  pageSize="6"
                  :total="total1"
                  v-model="currentPage1"
                  @change="changePage1"
                />
              </div></div
          ></a-tab-pane>
          <a-tab-pane key="2" :tab="'未认证学者(' + this.total2 + ')'">
            <div
              v-if="isok2 == false"
              class="result-list-scholar"
              style="text-align: center; height: 600px"
            >
              <a-spin
                style="margin-top: 300px"
                tip="数据加载中，请稍候"
                size="large"
              />
            </div>
            <div v-else class="result-list-scholar">
              <div v-if="dataScholarList.length == 0" class="card-list">
                <a-empty />
              </div>
              <div v-else class="card-list">
                <a-card>
                  <a-card-grid
                    @click="toDataScholar(item.scholarId, item.authorId)"
                    style="width: 50%; height: 180px"
                    v-for="(item, index) in dataScholarList"
                    :key="index"
                  >
                    <div class="card-avatar">
                      <a-avatar
                        :size="80"
                        :style="'backgroundColor: #c85554'"
                        >{{ item.displayName.substring(0, 3) }}</a-avatar
                      >
                    </div>
                    <div class="card-info">
                      <div
                        style="font-size: 16px; font-weight: 600; height: 30px"
                      >
                        <span
                          style="
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                        >
                          {{ item.displayName }}</span
                        >
                      </div>
                      <div
                        v-if="item.institution != ''"
                        style="
                          height: 30px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                      >
                        {{ item.institution }}
                      </div>
                      <div v-else style="height: 30px">暂无科研机构数据</div>
                      <a-col :span="7">
                        <a-statistic
                          class="result-scholar-number"
                          title="论文数"
                          :value="item.paperCount == null ? 0 : item.paperCount"
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                      <a-col :span="7">
                        <a-statistic
                          class="result-scholar-number"
                          title="被引量"
                          :value="
                            item.citationCount == null ? 0 : item.citationCount
                          "
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 82px">
                        <a-button
                          shape="circle"
                          icon="arrow-right"
                          @click="toDataScholar(item.scholarId, item.authorId)"
                        />
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
              <div class="result-list-pagination">
                <a-pagination
                  simple
                  :default-current="1"
                  pageSize="6"
                  :total="total2"
                  v-model="currentPage2"
                  @change="changePage2"
                />
              </div></div
          ></a-tab-pane>
          <div slot="tabBarExtraContent">
            <div class="scholarSearch-topbar">
              <a-select
                :default-value="2"
                @change="changeSortOption"
                v-model="sortOption"
                class="topbar-select"
              >
                <a-icon slot="suffixIcon" type="swap" rotate="90" />
                <a-select-option :value="2"> 论文数 </a-select-option>
                <a-select-option :value="3"> 被引量 </a-select-option>
              </a-select>
              <span id="topbar-result">共检索到{{ total }}名学者</span>
            </div>
          </div>
        </a-tabs>
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
      wordKW: "",
      currentPage1: 1,
      currentPage2: 1,
      total1: 0,
      total2: 0,
      total: 0,
      sortOption: 2,
      scholarList: [],
      dataScholarList: [],
      colorList: [
        "#f56a00",
        "#7265e6",
        "#ffbf00",
        "#00a2ae",
        "#87d068",
        "#FFB6C1",
      ],
      isok1: false,
      isok2: false,
    };
  },
  methods: {
    changeSortOption(value) {
      this.sortOption = value;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.searchDataScholar();
      this.searchScholar();
    },
    changePage1() {
      this.searchScholar();
    },
    changePage2() {
      this.searchDataScholar();
    },
    toDataScholar(sid, aid) {
      if (sid == -1) {
        let url = this.$router.resolve({
          path: "/authorIndex",
          query: { authorid: aid },
        });
        window.open(url.href, "_blank");
      } else {
        if (sid == localStorage.getItem("scholarId")) {
          let url = this.$router.resolve({
            path: "/userIndex",
            query: { scholarid: sid },
          });
          window.open(url.href, "_blank");
        } else {
          let url = this.$router.resolve({
            path: "/scholarIndex",
            query: { scholarid: sid },
          });
          window.open(url.href, "_blank");
        }
      }
    },
    toScholar(sid) {
      if (sid == localStorage.getItem("scholarId")) {
        let url = this.$router.resolve({
          path: "/userIndex",
          query: { scholarid: sid },
        });
        window.open(url.href, "_blank");
      } else {
        let url = this.$router.resolve({
          path: "/scholarIndex",
          query: { scholarid: sid },
        });
        window.open(url.href, "_blank");
      }
    },
    searchDataScholar() {
      this.isok2 = false;
      if (this.wordKW == "") {
        this.total2 = 0;
        this.dataScholarList = [];
        this.total = this.total1 + this.total2;
        this.isok2 = true;
      } else {
        let url = this.$urlPath.website.searchDataScholar;
        let params = new URLSearchParams();
        params.append("DataScholarName", this.wordKW);
        params.append("orderType", this.sortOption);
        params.append("pageNumber", this.currentPage2);
        getData(url, params).then((res) => {
          if (res.code === 1001) {
            this.dataScholarList = res.data.dataScholars;
            this.total2 = res.data.totalSize;
            this.total = this.total1 + this.total2;
            this.isok2 = true;
            console.log(this.dataScholarList);
          } else {
            console.log(res.code);
            this.$message.error("服务器返回出错");
          }
        });
      }
    },
    searchScholar() {
      this.isok1 = false;
      if (this.wordKW == "") {
        this.scholarList = [];
        this.total1 = 0;
        this.total = this.total1 + this.total2;
        this.isok1 = true;
      } else {
        let url = this.$urlPath.website.searchScholar;
        let params = new URLSearchParams();
        params.append("ScholarName", this.wordKW);
        params.append("Institution", "");
        params.append("orderType", this.sortOption);
        params.append("pageNumber", this.currentPage1);
        getData(url, params).then((res) => {
          if (res.code === 1001) {
            this.scholarList = res.data.scholars;
            this.total1 = res.data.totalSize;
            this.total = this.total1 + this.total2;
            this.isok1 = true;
            console.log(this.scholarList);
          } else {
            console.log(res.code);
            this.$message.error("服务器返回出错");
          }
        });
      }
    },
  },
  created() {
    this.wordKW = this.$route.query.word;
    this.searchDataScholar();
    this.searchScholar();
  },
  watch: {
    $route() {
      this.wordKW = this.$route.query.word;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.sortOption = 2;
      this.searchDataScholar();
      this.searchScholar();
    },
  },
};
</script>

<style>
.scholarSearch-topbar {
  width: 400px;
}
.scholarSearch-topbar #topbar-result {
  display: block;
  float: right;
  margin-top: 2px;
  margin-right: 30px;
}
.scholarSearch-topbar .topbar-select {
  float: right;
  width: 100px;
  margin-top: 5px;
  margin-right: 10px;
}
.result-list-scholar .card-list {
  width: 1000px;
  margin: 30px auto;
}
.result-list-scholar .card-list .card-avatar {
  float: left;
  width: 20%;
}
.result-list-scholar .card-list .card-info {
  float: left;
  margin-left: 5%;
  width: 65%;
}
.result-list-scholar .card-list .card-info span {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-list-scholar .card-list .card-button {
  float: right;
  width: 10%;
}
.result-list-scholar .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.result-scholar-number {
  display: inline-block;
}
</style>