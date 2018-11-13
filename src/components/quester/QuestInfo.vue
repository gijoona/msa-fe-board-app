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
                  header="등록 퀘스트유형"
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
              <b-btn size="sm" @click="showModal(null, true)">추가</b-btn>
            </div>
            <b-card v-for="quest in quests" :key="quest._id">
              {{ quest.title }}
              {{ quest.contents }}
              <b-btn size="sm" variant="primary" @click="showModal(quest, false)">수정</b-btn>
              <b-btn size="sm" variant="danger" @click="deleteQuestInfo(quest)">삭제</b-btn>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal id="questInfoModal"
            ref="questInfoModal" size="md"
            title="퀘스트정보" header-bg-variant="info" header-text-variant="light"
            @hidden="hideModal">
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
        <b-form-group id="tagsGroup"
                      label="해시태그"
                      label-for="tags">
          <b-form-input id="tags" v-model="tags"></b-form-input>
          <hash-tag v-for="tag in hashTags" :tag="tag" :key="tag"></hash-tag>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-btn @click.stop="hideModal()">취소</b-btn>
        <b-btn variant="primary" @click.stop="saveQuestInfo()">저장</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import Nav from '@/components/inc/Nav'
import VueHighcharts from 'vue2-highcharts'

// import Exporting from 'highcharts/modules/Exporting.js'
import Treemap from 'highcharts/modules/treemap.js'
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
  data: []
}

Vue.component('hash-tag', {
  props: ['tag'],
  template: '<b-badge pill class="mx-1">{{ tag }}</b-badge>'
})

export default {
  name: 'QuestInfo',
  data: function () {
    return {
      msg: 'quest information view',
      Highcharts: Highcharts,
      userInfo: {},
      quests: [],
      questInfo: { tags: [], isNew: false },
      tags: '',
      // vue2-highcharts 테스트용 설정
      options: {
        chart: {
          height: 150
        },
        title: {
          text: ''
        },
        series: []
      }
    }
  },
  methods: {
    loadChart: function (data) {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      let codeDefine = {
        powerExp: {name: '힘', color: '#DC3545'},
        staminaExp: {name: '체력', color: '#28A745'},
        knowledgeExp: {name: '지능', color: '#007BFF'},
        relationExp: {name: '인맥', color: '#17A2B8'}
      }
      let chartSeriesDatas = []

      for (let key in data) {
        let seriesData = {}
        seriesData.id = key
        seriesData.value = data[key]
        seriesData.name = codeDefine[key].name
        seriesData.color = codeDefine[key].color
        chartSeriesDatas.push(seriesData)
      }
      asyncData.data = chartSeriesDatas

      setTimeout(() => {
        lineCharts.removeSeries()
        lineCharts.addSeries(asyncData)
        lineCharts.hideLoading()
      }, 2000)
    },
    loadQuestList: function () {
      this.$http.get('http://localhost:8000/quest')
        .then((res) => {
          this.quests = res.data.results
          this.loadChart(res.data.chartSeries)
        })
        .catch((e) => {
          console.error(e)
        })
    },
    loadUserInfo: function () {
      this.$http.get('http://localhost:8000/user')
        .then((res) => {
          this.userInfo = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    saveQuestInfo: function () {
      this.questInfo.tags = this.hashTags
      if (this.questInfo.isNew) {
        // New Quest Data
        this.$http.post('http://localhost:8000/quest', this.questInfo, {headers: { 'Content-Type': 'application/json' }})
          .then((res) => {
            if (res.data.errorcode === 0) {
              this.loadQuestList()
              this.hideModal()
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
              this.hideModal()
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
            this.loadQuestList()
          } else {
            console.error(res.data.errormessage)
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    showModal: function (quest, isNew) {
      let questData = quest || { 'isNew': isNew || false }
      this.questInfo = Object.assign({}, this.questInfo, questData)
      this.tags = (questData.tags || []).join(' ').toString()
      // modal show
      this.$refs.questInfoModal.show()
    },
    hideModal: function () {
      this.questInfo = { 'isNew': false }
      // modal hide
      this.$refs.questInfoModal.hide()
    }
  },
  computed: {
    hashTags: function () {
      let hashTags = (this.tags || '').split(' ')
      return hashTags
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
    // this.loadChart()
    this.loadQuestList()
    this.loadUserInfo()
  }
}
</script>
