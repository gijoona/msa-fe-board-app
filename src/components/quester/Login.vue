<template>
  <b-container>
    <b-row>
      <b-col class="p-5">
        <b-img rounded="circle" blank width="300" height="300" blank-color="#ccc" alt="img" class="m-1" />
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="3" cols="6">
        <b-jumbotron>
          <b-container>
            <b-row>
              <b-col cols="9">
                <b-form-input type="text" v-model="form.username" placeholder="Enter Username"></b-form-input>
                <b-form-input type="password" v-model="form.password" placeholder="Enter Password"></b-form-input>
              </b-col>
              <b-col cols="3">
                <b-button :block="true" class="p-4" @click="login">Login</b-button>
              </b-col>
            </b-row>
          </b-container>

          <hr class="my-4" />

          <b-container>
            <b-row>
              <b-col>
                <b-button-toolbar>
                  <b-button-group class="mx-1">
                    <b-btn :href="url + '/auth/join'">회원가입</b-btn>
                  </b-button-group>
                  <b-button-group class="mx-1">
                    <b-btn :href="url + '/auth/kakao'">카카오</b-btn>
                    <b-btn :href="url + '/auth/facebook'">페이스북</b-btn>
                    <b-btn :href="url + '/auth/naver'">네이버</b-btn>
                  </b-button-group>
                </b-button-toolbar>
              </b-col>
            </b-row>
          </b-container>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// TODO :: 로그인기능 및 타사인증 기능 개발
export default {
  name: 'Login',
  data: function () {
    return {
      msg: 'login!!',
      url: 'http://localhost:9070',
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      this.$http.post(this.url + '/auth/local', {
        username: this.form.username,
        password: this.form.password
      }).then((res) => {
        console.log('passport LocalStrategy')
      })
    }
  }
}
</script>
