<template>
  <div class="modal-backdrop">
    <div class="modal" :style="mainStyles">
      <div class="modal-header">
        <h3>请输入修改之后的信息</h3>
      </div>
      <div class="modal-body">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item has-feedback>
            <a-input
              type="password"
              placeholder="请输入原密码"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your old password!'
                    }
                  ]
                }
              ]"
            >
              <a-icon slot="prefix" type="unlock" />
              <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback>
            <a-input
              type="email"
              placeholder="请输入新邮箱"
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      required: true,
                      message: 'please input new email!'
                    },
                    {
                      type: 'email',
                      message: 'The input is not valid email'
                    }
                  ]
                }
              ]"
            >
              <a-icon slot="prefix" type="mail" />
              <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
            </a-input>
          </a-form-item>
          <div class="modal-footer">
            <button type="submit" class="btn-close">确认</button>
            <button type="button" class="btn-close" @click="closeJust">
              关闭
            </button>
          </div>
        </a-form>
        <!--<a-input
          style="width: 250px"
          v-model="email"
          placeholder="请输入新的邮箱"
          type="email"
        >
          <a-icon slot="prefix" type="mail" />
          <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
        </a-input>-->
      </div>
    </div>
  </div>
</template>
<script>
import {postData} from "@/api/webpost";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "changeEmail" });
  },
  data() {
    return {
      email: "",
      mainStyles: "",
      temp: []
    };
  },
  methods: {
    closeSelf() {
      this.temp.password = this.form.getFieldValue("password");
      this.temp.email = this.form.getFieldValue("email");
      this.$emit("closeEmail");
    },
    closeJust() {
      this.password = "";
      this.temp.email = "";
      this.$emit("closeEmail");
    },
    getChoose() {
      return this.temp;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(err => {
        if (!err) {
          this.closeSelf();
          let params = new URLSearchParams();
          params.append("Email",this.form.getFieldValue("email"));
          let url = this.$urlPath.website.modifyEmail;
          postData(url, params).then(res => {
            if(res.code === 1001) {
              this.$message.success("请求成功");
            } else if(res.code === 500) {
              this.$message.error("发送失败");
            } else if(res.code === 501) {
              this.$message.error("该邮箱已被使用");
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 300px;
}
.modal-header {
  /*(border-bottom: 1px solid #eee; */
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  /*border-top: 1px solid #eee; */
  justify-content: flex-end;
  padding: 10px;
  display: flex;
}
.modal-body {
  position: relative;
  padding: 30px 10px;
  text-align: center;
  font-size: 18px;
  margin-right: 40px;
  margin-left: 10px;
}
.btn-close {
  border-radius: 8px;
  margin-left: 16px;
  width: 56px;
  height: 36px;
  border: none;
  cursor: pointer;
}
.btn-close {
  color: #fff;
  background-color: #2d8cf0;
}
</style>
