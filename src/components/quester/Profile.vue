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
              </b-form>
            </p>
            <div slot="footer">
              footer
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Nav from '@/components/inc/Nav'

Vue.use(BootstrapVue)

export default {
  name: 'Profile',
  data: function () {
    return {
      userinfo: {
        username: 'user123',
        power_exp: 100,
        stamina_exp: 120,
        knowledge_exp: 150,
        relation_exp: 50
      }
    }
  },
  components: {
    navComponent: Nav
  }
}
</script>
