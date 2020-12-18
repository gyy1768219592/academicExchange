<template>
  <div class="total">
    <div class="register_container">
      <p>注 册</p>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="输入邮箱" has-feedback>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    //message: 'The input is not valid E-mail!'
                    message: '请输入有效的邮箱！'
                  },
                  {
                    required: true,
                    //message: 'Please input your E-mail!'
                    message: '请输入您的邮箱！'
                  },
                  {
                    validator: validateEmail
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="输入用户名" has-feedback>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { 
                    required: true, 
                  //message: 'Username is required!' 
                    message: '请输入用户名！'
                  },
                  { min: 2, message: '用户名长度最小为2！', trigger: 'blur' },
                  {
                    validator: validateUsername,
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="设置密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    //message: 'Please input your password!'
                    message: '请输入您的密码！'
                  },
                  {
                    validator: validateToNextPassword
                  },
                  { min: 8, message: '密码不少于8位！', trigger: 'blur' }
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
                    //message: 'Please confirm your password!'
                    message: '请确认密码'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>

        <!-- <a-form-item v-bind="formItemLayout" label="微信号">
          <a-input
            v-decorator="[
            'wechatNumber',
            {
              rules: [{ required: true, message: 'wechatNumber is required!' }],
            },
          ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="安全问题">
          <a-input
            v-decorator="[
            'question',
            {
              rules: [{ required: true, message: 'question is required!' }],
            },
          ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="答案">
          <a-input
            v-decorator="[
            'answer',
            {
              rules: [{ required: true, message: 'answer is required!' }],
            },
          ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="个人简介">
          <a-textarea
            placeholder
            :rows="4"
            v-decorator="[
            'intro',
            {
              rules: [{ required: true, message: 'Introduce is required!' }],
            },
          ]"
          />
        </a-form-item>-->

        <div class="register_footer">
          已有账号？
          <a href="#/login">去登录！</a>
          <br />
          <br />
          <a-button type="primary" html-type="submit" style="width: 80%"
            >注 册</a-button
          >
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
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    //注册验证模块
    register(values) {
      let params = new URLSearchParams();
      params.append("Name", values.username);
      params.append("Email", values.email);
      params.append("Password", this.$md5(values.password));
      //params.append("wechat", values.wechatNumber);

      //params.append("intro", values.intro);
      //params.append("question", values.question);
      //params.append("answer", values.answer);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.register;
      postData(url, params).then(res => {
        console.log(res);
        if(res.code == 1001) {
          this.$message.success({
            message:"请求成功",
            duration: 1000,
            showClose: true
          });
          this.$router.push("/login");
          /*let verifyparams = new URLSearchParams();
          verifyparams.append("Code","signUPComplete/"+this.$md5(values.email));
          let verifyurl = this.$urlPath.website.userVerify;
          postData(verifyurl, verifyparams).then(res =>{
            console.log(res);
          });*/
        } else {
          this.$message.error({
            message: res.message,
            duration: 1000,
            showClose: true
          });
        }
      });
    },
    //表单验证函数
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          //console.log("Received values of form: ", values);
          this.register(values);
        } else {
          this.$message.error("请检查输入格式");
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        //callback("Two passwords that you enter is inconsistent!");
        callback("两次输入密码不一致！");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      //按照需求规格说明书中，密码需要大于8位且至少包含数字和英文字母
      var password = form.getFieldValue("password");
      if (password === undefined) password = "";
      var i = 0;
      var hasNumber = false;
      var hasLetter = false;
      while (i < password.length && (!hasNumber || !hasLetter)) {
        var c = password.charAt(i);
        if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) hasLetter = true;
        else if (c >= "0" && c <= "9") hasNumber = true;
        i++;
      }
      if (!hasNumber && password) {
        callback("密码应含有至少一个数字");
      } else if (!hasLetter && password) {
        callback("密码应含有至少一个字母");
      } else if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validateUsername(rule, value, callback) {
      const form = this.form;
      var username = form.getFieldValue("username");
      if(username === undefined) username="";
      let params = new URLSearchParams();
      params.append("Username", username);
      let url = this.$urlPath.website.isNameUsed;
      postData(url, params).then(res => {
        console.log(res);
        if(res.data.Used) {
          callback("该用户名已被使用，请更改");
        } else {
          callback();
        }
      });
    },
    validateEmail(rule, value, callback) {
      const form = this.form;
      var email = form.getFieldValue("email");
      if(email === undefined) email="";
      let params = new URLSearchParams();
      params.append("Email",email);
      let url = this.$urlPath.website.isEmailUsed;
      postData(url, params).then(res =>{
        console.log(res);
        if(res.data.Used) {
          callback("该邮箱已被使用，请更换邮箱");
        } else {
          callback();
        } 
      });
    }
  }
};
</script>
<style scoped>
.total {
  /*background: url("../../assets/bg.jpeg");*/
  width: 100%;
  height: 1000px;
  /*background-size: cover;*/
  /*background-color:#f7f7f7f7;*/
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
