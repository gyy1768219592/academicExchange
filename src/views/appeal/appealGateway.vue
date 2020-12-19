<template>
  <div>
    <a-modal
        title="门户申诉信息"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
      <a-textarea
        v-model="appealinfo"
        placeholder="请填写相关申诉信息"
        :auto-size="{minRows: 3, maxRows: 5}"
      />
      <div>
        <span>证明材料:</span>
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="http://182.92.223.226/message/file/one/"
          @change="handleChange"
        >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
        </a-upload-dragger>
      </div>
    </a-modal>
  </div>    
</template>
<script>
import { postData } from "@/api/webpost";
export default {
  props:['visible','achievement_id','type'],
  data() {
    return {
      confirmLoading: false,
      fileUrList: [],
      info: {},
      appealinfo: '',
    };
  },
  beforeCreated() {
    this.form=this.$from.createForm(this,{ name: "appealInfo" });
  },

  methods: {
    handleOk() {
      let params = new URLSearchParams();
      params.append("towardsId",this.achievement_id);
      params.append("towardsType",this.type);
      params.append("messageContent",this.appealinfo);
      params.append("messageTitle","数据库门户申诉");
      params.append("scholarId",localStorage.getItem("scholarId"));
      this.fileUrList = new Array();
      let i=0;
      for(i=0;i<this.info.fileList.length;i++) {
        this.fileUrList[i] = this.info.fileList[i].response.data;
      }
      console.log(this.fileUrList);
      params.append("complaintMaterial",this.fileUrList[0]);
      let url = this.$urlPath.website.makeAppeal;
      postData(url,params).then(res => {
        if(res.code === 1001) {
          this.$message.success('提交申诉成功');
        } else {
          console.log(res.code);
          this.$message.error('提交申诉失败');
        }
      })
      this.confirmLoading = true;
      setTimeout(() => {
        this.$emit('closeModal');
        this.confirmLoading = false;
      },1000);
    },
    handleCancel() {
      this.$emit('closeModal');
    },
    handleChange(info) {
      this.info = info;
      const status = info.file.status;
      if(status != "uploading") {
        console.log(info.file,info.fileList);  
      }
      if(status === "done") {
        this.$message.success("上传成功");
      } else if(status === "error") {
        this.$message.error("上传失败");
      }
    },
  },
};
</script>
<style scoped>
</style>