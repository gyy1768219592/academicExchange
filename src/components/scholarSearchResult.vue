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
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 50%"
                    v-for="(item, index) in scholarList"
                    :key="index"
                  >
                    <div class="card-avatar">
                      <a-avatar :size="80" :src="item.src" />
                    </div>
                    <div class="card-info">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.name }} </span
                      ><br />
                      <span>{{ item.institution }}</span
                      ><br />
                      <span>
                        <a-col :span="10">
                          发表论文：{{ item.paper }}
                        </a-col></span
                      ><br />
                      <span
                        ><a-col :span="10"
                          >被引量：{{ item.citation }}</a-col
                        ></span
                      ><br />
                      <span>
                        <a-col :span="10"
                          >研究领域：{{ item.field }}</a-col
                        ></span
                      >
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-button shape="circle" icon="arrow-right" />
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
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 50%"
                    v-for="(item, index) in dataScholarList"
                    :key="index"
                  >
                    <div class="card-avatar">
                      <a-avatar
                        :size="80"
                        :style="'backgroundColor:' + colorList[index]"
                        >{{ item.displayName }}</a-avatar
                      >
                    </div>
                    <div class="card-info">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.displayName }} </span
                      ><br />
                      <span>{{ item.institution }}</span
                      ><br />
                      <span>
                        <a-col :span="10">
                          发表论文：{{ item.paperCount }}
                        </a-col></span
                      ><br />
                      <span
                        ><a-col :span="10"
                          >被引量：{{ item.citationCount }}</a-col
                        ></span
                      ><br />
                      <span>
                        <a-col :span="10"
                          >hIndex：{{ item.hIndex }}</a-col
                        ></span
                      >
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-button shape="circle" icon="arrow-right" />
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
                  :total="total2"
                  v-model="currentPage2"
                  @change="changePage2"
                />
              </div></div
          ></a-tab-pane>
          <div slot="tabBarExtraContent">
            <div class="scholarSearch-topbar">
              <a-select
                :default-value="1"
                @change="changeSortOption"
                v-model="sortOption"
                class="topbar-select"
              >
                <a-icon slot="suffixIcon" type="swap" rotate="90" />
                <a-select-option :value="1"> H-index </a-select-option>
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
      currentPage1: 1,
      currentPage2: 1,
      total1: 0,
      total2: 0,
      total: 0,
      sortOption: 1,
      scholarList: [
        {
          name: "张帆",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "华中科技大学同济医学院附属同济医院",
          paper: 4349,
          citation: 70957,
          field: "肿瘤学",
        },
        {
          name: "张立群",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "北京化工大学",
          paper: 695,
          citation: 10067,
          field: "工业催化",
        },
        {
          name: "张鹏",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "郑州大学第一附属医院",
          paper: 86,
          citation: 200,
          field: "肿瘤学",
        },
        {
          name: "张磊",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国电子科技集团公司",
          paper: 2148,
          citation: 16081,
          field: "通信与信息系统",
        },

        {
          name: "张庆玲",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "东北大学理学院",
          paper: 1360,
          citation: 18959,
          field: "系统工程",
        },
        {
          name: "张波",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "电子科技大学电子薄膜与集成器件国家重点实验室",
          paper: 1843,
          citation: 10602,
          field: "电路系统",
        },
      ],
      dataScholarList: [],
      colorList: [
        "#f56a00",
        "#7265e6",
        "#ffbf00",
        "#00a2ae",
        "#87d068",
        "#FFB6C1",
      ],
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
    searchDataScholar() {
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
          console.log(this.dataScholarList);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
    },
    searchScholar() {
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
          console.log(this.scholarList);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
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
      this.sortOption = 1;
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
</style>