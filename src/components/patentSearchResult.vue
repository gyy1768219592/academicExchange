<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        专利
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        multiple
        class="sider-menu"
      >
        <a-sub-menu key="sub2">
          <span slot="title"><span>发表年份</span></span>
          <template v-for="item in patentYearOptions">
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
        </a-select>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="patentList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta
              :description="item.author + ' - ' + item.applycode"
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
      total: 203,
      patentList: [
        {
          title:
            "<span class='highlight'>计算</span>方法、<span class='highlight'>计算</span>系统、<span class='highlight'>计算</span>装置",
          author: "星野昌幸; 森田鹏和",
          applycode: "ZL201210176556.7",
          abstract:
            "本发明涉及计算电池的劣化状态的计算方法、计算系统及计算装置。本实施方式的计算方法的目的在于更正确地计算电池的劣化状态。本实施方式的计算方法实现参照测量值数据库和函数信息数据库,以保存于所述函数信息数据库的函数的活性材料的量为变量,对存储于所述测量值数据库的电池电压进行回归计算的运算功能,所述测量值数据库将电池的充电量和此时产生的电池电压对应着存储,所述函数信息数据库存储表示包含于电池内的多种活性材料的充电量与电压的关系的函数。",
        },
        {
          title:
            "<span class='highlight'>计算</span>装置、<span class='highlight'>计算</span>方法、<span class='highlight'>计算</span>程序以及记录介质",
          author: "藤原稔树; 柏尾将太; 西田宗祐",
          applycode: "CN201180066146.0",
          abstract:
            "计算装置（100）对计算估计消耗量时的校正值进行计算。输入部（101）接受对移动体补给的能量的输入。估计消耗量计算部（102）计算移动体在预定区间移动时消耗的能量（估计消耗量）。取得部（103）取得移动体在预定区间移动时实际消耗的能量（实测消耗量）。存储部（104）按照移动体的多个速度区域来存储划分在预定区间移动所需的需要时间或需要距离的比例（以下，称作“速度区域的比例”）。校正量计算部（105）根据实测消耗量与估计消耗量的差分以及移动体的每个速度区域的比例，对估计消耗量计算部（102）计算估计消耗量时的校正值进行计算。",
        },
        {
          title:
            "输入补偿<span class='highlight'>计算</span>和/或输入过补偿<span class='highlight'>计算</span>",
          author: "米奥德拉格·波特科尼亚克",
          applycode: "CN201080025570.6",
          abstract:
            "总体上描述了用于经由输入补偿和/或输入过补偿来校正计算误差的技术。在各种示例中，可以对计算的误差进行检测，且可以产生对误差进行校正的输入补偿和/或输入过补偿。所公开的技术除了其他应用之外可以用于功率和/或能量最小化或者减小、以及调试。其他的实施例和/或应用可以被公开和/或被要求。",
        },
        {
          title:
            "利用<span class='highlight'>计算</span>设备<span class='highlight'>计算</span>代谢当量",
          author: "E·巴苏姆; R·福布斯; T·莱瓦德; T·杰肯",
          applycode: "CN201210402712.7",
          abstract:
            "本发明涉及利用计算设备计算代谢当量。在此提供了一种供与计算设备一起使用的用于估计任务代谢当量的方法。该方法包括：从用户的捕捉设备接收输入；以及跟踪该用户的多个关节中的每个关节的位置。该方法还包括：确定所述多个关节中的每个关节在第一帧与第二帧之间行进的距离；以及基于该行进的距离和在第一和第二帧之间的流逝时间来计算所述多个关节中的每个关节的水平速度和垂直速度。该方法还包括：使用代谢等式估计任务代谢当量的值，所述代谢等式包括所述多个关节中的每个关节的水平速度的分量和垂直速度的分量；以及输出所述值以供显示。",
        },
        {
          title: "任务<span class='highlight'>计算</span>",
          author: "益冈龙介; 约翰·郎布罗; 宋哲炫",
          applycode: "CN200310123963.2",
          abstract:
            "基于计算机的系统包括任务计算，从而使用户能够通过将可用功能性组合在一起来定义任务并执行这种任务。基于计算机的系统包括可用功能性，可用功能性起源于设备、计算应用程序以及通过本地和远程过程调用可用的、包括web服务、UPnP、CORBA、RMI、RPC、DCE、DCOM的电子服务，或者该可用功能性包括以前定义的任务。所有可用功能性对用户抽象为一服务，并以服务描述语言来表示每个服务，而且各服务具有与它们相关联的语义描述。",
        },
        {
          title:
            "位置<span class='highlight'>计算</span>方法和位置<span class='highlight'>计算</span>装置",
          author:
            "青木利幸; 板东干雄; 蛭田智昭; 小比田启之; 加藤晃一; 川端昭弘",
          applycode: "CN201280018021.5",
          abstract:
            "一种位置计算方法，作为使用移动体的现在位置、链路候选点位置、现在位置周边的区域所包含的多个链路的位置的误差方差、和多个链路的方位的误差方差进行的运算，根据现在位置与链路候选点位置之间的距离和移动体的移动方位与链路候选点方位的方位差，对包含至链路候选点位置的按每规定距离间隔得到的距离和方位差的多个数据进行累计，由此，按各链路候选点的每个链路计算移动体在与各链路候选点对应的道路上行驶的概率所对应的评价量，设移动体位于多个链路候选点中的概率最高的链路候选点，基于评价量计算现在位置。",
        },
        {
          title:
            "<span class='highlight'>计算</span>器以及<span class='highlight'>计算</span>机可读介质",
          author: "吉泽博明",
          applycode: "CN201010132509.3",
          abstract:
            "本发明提供一种计算器以及计算机可读介质。所述计算器具备：具有触摸板的显示部；识别单元，其(i)识别在所述触摸板上手写的数学式，(ii)将该手写的数学式变换为文本形式，(iii)在所述显示部上显示所述文本化的数学式；删除单元，在误识别所述文本化的数学式的一部分后，指示了所述误识别部分时，删除(i)所述误识别部分和与所述误识别部分对应的所述手写的数学式的部分。当在所述手写的数学式的删除部分再次手写输入了信息时，所述识别单元再次识别该手写信息，修正所述文本化的数学式的误识别部分。",
        },
        {
          title: "<span class='highlight'>计算</span>装置接口",
          author: "巴巴科·福鲁坦保尔; 任剑锋",
          applycode: "CN201180016602.0",
          abstract:
            "本发明描述一种经配置以用于提供接口的计算装置。所述计算装置包含处理器和存储在存储器中的指令。所述计算装置从投影器投影出投影图像。所述计算装置还使用相机俘获包含所述投影图像的图像。所述相机在可见光谱中操作。所述计算装置校准自身、检测手，且基于搜索空间中的跟踪图案来跟踪所述手。所述计算装置还执行操作。",
        },
        {
          title: "自身位置<span class='highlight'>计算</span>装置和方法",
          author: "山口一郎; 西内秀和",
          applycode: "CN201480075546.1",
          abstract:
            "本发明的自身位置计算装置对车辆周围的路面投光图案光，拍摄车辆周围的路面，获取图像。然后，在被判定为车辆周围的路面状态变化在阈值以上的情况下，自身位置计算装置对在前次的信息处理循环中算出的车辆的当前位置以及姿态角加上姿态变化量，计算当前车辆的当前位置以及姿态角。",
        },
        {
          title: "语义任务<span class='highlight'>计算</span>",
          author: "约翰·郎布罗; 益冈龙介; 杜叶文; 宋哲炫",
          applycode: "CN200580013453.7",
          abstract:
            "本发明涉及语义任务计算。任务计算计算机系统，该任务计算计算机系统将该系统划分成多个实现层，即，表示层、远程过程调用编程接口(API)、中间件层、以及服务层和功能源实现层，经由远程过程调用API将表示层交互连接至该中间件层，以在表示层实时、动态地生成针对被语义描述为计算机系统上的服务的功能源的计算机实现任务接口，该服务层和功能源实现层提供被语义描述为计算机系统上的服务的功能源，该中间件层交互连接至该服务层和功能源实现层。基于语义描述的富应用、富装置以及富服务计算机，在计算机系统上针对一个或更多个服务，在表示层利用生成的任务接口实时、动态地组成可执行任务，该可执行任务包括一个或更多个服务。",
        },
      ],
      patentYearOptions: [
        {
          value: "2020",
          count: 55,
        },
        {
          value: "2019",
          count: 34,
        },
        {
          value: "2018",
          count: 61,
        },
        {
          value: "2017",
          count: 23,
        },
        {
          value: "2016",
          count: 17,
        },
        {
          value: "2015",
          count: 13,
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