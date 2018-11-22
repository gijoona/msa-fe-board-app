<template>
  <div>
    <nav-comp @search="onSearch"></nav-comp>
    <div class="my-3">
      <item-list :list="issues" @view="onView"></item-list>
      <!-- <item-list :list="issues" @edit="onEdit"></item-list> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from '@/components/issue/comp/Nav'

Vue.component('item-list', {
  props: ['list'],
  template: `    <b-list-group>
        <b-list-group-item v-for="item in list" :key="item._id" @click="selectedItem(item)" button>
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">{{ item.title }}</h6>
            <small>{{ item.inputDt }}</small>
          </div>
        </b-list-group-item>
      </b-list-group>`,
  methods: {
    selectedItem: function (item) {
      this.$emit('view', item)
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
    },
    onView: function (issue) {
      this.$router.push({name: 'IssueView', params: {id: issue.seq}})
    },
    onSearch: function (searchTxt) {
      this.$http.get('/api/issue/list?search=' + searchTxt)
        .then((res) => {
          this.issues = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  created: function () {
    if (this.$route.params.searchTxt) {
      this.onSearch(this.$route.params.searchTxt)
    } else {
      this.loadIssueList()
    }
  },
  components: {
    navComp: Nav
  }
}
</script>
