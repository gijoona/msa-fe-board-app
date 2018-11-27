<template>
  <div>
    <div class="my-3">
      <b-card class="text-left"
      :header-bg-variant="issueData.state"
      header-text-variant="light">
      <div slot="header">
        <h4>{{ issueData.title }}</h4>
        <small>{{ issueData.inputDt }}</small>
      </div>
      <b-card title="Contents" class="mb-2">
        <div v-html="contentsToHtml"></div>
      </b-card>
      <b-card title="Solutions" class="mb-2">
        <div v-html="solutionsToHtml"></div>
      </b-card>
      <div slot="footer">
        <tag-item v-for="tag in tagsToArray" :tag="tag" :key="tag"></tag-item>
      </div>
    </b-card>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.component('tagItem', {
  props: ['tag'],
  template: `
    <span>
      <b-btn :id="targetId" variant="link" @click.stop="loadHashInfo">{{ tag }}</b-btn>
      <b-popover ref="popover" :target="targetId" :title="popoverConfig.title">
        {{ popoverConfig.content }}
      </b-popover>
    </span>
  `,
  data: function () {
    return {
      popoverConfig: {
        title: this.tag,
        content: this.tag
      },
      isShow: false
    }
  },
  methods: {
    loadHashInfo: function () {
      this.$http.get('/api/issue/hashinfo?hashtag=' + this.targetId)
        .then((res) => {
          console.log(res.data.result)
          this.popoverConfig = {title: this.tag, content: this.tag}
          this.togglePopover()
        })
        .catch((e) => { console.error(e) })
    },
    togglePopover: function () {
      if (this.isShow) {
        this.isShow = false
        this.$refs.popover.$emit('close')
      } else {
        this.isShow = true
        this.$refs.popover.$emit('open')
      }
    }
  },
  computed: {
    targetId: function () {
      return (this.tag || '').replace('#', '')
    }
  }
})

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
  }
}
</script>
