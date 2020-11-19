<template>
  <div>
    <div class="content">
     
      <div class="title">
        陨 石 文 档
      </div>
      <p class="intro">
        在线编辑 协作无间
      </p>
      <div class="myButton" @click="toLogin">开 始 使 用</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 800px;
  /*background: url("../assets/bg.jpeg") no-repeat center bottom;*/
  background-size: cover;
}
.footer {
  height: 200px;
  background-image: linear-gradient(-186deg, #fce2c1 0%, #98623c 100%);
}
.title {
  font-family: 华文新宋;
  font-size: 40px;
  color: #000;
  text-align: center;
  padding-top: 20px;
  background-color: #deb068;
  opacity: 0.8;
  margin-left: 520px;
  margin-top: 100px;
  width: 300px;
  height: 100px;
}
.intro {
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #deb068;
  opacity: 0.8;
  width: 300px;
  height: 60px;
  margin-left: 520px;
}
.startBtn {
  display: block;
  margin: 0 auto;
}
.aboutUs {
  cursor: pointer;
  width: 100px;
  display: block;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 20px;
  color: white;
}
.bottomTitle {
  width: 230px;
  color: white;
  margin: 80px auto 0 auto;
  display: block;
}
.myButton {
  box-shadow: inset 0px 1px 0px 0px #fce2c1;
  background-color: #deb068;
  border-radius: 7px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 6px 23px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #000;
  width: 150px;
  text-align: center;
  margin-left: 595px;
  height: 40px;
}
.myButton:hover {
  background-color: #c38743;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>
