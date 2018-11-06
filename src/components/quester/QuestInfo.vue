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
          <b-card class="mb-3"
                  header="퀘스트유형"
                  header-tag="header">
            <p>
              <vue-highcharts :highcharts="Highcharts" :options="options" ref="lineCharts"></vue-highcharts>
            </p>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-card class="mb-3">
            <div slot="header">
              퀘스트목록
              <b-btn size="sm" @click="toggleModal(null, true)">추가</b-btn>
            </div>
            <b-card v-for="quest in quests" :key="quest._id">
              {{ quest.title }}
              {{ quest.contents }}
              <b-btn size="sm" variant="primary" @click="toggleModal(quest, false)">수정</b-btn>
              <b-btn size="sm" variant="danger" @click="deleteQuestInfo(quest)">삭제</b-btn>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="questInfoModal"
            ref="questInfoModal" size="md"
            title="퀘스트정보" header-bg-variant="info" header-text-variant="light">
      <b-form>
        <b-form-group id="questTitleGroup"
                      label="Title"
                      label-for="questTitle">
          <b-form-input id="questTitle" v-model="questInfo.title"></b-form-input>
        </b-form-group>
        <b-form-group id="questContentsGroup"
                      label="Contents"
                      label-for="questContents">
          <b-form-textarea id="questContents"
                          v-model="questInfo.contents"
                          :rows="3" :max-rows="6">
          </b-form-textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-btn @click.stop="toggleModal()">취소</b-btn>
        <b-btn variant="primary" @click.stop="saveQuestInfo()">저장</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Nav from '@/components/inc/Nav'
import VueHighcharts from 'vue2-highcharts'

// import Exporting from 'highcharts/modules/Exporting.js'
import Treemap from 'highcharts/modules/Treemap.js'
import Highcharts from 'highcharts'
// Load Treemap module
Treemap(Highcharts)
// Load Exporting module
// Exporting(Highcharts)

// vue2-highcharts 테스트용 데이터
const asyncData = {
  type: 'treemap',
  layoutAlgorithm: 'stripes',
  alternateStartingDirection: true,
  levels: [{
    level: 1,
    layoutAlgorithm: 'sliceAndDice',
    dataLabels: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      style: {
        fontSize: '15px',
        fontWeight: 'bold'
      }
    }
  }],
  data: [{
    id: 'A',
    name: '힘',
    color: '#EC2500',
    value: 10
  }, {
    id: 'B',
    name: '체력',
    color: '#ECE100',
    value: 15
  }, {
    id: 'O',
    name: '지능',
    color: '#EC9800',
    value: 8
  }, {
    name: '인맥',
    color: '#9EDE00',
    value: 2
  }]
}

export default {
  name: 'QuestInfo',
  data: function () {
    return {
      msg: 'quest information view',
      Highcharts: Highcharts,
      userInfo: {
        // username: 'user123',
        // power_exp: 100,
        // stamina_exp: 120,
        // knowledge_exp: 150,
        // relation_exp: 50
      },
      quests: [],
      questInfo: { isNew: false },
      // vue2-highcharts 테스트용 설정
      options: {
        title: {
          text: 'Monthly Average Temperature'
        },
        series: []
      },
      isShowModal: false
    }
  },
  methods: {
    loadChart: function () {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      setTimeout(() => {
        lineCharts.addSeries(asyncData)
        lineCharts.hideLoading()
      }, 2000)
    },
    loadQuestList: function () {
      this.$http.get('http://localhost:8000/quest')
        .then((res) => {
          console.log(res)
          this.quests = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    loadUserInfo: function () {
      this.$http.get('http://localhost:8000/user')
        .then((res) => {
          console.log(res)
          this.userInfo = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    saveQuestInfo: function () {
      if (this.questInfo.isNew) {
        // New Quest Data
        this.$http.post('http://localhost:8000/quest', this.questInfo, {headers: { 'Content-Type': 'application/json' }})
          .then((res) => {
            if (res.data.errorcode === 0) {
              this.loadQuestList()
            } else {
              console.log(res.data.errormessage)
            }
          })
          .catch((e) => {
            console.error(e)
          })
      } else {
        // Modify Quest Data
        this.$http.put('http://localhost:8000/quest', this.questInfo, {headers: { 'Content-Type': 'application/json' }})
          .then((res) => {
            if (res.data.errorcode === 0) {
              this.loadQuestList()
            } else {
              console.error(res.data.errormessage)
            }
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
    deleteQuestInfo: function (quest) {
      this.$http.delete('http://localhost:8000/quest?id=' + quest['_id'])
        .then((res) => {
          if (res.data.errorcode === 0) {
            this.loadQuestList();
          } else {
            console.error(res.data.errormessage)
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    toggleModal: function (quest, isNew) {
      let questData = quest || { 'isNew': isNew || false }
      this.questInfo = Object.assign({}, this.questInfo, questData)
      // modal show & hide
      this.isShowModal = !this.isShowModal
      if (this.isShowModal) {
        this.$refs.questInfoModal.show()
      } else {
        this.$refs.questInfoModal.hide()
      }
    }
  },
  components: {
    navComponent: Nav,
    vueHighcharts: VueHighcharts
  },
  created: function () {
    let jwtToken = localStorage.getItem('jwtToken')
    this.$http.defaults.headers.common['Authorization'] = jwtToken || ''
  },
  mounted: function () {
    this.loadChart()
    this.loadQuestList()
    this.loadUserInfo()
  }
}
</script>
