<template>
  <b-form>
    <b-form-input class="no-board" size="lg" @blur.native="onFocusout" v-model="item.title"></b-form-input>
    <hr />
    <b-form-textarea class="no-board full-height" @blur.native="onFocusout" v-model="item.contents"></b-form-textarea>
  </b-form>
</template>
<script>
export default {
  name: 'EditMemo',
  props: ['item'],
  data: function () {
    return {
      msg: 'edit memo'
    }
  },
  methods: {
    onFocusout: function () {
      this.$emit('autosave', this.item)
    }
  }
}
</script>
<style>
.full-height {
  height: 100%;
}
.no-board {
  border: 0px;
}
</style>
