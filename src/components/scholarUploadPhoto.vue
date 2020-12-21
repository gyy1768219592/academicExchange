<template>
  <div class="photo">
    <div style="width:5em;height:5em;text-align:center;border-radius:50%;cursor:pointer" @click="openImg">
      <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="input" />
      <img style="height:120%;width:120%;border-radius:50%" v-if="imgUrl != ''" :src="imgUrl" />
      <a-avatar v-if="imgUrl === ''" icon="user" :size="90" />
    </div>
  </div>
</template>
<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      isSelectFile: false,
    };
  },
  props: ["imgUrl"],
  methods: {
    tirggerFile(event) {
      let file = event.target.files[0];
      this.files = file;
      let url = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function() {
        url = this.result.substring(this.result.indexOf(",") + 1);
        that.imgUrl = "data:image/png;base64," + url;
        that.loadPhoto(that.imgUrl);
      };
      // console.log(url);
      //console.log(this.imgUrl);
      //this.loadPhoto(this.imgUrl);
    },
    openImg() {
      this.$refs.input.click();
    },
    loadPhoto(file) {
      let params = new URLSearchParams();
      params.append("Base64", file);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.scholarAvatar;
      postData(url, params).then((res) => {
        //console.log(res);
        if (res.code === 1001) {
          this.imgUrl = res.data.url;
          localStorage.setItem("avatarUrl", this.imgUrl);
          this.$message.success({
            message: res.message,
          });
        } else {
          console.log(res.code);
          this.$message.error("上传失败");
        }
      });
    },
  },
};
</script>

<style></style>
