<template>
  <div>
    <div class="result-main-scholar">
      <div>
        <a-tabs
          default-active-key="2"
          tab-position="top"
          tabBarStyle="margin-left:10px"
        >
          <a-tab-pane key="1" tab="已认证学者">
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
                  :default-current="2"
                  pageSize="6"
                  :total="total"
                  v-model="currentPage"
                  @change="changePage"
                />
              </div></div
          ></a-tab-pane>
          <a-tab-pane key="2" tab="未认证学者">
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 50%"
                    v-for="(item, key) in scholarDataList"
                    :key="key"
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
                  :default-current="2"
                  pageSize="6"
                  :total="total"
                  v-model="currentPage"
                  @change="changePage"
                />
              </div></div
          ></a-tab-pane>
          <div slot="tabBarExtraContent">
            <div class="scholarSearch-topbar">
              <a-select
                default-value="1"
                @change="handleChange"
                class="topbar-select"
              >
                <a-icon slot="suffixIcon" type="swap" rotate="90" />
                <a-select-option value="1"> H-index </a-select-option>
                <a-select-option value="2"> 论文数 </a-select-option>
                <a-select-option value="3"> 被引量 </a-select-option>
              </a-select>
              <span id="topbar-result">检索到{{ total }}名学者</span>
            </div>
          </div>
        </a-tabs>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: "1",
      total: 203,
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
      scholarDataList: [
        {
          name: "张煜恒",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国科学技术大学物理系",
          paper: 1254,
          citation: 11948,
          field: "光学",
        },
        {
          name: "张超",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "第三军医大学西南医院",
          paper: 1441,
          citation: 18815,
          field: "肿瘤学",
        },
        {
          name: "张涛",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国科学院海洋研究所",
          paper: 920,
          citation: 14393,
          field: "水产养殖",
        },
        {
          name: "张亚平",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国科学院昆明动物研究所",
          paper: 233,
          citation: 7946,
          field: "遗传学",
        },
        {
          name: "张亚平",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国科学院昆明动物研究所",
          paper: 233,
          citation: 7946,
          field: "遗传学",
        },
        {
          name: "张亚平",
          src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          institution: "中国科学院昆明动物研究所",
          paper: 233,
          citation: 7946,
          field: "遗传学",
        },
      ],
    };
  },
  methods: {
    changePage() {
      console.log(this.currentPage);
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
