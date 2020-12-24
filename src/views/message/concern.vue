<template>
  <div class="al">
    <Nav></Nav>
    <h1 style="margin: 0 auto; margin-top: 1%; width: 1200px">我的关注</h1>
    <a-list item-layout="horizontal" pagination="true" :data-source="info">
      <a-list-item
        slot="renderItem"
        slot-scope="item, index"
        :key="item.ScholarId"
      >
        <a-button
          @click="delConcern(item.ScholarId)"
          type="danger"
          slot="actions"
          ghost
          >取消关注</a-button
        >
        <a-button
          @click="toSendmessage(index)"
          slot="actions"
          style="color: #696969; border-color: #696969"
          >发送私信</a-button
        >
        <a-list-item-meta :description="item.Institution">
          <a slot="title" @click="toPerson(item.ScholarId)">{{ item.Name }}</a>
          <a-avatar
            v-if="item.AvatarUrl != null"
            slot="avatar"
            :src="item.AvatarUrl"
          />
          <a-avatar v-else slot="avatar" :style="'backgroundColor: #B22222'"
            >{{ item.Name.substring(0, 3) }}
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
      info: [],
    };
  },
  components: {
    Nav,
  },
  mounted() {
    this.getConcern();
  },
  methods: {
    getConcern() {
      var _this = this;
      let url = _this.$urlPath.website.getConcern;
      getData(url + "/", null).then((res) => {
        console.log(res.data);
        if (res.code === 1001) {
          _this.info = res.data.scholars;
          console.log("获取成功");
        } else {
          //console.log(res.code);
          _this.$message.error("获取数据失败");
        }
      });
    },
    delConcern(ScholarId) {
      var _this = this;
      let url = _this.$urlPath.website.delConcern;
      deleteData(url + "/" + ScholarId, null).then((res) => {
        console.log(res.data);
        this.reload();
      });
    },
    toSendmessage(index) {
      var _this = this;
      _this.$router.push({
        path: "/sendMessage",
        query: {
          name: _this.info[index].Name,
          ScholarId: _this.info[index].ScholarId,
        },
      });
    },
    toPerson(sid) {
      if (sid == localStorage.getItem("scholarId")) {
        let url = this.$router.resolve({
          path: "/userIndex",
          query: { scholarid: sid },
        });
        window.open(url.href, "_blank");
      } else {
        let url = this.$router.resolve({
          path: "/scholarIndex",
          query: { scholarid: sid },
        });
        window.open(url.href, "_blank");
      }
    },
  },
};
</script>
<style scoped>
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