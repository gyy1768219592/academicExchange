<template>
  <a-result
    status="success"
    title="认证成功!"
    sub-title="稍后会为您跳转到登录页面"
  >
    <template #extra>
      <a-button key="console" type="primary">
        Go Console
      </a-button>
      <a-button key="buy">
        Buy Again
      </a-button>
    </template>
  </a-result>
</template>
<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {};
  },
  mounted() {
    let params = new URLSearchParams();
    params.append("Code", this.$route.params.CODE);
    console.log(this.$route.params.CODE);
    let url = this.$urlPath.website.userVerify;
    postData(url, params).then(res => {
        if(res.code == 1001) {
          console.log(res);
        }
    });
  },
};
</script>