<template>
  <b-form-group :id="currId+'Group'" horizontal :label="label" :label-for="'tar'+currId">
    <b-row>
      <b-col :cols="editCols">
        <p :id="'tar'+currId" class="editor" @input="onInput" v-text="content" contenteditable></p>
        <b-btn class="preview-btn px-2 py-0" variant="link" @click="showCollapse = !showCollapse"
          :aria-controls="'collapse'+currId"
          :aria-expanded="showCollapse ? 'true' : 'false'">
          <font-awesome-icon icon="eye" size="2x" />
        </b-btn>
      </b-col>
      <b-col :cols="preCols">
        <div :style="{'display' : showCollapse ? 'inline' : 'none'}">
          <vue-markdown class="preview" :show="showCollapse" :source="markdownText" :html="mdOpts.html"></vue-markdown>
        </div>
      </b-col>
    </b-row>
  </b-form-group>
</template>
<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'EditMarkdown',
  props: ['currId', 'label', 'editText'],
  data: function () {
    return {
      content: '',
      markdownText: '',
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
    onInput: function (event) {
      this.markdownText = event.target.innerText
      this.$emit('update:data', event.target.innerText)
    }
  },
  computed: {
    editCols: function () {
      return this.showCollapse ? 6 : 12
    },
    preCols: function () {
      return this.showCollapse ? 6 : 0
    }
  },
  components: {
    VueMarkdown
  },
  watch: {
    editText: function (val) {
      if (this.content === '') {
        this.content = val
        this.markdownText = val
      }
    }
  }
}
</script>
<style>
.editor {
  padding: 2px 10px;
  overflow: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  height: 100%;
  max-height: 254px;
}
.preview {
  padding: 2px 10px;
  overflow: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  min-height: 134px;
  max-height: 254px;
}
.full-height {
  height: 100%;
}
.preview-btn {
  position: relative;
  float: right;
  top: -55px;
  right: 5px;
  z-index: 10;
  opacity: 0.5;
}
code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
}
pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
}
pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
    border-radius: 0;
}
</style>
