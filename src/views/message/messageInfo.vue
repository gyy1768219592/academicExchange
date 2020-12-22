<template>
  <div class = "al">
    <Nav></Nav>

    <div class = "email">

      <h1><a-icon @click="toBefore"  type="arrow-left" />    邮件信息</h1>
      </br>
      <h3>标题：{{letter.title}}</h3>
      </br>
      <p style="float:left;">发送人：{{letter.senderUsername}}</p>
      <p style="float:right;margin-right:50%">发送时间：{{letter.time}}</p>
      </br>
      </br>
      <p>内容：{{letter.desc}}</p>
      </br>
      <h3>快速回复:</h3>
      </br>
    </div>  
    <a-form-model style="width:1000px;margin-left:250px" :model="form" >
          <a-input placeholder="标题" v-model="form.title" />
          </br>
          </br>
          <a-input placeholder="请输入正文" v-model="form.desc" type="textarea"  :rows="7"/>
          </br>
          </br>
          <a-button type="primary" @click="onSubmit" style="float:right">
              发送
          </a-button>
          </a-form-model-item>
    </a-form-model>
 
  </div>
</template>
<script>
import { postData } from "@/api/webpost";
//import { getData } from "@/api/webget";
//import { deleteData } from "@/api/webdelete";
//import { putData } from "@/api/webput";
import Nav from "../../components//navSearch.vue";


export default {
  inject: ['reload'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: null,
        title: null,
        desc: null,
      },
      letter:{
        title: null,
        desc: null,
        time: null,
        name: null,
      }
    };
  },
  components: {
    Nav,

  },
  mounted() {
    this.letter.title = this.$route.query.title;
    this.letter.desc = this.$route.query.content;
    var date = new Date(this.$route.query.sendtime);
    this.letter.name = this.$route.query.senderUserid;
    this.letter.time = this.format(date);
    this.letter.senderUsername = this.$route.query.senderUsername;
    this.letter.img = this.$route.query.img;
  },
  methods: {
    toBefore(){
      this.$router.push({
        path: "/message",
      });
    },
    format(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h=h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second=date.getSeconds();
      second=second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    sendM(){
      var _this = this;
      let url = _this.$urlPath.website.sendMessage;
      let params = new URLSearchParams();
      params.append("messageTitle", _this.form.title);
      params.append("messageContent", _this.form.desc);
      //params.append("sender_userid", 15);
      params.append("receiver_userid", this.letter.name);
      postData(url,params).then(res => {
        console.log(res);
        if (res.code === 1001) {
          this.$message.success("发送成功");
          
        } 
        else {
          //console.log(res.code);
          _this.$message.error("发送失败");
        }
      });
      this.reload();
    },
    onSubmit() {
      console.log('submit!', this.form);
      this.sendM();
    },
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
.email {
  margin-left: 250px;
  margin-top:1%;
  width: 1000px;

}
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
</style>