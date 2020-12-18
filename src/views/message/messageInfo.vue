<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <div class = "email">
      <h2>邮件信息</h2>
      </br>
      <h3>{{}}</h3>
      </br>
      <p style="float:left;">发送人:</p>
      <p style="float:right;margin-right:50%">发送时间:</p>
      </br>
      </br>
      <p>内容:</p>
      <h3>快速回复</h3>
      </br>
    </div>  
    <a-form-model style="width:1000px;margin-left:250px" :model="form" >
          <a-input placeholder="标题" v-model="form.title" />
          </br>
          </br>
          <a-input placeholder="请输入正文" v-model="form.desc" type="textarea"  :rows="7"/>
          </br>
          </br>
          <a-upload
              style="float:left"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :default-file-list="defaultFileList"
          >
              <a-button> <a-icon type="upload" /> 上传图片</a-button>
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
      form: {
        name: this.$route.params.senderUserid,
        title: this.$route.params.msgtitle,
        desc: this.$route.params.msgcontent,
      },
    };
  },
  components: {
    Nav,
    SiderNav
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    sendM(){
      let params = new URLSearchParams();
      params.append("messageTitle", this.form.title);
      params.append("messageContent", this.form.desc);
      let url = this.$urlPath.website.sendMessage;
      postData(url, params).then(res => {
        console.log(res.data);
        if (res.code === "1001") {
           this.$message.success("发送成功");
        } 
        else {
          console.log(res.code);
          this.$message.error("发送失败");
        }
      })
    },
    onSubmit() {
      console.log('submit!', this.form);
      this.sendM();
    },
  }
};
</script>
<style scoped>
.email {
  margin-left: 250px;
  margin-top:10%;
  width: 1000px;
  background-color: pink;
  
}
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
</style>