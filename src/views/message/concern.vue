<template>
  <div class="al">
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:1%">我的关注</h2>
    <a-list item-layout="horizontal" pagination = true :data-source="info">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="item.ScholarId">
        <a-button @click="delConcern(item.ScholarId)" type="danger" slot="actions" ghost>取消关注</a-button>
        <a-button @click="toSendmessage(index)" type="primary" slot="actions" ghost>发送私信</a-button>
        <a-list-item-meta :description="item.Institution">
          <a slot="title" href="https://www.antdv.com/">{{ item.Name }}</a>
          <a-avatar
            slot="avatar"
            :src= 'info.AvatarUrl'
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
//import { postData } from "@/api/webpost";
import { getData } from "@/api/webget";
import { deleteData } from "@/api/webdelete";
//import { putData } from "@/api/webput";
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";

export default {
  inject: ['reload'],
  data() {
    return {
      info: [],
    };
  },
  components: {
    Nav,
    SiderNav
  },
  mounted() {
    this.getConcern();
  },
  methods: {
   getConcern() {
      var _this = this;
      let url = _this.$urlPath.website.getConcern;
      getData(url+"/15",null).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          _this.info = res.data
          console.log("获取成功");
        } 
        else {
          //console.log(res.code);
          _this.$message.error("获取数据失败");
        }
      });
    },
    delConcern(ScholarId) {
      var _this = this;
      let url = _this.$urlPath.website.delConcern;
      deleteData(url+"/15/"+ScholarId,null).then(res => {
        console.log(res.data);
        this.reload();
      });
    },
    toSendmessage(index){
      var _this = this;
      _this.$router.push({
        path: "/sendMessage",
        query: {
          name: _this.info[index].Name,
          ScholarId: _this.info[index].ScholarId,
        }
      });
    }
  }
};
</script>
<style scoped>
.al ::-webkit-scrollbar{
  display: none;
}
.al{
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
.ant-list-item-meta-description {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 500px;
}
.ant-list-item-meta-title{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 500px;
}
</style>