<template>
  <div>
    <div class="result-sider">
      <div class="sider-title">
        <a-icon type="read" />
        申诉信息
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        multiple
        class="sider-menu"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><span>未处理申诉</span></span>
          <template v-for="item in paperTypeOptions">
            <a-menu-item :key="item.value">
              {{ item.label }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><span>已处理申诉</span></span>
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
        <span> 现有{{ total }}条申诉记录</span>
      </div>
      <div class="result-list">
        <a-list item-layout="vertical" size="large" :data-source="appealList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-button
              type="link"
              icon="check-circle" 
              slot="actions"
              v-if="item.msgstatus!=4"
              @click="appealAgree(item)"
              :class = "{'result-list-button_l' : (item.msgstatus==1||item.msgstatus==0) , 'result-list-button_l_1': item.msgstatus==3 , 'result-list-button_l_2': item.msgstatus==4 }"
              >申诉通过</a-button
            >
            <a-button 
                type="link" 
                icon="close-circle"  
                slot="actions" 
                v-if="item.msgstatus!=3"
                @click="appealDisagree(item)"
                :class = "{'result-list-button_r' : (item.msgstatus==1||item.msgstatus==0) , 'result-list-button_r_1': item.msgstatus==4 , 'result-list-button_r_2': item.msgstatus==3 }"
                >申诉驳回</a-button
            >
            <a-list-item-meta
              :description="
                '   申诉者ID: ' + 
                item.senderUserid +
                '   相关数据ID: ' +
                (item.paperid!=null?item.paperid:(item.patentid!=null?item.patentid:item.projectid)) +
                '   申诉类型: ' +
                (item.paperid!=null?'申诉论文':(item.patentid!=null?'申诉专利':'申诉项目')) +
                '   发送时间: ' +
                item.sendtime
                "
            >
              <a slot="title" >
                <span class = "appeal_self">{{item.msgtitle}}</span>
              </a>
            </a-list-item-meta>
            <div>
              <a-collapse accordion>
                <a-collapse-panel key="1" header= "打开查看申诉具体信息" >
                  <div class="appealText">{{ item.msgcontent }}</div>
                  <img :src="item.complaintMaterialUrl" style="width:100%; height:100%"/>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
export default {
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      currentPage: "1",
      total: 95,
      appealList: [],
      paperTypeOptions: [
        {
          label: "未查看申诉",
          value: "1",
          count: 32,
        },
        {
          label: "已查看申诉",
          value: "2",
          count: 63,
        },
      ],
      paperYearOptions: [
        {
          value: "已通过申诉",
          count: 32,
        },
        {
          value: "已驳回申诉",
          count: 13,
        },
      ],
    };
  },
  props: ["word"],
  mounted(){
    this.getAppeal();
  },
  methods: {
    changePage() {
      console.log(this.currentPage);
    },
    appealAgree(item){
      if(item.msgstatus!=3){
        this.updateAppealStatus(item.msgid,3);
        this.$message.success("申诉已通过");
      }
      item.msgstatus = 3
    },
    appealDisagree(item){
      if(item.msgstatus!=4){
        this.updateAppealStatus(item.msgid,4);
        this.$message.success("申诉已驳回");
      }
      item.msgstatus = 4
    },
    updateAppealStatus(msgid,status){
      let params = new URLSearchParams();
      params.append("messageId", msgid);
      params.append("messageStatus", status);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.updateAppeal;
      // putData(url + params).then((res) => {
      putData(url, params).then(res => {
        console.log(res.code);
        if (res.code === 1001) {
          this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    getAppeal(){
      let params = new URLSearchParams();
      params.append("projectId", this.progID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getAppeal;
      console.log(url);
      getData(url, params).then(res => {
        this.appealList = res.data;
        console.log(res.code);
        if (res.code === 1001) {
          //this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
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
  margin-left: 700px
}
.result-main .result-list .result-list-button_l {
  border: solid 1px blue;
  margin-right: 5px;
  padding: 0;
  color: blue;
  background-color: #0000ff10;
}
.result-main .result-list .result-list-button_l_1 {
  /* border: solid 1px blue; */
  margin-left: 120px;
  padding: 0;
  color: blue;
  /* background-color: #0000ff10; */
}
.result-main .result-list .result-list-button_l_2 {
  height: 0px;
  width: 0px;
  /* border: solid 1px blue; */
  /* margin-right: 5px; */
  /* padding: 0; */
  /* color: blue; */
  /* background-color: #0000ff10; */
}
.result-main .result-list .result-list-button_r {
  border: solid 1px red;
  margin-left: 5px;
  padding: 0;
  color: red;
  background-color: #ff000010;
}
.result-main .result-list .result-list-button_r_1 {
  /* border: solid 1px red; */
  margin-left: 120px;
  padding: 0;
  color: red;
  /* background-color: #ff000010; */
}
.result-main .result-list .result-list-button_r_2 {
  height: 0px;
  width: 0px;
  /* border: solid 1px red;
  margin-left: 5px;
  padding: 0;
  color: red;
  background-color: #ff000010; */
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
.appealText {
  /* height: 40px;  */
  width: 900px;
  line-height: 20px;
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 2; */
  /* overflow: hidden; */
}
.result-list .result-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.appeal_self{
    margin-left: 10px;
    margin-right: 10px;
}
</style>