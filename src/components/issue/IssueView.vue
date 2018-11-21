<template>
  <div>
    <div>
      <router-link :to="{ name: 'IssueList', params: {} }">
        <b-btn size="sm">List</b-btn>
      </router-link>
      <router-link :to="{ name: 'IssueEdit', params: {id: this.$route.params.id} }">
        <b-btn size="sm" variant="primary">Edit</b-btn>
      </router-link>
    </div>
    <b-card class="text-left"
            header-bg-variant="info"
            header-text-variant="light">
      <h4 slot="header">
        {{ issueData.title }}
      </h4>
      <b-card title="Contents" class="mb-2">
        <div v-html="contentsToHtml"></div>
      </b-card>
      <b-card title="Solutions" class="mb-2">
        <div v-html="solutionsToHtml"></div>
      </b-card>
      <div slot="footer">
        {{ issueData.tags }}
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'IssueEdit',
  data: function () {
    return {
      msg: 'issue view page',
      issueData: {}
    }
  },
  methods: {
    load: function () {
      this.$http.get('/api/issue/edit?id=' + this.$route.params.id)
        .then((res) => {
          let data = res.data.results
          data.tags = data.tags.join(' ').toString()
          this.issueData = data
        })
        .catch((e) => {
          console.error(e)
        })
    },
    convertHtml: function (strObj) {
      let str = (strObj || '').toString()
      // 개행문자 치환
      str = str.replace(/\n/g, '<br/>')
      // 띄어쓰기 치환
      str = str.replace(/\s/g, '&nbsp;')
      return str
    }
  },
  computed: {
    contentsToHtml: function () {
      return this.convertHtml(this.issueData.contents)
    },
    solutionsToHtml: function () {
      return this.convertHtml(this.issueData.solutions)
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.load()
    }
  }
}
</script>
