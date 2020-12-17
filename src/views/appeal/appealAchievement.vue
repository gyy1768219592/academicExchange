<template>
  <div>
    <a-modal
        title="学术成果申诉信息"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
      
    </a-modal>
  </div>    
</template>
<script>
export default {
  props:['visible'],
  data() {
    return {
      confirmLoading: false,
    };
  },
  methods: {
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.$emit('closeModal');
        this.confirmLoading = false;
      },1000);
    },
    handleCancel() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style scoped>
</style>