<template>
  <div>
    <div class= "control" style="height: 100vh; overflow: hidden;">
      <div class="Info_container">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item
            ><span @click="toLast" style="cursor: pointer;font-size:20px;"
              >返回</span
            ></a-breadcrumb-item
          >
          <a-breadcrumb-item style="font-size:20px">个人信息</a-breadcrumb-item>
        </a-breadcrumb>
        <div>
          <a-card
            style="
              width: 40em;
              height: 26em;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
              margin-top: 1em;
              opacity: 0.9;
            "
          >
            <!--分割线左侧，包括头像和学者认证按钮-->
            <div style="width: 10em; float: left; padding: 2em">
              <div style="margin-bottom: 0.5em">
                <uploadPhoto></uploadPhoto>
              </div>
              <div v-if="isManager" style="margin-left: -0.55em" >
                <a-button type="primary" >
                  管理账号
                </a-button>
              </div>
              <div v-if="!isManager" style="margin-left: -0.55em" v-show="!this.info.isScholar">
                <a-button type="primary" @click="() => setModalVisible(true)">
                  学者认证
                </a-button>
                <a-modal
                  title="请输入认证信息"
                  ok-text="确定"
                  cancel-text="取消"
                  :visible="modalVisible"
                  @ok="handleOk"
                  @cancel="handleCancel"
                >
                  <a-form :form="form">
                    <a-form-item has-feedback>
                      <a-input
                        placeholder="请输入真实姓名"
                        v-decorator="[
                          'realname',
                          {
                            rules: [
                              {
                                required: true,
                                message: '真实姓名不能为空!',
                              },
                            ],
                          },
                        ]"
                      >
                        <a-icon slot="prefix" type="user" />
                        <a-tooltip slot="suffix" title="Extra information">
                        </a-tooltip>
                      </a-input>
                    </a-form-item>
                    <a-form-item has-feedback>
                      <a-input
                        placeholder="请输入您的英文名或名字的汉语拼音"
                        v-decorator="[
                          'englishname',
                          {
                            rules: [
                              {
                                required: true,
                                message: '此处不能为空!',
                              },
                            ],
                          },
                        ]"
                      >
                        <a-icon slot="prefix" type="user" />
                        <a-tooltip slot="suffix" title="Extra information">
                        </a-tooltip>
                      </a-input>
                    </a-form-item>
                    <a-form-item has-feedback>
                      <a-input
                        type="email"
                        placeholder="请输入您的机构邮箱"
                        v-decorator="[
                          'email',
                          {
                            rules: [
                              {
                                required: true,
                                message: '机构邮箱不能为空!',
                              },
                              {
                                type: 'email',
                                message: '输入不是有效的邮箱!',
                              },
                              {
                                validator: validateScholarEmail
                              }
                            ],
                          },
                        ]"
                      >
                        <a-icon slot="prefix" type="mail" />
                        <a-tooltip
                          slot="suffix"
                          title="Extra information"
                        ></a-tooltip>
                      </a-input>
                    </a-form-item>
                  </a-form>
                </a-modal>
              </div>
            </div>
            <!--分割线-->
            <div
              style="
                float: left;
                width: 1px;
                height: 20em;
                background: #f0f0f0f0;
                margin-right: 1em;
              "
            ></div>
            <!--右边内容-->
            <a-list size="large" style="width: 23em; float: left">
              <div style="height: 2em; width: 23em; margin-top: 2em">
                <a-icon type="user" style="margin-right: 0.7em" />
                <span style="width: 7em; display: inline-block">用户名:</span>
                <span style="width: 10em; display: inline-block">{{
                  info.username
                }}</span>
              </div>
              <div style="height: 2em; margin-top: 2.5em">
                <a-icon type="contacts" style="margin-right: 0.7em" />
                <span style="width: 7em; display: inline-block">账号ID:</span>
                <span style="width: 10em; display: inline-block">{{
                  info.userid
                }}</span>
              </div>
              <div style="height: 2em; margin-top: 2.5em">
                <a-icon type="lock" style="margin-right: 0.7em" />
                <span style="width: 7em; display: inline-block">密码:</span>
                <span style="width: 10em; display: inline-block">{{
                  info.password
                }}</span>
                <a-button @click="toPwd" type="link" style="height: 2em"
                  >修改</a-button
                >
                <inputPwd
                  ref="choosePwd"
                  v-show="showPwd"
                  v-on:closePwd="closePwd"
                ></inputPwd>
              </div>
              <div style="height: 2em; margin-top: 2.5em">
                <a-icon type="mail" style="margin-right: 0.7em" />
                <span style="width: 7em; display: inline-block">邮箱:</span>
                <span style="width: 10em; display: inline-block">{{
                  info.email
                }}</span>
                <a-button
                  @click="toEmail"
                  type="link"
                  style="height: 2em"
                  v-show="!showPwd"
                  >修改</a-button
                >
                <inputEmail
                  ref="chooseE"
                  v-show="showEmail"
                  v-on:closeEmail="closeEmail"
                ></inputEmail>
              </div>
            </a-list>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { getData } from "@/api/webget";
//import { putData } from "@/api/webput";
import { postData } from "@/api/webpost";
// 还没写完，包括上传数据，和获取数据
import uploadPhoto from "@/components/uploadPhoto";
import inputEmail from "@/components/inputEmail";
import inputPwd from "@/components/inputPwd";
export default {
  components: {
    uploadPhoto,
    inputEmail,
    inputPwd,
  },
  data() {
    return {
      isManager:false,
      info: {
        username: '',
        email: '',
        userid: '',
        isScholar: false
      },
      showEmail: false,
      showPwd: false,
      modalVisible: false,
    };
  },
  methods: {
    isScholar() {
      console.log(localStorage.getItem("shcolarId")===undefined);
      console.log(localStorage.getItem("shcolarId")===undefined ? false:true);
      return localStorage.getItem("shcolarId")===undefined ? false:true;
    },
    setModalVisible(modalVisible) {
      this.modalVisible = modalVisible;
      console.log(this.info.email.match(/@\S+edu/));
      console.log(this.info.email);
      if(this.info.email.match(/@\S+edu/) != null && this.form.getFieldValue("email") === undefined)
      this.form.setFieldsValue({
        email: this.info.email 
      });
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleOk(e) {
      e.preventDefault();
      const form = this.form;
      form.validateFields((err,values) => {
        if(!err){
          this.verify(values);
          form.resetFields();
          this.modalVisible = false;
        } else {
          this.$message.error("请检查输入");
        }
        
      });
    },
    verify(values) {
      let params = new URLSearchParams();
      params.append("RealName",values.realname);
      params.append("EnglishName",values.englishname);
      params.append("OrgEmail",values.email);
      let url = this.$urlPath.website.toBeScholar;
      postData(url, params).then(res => {
        if(res.code === 1001) {
          this.$message.success("请求成功");
        } else if(res.code === 1002) {
          this.$message.success("认证成功,稍后为您跳转到认领门户界面");
          this.toClaimScholar();
        } else {
          this.$message.error("这个邮箱被用过了");
        }
      });
    },
    toClaimScholar() {
      this.$router.push('/user/claimScholar');
    },
    /*toLast() {
      console.log(this.$route.path);
      let userid = parseInt(window.sessionStorage.getItem("UserId"));
      if (this.$route.query.userid == userid) {
        this.$router.push("/used");
      } else if (this.$route.query.userid != userid) {
        this.$router.go(-1);
      }
    },*/
    toLast() {
      this.$router.go(-1);
    },
    toEmail() {
      this.showEmail = !this.showEmail;
    },
    toPwd() {
      this.showPwd = !this.showPwd;
    },
    closePwd() {
      //let res = this.$refs.choosePwd.getChoose();
      this.showPwd = !this.showPwd;
     /* console.log(res);
      if (res.flag === 0) {
        this.changePa(res.old, res.new);
      }*/
    },
    closeEmail() {
      //let res = this.$refs.chooseE.getChoose();
      this.showEmail = !this.showEmail;
    },
    getInfo() {
      let params = new URLSearchParams();
      let url = this.$urlPath.website.getInfo;
      postData(url, params).then(res => {
        console.log(res);
        if(res.code === 1001) {
          this.info.username = res.data.username;
          console.log(res.data.username);
          this.info.email = res.data.email;
          this.info.isScholar = res.data.isScholar;
          this.info.userid = res.data.uid;
          this.info.password = "●●●●●●";
        } else {
          this.$message.error("抱歉，获取用户信息失败");
        }
      });
    },
    validateScholarEmail(rule, value, callback) {
    const form = this.form;
    //这里我们采用一个简单的方式，即寻找域名中有无edu，放宽范围，因为我们最终是需要用户点击链接的，如果输入不正确的邮箱是无法验证成功的
    var email = form.getFieldValue("email");
    if(email === undefined) email = "";
    if(email.match(/@\S+edu/) === null){
      callback("请输入机构邮箱,而非普通邮箱");
    }
    callback();
  }
  },
  created() {
    this.getInfo();
    if (localStorage.getItem("identification") == 2) {
      this.isManager = true;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "scholarIdentify" });
  },
  mounted() {
    window.addEventListener('setItem', (e) => {
      if(e.key === 'scholarId') {
        this.info.isScholar = true;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.control{
  background: url("../../assets/bg.jpeg");
  opacity: 0.9;
  height: auto;
  width: 100%;
  background-size: cover;
}
.Info_container {
  width: 40em;
  border-radius: 3px;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 10%;
  font-size:30px;
  color: #000000;
  
}
</style>