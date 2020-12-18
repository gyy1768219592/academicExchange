<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
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
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      sender_userid: this.$route.query.ScholarId,
      form: {
        name: this.$route.query.name,
        title: "",
        desc: '',
      },
    };
  },
  components: {
    Nav,
    SiderNav
  },
  mounted() {
    console.log(this.$route.query.name)

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
      let params = {
        messageTitle: _this.form.title,
        messageContent: _this.form.desc,
        sender_userid: 15,
        receiver_userid: _this.sender_userid,
      };
      postData(url,params).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          this.$message.success("发送成功");
        } 
        else {
          //console.log(res.code);
          _this.$message.error("发送失败");
        }
      });
    },
    onSubmit() {
      console.log('submit!', this.form);
      this.sendM();
    },
  }
};
</script>
<style scoped>

</style>