<template>
  <div>
    <nav-comp @search="onSearch"></nav-comp>
    <b-container fluid class="p-0">
      <b-row>
        <b-col cols="3" class="p-0">
          <b-card body-class="p-0" header-bg-variant="light" header-class="header-align p-0">
            <div slot="header" class="btn">
              <font-awesome-icon icon="edit" size="2x" @click="newMemo"/>
            </div>
            <item-list :list="memoList" @view="onSelect"></item-list>
          </b-card>
        </b-col>
        <b-col class="pl-2">
          <b-card header-bg-variant="light" header-class="header-align p-0">
            <div slot="header" class="btn">
              <font-awesome-icon icon="trash-alt" size="2x" @click="deleteMemo"/>
            </div>
            <item-view :item="memoItem" @autosave="onSave"></item-view>
          </b-card>
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
    onLoad: function (cb) {
      this.$http.get('/api/memo')
        .then((res) => {
          this.memoList = res.data.results
          if (cb) {
            cb(this.memoList)
          }
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
        title: '새 메모',
        contents: '',
        geoLoc: []
      })
      this.memoList.unshift(memo)
      this.memoItem = memo
    },
    deleteMemo: function () {
      this.$http.delete('/api/memo?id=' + encodeURIComponent(this.memoItem['_id']))
        .then((res) => {
          this.onLoad((list) => {
            if (list.length > 0) {
              this.memoItem = list[0]
            } else {
              this.memoItem = {}
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    onSelect: function (memoItem) {
      this.memoItem = memoItem
    },
    onSave: function (memoItem) {
      this.setLocation(memoItem)
      if (memoItem['_id']) {
        this.$http.put('/api/memo', memoItem, { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            this.memoItem['inputDt'] = res.data.results['inputDt']
            this.onLoad()
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        this.$http.post('/api/memo', memoItem, { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            this.memoItem['_id'] = res.data.results['_id']
            this.memoItem['inputDt'] = res.data.results['inputDt']
            this.onLoad()
          })
          .catch((err) => {
            console.error(err)
          })
      }
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
    this.onLoad((list) => {
      if (list.length > 0) {
        this.memoItem = list[0]
      } else {
        this.memoItem = {}
      }
    })
  }
}
</script>
<style>
.header-align {
  text-align: right;
}
</style>
