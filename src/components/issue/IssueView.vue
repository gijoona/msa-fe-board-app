<template>
  <div>
    <div class="my-3">
      <b-card class="text-left"
      :header-bg-variant="issueData.state"
      :header-text-variant="headerTextVariant">
      <div slot="header">
        <view-header :title="issueData.title" :geoLocation="issueData.geoLocation" :inputDt="issueData.inputDt"></view-header>
      </div>
      <b-card title="Contents" class="mb-2">
        <div v-html="contentsToHtml"></div>
      </b-card>
      <b-card title="Solutions" class="mb-2">
        <div v-html="solutionsToHtml"></div>
      </b-card>
      <div slot="footer">
        <view-tag-item v-for="tag in tagsToArray" :tag="tag" :key="tag"></view-tag-item>
      </div>
    </b-card>
  </div>
  </div>
</template>
<script>
import ViewHeader from '@/components/issue/comp/view/Header'
import ViewTagItem from '@/components/issue/comp/view/TagItem'

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
    convertHtml: function (strObj) {
      let str = (strObj || '').toString()
      // 개행문자 치환
      str = str.replace(/\n/g, '<br/>')
      // 띄어쓰기 치환
      str = str.replace(/\s/g, '&nbsp;')
      // url 링크처리
      let regex = new RegExp('(?:(?:https?|ftp|file):\\/\\/|www\\.|ftp\\.)(?:\\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\\)|[-A-Z0-9+&@#\\/%=~_|$?!:,.])*(?:\\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\\)|[A-Z0-9+&@#\\/%=~_|$])', 'igm')
      str = str.replace(regex, function (str, grp1) {
        return `<a href="${str}" target="_blank">${str}</a>`
      })
      return str
    },
    onSearch: function (searchTxt) {
      this.$router.push({name: 'IssueList', params: {searchTxt: searchTxt}})
    }
  },
  computed: {
    contentsToHtml: function () {
      return this.convertHtml(this.issueData.contents)
    },
    solutionsToHtml: function () {
      return this.convertHtml(this.issueData.solutions)
    },
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
    viewHeader: ViewHeader
  }
}
</script>
