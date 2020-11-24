<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="artcle-info">
            <div class="refer-num">
                <h3>0被引</h3>
            </div>
            <div class="title">
                <h3>陈志刚教授辨病论治周围神经病经验</h3>
            </div>
            <div class="authors">
                <a-list item-layout="vertical" :grid="{ gutter: 6, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="author_data">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <div class="author">
                            <a-avatar class="img" :size="35" icon="user" />
                            <h1 class="author-name">{{ item.username }}</h1>
                        </div>
                    </a-list-item>
                </a-list>
            </div>
        </div>
        <div class="tool">
            <div class="collect">
                <a-icon type="star" :style="{ fontSize: '30px', color: '#08c' }" class="star"/>收藏
            </div>
        </div>
      </div>
      <div class="down-block">
        <div class="down-left-block" >
          <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="基本信息" force-render>
            
          </a-tab-pane>
          <a-tab-pane key="2" tab="原文来源">
                
          </a-tab-pane>
          <a-tab-pane key="3" tab="引用助手">
               
          </a-tab-pane>
          </a-tabs>
        </div>
        <div class="down-right-block">
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
export default {
  components: {
    
  },
  data() {
    return {
      author_data : [
        {
            username: "谭火彬",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "宋友",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "贾经冬",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
        {
            username: "原仓周",
            src: "https:///resmod/smate-pc/img/logo_psndefault.png",
        },
      ],
      abstract : "经济分权同垂直的政治管理体制紧密结合是中国式分权的核心内涵,本文在此背景下讨论地方政府支出结构偏向的激励根源,并通过构造财政分权指标和政府竞争指标、利用1994～2004年的省级面板数据对我们的推断进行实证检验.本文主要结论是:中国的财政分权以及基于政绩考核下的政府竞争,造就了地方政府公共支出结构\"重基本建设、轻人力资本投资扣公共服务\"的明显扭曲;并且,政府竞争会加剧财政分权对政府支出结构的扭曲,竞争对支出结构的最终影响则取决于分权程度,而1994年之后包括科教兴国、西部大开发在内的现行重大政策并没有缓解这种状况.这意味着,中国式分权在推动市场化和激发地方政府\"为增长而竞争\"的同时,与之伴随的成本可能正在上升.",
      keyword : "财政支出结构 中国式分权 政府竞争",
      DOI : "CNKI:SUN:GLSJ.0.2007-03-001",
      year : "2007",
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
    callback(key) {
      console.log(key);
    },
    toPro() {
      //跳转到项目展示页面，带参数
      // this.$router.push("/Pro");
    },
    toPaper() {
      //跳转到项目文献页面，带参数
      // this.$router.push("/Paper");
    },
    toPatent() {
      //跳转到专利展示页面，带参数
      // this.$router.push("/Patent");
    },

  },
};
</script>
<style scoped>
.main-block {
  width: 1200px;
  height: 1400px;
  margin: auto;
  border: solid 1px black;
}
.up-block {
  border: solid 1px black;
  width: 1100px;
  height: 250px;
  margin: auto;
  background-color: #f0f0f0f0;
}
.down-block {
  border: solid 1px black;
  width: 1100px;
  height: 900px;
  margin: auto;
}
.down-left-block {
  border: solid 1px black;
  width: 750px;
  height: 900px;
  margin: 0px 0px 0px 0px;
}
.down-right-block {
  border: solid 1px black;
  width: 350px;
  height: 900px;
  margin: -900px 10px 10px 750px;
}
.artcle-info {
  border: solid 1px black;
  width: 950px;
  height: 180px;
  margin: 10px;
}
.tool{
  border: solid 1px black;
  width: 950px;
  height: 40px;
  margin: 10px;
}
.collect{
  border: solid 1px black;
  width: 100px;
  height: 40px;
  margin: 0px;
}
.star{
  /*border: solid 1px black;*/
  width: 40px;
  height: 40px;
  margin: 5px 0px 0px 0px;
}
.refer-num{
  border: solid 1px black;
  width: 85px;
  height: 25px;
  margin: 10px;
  font-size: small;
}
.title{
  border: solid 1px black;
  width: 800px;
  height: 50px;
  margin: 10px;
  font-size: x-large;
}
.authors{
  border: solid 1px black;
  width: 900px;
  height: 50px;
  margin: 10px;
}
.author {
  height: 40px;
  width: 130px;
  margin: 5px;
  /*border: solid 1px black;*/
}
.author-name {
  width: 95px;
  /*border: solid 1px black; */
  margin: -37px auto 0 35px;
  height: 40px;
  font-size: x-large;
}
.img {
  margin: auto;
  /* border: solid 1px red; */
}

.info-content-ins {
  width: 100px;
  /* border: solid 1px red; */
  margin: -5px auto 10px 120px;
}
.info-content-index {
  width: 250px;
  /* border: solid 1px purple; */
  margin: 20px auto 10px 120px;
}
.echart {
  border: solid 1px blue;
  width: 700px;
  height: 300px;
  margin: 10px;
}
</style>
