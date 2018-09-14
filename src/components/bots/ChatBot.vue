<template>
  <b-container @click='chatting'>
    <b-form-textarea
      v-model='msg'
      :max-rows="6"
    ></b-form-textarea>
  </b-container>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'ChatBot',
  data: function () {
    return {
      msg: 'chat bot!!'
    }
  },
  methods: {
    sendMsg: function () {
      this.msg += '메시지\r\n'
    },
    receiveMsg: function () {
      this.msg += '답장\r\n'
    },
    chatting: function () {
      this.sendMsg()
      this.receiveMsg()
    }
  }
}
</script>
