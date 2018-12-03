<template>
  <span>
    <b-btn :id="targetId" variant="link" @click.stop="onSearch(tag)">{{ tag }}</b-btn>
    <b-popover ref="popover" :target="targetId" :title="popoverConfig.title" triggers="hover" :show.sync="isShow">
      {{ popoverConfig.content }}
    </b-popover>
  </span>
</template>

<script>
export default {
  name: 'ViewTagItem',
  props: ['tag'],
  data: function () {
    return {
      popoverConfig: {
        html: true,
        title: this.tag,
        content: '관련게시글: '
      },
      isShow: false
    }
  },
  watch: {
    isShow: function () {
      if (this.isShow) {
        this.loadHashInfo()
      }
    }
  },
  methods: {
    loadHashInfo: function () {
      this.$http.get('/api/issue/hashinfo?hashtag=' + encodeURIComponent(this.tag))
        .then((res) => {
          this.popoverConfig.content = '관련게시글: ' + res.data.results
        })
        .catch((e) => { console.error(e) })
    },
    onSearch: function (searchTxt) {
      this.$router.push({name: 'IssueList', params: {searchTxt: searchTxt}})
    }
  },
  computed: {
    targetId: function () {
      return (this.tag || '').replace('#', '')
    }
  }
}
</script>
