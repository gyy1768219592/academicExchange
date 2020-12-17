<template>
    <div>
      <a-button type="primary" @click="showModal">
        这是学术成果申诉
      </a-button>
      <appeal-achievement :visible="visible" v-on:closeModal="closeModal"></appeal-achievement>
    </div>
</template>
<script>
import appealAchievement from './appealAchievement.vue'
export default {
  components: { appealAchievement },
    data() {
      return {
        visible:false,
        confirmLoading: false,
      };
    },
    methods: {
      showModal() {
        this.visible = true;
        
      },
      closeModal() {
        this.visible = false;
      },
    }
};
</script>
<style scoped>

</style>