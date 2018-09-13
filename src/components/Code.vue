<template>
  <b-container>
    <b-row>
      <b-button-toolbar key-nav>
        <b-button-group class="mx-1">
          <b-button @click="addRow">행추가</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button @click="getList">조회</b-button>
          <b-button @click="doSave">저장</b-button>
          <b-button @click="doUpdate">수정</b-button>
        </b-button-group>
      </b-button-toolbar>
    </b-row>
    <b-row>
      <b-table striped bordered outlined hover :items="items" :fields="fields" show-empty>
        <template slot="code" slot-scope="row">
          <div v-if="row.item.isEdit">
            <b-form-input v-model="row.item.code" type="text"></b-form-input>
          </div>
          <div v-else>
            {{ row.item.code }}
          </div>
        </template>
        <template slot="category" slot-scope="row">
          <div v-if="row.item.isEdit">
            <b-form-input v-model="row.item.category" type="text"></b-form-input>
          </div>
          <div v-else>
            {{ row.item.category }}
          </div>
        </template>
        <template slot="name" slot-scope="row">
          <div v-if="row.item.isEdit">
            <b-form-input v-model="row.item.name" type="text"></b-form-input>
          </div>
          <div v-else>
            {{ row.item.name }}
          </div>
        </template>
        <template slot="description" slot-scope="row">
          <div v-if="row.item.isEdit">
            <b-form-textarea v-model="row.item.description" :max-rows="6"></b-form-textarea>
          </div>
          <div v-else>
            {{ row.item.description }}
          </div>
        </template>
        <template slot="useyn" slot-scope="row">
          <div v-if="row.item.isEdit">
            <b-form-checkbox name="useyn" v-model="row.item.useyn" value="1" unchecked-value="0">{{ row.item.useyn == "1" ? 'true' : 'false' }}</b-form-checkbox>
          </div>
          <div v-else>
            {{ row.item.useyn == "1" ? 'true' : 'false' }}
          </div>
        </template>
        <template slot="isEdit" slot-scope="row">
          <b-button name="btnEdit" @click="editRow(row)" size="sm">{{ row.item.isEdit ? 'Done' : 'Edit' }}</b-button>
          <b-button name="btnDelete" @click="delRow(row)" size="sm" variant="danger">Delete</b-button>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'Code',
  data: function () {
    return {
      fields: [
        { key: 'dataSetState', label: '' },
        { key: 'code', label: 'Code' },
        { key: 'category', label: 'Category' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'useyn', label: 'Use_YN' },
        { key: 'isEdit', label: '' }
      ],
      items: [],
      ds: {dataList: []}
    }
  },
  methods: {
    addRow: function () {
      let tmpId = 0
      let jsonObj = {'id': tmpId, 'code': '', 'category': '', 'name': '', 'description': '', 'useyn': 1}
      let item = Object.assign({'isEdit': true, 'dataSetState': 'C'}, jsonObj)

      Object.assign(this.ds, {0: item})
      this.ds.dataList.push(item)
      console.log(this.ds)
    },
    editRow: function (row) {
      let item = row.item
      item.isEdit = !row.value
      if (item.dataSetState !== 'C') {
        item.dataSetState = 'U'
      }
    },
    delRow: function (row) {
      let item = row.item
      if (item.dataSetState !== 'C') {
        item.dataSetState = 'D'

        // TODO :: HTTP DELETE method는 body를 통해 데이터를 전달할 수 없음. 단건 삭제형식으로 기능 변경
        this.doDelete()
      } else {
        let delIdx = this.ds.dataList.findIndex((el, idx, arr) => {
          if (el === item) {
            return idx
          }
        })
        this.ds.dataList.splice(delIdx, 1)
        delete this.ds[item.id]
      }
    },
    getList: function () {
      this.$http.get('http://35.200.103.250:8000/code').then((res) => {
        if (res.data.results) {
          this.ds = dataSet(this.ds, res.data.results)
        } else {
          this.ds.dataList = []
        }
        this.items = this.ds.dataList
      })
    },
    doSave: function () {
      let savedList = this.ds.dataList.filter(item => item.dataSetState === 'C')
      this.$http.post('http://35.200.103.250:8000/code', savedList, {headers: { 'Content-Type': 'application/json' }}).then((res) => {
        if (res.errorcode === 1) {
          console.log(res)
        } else {
          this.getList()
        }
      })
    },
    doUpdate: function () {
      let updatedList = this.ds.dataList.filter(item => item.dataSetState === 'U')
      this.$http.put('http://35.200.103.250:8000/code', updatedList, {headers: { 'Content-Type': 'application/json' }}).then((res) => {
        if (res.errorcode === 1) {
          console.log(res)
        } else {
          this.getList()
        }
      })
    },
    doDelete: function () {
      let deletedList = this.ds.dataList.filter(item => item.dataSetState === 'D')
      console.log(deletedList[0].id)
      // TODO :: axios.delete에서 data 전송이 안됨. 확인 및 방안 필요.
      // this.$http.delete('http://35.200.103.250:8000/code', deletedList, {headers: { 'Content-Type': 'application/json' }}).then((res) => {
      this.$http.delete('http://35.200.103.250:8000/code?id=' + deletedList[0].id).then((res) => {
        if (res.errorcode === 1) {
          console.log(res)
        } else {
          this.getList()
        }
      })
    }
  },
  created: function () {
    this.getList()
  }
}

function dataSet (dataSet, dataList) {
  for (let data of dataList) {
    // data에 dataSetState가 존재하지 않을 경우
    if (!data.dataSetState) {
      Object.assign(data, {'isEdit': false, 'dataSetState': 'R'})
    }
    dataSet[data.id] = data
  }
  dataSet['dataList'] = dataList

  let ds = Object.assign({}, dataSet)
  return ds
}
</script>
