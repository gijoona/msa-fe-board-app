<template>
  <div>
    <nav-comp @search="onSearch"></nav-comp>
    <b-container fluid class="p-0">
      <b-row>
        <b-col cols="3" class="p-0">
          <b-card body-class="p-0">
            <item-list :list="memoList" @view="onSelect"></item-list>
            <div slot="footer" @click="newMemo">
              새 메모
            </div>
          </b-card>
        </b-col>
        <b-col class="p-0">
          <item-view :item="memoItem" @autosave="onSave"></item-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Nav from '@/components/cmm/Nav'
import ItemList from '@/components/cmm/list/ItemList'
import ItemView from '@/components/cmm/edit/EditMemo'

export default {
  name: 'Memo',
  data: function () {
    return {
      msg: 'Memo Template',
      memoList: [],
      memoItem: {
        title: '',
        contents: '',
        geoLoc: []
      }
    }
  },
  methods: {
    onLoad: function () {
      this.$http.get('/api/memo')
        .then((res) => {
          this.memoList = res.data.results
        })
        .catch((err) => {
          console.error(err)
        })
    },
    onSearch: function (val) {
      console.log(val)
    },
    newMemo: function () {
      let memo = Object.assign({}, {
        title: '',
        contents: '',
        geoLoc: []
      })
      this.setLocation(memo)
      this.memoList.unshift(memo)
    },
    onSelect: function (memoItem) {
      this.memoItem = memoItem
    },
    onSave: function (memoItem) {
      console.log('autoSave', memoItem)
      this.$http.post('/api/memo', memoItem, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          console.log(res)
          this.onLoad()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    setLocation: function (memo) {
      // GPS를 지원한다면
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            /* GPS 정보
            position = {
              coords: {}, // 좌표정보
              timestamp: Number
            }
            */
            memo.geoLoc = [position.coords.latitude, position.coords.longitude]
          },
          (err) => {
            console.error(err)
          }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
          }
        )
      } else {
        console.log('GPS를 지원하지 않습니다.')
        this.memo.geoLoc = []
      }
    }
  },
  components: {
    navComp: Nav,
    itemList: ItemList,
    itemView: ItemView
  },
  created: function () {
    this.onLoad()
  }
}
</script>
