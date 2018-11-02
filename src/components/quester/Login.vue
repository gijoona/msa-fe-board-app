<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="p-5">
          <b-img rounded="circle" blank width="300" height="300" blank-color="#ccc" alt="img" class="m-1" />
        </b-col>
      </b-row>
      <b-row>
        <b-col offset="3" cols="6">
          <b-jumbotron>
            <b-form @submit="onSubmit">
              <b-container>
                <b-row>
                  <b-col cols="9">
                    <b-form-input type="text" v-model.trim="login.username" placeholder="Enter Username"></b-form-input>
                    <b-form-input type="password" v-model.trim="login.password" placeholder="Enter Password"></b-form-input>
                  </b-col>
                  <b-col cols="3">
                    <b-button :block="true" class="p-4" type="submit" variant="primary">Login</b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-form>

            <hr class="my-4" />

            <b-container>
              <b-row>
                <b-col>
                  <b-button-toolbar>
                    <b-button-group class="mx-1">
                      <!-- <b-btn @click.stop="register()">회원가입</b-btn> -->
                      <b-btn v-b-modal.registModal>회원가입</b-btn>
                    </b-button-group>
                    <!-- <b-button-group class="mx-1">
                    <b-btn :href="url + '/auth/kakao'">카카오</b-btn>
                    <b-btn :href="url + '/auth/facebook'">페이스북</b-btn>
                    <b-btn :href="url + '/auth/naver'">네이버</b-btn>
                  </b-button-group> -->
                  </b-button-toolbar>
                </b-col>
              </b-row>
            </b-container>
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="registModal"
            ref="modal" size="md"
            title="회원가입" header-bg-variant="info" header-text-variant="light">
      <b-form>
        <b-form-group id="joinUsernameGroup" horizontal
                      description="Enter user name"
                      label="Username : "
                      label-for="joinUsername"
                      label-class="text-md-left">
          <b-form-input id="joinUsername" v-model.trim="join.username" placeholder="Enter Username"></b-form-input>
        </b-form-group>
        <b-form-group id="joinPwdGroup" horizontal
                      label="Password : "
                      label-for="joinPwd"
                      label-class="text-md-left"
                      :invalid-feedback="invalidPassword"
                      :valid-feedback="validPassword"
                      :state="checkPwdState">
          <b-form-input type="password" id="joinPwd" v-model.trim="join.password" placeholder="Enter Password"></b-form-input>
        </b-form-group>
        <b-form-group id="pwdComfirmGroup" horizontal
                      label-for="pwdComfirm"
                      :invalid-feedback="invalidComfirm"
                      :valid-feedback="validComfirm"
                      :state="checkComfirmState">
          <b-form-input type="password" id="pwdComfirm" v-model.trim="join.comfirm" placeholder="Comfirm"></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-btn variant="secondary">취소</b-btn>
        <b-btn @click.stop="onRegist()" variant="primary">가입</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
// TODO :: 로그인기능 및 타사인증 기능 개발
export default {
  name: 'Login',
  data: function () {
    return {
      url: 'http://localhost:9070',
      login: { provider: 'local' },
      join: { provider: 'local' },
      errors: []
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      this.$http.post(`${this.url}/auth/login`, this.login)
        .then(res => {
          localStorage.setItem('jwtToken', res.data.token)
          this.$router.push({
            name: 'Main'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
    onRegist: function () {
      this.$http.post(`${this.url}/auth/register`, this.join)
        .then(res => {
          localStorage.setItem('jwtToken', res.data.token)
          this.$router.push({
            name: 'Profile'
          })
        })
        .catch(e => {
          console.log(e)
          this.error.push(e)
        })
    }
    // login: function () {
    //   this.$http.post(this.url + '/auth/local', {
    //     username: this.form.username,
    //     password: this.form.password
    //   }).then((res) => {
    //     console.log('passport LocalStrategy')
    //   })
    // }
  },
  computed: {
    checkPwdState: function () {
      return !!this.join.password
    },
    invalidPassword: function () {
      if (this.join.password > 0) {
        return ''
      } else {
        return 'Plase Enter Password'
      }
    },
    validPassword: function () {
      return ''
    },
    checkComfirmState: function () {
      return this.join.comfirm ? this.join.password === this.join.comfirm : false
    },
    invalidComfirm: function () {
      if (this.join.comfirm === this.join.password) {
        return ''
      } else {
        return 'Not Match!!!'
      }
    },
    validComfirm: function () {
      return 'OK!!!'
    }
  }
}
</script>
