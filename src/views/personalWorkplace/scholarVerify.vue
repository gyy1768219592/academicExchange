<template>
  <a-result
    :status="status"
    :title="title"
    :sub-title="sub_title"
  >
    <template #extra>
      <a-button key="gotoClaimScholar" type="primary" v-if = 'show' @click = toClaimScholar()>
        去认领门户
      </a-button>
      <a-button key="gotoPersonInfo" type="primary" v-if = '!show' @click = toPersonInfo()>
        重新认证
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
    let url = this.$urlPath.website.scholarVerify;
    postData(url, params).then(res => {
        if(res.code == 1001) {
          this.status = 'success';
          this.title = "认证成功";
          this.show = true;
          this.goClaimScholar();
          console.log(res);
        } else if(res.code == 404) {
          this.status = '404';
          this.title = '404';
          this.sub_title = '抱歉，您访问的页面不存在'
        } else if(res.code == 500) {
          this.status = '500';
          this.title = '500';
          this.sub_title = '抱歉，服务器出了一些问题'
        } else {
          this.status = 'warning';
          this.title = '认证失败';
          this.show = false;
          this.sub_title = res.message;
        }
    });
  },
  methods: {
    goClaimScholar() {
      const TIME_COUNT = 3
      if(!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() =>{
          if(this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.sub_title = this.count + '秒后为您跳转到认领门户页面'
          } else {
            clearInterval(this.timer)
            this.timer = null
            //TODO 跳转到认领门户页面
            this.$router.push('/user/claimScholar');
          }
        },1000)
      }
    },
    toClaimScholar() {
      this.$router.push('/user/claimScholar');
    },
    toPersonInfo() {
      this.$router.push('/personInfo');
    }
  }
};
</script>