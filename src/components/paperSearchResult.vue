<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        论文
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        multiple
        class="sider-menu"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><span>论文类型</span></span>
          <template v-for="item in paperTypeOptions">
            <a-menu-item :key="item.value">
              {{ item.label }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><span>发表年份</span></span>
          <template v-for="item in paperYearOptions">
            <a-menu-item :key="item.value">
              {{ item.value }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="result-main">
      <div class="topbar">
        <span> 检索到{{ total }}条结果</span>
        <a-select
          default-value="1"
          @change="handleChange"
          class="topbar-select"
        >
          <a-icon slot="suffixIcon" type="swap" rotate="90" />
          <a-select-option value="1"> 相关性 </a-select-option>
          <a-select-option value="2"> 发表年份 </a-select-option>
          <a-select-option value="3"> 被引量 </a-select-option>
        </a-select>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="paperList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-button
              type="link"
              icon="star"
              slot="actions"
              class="result-list-button"
              >收藏</a-button
            >
            <a-button type="link" slot="actions" class="result-list-button">
              <a-icon type="left" style="font-size: 10px" />
              <a-icon type="right" style="font-size: 10px" />
              引用</a-button
            >
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
    <a-back-top></a-back-top>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: "1",
      total: 95,
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
        {
          title: "社会计算：<span class='highlight'>计算</span>的新应用方向",
          author: "王琳琳; 陈云芳; 耿路",
          journal: "淮海工学院学报(自然科学版), 2012, (02): 19-22.",
          citationCount: 65,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "云<span class='highlight'>计算</span>的数据<span class='highlight'>计算</span>与存储",
          author: "董玉; 管群",
          journal: "电脑知识与技术, 2012, (16): 3803-3805 3825.",
          citationCount: 77,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "云<span class='highlight'>计算</span>与网络<span class='highlight'>计算</span>",
          author: "常浩",
          journal: "太原大学学报, 2010, (02): 113-115.",
          citationCount: 341,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "<span class='highlight'>计算</span>思维教育：从“为<span class='highlight'>计算</span>”到“用<span class='highlight'>计算</span>”",
          author: "李锋; 王吉庆",
          journal: "中国电化教育, 2015, (10): 6-10 21.",
          citationCount: 29,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
        {
          title:
            "<span class='highlight'>计算</span>机云<span class='highlight'>计算</span>研究分析",
          author: "于艳东; 姚玉阁",
          journal: "辽宁科技学院学报, 2014, (03): 25-27.",
          citationCount: 16,
          abstract:
            "云计算代表IT领域向集约化,规模化与专业化道路发展的趋势,是IT领域正在发生的深刻变革.但它在提高使用效率的同时,为实现用户信息资产安全与隐私保护带来极大的冲击与挑战.当前,安全成为云计算领域亟待突破的重要问题,其重要性与紧迫性已不容忽视.分析了云计算对信息安全领域中技术,标准,监管等各方面带来的挑战;提出云计算安全参考框架及该框架下的主要研究内容;指出云计算的普及与应用是近年来信息安全领域的重大挑战与发展契机,将引发信息安全领域又一次重要的技术变革.",
        },
      ],
      paperTypeOptions: [
        {
          label: "期刊论文",
          value: "1",
          count: 32,
        },
        {
          label: "会议论文",
          value: "2",
          count: 63,
        },
      ],
      paperYearOptions: [
        {
          value: "2020",
          count: 32,
        },
        {
          value: "2019",
          count: 13,
        },
        {
          value: "2018",
          count: 25,
        },
        {
          value: "2017",
          count: 8,
        },
        {
          value: "2016",
          count: 13,
        },
        {
          value: "2015",
          count: 4,
        },
      ],
    };
  },
  props: ["word", "institution", "author", "startDate", "endDate"],
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
  },
};
</script>

<style>
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
  width: 940px;
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
</style>