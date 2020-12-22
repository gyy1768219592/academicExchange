<template>
  <div class="total">
    <Nav></Nav>
    <div class="login_container">
      <div>
        <p>登 录</p>
        <a-form-model ref="loginRef" :model="loginForm">
          <a-form
            ref="loginRef"
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: '请输入您的邮箱!' },
                      {type: 'email', message:'请输入有效的邮箱!'}
                    ]
                  }
                ]"
                placeholder="Email"
              >
                <a-icon
                  slot="prefix"
                  type="mail"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入密码!' }
                    ]
                  }
                ]"
                placeholder="Password"
                type="password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-model-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true
                  }
                ]"
                >记住密码</a-checkbox
              >
              <a class="login-form-forgot" href="#/findPwd">忘记密码？</a>
              <a-button html-type="submit" class="login-form-button"
                >登 录</a-button
              >没有账号？
              <a href="#/register">去注册！</a>
            </a-form-model-item>
          </a-form>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";
import Nav from "@/components/navSearch.vue";
export default {
  components: {
    Nav,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      loginForm: {
      }
    };
  },
  methods: {
    //登录验证模块
    login(values) {
      let params = new URLSearchParams();
      params.append("Email", values.email);
      params.append("Password", this.$md5(values.password));
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.login;
      postData(url, params).then(res => {
        //console.log(res);
        if (res.code === 1001) {
          this.$message.success("登录成功");
          window.localStorage.setItem("avatarUrl",res.data.avatar);
          window.localStorage.setItem("identification",res.data.identification);
          if(res.data.scholarId != undefined)
            window.localStorage.setItem("scholarId",res.data.scholarId);
          else 
            window.localStorage.removeItem("scholarId");
          //window.sessionStorage.setItem("UserId", res.data.userid);
          //const webAdrs = window.sessionStorage.getItem("WebAdrs");
          /*if (webAdrs) {
            console.log("that way" + webAdrs);
            this.$router.push(webAdrs.substr(27));
          } else if (!webAdrs) {
            console.log("this way");
            this.$router.push("/used");
          }*/
          this.$router.push("/");
        /*} else if (res.code === "1" || res.code === "2") {
          this.$message.error("用户名或密码错误");*/
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    //表单验证函数
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.login(values);
        } else {
          this.$message.error("请检查输入");
        }
      });
    }
  },
  mounted() {
    //this.postLogin(params);
  }
};
</script>
<style scoped>
.total {
  /*background: url("../../assets/bg.jpeg");*/
  width: 100%;
  height: 1000px;
  /*background-size: cover;*/
}
.login_container {
  width: 350px;
  border-radius: 3px;
  position: absolute;
  left: 35%;
  right: 30%;
  top: 10%;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  opacity: 0.9;
}
.login_container p {
  font-size: 30px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
