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
              type="password"
              placeholder="请输入新密码"
              v-decorator="[
                'newpassword',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your new password'
                    },
                    {
                      validator: validateToNextPassword
                    },
                    {
                      min: 8,
                      message: '密码不少于8位',
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
            >
              <a-icon slot="prefix" type="lock" />
              <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback>
            <a-input
              type="password"
              placeholder="请确认新密码"
              @blur="handleConfirmBlur"
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password'
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                }
              ]"
            >
              <a-icon slot="prefix" type="check-circle" />
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
        <!--<a-input style="width:250px; margin-bottom:20px" type="password"  v-model="pwd.old" placeholder="请输入原密码">
                <a-icon slot="prefix" type="unlock" />
                <a-tooltip slot="suffix" title="Extra information">
                </a-tooltip>
            </a-input>
            
            <a-input style="width:250px;margin-bottom:20px" type="password"  v-model="pwd.new" placeholder="请输入新密码">
                <a-icon slot="prefix" type="lock" />
                <a-tooltip slot="suffix" title="Extra information">
                </a-tooltip>
            </a-input>
            
            <a-input style="width:250px" type="password"  v-model="pwd.confirm" placeholder="请确认新密码">
                <a-icon slot="prefix" type="check-circle" />
                <a-tooltip slot="suffix" title="Extra information">
                </a-tooltip>
            </a-input>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "changePwd" });
  },
  data() {
    return {
      pwd: {
        old: "",
        new: "",
        confirm: ""
      },
      mainStyles: "",
      temp: [],
      confirmDirty: false
    };
  },
  methods: {
    closeSelf() {
      this.temp.old = this.pwd.old;
      this.temp.new = this.pwd.new;
      this.temp.confirm = this.pwd.confirm;
      this.temp.flag = 0;
      this.pwd.confirm = "";
      this.pwd.new = "";
      this.pwd.old = "";
      this.$emit("closePwd");
    },
    closeJust() {
      this.temp = [];
      this.temp.flag = 1;
      this.pwd.confirm = "";
      this.pwd.new = "";
      this.pwd.old = "";
      this.$emit("closePwd");
    },
    getChoose() {
      return this.temp;
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("newpassword")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      //按照需求规格说明书中，密码需要大于8位且至少包含数字和英文字母
      var password = form.getFieldValue("newpassword");
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          this.pwd.old = values.password;
          this.pwd.new = values.newpassword;
          this.pwd.confirm = values.confirm;
          this.closeSelf();
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
  width: 400px;
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
  margin-left: 30px;
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
