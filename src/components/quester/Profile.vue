<template>
  <div>
    <nav-component></nav-component>
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img rounded="circle" blank width="200" height="200" blank-color="#ccc" alt="img" class="m-1" />
          {{ userinfo.username }}
          <b-badge pill variant="danger">{{ userinfo.power_exp }}</b-badge>
          <b-badge pill variant="success">{{ userinfo.stamina_exp }}</b-badge>
          <b-badge pill variant="primary">{{ userinfo.knowledge_exp }}</b-badge>
          <b-badge pill variant="info">{{ userinfo.relation_exp }}</b-badge>
        </b-col>
        <b-col md="6">
          <b-card header="User Information"
                  header-tag="header"
                  title="User Information Title">
            <p class="card-text">
              <b-form>
                <!-- 필수정보 -->
                <b-form-group id="idGroup"
                              label="ID:"
                              label-for="id"
                              description="user id input">
                  <b-form-input id="id"
                                type="text"
                                v-model="userinfo.id"
                                required
                                placeholder="Enter ID">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="pwdGroup"
                              label="Password:"
                              label-for="password"
                              description="user password input">
                  <b-form-input id="password"
                                type="password"
                                v-model="userinfo.password"
                                required
                                placeholder="Enter Password">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="comfirmGroup"
                              label="Comfirm:"
                              label-for="Comfirm"
                              description="user password comfirm input">
                  <b-form-input id="comfirm"
                                type="password"
                                v-model="userinfo.comfirm"
                                required
                                placeholder="Enter Password Validate">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="nameGroup"
                              label="Username(or Nickname):"
                              label-for="username"
                              description="user name input">
                  <b-form-input id="username"
                                type="text"
                                v-model="userinfo.username"
                                required
                                placeholder="Enter Username input">
                  </b-form-input>
                </b-form-group>

                <hr />
                <!-- 선택정보 -->
                <b-form-group id="birthGroup"
                              label="Birthday:"
                              label-for="birthday"
                              description="user birthday input">
                  <b-form-input id="birthday"
                                type="date"
                                v-model="userinfo.birthday"
                                placeholder="Enter Birthday input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="heightGroup"
                              label="Height:"
                              label-for="height"
                              description="user height input">
                  <b-form-input id="height"
                                type="number"
                                v-model="userinfo.height"
                                placeholder="Enter Height input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="weightGroup"
                              label="Weight:"
                              label-for="weight"
                              description="user weight input">
                  <b-form-input id="weight"
                                type="number"
                                v-model="userinfo.weight"
                                placeholder="Enter Weight input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="genderGroup"
                              label="Gender:"
                              label-for="gender"
                              description="user gender input">
                  <b-form-input id="gender"
                                type="text"
                                v-model="userinfo.gender"
                                placeholder="Enter Gender input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="jobTypeGroup"
                              label="Job Type:"
                              label-for="jobType"
                              description="user job type input">
                  <b-form-input id="jobType"
                                type="text"
                                v-model="userinfo.jobType"
                                placeholder="Enter Job Type input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="jobGroup"
                              label="Job:"
                              label-for="job"
                              description="user job input">
                  <b-form-input id="job"
                                type="text"
                                v-model="userinfo.job"
                                placeholder="Enter Job input">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="emailGroup"
                              label="Email:"
                              label-for="email"
                              description="user email input">
                  <b-form-input id="email"
                                type="email"
                                v-model="userinfo.email"
                                placeholder="Enter Email input">
                  </b-form-input>
                </b-form-group>
              </b-form>
            </p>
            <div slot="footer">
              <b-btn size="lg">저장</b-btn>
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
      userinfo: {
        username: 'user123',
        power_exp: 100,
        stamina_exp: 120,
        knowledge_exp: 150,
        relation_exp: 50,
        birthday: null,
        height: 0,
        weight: 0,
        gender: null,
        jobType: null,
        job: '',
        email: ''
      }
    }
  },
  components: {
    navComponent: Nav
  }
}
</script>
