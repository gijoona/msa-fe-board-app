<template>
  <b-form class="memo-align">
    <input type="text" class="no-board memo-title" @blur="onFocusout" v-model="item.title" />
    <small class="memo-date" v-show="item.inputDt ? true : false">{{ adressAndDate }}</small>
    <hr class="m-0 separate-line"/>
    <textarea class="no-board memo-contents" @blur="onFocusout" v-model="item.contents" @keydown="resize" @keyup="resize"></textarea>
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
      console.log('blur')
      this.$emit('autosave', this.item)
    },
    resize: function (evt) {
      let obj = evt.target
      obj.style.height = '1px'
      obj.style.height = (12 + obj.scrollHeight) + 'px'
    }
  },
  computed: {
    adressAndDate: function () {
      let adress = '알수없음'
      if (this.item.geoLocation && this.item.geoLocation.adress) {
        adress = this.item.geoLocation.adress
      }
      return adress + ' - ' + this.item.inputDt
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
  overflow-y: hidden;
}
.memo-align {
  text-align: left;
}
.no-board {
  border: 0px;
  outline: none;
}
</style>
