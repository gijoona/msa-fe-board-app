<template>
  <b-list-group>
    <b-list-group-item v-for="item in list" :key="item._id" :variant="item.state" @click="selectedItem(item)" button>
      <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1">
          <b-badge v-show="item.isAnswer">complete</b-badge> {{ item.title }}
        </h6>
        <small>{{ diffDate(item.inputDt) }}</small>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  name: 'ItemList',
  props: ['list'],
  data: function () {
    return {msg: 'item list'}
  },
  methods: {
    selectedItem: function (item) {
      this.$emit('view', item)
    },
    diffDate: function (inputDt) {
      let diffJSON = this.diffCalc(inputDt, Date.now())
      if (diffJSON.seconds < 60) {
        return diffJSON.seconds + '초 전'
      } else if (diffJSON.minutes < 60) {
        return diffJSON.minutes + '분 전'
      } else if (diffJSON.hours < 24) {
        return diffJSON.hours + '시간 전'
      } else if (diffJSON.days < 7) {
        return diffJSON.days + '일 전'
      } else if (diffJSON.weeks < 4) {
        return diffJSON.weeks + '주 전'
      } else if (diffJSON.months < 12) {
        return diffJSON.months + '개월 전'
      } else {
        return diffJSON.years + '년 전'
      }
    },
    diffCalc: function (date1, date2, interval) {
      let second = 1000
      let minute = second * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      date1 = new Date(date1)
      date2 = new Date(date2)
      var timediff = date2 - date1
      if (isNaN(timediff)) return NaN
      return {
        'years': date2.getFullYear() - date1.getFullYear(),
        'months': ((date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth())),
        'weeks': Math.floor(timediff / week),
        'days': Math.floor(timediff / day),
        'hours': Math.floor(timediff / hour),
        'minutes': Math.floor(timediff / minute),
        'seconds': Math.floor(timediff / second)
      }
      // switch (interval) {
      //   case 'years':
      //     return date2.getFullYear() - date1.getFullYear()
      //   case 'months':
      //     return ((date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth()))
      //   case 'weeks':
      //     return Math.floor(timediff / week)
      //   case 'days':
      //     return Math.floor(timediff / day)
      //   case 'hours':
      //     return Math.floor(timediff / hour)
      //   case 'minutes':
      //     return Math.floor(timediff / minute)
      //   case 'seconds':
      //     return Math.floor(timediff / second)
      //   default:
      //     return undefined
      // }
    }
  }
}
</script>
