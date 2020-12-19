<template>
    <div>
      <a-button type="primary" @click="showModal">
        申诉
      </a-button>
      <appeal-achievement :visible="visible" v-on:closeModal="closeModal" :type='type' :achievement_id="47"></appeal-achievement>
    </div>
</template>
<script>
import appealAchievement from './appealAchievement.vue'
export default {
  components: { appealAchievement },
    data() {
      return {
        visible:false,
        type: 'paper',
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