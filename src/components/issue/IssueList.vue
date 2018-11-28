<template>
  <div>
    <div class="my-3">
      <item-list :list="issues" @view="onView"></item-list>
      <!-- <item-list :list="issues" @edit="onEdit"></item-list> -->
    </div>
  </div>
</template>

<script>
import ItemList from '@/components/issue/comp/ItemList'

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
      this.$http.get('/api/issue/list?search=' + encodeURIComponent(searchTxt))
        .then((res) => {
          this.issues = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  created: function () {
    let searchTxt = this.$route.query.searchTxt || this.$route.params.searchTxt
    if (searchTxt) {
      this.onSearch(searchTxt)
    } else {
      this.loadIssueList()
    }
  },
  components: {
    itemList: ItemList
  }
}
</script>
