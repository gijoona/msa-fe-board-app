<template>
  <div>
    <div>
      <router-link :to="{ name: 'IssueEdit', params: {} }">
        <b-btn size="sm">New</b-btn>
      </router-link>
    </div>
    <b-list-group>
      <b-list-group-item v-for="issue in issues" :key="issue._id" @click="onEdit(issue)" button>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ issue.title }}</h5>
          <small>{{ issue.inputDt }}</small>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
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
