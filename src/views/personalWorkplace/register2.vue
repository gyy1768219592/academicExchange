<template>
  <div class="total">
    <div class="register_container">
      <p>注册</p>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名'
                  },
                  {
                    min: 2,
                    message: '用户名长度需大于2',
                    trigger: 'blur'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '请输入有效的邮箱地址'
                  },
                  {
                    required: true,
                    message: '请输入邮箱'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请设置密码'
                  },
                  {
                    validator: validatePassword,
                    trigger: 'blur'
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: confirmPassword,
                    trigger: 'blur'
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <div class="register_footer">
          已有账号？
          <a href="#/login">去登录！</a>
          <br />
          <br />
          <a-button type="primary" html-type="submit" style="width: 80%">
            注 册
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    register(values) {
      let params = new URLSearchParams();
      params.append("username", values.username);
      params.append("email", values.email);
      params.append("password", values.password);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.register;
      postData(url, params).then(res => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success(
            "注册成功,请及时点击发送到邮箱中的链接激活账号"
          ); //只要能向邮箱发送链接，就返回success.
          this.$router.push("/login");
        } else if (res.code === "1") {
          this.$message.error("用户名重复，请更换"); //这里涉及到一个问题，即用户名可否重复，用户名是否为真实姓名，另外，关于用户名重复的检测应该也可以放到填入时？
        } else if (res.code === "2") {
          this.$message.error("邮件发送失败，请检查邮箱地址");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.register(values);
        } else {
          this.$message.error(err.errors.message); //这里不确定写得对不，之后debug
        }
      });
    },
    /*handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },*/
    confirmPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致！");
      } else {
        callback();
      }
    }
    /*validatePassword(rule, value, callback) {

    }*/
  }
};
</script>

<style>
.total {
  /*background: url("../../assets/bg.jpeg");*/
  width: 100%;
  height: 1000px;
  background-size: cover;
  background-color: #f7f7f7f7; 
}
.register_container {
  width: 550px;
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
