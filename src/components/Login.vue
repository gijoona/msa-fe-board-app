<template>
  <b-container>
    <b-card>
      <b-form>
        <b-form-input type="text" v-model="form.id" placeholder="Enter User Id"></b-form-input>
        <b-form-input type="password" v-model="form.passwd" placeholder="Enter User Password"></b-form-input>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

// TODO :: 로그인기능 및 타사인증 기능 개발
export default {
  name: 'Login',
  data: function () {
    return {
      msg: 'login!!',
      form: {
        id: '',
        passwd: ''
      }
    }
  }
}
</script>
