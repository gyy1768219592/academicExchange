<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:10%">我的关注</h2>
    <a-list item-layout="horizontal" :data-source="info">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-button @click="delConcern" type="danger" slot="actions" ghost>取消关注</a-button>
        <a-button @click="toSendmessage" type="primary" slot="actions" ghost>发送私信</a-button>
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
    delConcern() {
      let params = new URLSearchParams();
      let userId = this.$route.query.userid;
      let ScholarId = this.info.ScholarId;
      params.append("userid", userId);
      params.append("ScholarId", ScholarId);
      let url = this.$urlPath.website.delConcern;
      deleteData(url, params).then(res => {
        console.log(res.data);
        if (res.code === "1001") {
           this.$message.success("取消关注成功");
        } 
        else {
          console.log(res.code);
          this.$message.error("获取数据失败");
        }
      });
    },
    toSendmessage(){
      console.log(this.key)
      this.$router.push({
        path: "/sendMessage",
        query: {
          name: this.info[0].Name,
          ScholarId: this.info[0].ScholarId,
         
        }
      });
    }
  }
};
</script>
<style scoped>
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
</style>