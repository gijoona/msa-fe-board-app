<template>
  <div>
    <h4>{{ title }}</h4>
    <small>{{ writePlaceAndDate }}</small>
  </div>
</template>
<script>
export default {
  name: 'ViewHeader',
  props: ['title', 'geoLocation', 'inputDt'],
  data: function () {
    return {}
  },
  computed: {
    writePlaceAndDate: function () {
      let place = ''
      let date = this.inputDt

      if (this.geoLocation && this.geoLocation.adress) {
        place = this.geoLocation.adress
      } else {
        place = '알수없음'
      }

      return place + ' - ' + date
    }
  }
}
</script>
