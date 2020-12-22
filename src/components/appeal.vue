<template>
  <div>
    <div class="maneger-sider">
      <div class="sider-title">
        <a-icon type="read" />
        申诉信息
      </div>
      <a-menu
        :default-open-keys="['sub1', 'sub2']"
        mode="inline"
        :inline-collapsed="collapsed"
        v-model="selectedKey"
        class="sider-menu"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><span>未处理申诉</span></span>
          <template v-for="item in paperTypeOptions" @click="selectUnSolved(item.value)">
            <a-menu-item :key="item.value" @click="selectUnSolved(item.value)">
              {{ item.label }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><span>已处理申诉</span></span>
          <template v-for="item in paperYearOptions">
            <a-menu-item :key="item.value" @click="selectSolved(item.value)">
              {{ item.label }}
              <span style="float: right">({{ item.count }})</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="maneger-main">
      <div class="topbar">
        <span> 现有{{ total }}条申诉记录</span>
      </div>
      <div class="maneger-list">
        <a-list item-layout="vertical" size="large" :data-source="List.showList">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-button
              type="link"
              icon="check-circle" 
              slot="actions"
              v-if="item.msgstatus!=4"
              @click="appealAgree(item)"
              :class = "{'maneger-list-button_l' : (item.msgstatus==1||item.msgstatus==0) , 'maneger-list-button_l_1': item.msgstatus==3 , 'maneger-list-button_l_2': item.msgstatus==4 }"
              >申诉通过</a-button
            >
            <a-button 
                type="link" 
                icon="close-circle"  
                slot="actions" 
                v-if="item.msgstatus!=3"
                @click="appealDisagree(item)"
                :class = "{'maneger-list-button_r' : (item.msgstatus==1||item.msgstatus==0) , 'maneger-list-button_r_1': item.msgstatus==4 , 'maneger-list-button_r_2': item.msgstatus==3 }"
                >申诉驳回</a-button
            >
            <a-button 
                type="link" 
                icon="delete"  
                slot="actions" 
                v-if="item.msgstatus==3||item.msgstatus==4"
                @click="deleteMes(item)"
                class = "delete-button"
                >删除</a-button
            >
            <a-list-item-meta
              :description="
                '   申诉类型: ' +
                (item.dataScholarId!=null?'申诉冒领数据库门户':(item.paperid!=null?'申诉论文':(item.patentid!=null?'申诉专利':'申诉项目'))) +
                '   发送时间: ' +
                item.sendtime
              "
            >
              <a slot="title" >
                <span class = "appeal_self">{{item.msgtitle}}（用户：{{item.senderUsername}}）</span>
              </a>
            </a-list-item-meta>
            <div @click="Seek(item)">
              <a-collapse accordion >
                <a-collapse-panel key="1" header= "打开查看申诉具体信息">
                  <a-textarea 
                    class="appealText" 
                    disabled 
                    :defaultValue="
                      '申诉者UID:  ' + 
                      item.senderUserid +
                      '\n申诉学者SID:  ' + 
                      item.scholarId +
                      '\n申诉类型:  ' +
                      (item.dataScholarId!=null?'申诉冒领数据库门户':(item.paperid!=null?'申诉冒领论文':(item.patentid!=null?'申诉冒领专利':'申诉冒领项目'))) +
                      '\n' + (item.dataScholarId!=null?'Author':(item.paperid!=null?'Paper':(item.patentid!=null?'Patent':'Project'))) + 'ID:  ' +
                      (item.dataScholarId!=null?item.dataScholarId:(item.paperid!=null?item.paperid:(item.patentid!=null?item.patentid:item.projectid))) +
                      '\n-------------------------------------------------------------------------------------\n' +
                      item.msgcontent +
                      '\n                                                                           -------------------------------------------------------------------------------------' +
                      '\n                                                                                                                                发送时间: ' +
                      item.sendtime 
                    " 
                    auto-size 
                  />
                  <!-- <div class="appealText">{{ item.msgcontent }}</div> -->
                  <img v-if="item.complaintMaterialUrl!=''" :src="item.complaintMaterialUrl" style="width:100%; height:100%"/>
                  <div v-if="item.downloadurl!=''" class="url-frame">
                    <a-icon v-if="item.downloadstatus==2" type="cloud-download" />
                    <a-icon v-if="item.downloadstatus==1" type="eye" />
                    <a v-if="item.downloadurl!=''" :href="item.downloadurl" target="_blank">{{item.downloadDisplay}}</a>
                  </div>
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
import { postData } from "@/api/webpost";
import { deleteData } from "@/api/webdelete";
export default {
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      currentPage: "1",
      total: 0,
      List:{
        appealList: [],
        showList:[],
      },
      paperTypeOptions: [
        {
          label: "未查看申诉",
          value: 0,
          count: 0,
        },
        {
          label: "已查看申诉",
          value: 1,
          count: 0,
        },
      ],
      paperYearOptions: [
        {
          label: "已通过申诉",
          value: 3,
          count: 0,
        },
        {
          label: "已驳回申诉",
          value: 4,
          count: 0,
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
    deleteMes(item){
      console.log(item);
      for(var i1 = 0; i1 < this.List.appealList.length; i1 ++){
        if(this.List.appealList[i1].msgid == item.msgid){
          this.List.appealList.splice(i1,1)
        }
      }
      for(var i2 = 0; i2 < this.List.showList.length; i2 ++){
        if(this.List.showList[i2].msgid == item.msgid){
          this.List.showList.splice(i2,1)
        }
      }
      this.$set(this.List,"showList",this.List.showList);
      this.total = this.List.showList.length;
      if(item.msgstatus==3){
        this.paperTypeOptions[1].count --;
        this.paperYearOptions[0].count --;
      }
      else if(item.msgstatus==4){
        this.paperTypeOptions[1].count --;
        this.paperYearOptions[1].count --;
      }
      let url = this.$urlPath.website.delMessage;
      let params = new URLSearchParams();
      params.append("messageId", item.msgid);
      deleteData(url, params).then(res => {
        console.log(res);
      });
    },
    appealAgree(item){
      // this.updateAppealStatus(item.msgid,item.msgstatus);//调0用
      if(item.msgstatus!=3){
        if(item.msgstatus==0){
          this.paperTypeOptions[0].count --;
          this.paperTypeOptions[1].count ++;
        }
        item.msgstatus = 3;
        this.paperYearOptions[0].count ++;
        this.updateAppealStatus(item.msgid,item.msgstatus);
        this.$message.success("申诉已通过");
      }
      item.msgstatus = 3
    },
    appealDisagree(item){
      // this.updateAppealStatus(item.msgid,item.msgstatus);//调0用
      if(item.msgstatus!=4){
        if(item.msgstatus==0){
          this.paperTypeOptions[0].count --;
          this.paperTypeOptions[1].count ++;
        }
        item.msgstatus = 4;
        this.paperYearOptions[1].count ++;
        this.updateAppealStatus(item.msgid,item.msgstatus);
        this.$message.success("申诉已驳回");
      }
      item.msgstatus = 4
    },
    updateAppealStatus(msgid,status){
      // status=0;//调0用
      let params = new URLSearchParams();
      params.append("messageId", msgid);
      params.append("messageStatus", status);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.updateAppeal;
      // putData(url + params).then((res) => {
      putData(url, params).then(res => {
        // console.log(res.code);
        if (res.code === 1001) {
          // this.$message.success(res.message);
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
      // params.append("projectId", this.progID);
      //调用封装的postData函数，获取服务器返回值 
      let url = this.$urlPath.website.getAppeal;
      getData(url, params).then(res => {
        this.List.appealList = res.data.reverse();
        console.log(res.data);
        for(var ii = 0; ii < this.List.appealList.length; ii ++){
          console.log(this.List.appealList[ii].complaintMaterialUrl);
          if(this.List.appealList[ii].complaintMaterialUrl!=null&&this.List.appealList[ii].complaintMaterialUrl!="not-allowed extension name"){
            var houzhui = this.List.appealList[ii].complaintMaterialUrl.substring(this.List.appealList[ii].complaintMaterialUrl.length-3,this.List.appealList[ii].complaintMaterialUrl.length);
            console.log(houzhui);
            if((houzhui !== "jpg")&&(houzhui !== "png")&&(houzhui !== "pdf")){
              this.List.appealList[ii]["downloadurl"] = this.List.appealList[ii].complaintMaterialUrl;
              this.List.appealList[ii].complaintMaterialUrl = "";
              this.List.appealList[ii]["downloadDisplay"] = "下载附件"
              this.List.appealList[ii]["downloadstatus"] = 2;
            }
            else if((houzhui == "pdf")){
              this.List.appealList[ii]["downloadurl"] = this.List.appealList[ii].complaintMaterialUrl;
              this.List.appealList[ii].complaintMaterialUrl="";
              this.List.appealList[ii]["downloadDisplay"] = "点击查看"
              this.List.appealList[ii]["downloadstatus"] = 1;
            }
            else{
              this.List.appealList[ii]["downloadurl"]="";
              this.List.appealList[ii]["downloadDisplay"] = "";
              this.List.appealList[ii]["downloadstatus"] = 0;
            }
          }
          else{
            this.List.appealList[ii].complaintMaterialUrl=""
            this.List.appealList[ii]["downloadurl"]="";
            this.List.appealList[ii]["downloadDisplay"] = "";
              this.List.appealList[ii]["downloadstatus"] = 0;
          }
        }
        this.List.showList = this.List.appealList;
        console.log(this.List.appealList);
        this.total = this.List.appealList.length;
        for(var i = 0; i < this.total ; i ++){
          if(this.List.showList[i].msgstatus === 0){
            this.paperTypeOptions[0].count ++;
          }
          else if(this.List.showList[i].msgstatus === 1){
            this.paperTypeOptions[1].count ++;
          }
          else if(this.List.showList[i].msgstatus === 3){
            this.paperYearOptions[0].count ++;
            this.paperTypeOptions[1].count ++;
          }
          else if(this.List.showList[i].msgstatus === 4){
            this.paperYearOptions[1].count ++;
            this.paperTypeOptions[1].count ++;
          }
        }
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
    Seek(item){
      if(item.msgstatus === 0){
        this.paperTypeOptions[0].count --;
        this.paperTypeOptions[1].count ++;
        let params = new URLSearchParams();
        params.append("messageId", item.msgid);
        params.append("messageStatus", 1);
        //调用封装的putData函数，获取服务器返回值 
        let url = this.$urlPath.website.updateAppeal;
        // putData(url + params).then((res) => {
        putData(url, params).then(res => {
          // console.log(res.code);
          if (res.code === 1001) {
            item.msgstatus = 1;
            // this.$message.success(res.message);
            //window.sessionStorage.setItem("UserId", res.data.userid);
            // const webAdrs = window.sessionStorage.getItem("WebAdrs");
          } else {
            console.log(res.code);
            this.$message.error(res.message);
          }
        });
      }
    },
    selectUnSolved(value){
      if(value == 0){
        var temp1 = [];
        for(var i1 = 0; i1 < this.List.appealList.length; i1 ++){
          if(this.List.appealList[i1].msgstatus == 0){
            temp1.push(this.List.appealList[i1]);
          }
        }
        this.$set(this.List,"showList",temp1);
        this.total = temp1.length;
      }
      else if(value == 1){
        var temp = [];
        for(var i = 0; i < this.List.appealList.length; i ++){
          if((this.List.appealList[i].msgstatus == 1)||(this.List.appealList[i].msgstatus == 3)||(this.List.appealList[i].msgstatus == 4)){
            temp.push(this.List.appealList[i]);
          }
        }
        this.$set(this.List,"showList",temp);
        this.total = temp.length;
      }
    },
    getSidByUid(uid){
      let params = new URLSearchParams();
      params.append("UserID", uid);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.getSidByUid;
      // putData(url + params).then((res) => {
      postData(url, params).then(res => {
        // console.log(res.code);
        if (res.code === 1001) {
          return res.data.scholarId;
          // this.$message.success(res.message);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    selectSolved(value){
      if(value == 3){
        var temp1 = [];
        for(var i1 = 0; i1 < this.List.appealList.length; i1 ++){
          if(this.List.appealList[i1].msgstatus == 3){
            temp1.push(this.List.appealList[i1]);
          }
        }
        this.$set(this.List,"showList",temp1);
        this.total = temp1.length;
      }
      else if(value == 4){
        var temp = [];
        for(var i = 0; i < this.List.appealList.length; i ++){
          if(this.List.appealList[i].msgstatus == 4){
            temp.push(this.List.appealList[i]);
          }
        }
        this.$set(this.List,"showList",temp);
        this.total = temp.length;
      }
    }
  },
};
</script>

<style>
.maneger-sider {
  float: left;
  width: 280px;
  margin-right: 20px;
}
.maneger-sider .sider-title {
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
}
.maneger-sider .sider-menu {
  margin-left: 20px;
  padding-right: 20px;
  border-right: 0;
}
.maneger-sider .sider-menu .ant-menu-submenu-title {
  border-bottom: 1px solid #e3e3e3;
}
.maneger-sider .sider-menu .ant-menu-item {
  margin: 0;
}
.maneger-sider .sider-menu .ant-menu-item-selected::after {
  border: 0;
}
.maneger-main {
  float: left;
  width: 980px;
  /* overflow: hidden; */
  padding-left: 20px;
  border-left: 1px solid #e3e3e3;
}
.maneger-main .topbar {
  border-bottom: 1px solid #e3e3e3;
  height: 40px;
}
.maneger-main .topbar .topbar-select {
  float: right;
  width: 100px;
  margin-right: 60px;
}
.maneger-main .ant-list-item-action {
  margin-top: 5px;
  margin-left: 700px
}
.maneger-main .maneger-list .maneger-list-button_l {
  border: solid 1px blue;
  margin-right: 5px;
  padding: 0;
  color: blue;
  background-color: #0000ff10;
}
.maneger-main .maneger-list .maneger-list-button_l_1 {
  /* border: solid 1px blue; */
  margin-left: 40px;
  padding: 0;
  color: blue;
  /* background-color: #0000ff10; */
}
.maneger-main .maneger-list .maneger-list-button_l_2 {
  height: 0px;
  width: 0px;
  /* border: solid 1px blue; */
  /* margin-right: 5px; */
  /* padding: 0; */
  /* color: blue; */
  /* background-color: #0000ff10; */
}
.maneger-main .maneger-list .maneger-list-button_r {
  border: solid 1px red;
  margin-left: 5px;
  padding: 0;
  color: red;
  background-color: #ff000010;
}
.maneger-main .maneger-list .maneger-list-button_r_1 {
  /* border: solid 1px red; */
  margin-left: 40px;
  padding: 0;
  color: red;
  /* background-color: #ff000010; */
}
.maneger-main .maneger-list .maneger-list-button_r_2 {
  height: 0px;
  width: 0px;
  /* border: solid 1px red;
  margin-left: 5px;
  padding: 0;
  color: red;
  background-color: #ff000010; */
}
.maneger-main .maneger-list .delete-button {
  border: solid 1px red;
  margin-left: 5px;
  padding: 0;
  color: white;
  background-color: #ff0000e0;
}
.maneger-main .maneger-list .ant-list-item {
  padding-left: 10px;
}
.maneger-main .maneger-list .ant-list-item:hover {
  background-color: #fafafa;
  transition: all 0.5s;
}
.highlight {
  color: #de5f0d;
}
.appealText {
  /* height: 40px;  */
  color:black;
  font-size:16px;
  font-weight:600;
  width: 920px;
  line-height: 20px;
  background-color: #fafafa;
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 2; */
  /* overflow: hidden; */
}
.maneger-list .maneger-list-pagination {
  margin: 10px 0 30px 0;
  text-align: center;
}
.appeal_self{
    margin-left: 10px;
    margin-right: 10px;
}
.url-frame{
  width: 300px;
  /* border: solid 1px black; */
  margin: 0px 0px 0px 0px;
}
</style>