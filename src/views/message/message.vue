<template>
  <div class="al">
    <Nav></Nav>
    <h1 style="margin: 0 auto; margin-top: 1%; width: 1200px">我的消息</h1>
    <a-list item-layout="horizontal" pagination="true" :data-source="info">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="item.msgid">
        <a-button @click="delM(item.msgid)" type="danger" slot="actions" ghost
          >删除</a-button
        >
        <a-button
          @click="seeM(index)"
          slot="actions"
          style="color: #696969; border-color: #696969"
          >查看</a-button
        >
        <a-list-item-meta :description="item.msgcontent">
          <a slot="title" @click="seeM(index)">{{ item.msgtitle }}</a>
          <a-avatar
            v-if="item.senderAvatar != null"
            slot="avatar"
            :src="item.senderAvatar"
          />
          <a-avatar v-else slot="avatar" :style="'backgroundColor: #B22222'"
            >{{ item.senderUsername.substring(0, 3) }}
          </a-avatar>
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
import Nav from "../../components//navSearch.vue";

export default {
  inject: ["reload"],
  data() {
    return {
      itemLayout: "vertical",
      size: "default",
      pagination: {
        onChange: (page) => {
          console.log("page", page);
        },
        pageSize: 3,
      },

      info: [
        {
          title: null,
          url: null,
        },
      ],
    };
  },
  components: {
    Nav,
  },
  methods: {
    seeM(index) {
      var _this = this;
      _this.$router.push({
        path: "/messageInfo",
        query: {
          //参数携带方式
          title: _this.info[index].msgtitle,
          sendtime: _this.info[index].sendtime,
          content: _this.info[index].msgcontent,
          receiverUserid: _this.info[index].receiverUserid,
          senderUserid: _this.info[index].senderScholarId,
          senderUsername: _this.info[index].senderUsername,
          img: _this.info[index].complaintMaterialUrl,
        },
      });
    },
    getallM() {
      var _this = this;
      let url = _this.$urlPath.website.getMessage;
      getData(url, null).then((res) => {
        console.log(res.data);
        if (res.code === 1001) {
          _this.info = res.data;
          console.log("获取成功");
        } else {
          //console.log(res.code);
          _this.$message.error("获取数据失败");
        }
      });
    },
    delM(messageId) {
      let url = this.$urlPath.website.delMessage;
      let params = new URLSearchParams();
      params.append("messageId", messageId);
      deleteData(url, params).then((res) => {
        console.log(res);
      });
      this.reload();
    },
  },
  mounted() {
    this.getallM();
  },
};
</script>
<style scoped>
body {
  width: 1280px;
  margin: 0 auto;
}
.al ::-webkit-scrollbar {
  display: none;
}
.al {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
.ant-list.ant-list-split {
  margin: 0 auto;
  margin-top: 1%;
  width: 1200px;
}
.ant-list-item-meta-description {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 500px;
}
.ant-list-item-meta-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 500px;
}
</style>