<template>
  <div>
    <div class="result-main-scholar">
      <div class="home-content">
        <div class = "left-block">
          <div v-bind:class="isSelected ? 'home-search-on' : 'home-search'">
            <!-- <a-popover trigger="click" placement="bottomLeft">
              <template slot="content">
                <div class="home-searchCard">选项</div>
              </template>
              <a-button
                class="home-searchButton"
                type="link"
                @click="selected"
                @blur="undoSelected"
                >高级检索</a-button
              >
            </a-popover> -->
            <a-input-search
              class="home-searchBox"
              placeholder="通过ID搜索学术成果"
              @search="onSearch"
              @focus="selected"
              @blur="undoSelected"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 60px"> 检索到{{ total }}个学术成果</span>
            </div>
            <div class="result-list">
                <a-list item-layout="vertical" size="large" :data-source="paperList">
                  <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                    <a-button
                      type="link" 
                      icon="setting"  
                      slot="actions" 
                      class="result-list-button_r"
                      @click="changeMain(item.title)"
                    >管理学术成果</a-button>
                    <a-list-item-meta
                    :description="
                        item.author +
                        ' - ' +
                        item.journal +
                        ' - 被引量: ' +
                        item.citationCount
                    "
                    >
                    <a slot="title" :href="item.href"
                        ><span v-html="item.title"></span>
                    </a>
                    </a-list-item-meta>
                    <div class="abstract">{{ item.abstract }}</div>
                </a-list-item>
                </a-list>
                <div class="result-list-pagination">
                <a-pagination
                    simple
                    :default-current="2"
                    :total="total"
                    v-model="currentPage"
                    @change="changePage"
                />
                </div>
            </div>
          </div>
        </div>
        <div class = "middle-block">
          <a-list item-layout="vertical" size="large" :data-source="paperTopList">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <a-list-item-meta
                :description="
                    item.author +
                    ' - ' +
                    item.journal +
                    ' - 被引量: ' +
                    item.citationCount
                "
                >
                <a slot="title" :href="item.href"
                    ><span v-html="item.title"></span>
                </a>
                </a-list-item-meta>
                <div class="abstract">{{ item.abstract }}</div>
            </a-list-item>
          </a-list>
          <div class="result-list-scholar">
            <div class="card-list">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in scholarList"
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
                      <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                    ><br />
                    <span
                      ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                    ><br />
                    <span>
                      <a-col :span="10">研究领域：{{ item.field }}</a-col></span
                    >
                  </div>
                  <div class="card-button">
                    <p style="margin-top: 42px">
                      <a-tooltip>
                        <template slot="title">
                          删除已认领者
                        </template>
                        <a-button shape="circle" icon="close" />
                      </a-tooltip>
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
            </div>
          </div>
        </div>
        <div class = "right-block">
          <div v-bind:class="isSelected ? 'home-search-on' : 'home-search'">
            <!-- <a-popover trigger="click" placement="bottomLeft">
              <template slot="content">
                <div class="home-searchCard">选项</div>
              </template>
              <a-button
                class="home-searchButton"
                type="link"
                @click="selected"
                @blur="undoSelected"
                >高级检索</a-button
              >
            </a-popover> -->
            <a-input-search
              class="home-searchBox"
              placeholder="通过ID查询搜索学者门户"
              @search="onSearch"
              @focus="selected"
              @blur="undoSelected"
            />
          </div>
          <div class="result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 60px"> 检索到{{ total }}个学者门户</span>
            </div>
            <div class="result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in scholarList"
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
                        <a-col :span="10"> 发表论文：{{ item.paper }} </a-col></span
                      ><br />
                      <span
                        ><a-col :span="10">被引量：{{ item.citation }}</a-col></span
                      ><br />
                      <span>
                        <a-col :span="10">研究领域：{{ item.field }}</a-col></span
                      >
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            添加认领者
                          </template>
                          <a-button shape="circle" icon="plus" />
                        </a-tooltip>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      isSelected: false,
      currentPage: "1",
      total: 203,
      src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      abstract:
            "可持续发展的定量测度是可持续发展战略得以实施的前提条件.加拿大学者Mathis Wackernagel发展完善的生态足迹模型就是一种测量可持续性的方法.该方法通过计算支持特定区域人类社会所有消费活动所需要的土地(生态足迹)与该区域可提供的生物生产性土地(生态承载力)相比较来判断区域发展的可持续性.简单介绍了生态足迹模型的基本概念,研究进展,计算方法;对中国历年的生态足迹进行了实证研究,结果表明:从1962～2001年,中国人均生态承载力逐步下降,人均生态足迹则逐步上升,目前中国人均生态足迹已经超过人均生态承载力,生态赤字出现,并持续扩大,中国目前的发展处于一种强不可持续状态.",
      paperTopList: [
        {
          title:
            "绿色<span class='highlight'>计算</span>、普适<span class='highlight'>计算</span>及云<span class='highlight'>计算</span>",
          author: "刘方明",
          journal: "国际学术动态, 2015, (03): 40-42.",
          citationCount: 103,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
      ],
      paperList: [
        {
          title:
            "绿色<span class='highlight'>计算</span>、普适<span class='highlight'>计算</span>及云<span class='highlight'>计算</span>",
          author: "刘方明",
          journal: "国际学术动态, 2015, (03): 40-42.",
          citationCount: 103,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "云<span class='highlight'>计算</span>还是框<span class='highlight'>计算</span>，图书馆怎样<span class='highlight'>计算</span>",
          author: "段莹",
          journal: "情报理论与实践, 2011, (07): 108-110.",
          citationCount: 84,
          abstract:
            "系统地分析和总结云计算的研究现状,划分云计算体系架构为核心服务,服务管理,用户访问接口等3个层次.围绕低成本,高可靠,高可用,规模可伸缩等研究目标,深入全面地介绍了云计算的关键技术及最新研究进展.在云计算基础设施方面,介绍了云计算数据中心设计与管理及资源虚拟化技术;在大规模数据处理方面,分析了海量数据处理平台及其资源管理与调度技术;在云计算服务保障方面,讨论了服务质量保证和安全与隐私保护技术.针对新型的云计算应用和云计算存在的局限性,又探讨并展望了今后的研究方向.最后,介绍了东南大学云计算平台以及云计算研究与应用方面的相关成果.",
        },
        {
          title:
            "<span class='highlight'>计算</span>机云<span class='highlight'>计算</span>探析",
          author: "王晓燕",
          journal: "太原大学学报, 2012, (03): 135-137.",
          citationCount: 999,
          abstract:
            "可持续发展的定量测度是可持续发展战略得以实施的前提条件.加拿大学者Mathis Wackernagel发展完善的生态足迹模型就是一种测量可持续性的方法.该方法通过计算支持特定区域人类社会所有消费活动所需要的土地(生态足迹)与该区域可提供的生物生产性土地(生态承载力)相比较来判断区域发展的可持续性.简单介绍了生态足迹模型的基本概念,研究进展,计算方法;对中国历年的生态足迹进行了实证研究,结果表明:从1962～2001年,中国人均生态承载力逐步下降,人均生态足迹则逐步上升,目前中国人均生态足迹已经超过人均生态承载力,生态赤字出现,并持续扩大,中国目前的发展处于一种强不可持续状态.",
        },
        {
          title:
            "<span class='highlight'>计算</span>与<span class='highlight'>计算</span>哲学",
          author: "李大社; 范辉; 李晋江; 赵小芳",
          journal: "山东工商学院学报, 2009, (05): 117-119.",
          citationCount: 32,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "面向<span class='highlight'>计算</span>社会的<span class='highlight'>计算</span>素质培养",
          author: "王飞跃",
          journal: "工业和信息化教育, 2013, (06): 4-8.",
          citationCount: 1,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
      ],
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
    };
  },
  props: ["word"],
  methods: {
    changeMain(title){
      var key = this.paperList.findIndex(item => item.title === title)
      this.$set(this.paperTopList,0,this.paperList[key]);
    },
    changePage() {
      console.log(this.currentPage);
    },
    selected() {
      this.isSelected = true;
    },
    undoSelected() {
      this.isSelected = false;
    },
    onSearch(value) {
      this.$router.push({ path: "/searchResult", query: { word: value } });
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style>
.left-block{
  width: 33%;
  height: 1350px;
  /* border: solid 1px black; */
}
.middle-block{
  width: 34%;
  height: 1350px;
  /* border: solid 1px black; */
  margin: -1350px 0px 0px 33%;
}
.right-block{
  width: 33%;
  height: 1350px;
  margin: -1350px 0px 0px 67%;
  /* border: solid 1px black; */
}
.result-main-scholar .topbar {
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  /* border: solid 1px black; */
  height: 40px;
}
.result-list-scholar .card-list {
  /* border: solid 1px black; */
  width: 90%;
  margin: 20px auto;
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
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-list-scholar .card-list .card-button {
  float: right;
  width: 10%;
}
small-card-list{
  border: solid 1px rgb(180, 174, 174);
  width: 600px;
  height: 1000px;
  /* margin: auto; */
}
.result-list-scholar .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.home-content {
  width: 1280px;
  margin: 0 auto;
}

.home-search {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 40px;
}

.home-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.home-search-on {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px #1890ff;
  width: 100%;
  height: 40px;
}
.home-searchBox {
  width: 99%;
  margin-left: 1%;
  height: 100%;
}
.home-searchButton {
  font-size: 14px;
  margin-top: 7px;
  height: 32px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

.home-searchBox .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox .ant-input:focus {
  border: none;
  box-shadow: none;
}

.home-searchCard {
  width: 663px;
}
.result-sider {
  float: left;
  width: 280px;
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
  width: 980px;
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
  margin-right: 60px;
}
.result-main .ant-list-item-action {
  margin-top: 5px;
}
.result-main .result-list .result-list-button {
  margin-right: 5px;
  padding: 0;
}
.result-main .result-list .ant-list-item {
  padding-left: 10px;
}
.result-main .result-list .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.abstract {
  height: 40px;
  width: 100%;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
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

</style>