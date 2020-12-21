<template>
  <div class="total">
    <div class="register_container">
      <p>找 回 密 码</p>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item has-feedback>
          <a-input
            type="email"
            placeholder="请输入您的邮箱"
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    message: '邮箱不能为空！你的密码将发至您的注册邮箱' ,
                  },
                  {
                    type: 'email',
                    message: '输入不是有效的邮箱！',
                  }
                ]
              }
            ]"
          >
            <a-icon slot="perfix" type="mail" />
            <a-tooltip
              slot="suffix"
              title="Extra information"
            ></a-tooltip>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      email: '',
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "findPassword" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        let params = new URLSearchParams();
        params.append("Email",this.form.getFieldValue("email"));
        let url = this.$urlPath.website.findPassword;
        postData(url, params).then(res => {
          if(res.code === 1001) {
            this.$message.success("请求成功");
          } else if(res.code === 500) {
            this.$message.error("邮箱不存在");
          } else if(res.code === 501) {
            this.$message.error("发送失败");
          } else {
            this.$message.error("出了一些问题");
          }
        });
      });
    },
  }
}
</script>
<style>
.total {
  /*background: url("../../assets/bg.jpeg");*/
  width: 100%;
  height: 1000px;
  background-size: cover;
}
.register_container {
  width: 500px;
  border-radius: 3px;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 10%;
  padding: 20px;
  padding-left: 50px;
  padding-right: 100px;
  background-color: white;
  opacity: 0.9;
}
.register_container p {
  font-size: 30px;
}
.register_container div {
  text-align: right;
}
</style>
