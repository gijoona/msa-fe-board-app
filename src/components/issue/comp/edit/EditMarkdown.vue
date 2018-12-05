<template>
  <b-form-group :id="currId+'Group'" horizontal :label="label" :label-for="'tar'+currId">
    <b-row>
      <b-col cols="6">
        <b-form-textarea :id="'tar'+currId" v-model="contents" rows="5" max-rows="10" @input="onInput"></b-form-textarea>
      </b-col>
      <b-col cols="1">
        <b-btn @click="showCollapse = !showCollapse"
               :class="showCollapse ? 'collapsed' : null"
               :aria-controls="'collapse'+currId"
               :aria-expanded="showCollapse ? 'true' : 'false'">
          Toggle Collapse
        </b-btn>
      </b-col>
      <b-col cols="5">
        <b-collapse :id="'collapse'+currId" v-model="showCollapse" >
          <vue-markdown class="preview" :source="contents" :html="mdOpts.html"></vue-markdown>
        </b-collapse>
      </b-col>
    </b-row>
  </b-form-group>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'EditMarkdown',
  props: ['currId', 'label', 'data'],
  data: function () {
    return {
      contents: this.data,
      mdOpts: {
        show: true,
        html: false,
        breaks: true,
        linkify: true,
        emoji: true,
        typographer: true,
        toc: false
      },
      showCollapse: false
    }
  },
  methods: {
    allRight: function (htmlStr) {
      console.log('markdown is parsed !')
    },
    onInput: function () {
      this.$emit('update:data', this.contents)
    },
    toggleMDE: function () {

    }
  },
  components: {
    VueMarkdown
  }
}
</script>
<style>
.preview {
  padding: 2px 10px;
  overflow: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  height: 134px;
  max-height: 254px;
}
.full-height {
  height: 100%;
}
</style>
