<template>
  <div>
    <div class="my-3">
      <b-card class="text-left"
            :header-bg-variant="issueData.state"
            :header-text-variant="headerTextVariant">
      <div slot="header">
        <view-header :title="issueData.title" :geoLocation="issueData.geoLocation" :inputDt="issueData.inputDt"></view-header>
      </div>
      <view-contents legend="Contents" :contents="issueData.contents"></view-contents>
      <view-contents legend="Solutions" :contents="issueData.solutions"></view-contents>
      <div slot="footer">
        <view-tag-item v-for="tag in tagsToArray" :tag="tag" :key="tag"></view-tag-item>
      </div>
    </b-card>
  </div>
  </div>
</template>
<script>
import ViewHeader from '@/components/cmm/view/Header'
import ViewContents from '@/components/cmm/view/Contents'
import ViewTagItem from '@/components/cmm/view/TagItem'

export default {
  name: 'IssueEdit',
  data: function () {
    return {
      msg: 'issue view page',
      issueData: {},
      headerTextVariant: 'light'
    }
  },
  methods: {
    load: function () {
      this.$http.get('/api/issue/edit?id=' + this.$route.params.id)
        .then((res) => {
          let data = res.data.results
          data.tags = data.tags.join(' ').toString()
          this.issueData = data // issueData setting
          this.headerTextVariant = (data.state || '') !== 'light' ? 'light' : 'dark' // header text variant 설정
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSearch: function (searchTxt) {
      this.$router.push({name: 'IssueList', params: {searchTxt: searchTxt}})
    }
  },
  computed: {
    tagsToArray: function () {
      return (this.issueData.tags || '').split(' ')
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.load()
    }
  },
  components: {
    viewTagItem: ViewTagItem,
    viewHeader: ViewHeader,
    viewContents: ViewContents
  }
}
</script>
