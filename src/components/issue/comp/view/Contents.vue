<template>
  <fieldset class="mb-2">
    <legend>{{ legend }}</legend>
    <div v-html="convertHtml"></div>
  </fieldset>
</template>
<script>
export default {
  name: 'ViewContents',
  props: ['legend', 'contents'],
  data: function () {
    return {}
  },
  computed: {
    convertHtml: function () {
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
  width: 55px;
  max-width: 100%;
}
</style>
