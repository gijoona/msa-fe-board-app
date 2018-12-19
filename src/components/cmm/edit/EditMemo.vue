<template>
  <b-form class="memo-align">
    <input type="text" class="no-board memo-title" @blur="onFocusout" v-model="title" />
    <small class="memo-date" v-show="inputDt ? true : false">{{ adressAndDate }}</small>
    <hr class="m-0 separate-line"/>
    <p class="no-board pre-text" contenteditable="true" @blur="onFocusout" @input="update">{{ contents }}</p>
  </b-form>
</template>
<script>
export default {
  name: 'EditMemo',
  props: ['item'],
  data: function () {
    return {
      msg: 'edit memo',
      title: '',
      inputDt: null,
      contents: ''
    }
  },
  watch: {
    'item': function (obj) {
      this.title = obj.title
      this.inputDt = obj.inputDt
      this.contents = obj.contents
    }
  },
  methods: {
    onFocusout: function () {
      this.item.title = this.title
      // this.item.contents = this.contents
      this.$emit('autosave', this.item)
    },
    update: function (event) {
      this.item.contents = event.target.innerText
    }
  },
  computed: {
    adressAndDate: function () {
      let adress = '알수없음'
      if (this.item.geoLocation && this.item.geoLocation.adress) {
        adress = this.item.geoLocation.adress
      }
      return adress + ' - ' + this.inputDt
    }
  }
}
</script>
<style>
.memo-title {
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 20pt;
}
.memo-date {
  color: #a7a7a7;
}
.separate-line {
  width: 100%;
}
.memo-contents {
  width: 100%;
  min-height: 500px;
  height: 100%;
  overflow-y: hidden;
}
.memo-align {
  text-align: left;
}
.no-board {
  border: 0px;
  outline: none;
}
.pre-text {
  white-space: pre-wrap;
}
</style>
