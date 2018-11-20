<template>
  <div>
    <div>
      <router-link :to="{ name: 'IssueEdit', params: {} }">
        <b-btn size="sm">New</b-btn>
      </router-link>
    </div>
    <item-list :list="issues" @edit="onEdit"></item-list>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('item-list', {
  props: ['list'],
  template: `    <b-list-group>
        <b-list-group-item v-for="item in list" :key="item._id" @click="selectedItem(item)" button>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ item.title }}</h5>
            <small>{{ item.inputDt }}</small>
          </div>
        </b-list-group-item>
      </b-list-group>`,
  methods: {
    selectedItem: function (item) {
      this.$emit('edit', item)
    }
  }
})

export default {
  name: 'IssueList',
  data: function () {
    return {
      msg: 'issue page',
      issues: []
    }
  },
  methods: {
    loadIssueList: function () {
      this.$http.get('/api/issue/list')
        .then((res) => {
          this.issues = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onEdit: function (issue) {
      this.$router.push({name: 'IssueEdit', params: {id: issue.seq}})
    }
  },
  created: function () {
    this.loadIssueList()
  }
}
</script>
