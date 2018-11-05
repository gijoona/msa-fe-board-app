<template>
  <div>
    <nav-component></nav-component>
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img rounded="circle" blank width="200" height="200" blank-color="#ccc" alt="img" class="m-1" />
          {{ userInfo.displayName }}
          <b-badge pill variant="danger">{{ userInfo.power_exp }}</b-badge>
          <b-badge pill variant="success">{{ userInfo.stamina_exp }}</b-badge>
          <b-badge pill variant="primary">{{ userInfo.knowledge_exp }}</b-badge>
          <b-badge pill variant="info">{{ userInfo.relation_exp }}</b-badge>
        </b-col>
        <b-col md="6">
          <b-card header="User Information"
                  header-tag="header"
                  title="User Information Title">
            <p class="card-text">
              <b-form>
                <!-- 필수정보 -->
                <b-form-group id="idGroup" horizontal
                              label="ID : "
                              label-for="id"
                              label-class="text-md-left"
                              description="user id input">
                  <b-form-input id="id"
                                type="text"
                                v-model="userInfo.id"
                                required
                                placeholder="Enter ID">
                  </b-form-input>
                </b-form-group>
                <!-- <b-form-group id="pwdGroup"
                              label="Password:"
                              label-for="password"
                              description="user password input">
                  <b-form-input id="password"
                                type="password"
                                v-model="userInfo.password"
                                required
                                placeholder="Enter Password">
                  </b-form-input>
                </b-form-group> -->
                <b-form-group id="nameGroup" horizontal
                              label="DisplayName (or Nickname) : "
                              label-for="displayName"
                              label-class="text-md-left"
                              description="user name input">
                  <b-form-input id="displayName"
                                type="text"
                                v-model="userInfo.displayName"
                                required
                                placeholder="Enter Nickname input">
                  </b-form-input>
                </b-form-group>

                <hr />
                <!-- 선택정보 -->
                <b-form-group id="usernameGroup" horizontal
                              label="Username : "
                              label-for="username"
                              label-class="text-md-left"
                              description="user name input">
                  <b-form-input id="username"
                                type="text"
                                v-model="userInfo.username"
                                placeholder="Enter Username input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="birthGroup" horizontal
                              label="Birthday : "
                              label-for="birthday"
                              label-class="text-md-left"
                              description="user birthday input">
                  <b-form-input id="birthday"
                                type="date"
                                v-model="userInfo.birthday"
                                placeholder="Enter Birthday input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="heightGroup" horizontal
                              label="Height : "
                              label-for="height"
                              label-class="text-md-left"
                              description="user height input">
                  <b-form-input id="height"
                                type="number"
                                v-model="userInfo.height"
                                placeholder="Enter Height input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="weightGroup" horizontal
                              label="Weight : "
                              label-for="weight"
                              label-class="text-md-left"
                              description="user weight input">
                  <b-form-input id="weight"
                                type="number"
                                v-model="userInfo.weight"
                                placeholder="Enter Weight input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="genderGroup" horizontal
                              label="Gender : "
                              label-for="gender"
                              label-class="text-md-left"
                              description="user gender input">
                  <b-form-input id="gender"
                                type="text"
                                v-model="userInfo.gender"
                                placeholder="Enter Gender input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="jobTypeGroup" horizontal
                              label="Job Type : "
                              label-for="jobType"
                              label-class="text-md-left"
                              description="user job type input">
                  <b-form-input id="jobType"
                                type="text"
                                v-model="userInfo.jobType"
                                placeholder="Enter Job Type input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="jobGroup" horizontal
                              label="Job : "
                              label-for="job"
                              label-class="text-md-left"
                              description="user job input">
                  <b-form-input id="job"
                                type="text"
                                v-model="userInfo.job"
                                placeholder="Enter Job input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="emailGroup" horizontal
                              label="Email : "
                              label-for="email"
                              label-class="text-md-left"
                              description="user email input">
                  <b-form-input id="email"
                                type="email"
                                v-model="userInfo.email"
                                placeholder="Enter Email input">
                  </b-form-input>
                </b-form-group>
              </b-form>
            </p>
            <div slot="footer">
              <b-btn size="lg" @click="saveUserInfo()">저장</b-btn>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Nav from '@/components/inc/Nav'

export default {
  name: 'Profile',
  data: function () {
    return {
      userInfo: {
        // username: 'user123',
        // power_exp: 100,
        // stamina_exp: 120,
        // knowledge_exp: 150,
        // relation_exp: 50,
        // birthday: null,
        // height: 0,
        // weight: 0,
        // gender: null,
        // jobType: null,
        // job: '',
        // email: ''
      }
    }
  },
  components: {
    navComponent: Nav
  },
  methods: {
    loadUserInfo: function () {
      this.$http.get('http://localhost:8000/user')
        .then((res) => {
          this.userInfo = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    saveUserInfo: function () {
      this.$http.put('http://localhost:8000/user', this.userInfo, {headers: { 'Content-Type': 'application/json' }})
        .then((res) => {
          if (res.data.errorcode === 0) {
            this.loadUserInfo()
          } else {
            console.error(res.data.errormessage)
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  mounted: function () {
    this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    this.loadUserInfo()
  }
}
</script>
