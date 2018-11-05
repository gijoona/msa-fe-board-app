<template>
  <div>
    <nav-component></nav-component>
    <b-container>
      <b-row>
        <b-col md="6">
          <b-img rounded="circle" blank width="200" height="200" blank-color="#ccc" alt="img" class="m-1" />
          {{ userInfo.username }}
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
          <b-card class="mb-3"
                  header="퀘스트목록"
                  header-tag="header">
            <b-card>퀘스트내용</b-card>
            <b-card>퀘스트내용</b-card>
            <b-card>퀘스트내용</b-card>
            <b-card>퀘스트내용</b-card>
            <b-card>퀘스트내용</b-card>
            <b-card>퀘스트내용</b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
      // vue2-highcharts 테스트용 설정
      options: {
        title: {
          text: 'Monthly Average Temperature'
        },
        series: []
      }
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
          this.quests = res.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    loadUserInfo: function () {
      this.$http.get('http://localhost:8000/user')
        .then((res) => {
          console.log(res)
          this.userInfo = res.results
        })
        .catch((e) => {
          console.error(e)
        })
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
