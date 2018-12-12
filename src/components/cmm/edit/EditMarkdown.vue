<template>
  <b-form-group :id="currId+'Group'" horizontal :label="label" :label-for="'tar'+currId">
    <b-row>
      <b-col :cols="editCols">
        <b-form-textarea :id="'tar'+currId" v-model="content" rows="5" max-rows="10" @input="onInput"></b-form-textarea>
        <b-btn class="preview-btn p-1" @click="showCollapse = !showCollapse"
          :aria-controls="'collapse'+currId"
          :aria-expanded="showCollapse ? 'true' : 'false'">
          view
        </b-btn>
      </b-col>
      <b-col :cols="preCols">
        <div :style="{'display' : showCollapse ? 'inline' : 'none'}">
          <vue-markdown class="preview" :show="showCollapse" :source="content" :html="mdOpts.html"></vue-markdown>
        </div>
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
      content: '',
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
  watch: {
    data: function () {
      this.content = this.data
    }
  },
  methods: {
    allRight: function (htmlStr) {
      console.log('markdown is parsed !')
    },
    onInput: function () {
      this.$emit('update:data', this.content)
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
.preview-btn {
  position: relative;
  float: right;
  top: -45px;
  right: 10px;
  z-index: 10;
  opacity: 0.5;
}
</style>
