<template>
  <div>
    <!-- <personNav></personNav> -->
    <div class="main-block">
      <div class="up-block">
        <div class="user-info">
          <div class="avatar">
            <a-avatar class="img" :size="100" icon="user" />
            <h1 class="info-content-name">{{ user.username }}</h1>
            <h4 class="info-content-ins">{{ user.ins }}</h4>
            <!-- 指数展示待优化 -->
            <h3 class="info-content-index">
              H指数:{{ user.hindex + "    " }} G指数:{{ user.gindex + "    " }} 成果数:{{ count }}
            </h3>
          </div>
        </div>
        <div class="actions">
          <a-button class="btn">修改个人信息</a-button>
          <a-button class="btn" type="primary">添加个人经历</a-button>
        </div>
      </div>
      <div class="down-block">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="主页" force-render>
            <div class="intro">Content of Tab Pane 1</div>
          </a-tab-pane>
         <a-tab-pane key="2" tab="项目">
            <div class="selections">
              <a-menu
                style="width: 248px"
                :default-selected-keys="['1']"
                :open-keys.sync="openKeys"
                mode="inline"
                @click="handleClick"
              >
                <a-sub-menu key="sub1" @titleClick="titleClick">
                  <span slot="title"><span>Navigation One</span></span>
                  <a-menu-item-group key="g1">
                    <template slot="title"><span>Item 1</span> </template>
                    <a-menu-item key="1">
                      Option 1
                    </a-menu-item>
                    <a-menu-item key="2">
                      Option 2
                    </a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group key="g2" title="Item 2">
                    <a-menu-item key="3">
                      Option 3
                    </a-menu-item>
                    <a-menu-item key="4">
                      Option 4
                    </a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu key="sub2" @titleClick="titleClick">
                  <span slot="title"><span>Navigation Two</span></span>
                  <a-menu-item key="5">
                    Option 5
                  </a-menu-item>
                  <a-menu-item key="6">
                    Option 6
                  </a-menu-item>
                  <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="7">
                      Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                      Option 8
                    </a-menu-item>
                  </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                  <span slot="title"><span>Navigation Three</span></span>
                  <a-menu-item key="9">
                    Option 9
                  </a-menu-item>
                  <a-menu-item key="10">
                    Option 10
                  </a-menu-item>
                  <a-menu-item key="11">
                    Option 11
                  </a-menu-item>
                  <a-menu-item key="12">
                    Option 12
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
           <div class="results">
              <h3>发表项目</h3>
              <a-divider></a-divider>
              <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta :description="item.description">
                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                    <img style="height:50px;width:55px" slot="avatar" :src="item.src"></img>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="成果">
            <div class="selections">
              <a-menu
                style="width: 248px"
                :default-selected-keys="['1']"
                :open-keys.sync="openKeys"
                mode="inline"
                @click="handleClick"
              >
                <a-sub-menu key="sub1" @titleClick="titleClick">
                  <span slot="title"><span>Navigation One</span></span>
                  <a-menu-item-group key="g1">
                    <template slot="title"><span>Item 1</span> </template>
                    <a-menu-item key="1">
                      Option 1
                    </a-menu-item>
                    <a-menu-item key="2">
                      Option 2
                    </a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group key="g2" title="Item 2">
                    <a-menu-item key="3">
                      Option 3
                    </a-menu-item>
                    <a-menu-item key="4">
                      Option 4
                    </a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu key="sub2" @titleClick="titleClick">
                  <span slot="title"><span>Navigation Two</span></span>
                  <a-menu-item key="5">
                    Option 5
                  </a-menu-item>
                  <a-menu-item key="6">
                    Option 6
                  </a-menu-item>
                  <a-sub-menu key="sub3" title="Submenu">
                    <a-menu-item key="7">
                      Option 7
                    </a-menu-item>
                    <a-menu-item key="8">
                      Option 8
                    </a-menu-item>
                  </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                  <span slot="title"><span>Navigation Three</span></span>
                  <a-menu-item key="9">
                    Option 9
                  </a-menu-item>
                  <a-menu-item key="10">
                    Option 10
                  </a-menu-item>
                  <a-menu-item key="11">
                    Option 11
                  </a-menu-item>
                  <a-menu-item key="12">
                    Option 12
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </div>
            <div class="results">
              <h3>发表成果</h3>
              <a-divider></a-divider>
              <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-list-item-meta :description="item.description">
                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                    <img style="height:50px;width:55px" slot="avatar" :src="item.src"></img>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" tab="影响力">
            <div class="influence">Content of Tab Pane 4</div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//引入导航栏
//import personNav from "@/components/personNav";
const data = [
  {
    title: "成果 1",
    description: "学术成果的摘要可以放在这里",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 2",
    description: "学术成果的摘要可以放在这里",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 3",
    description: "学术成果的摘要可以放在这里",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
  {
    title: "成果 4",
    description: "学术成果的摘要可以放在这里",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606019232343&di=3fae55827adac999ab7f744d5e8caf7f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F33%2F94%2F9256d3d2d8b0fae.jpg",
  },
];
export default {
  components: {
    // personNav,
  },
  data() {
    return {
      data,
      loginid: 0,
      pageid: 0,
      current: ["mail"],
      openKeys: ["sub1"],
      user: {
        username: "陈志刚",
        ins: "中南大学",
        hindex: 1,
        gindex: 2,
      },
      count: 10,
    };
  },
  methods: {
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

    //待补充好多好多好多获取数据的函数接口调用
    //举个栗子：根据不同的条件检索，获取当前用户的各种学术成果，管理个人学术成果等
  },
};
</script>
<style scoped>
.main-block {
  width: 1200px;
  height: 1400px;
  margin: auto;
  border: solid 1px grey;
}
.up-block {
  border: solid 1px red;
  width: 1100px;
  height: 250px;
  margin: auto;
  background-color: #f0f0f0f0;
}
.down-block {
  border: solid 1px blue;
  width: 1100px;
  height: 900px;
  margin: auto;
}

.user-info {
  border: solid 1px black;
  width: 550px;
  height: 200px;
  margin: 10px;
}
.avatar {
  height: 120px;
  width: 500px;
  margin: 20px;
  /* border: solid 5px white; */
}
.img {
  margin: auto;
  /* border: solid 1px red; */
}
.info-content-name {
  width: 200px;
  /* border: solid 1px black; */
  margin: -100px auto 0 120px;
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
.actions {
  padding-top: 10px;
  border: solid 1px black;
  width: 150px;
  height: 200px;
  display: block;
  float: right;
  margin: -210px 10px 10px 10px;
}
.selections {
  border: solid 1px black;
  width: 250px;
  height: 800px;
  margin: 10px 10px 10px 10px;
}
.results {
  padding: 10px 15px 10px 15px;
  border: solid 1px black;
  width: 800px;
  height: 800px;
  display: block;
  float: right;
  margin: -810px 10px 35px 280px;
}
.btn {
  width: 120px;
  border: solid 1px black;
  margin: 15px;
}
.intro {
  border: solid 1px black;
  width: 750px;
  height: 800px;
  margin: 10px;
}
.influence {
  border: solid 1px black;
  width: 1080px;
  height: 800px;
  margin: 10px;
}
</style>
