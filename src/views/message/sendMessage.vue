<template>
  <div class="al">
    <Nav></Nav>
    <h2 style="margin-left: 250px;margin-top:1%">发送消息</h2>
    <a-form-model style="margin-left: 200px;margin-top:50px;width:1000px" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="收件人">
            <p>{{form.name}}</p>
        </a-form-model-item>
        <a-form-model-item label="标题">
            <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="内容">
        <a-input v-model="form.desc" type="textarea"  :rows="4"/>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-upload
            style="float:left"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :default-file-list="defaultFileList"
        >
            <a-button> <a-icon type="upload" /> 上传</a-button>
        </a-upload>
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
      sender_userid: null,
      form: {
        name: null,
        title: null,
        desc: null,
      },
    };
  },
  components: {
    Nav,

  },
  mounted() {
    this.form.name = this.$route.query.name;
  
  },
  methods: {
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
      params.append("sender_userid", 15);
      params.append("receiver_userid", _this.$route.query.ScholarId);
      postData(url,params).then(res => {
        console.log(res);
        if (res.code === 1001) {
          _this.$message.success("发送成功");
        } 
        else {
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
</style>