<template>
  <div>
    <nav-component></nav-component>
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img rounded="circle" blank width="200" height="200" blank-color="#ccc" alt="img" class="m-1" />
          {{ userInfo.displayName }}
          <b-badge pill variant="danger">Lv.{{ userInfo.powerLevel }}</b-badge>
          <b-badge pill variant="success">Lv.{{ userInfo.staminaLevel }}</b-badge>
          <b-badge pill variant="primary">Lv.{{ userInfo.knowledgeLevel }}</b-badge>
          <b-badge pill variant="info">Lv.{{ userInfo.relationLevel }}</b-badge>
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
              <b-btn size="sm" @click="showQuestModal(quest)">완료</b-btn>
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
              <b-btn size="sm">상세</b-btn>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="questInfoModal"
            ref="questInfoModal"
            title="퀘스트 정보"
            header-bg-variant="info"
            header-text-variant="light">
      <b-form>
        <b-form-group id="questTitleGroup"
                      label="제목"
                      label-for="questTitle">
          <b-form-input id="questTitle" v-model="questInfo.title"></b-form-input>
        </b-form-group>
        <b-form-group id="questContentsGroup"
                      label="퀘스트내용"
                      label-for="questContents">
          <b-form-textarea id="questContents"
                          v-model="questInfo.contents"
                          :rows="3" :max-rows="6">
          </b-form-textarea>
        </b-form-group>
        <b-form-group id="powerExpGroup" horizontal
                      label="힘"
                      label-for="powerExp">
          <b-form-input id="powerExp" v-model="questInfo.powerExp" type="number"></b-form-input>
        </b-form-group>
        <b-form-group id="staminaExpGroup" horizontal
                      label="체력"
                      label-for="staminaExp">
          <b-form-input id="staminaExp" v-model="questInfo.staminaExp" type="number"></b-form-input>
        </b-form-group>
        <b-form-group id="knowledgeExpGroup" horizontal
                      label="지능"
                      label-for="knowledgeExp">
          <b-form-input id="knowledgeExp" v-model="questInfo.knowledgeExp" type="number"></b-form-input>
        </b-form-group>
        <b-form-group id="relationExpGroup" horizontal
                      label="인맥"
                      label-for="relationExp">
          <b-form-input id="relationExp" v-model="questInfo.relationExp" type="number"></b-form-input>
        </b-form-group>
        <!-- <b-form-group id="tagsGroup"
                      label="해시태그"
                      label-for="tags">
          <b-form-input id="tags" v-model="tags"></b-form-input>
          <hash-tag v-for="tag in hashTags" :tag="tag" :key="tag"></hash-tag>
        </b-form-group> -->
      </b-form>
      <div slot="modal-footer">
        <b-btn>취소</b-btn>
        <b-btn variant="primary" @click.stop="completeQuest">완료</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Nav from '@/components/inc/Nav'

export default {
  name: 'Main',
  data: function () {
    return {
      userInfo: {
        quests: []
      },
      questInfo: { tags: [], isNew: false },
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
          this.quests.complete = res.data.quests.complete
          this.quests.process = res.data.quests.process
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getQuestList: function () {
      this.$http.get('http://localhost:8000/quest')
        .then((res) => {
          this.quests.regist = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    receiptQuest: function (quest) {
      // quest.state = 'process'
      quest.questId = quest['_id']
      quest.userId = this.userInfo['_id']
      quest.inputDt = Date.now()
      delete quest['_id']

      let data = {
        userInfo: this.userInfo,
        questInfo: quest
      }
      this.$http.put('http://localhost:8000/user', data, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
          this.getUser()
          this.getQuestList()
        })
        .catch((e) => {
          console.error(e)
        })
    },
    completeQuest: function () {
      // 사용자 스테이터스정보 처리
      let data = {
        userInfo: this.userInfo,
        questInfo: this.questInfo
      }
      data.userInfo.powerExp += this.calcExp(data.questInfo.powerExp, data.userInfo.powerMaxExp)
      data.userInfo.staminaExp += this.calcExp(data.questInfo.staminaExp, data.userInfo.staminaMaxExp)
      data.userInfo.knowledgeExp += this.calcExp(data.questInfo.knowledgeExp, data.userInfo.knowledgeMaxExp)
      data.userInfo.relationExp += this.calcExp(data.questInfo.relationExp, data.userInfo.relationMaxExp)
      data.userInfo.point += data.questInfo.point || 0

      // questInfo에 있는 데이터를 처리. 퀘스트정보 처리
      data.questInfo.state = 'complete'
      // for (let idx in userInfo.quests) {
      //   if (userInfo.quests[idx]['_id'] === this.questInfo['_id']) {
      //     userInfo.quests[idx] = this.questInfo
      //     break
      //   }
      // }
      this.$http.put('http://localhost:8000/user', data, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
          this.getUser()
          this.getQuestList()
        })
        .catch((e) => {
          console.error(e)
        })
      this.hideQuestModal()
    },
    showQuestModal: function (quest) {
      this.questInfo = quest
      this.$refs.questInfoModal.show()
    },
    hideQuestModal: function () {
      this.$refs.questInfoModal.hide()
    },
    uuidgen: function () {
      function s4 () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    calcExp: function (currExp, maxExp) {
      let exp = currExp > maxExp ? maxExp : currExp
      return exp
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
