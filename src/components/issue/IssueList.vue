<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" id="navigation_bar">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/main">A Quester</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-button-group class="mr-sm-2">
              <router-link :to="{ name: 'IssueEdit', params: {} }">
                <b-btn size="sm">New</b-btn>
              </router-link>
            </b-button-group>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <item-list :list="issues" @view="onView"></item-list>
    <!-- <item-list :list="issues" @edit="onEdit"></item-list> -->
  </div>
</template>

<script>
import Vue from 'vue'

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
    }
  },
  created: function () {
    this.loadIssueList()
  }
}
</script>
