<template>
  <a-result
    :status="status"
    :title="title"
    :sub-title="sub_title"
  >
    <template #extra>
      <a-button key="gotologin" type="primary" v-if = 'show' @click = toLogin()>
        去登陆
      </a-button>
      <a-button key="gotoPersonInfo" type="primary" v-if = '!show' @click = toPersonInfo()>
        重新更改邮箱
      </a-button>
    </template>
  </a-result>
</template>
<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      status:'',
      title: '',
      sub_title:'',
      count: '',
      show: ''
    };
  },
  created() {
    let params = new URLSearchParams();
    params.append("Code", this.$route.params.CODE);
    console.log(this.$route.params.CODE);
    let url = this.$urlPath.website.emailVerify;
    postData(url, params).then(res => {
        if(res.code == 1001) {
          this.status = 'success';
          this.title = "认证成功";
          this.show = true;
          this.goLogin();
          console.log(res);
        } else {
          this.status = 'warning';
          this.title = '认证失败';
          this.show = false;
          this.sub_title = res.message;
        }
    });
  },
  methods: {
    goLogin() {
      const TIME_COUNT = 3
      if(!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() =>{
          if(this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.sub_title = this.count + '秒后为您跳转到登录页面'
          } else {
            clearInterval(this.timer)
            this.timer = null
            //跳转到登录页面
            this.$router.push('/login')
          }
        },1000)
      }
    },
    toLogin() {
      this.$router.push('/login');
    },
    toPersonInfo() {
      this.$router.push('/personInfo');
    }
  }
};
</script>