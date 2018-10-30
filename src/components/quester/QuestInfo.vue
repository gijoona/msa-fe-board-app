<template>
  <div>
    <nav-component></nav-component>
    {{ msg }}
  </div>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Nav from '@/components/inc/Nav'

Vue.use(BootstrapVue)

export default {
  name: 'QuestInfo',
  data: function () {
    return {
      msg: 'quest information view'
    }
  },
  components: {
    navComponent: Nav
  }
}
</script>
