<template>
  <fieldset class="mb-2">
    <legend><strong>{{ legend }}</strong></legend>
    <vue-markdown :source="contents" :html="mdOpts.html"></vue-markdown>
    <!-- <div v-html="convertHtml"></div> -->
  </fieldset>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'ViewContents',
  props: ['legend', 'contents'],
  data: function () {
    return {
      mdOpts: {
        show: true,
        html: false,
        breaks: true,
        linkify: true,
        emoji: true,
        typographer: true,
        toc: false
      }
    }
  },
  computed: {
    convertHtml: function () {
      // vue-markdown을 적용함에 따라 사용안함!!!
      let str = (this.contents || '').toString()
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
    }
  },
  components: {
    VueMarkdown
  }
}
</script>
<style>
fieldset {
    display: block;
    margin-left: 2px;
    margin-right: 2px;
    padding-top: 0.35em;
    padding-bottom: 0.625em;
    padding-left: 1em;
    padding-right: 1em;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}
legend {
  width: 120px;
  max-width: 100%;
}
</style>
