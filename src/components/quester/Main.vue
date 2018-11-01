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
          <b-card class="mb-3">
            <div slot="header">
              수령가능 퀘스트
              <b-link href="/quest" class="btn btn-secondary">리스트</b-link>
            </div>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card class="mb-3">
            <div slot="header">
              진행 퀘스트
              <b-btn>메뉴</b-btn>
            </div>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card class="mb-3">
            <div slot="header">
              완료 퀘스트
              <b-link href="/quest" class="btn btn-secondary">리스트</b-link>
            </div>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
            <b-card>
              퀘스트항목
            </b-card>
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
  name: 'Main',
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
  methods: {
    getUser: function () {
      this.$http.get('http://localhost:8000/user').then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    navComponent: Nav
  },
  created: function () {
    this.getUser()
  }
}
</script>
