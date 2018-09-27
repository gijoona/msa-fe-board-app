<template>
  <b-container>
    <b-card>
      <b-form>
        <b-form-input type="text" v-model="form.id" placeholder="Enter User Id"></b-form-input>
        <b-form-input type="password" v-model="form.passwd" placeholder="Enter User Password"></b-form-input>
      </b-form>
      <b-button-group>
        <b-button href="http://localhost:9070/auth/kakao">카카오</b-button>
        <b-button href="http://localhost:9070/auth/facebook">페이스북</b-button>
        <b-button href="http://localhost:9070/auth/naver">네이버</b-button>
      </b-button-group>
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
  },
  methods: {
  }
}
</script>
