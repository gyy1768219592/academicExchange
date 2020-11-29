<template>
    <div>
        <Nav></Nav>
        <JwChat :taleList="list" scrollType="norell" :config="config" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool" style="width: 1000px ! important;" >
        </JwChat>
    </div>
</template>

<script>
import Nav from '../../components/nav.vue';
export default {
  data () {
    return {
      inputMsg: '',
      list: [
        {
          "date": "2020/04/25 21:19:07",
          "text": { "text": "1223231" },
          "mine": false,
          "name": "聊天者1",
          "img": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        },
        {
          "date": "2020/04/16 21:19:07",
          "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
          "mine": true,
          "name": "回复者1",
          "img": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        },

      ],
      tool: {
        show: ['file', 'img'],
        callback: this.toolEvent,
        showEmoji: true,
      },
    }
  },
  components: {
      Nav,
  },
  methods: {
    bindEnter () {
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": "2020/05/20 23:19:07",
        "text": { "text": msg },
        "mine": true,
        "name": "JwChat",
        "img": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      }
      this.list.push(msgObj)
    },
    toolEvent (type) {
      console.log('tools', type)
    },
  }
}
</script>
<style scoped>
.chatPage {
    width: 1000px ! important;
    float: right;
    margin: 1%;
}

div.wrapper {
  width: 1000px ! important;
}
</style>