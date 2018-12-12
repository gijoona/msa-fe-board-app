<template>
  <div>
    <div class="my-3">
      <b-card body-class="p-0">
        <div slot="header">
          <div class="ml-auto"> 전체 {{ pageInfo.total }} 건 </div>
        </div>
        <item-list :list="issues" @view="onView" class="p-0"></item-list>
      </b-card>
      <!-- <item-list :list="issues" @edit="onEdit"></item-list> -->
    </div>
  </div>
</template>

<script>
import ItemList from '@/components/cmm/list/ItemList'

export default {
  name: 'IssueList',
  data: function () {
    return {
      msg: 'issue page',
      issues: [],
      pageInfo: {}
    }
  },
  methods: {
    loadIssueList: function () {
      this.$http.get('/api/issue/list')
        .then((res) => {
          this.issues = res.data.results
          this.pageInfo = res.data.pageInfo
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
          this.pageInfo = res.data.pageInfo
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
