<template>
  <div>
    <nav-component></nav-component>
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img rounded="circle" blank width="200" height="200" blank-color="#ccc" alt="img" class="m-1" />
          {{ userInfo.displayName }}
          <b-badge pill variant="danger">{{ userInfo.powerExp }}</b-badge>
          <b-badge pill variant="success">{{ userInfo.staminaExp }}</b-badge>
          <b-badge pill variant="primary">{{ userInfo.knowledgeExp }}</b-badge>
          <b-badge pill variant="info">{{ userInfo.relationExp }}</b-badge>
        </b-col>
        <b-col md="6">
          <b-card class="mb-3">
            <div slot="header">
              수령가능 퀘스트
              <b-link href="/quest" class="btn btn-secondary">리스트</b-link>
            </div>
            <b-card v-for="quest in quests.regist" :key="quest['_id']">
              {{ quest.title }}
              <b-btn size="sm" variant="primary" @click="receiptQuest(quest)">수령</b-btn>
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
            <b-card v-for="quest in quests.process" :key="quest['_id']">
              {{ quest.title }}
            </b-card>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card class="mb-3">
            <div slot="header">
              완료 퀘스트
              <b-link href="/quest" class="btn btn-secondary">리스트</b-link>
            </div>
            <b-card v-for="quest in quests.complete" :key="quest['_id']">
              {{ quest.title }}
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Nav from '@/components/inc/Nav'

export default {
  name: 'Main',
  data: function () {
    return {
      userInfo: {},
      quests: {
        regist: [],
        process: [],
        complete: []
      }
    }
  },
  methods: {
    getUser: function () {
      this.$http.get('http://localhost:8000/user')
        .then((res) => {
          this.userInfo = res.data.results
          this.quests.complete = res.data.quests.complate
          this.quests.process = res.data.quests.process
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getQuestList: function () {
      this.$http.get('http://localhost:8000/quest')
        .then((res) => {
          console.log(res.data.results)
          this.quests.regist = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    receiptQuest: function (quest) {
      let userInfo = this.userInfo
      quest.state = 'process'
      userInfo.quests.push(quest)
      this.$http.put('http://localhost:8000/user', userInfo, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  components: {
    navComponent: Nav
  },
  created: function () {
    let jwtToken = localStorage.getItem('jwtToken')
    this.$http.defaults.headers.common['Authorization'] = jwtToken || ''
    this.getUser()
    this.getQuestList()
  }
}
</script>
