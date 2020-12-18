<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:10%">我的消息</h2>
    <a-list item-layout="horizontal" :data-source="info">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-button @click="delM" type="danger" slot="actions" ghost>删除</a-button>
        <a-button @click="seeM" type="primary" slot="actions" ghost>查看</a-button>
        <a-list-item-meta :description="item.msgcontent">
          <a slot="title" href="https://www.antdv.com/">{{ item.msgtitle }}</a>
          <a-avatar
            slot="avatar"
            :src= 'info.url'
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
      info: [
        {
          title : null,
          url: null,
        }
      ]
    };
  },
  components: {
    Nav,
    SiderNav
  },
  methods: {
    delM() {
      let url = this.$urlPath.website.getConcern;
      deleteData(url, null).then(res => {
        console.log(res.data);
        if (res.code === "1001") {
          this.info = res.data.users
        } 
        else {
          console.log(res.code);
          this.$message.error("获取数据失败");
        }
      });
    },
    seeM() {
      var _this = this;
      _this.$router.push({
        path: "/messageInfo",
        query: {         //参数携带方式
          title: _this.info.msgtitle,
          sendtime: _this.info.msgtitle.sendtime,
          content: _this.info.msgtitle.msgcontent,
          receiverUserid: _this.info.msgtitle.receiverUserid,
          senderUserid: _this.info.msgtitle.senderUserid,
        }
      });
      
    },
    getallM() {
      var _this = this;
      
      let url = _this.$urlPath.website.getMessage;
      let params = {
        userId: 15,
      };
      //let params = new URLSearchParams();
      //params.append("userId", 15);
      getData(url,params).then(res => {
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
    }
  },
  mounted() {
    this.getallM();
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