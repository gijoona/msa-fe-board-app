<template>
  <div class="my-3">
    <b-form @submit="onSubmit">
      <b-form-group id="titleGroup" horizontal label="Title" label-for="txtTitle">
        <b-form-input id="txtTitle" v-model="issueData.title" placeholder="Enter Issue Title" v-focus></b-form-input>
      </b-form-group>
      <edit-markdown currId="content" label="Contents" :data="issueData.contents" @update:data="val => issueData.contents = val"></edit-markdown>
      <edit-markdown currId="solution" label="Solutions" :data="issueData.solutions" @update:data="val => issueData.solutions = val"></edit-markdown>
      <b-form-group id="tagsGroup" horizontal label="Tags" label-for="txtTags">
        <b-form-input id="txtTags" v-model="issueData.tags" placeholder="ex) #tag1 #tag2 ..."></b-form-input>
      </b-form-group>
      <b-form-group id="stateGroup" horizontal label="State" label-for="selState">
        <b-form-select v-model="issueData.state" :options="options">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option :value="null" disabled>-- Please select an state --</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-btn type="submit" variant="primary">저장</b-btn>
      <b-btn type="reset">초기화</b-btn>
      <b-btn variant="danger" @click.stop="onDelete">삭제</b-btn>
    </b-form>
    <b-modal ref="alert"
            title="알림"
            header-bg-variant="info"
            header-text-variant="light">
      저장되었습니다.
      <div slot="modal-footer">
        <b-btn variant="secondary" @click="onSearch('')">리스트</b-btn>
        <b-btn variant="primary" @click="hideModal">닫기</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import EditMarkdown from '@/components/cmm/edit/EditMarkdown'

export default {
  name: 'IssueEdit',
  data: function () {
    return {
      msg: 'issue view page',
      issueData: {contents: '', solutions: '', state: null, geoLoc: []},
      options: [
        {value: 'primary', text: 'Primary'},
        {value: 'secondary', text: 'Secondary'},
        {value: 'success', text: 'Success'},
        {value: 'danger', text: 'Danger'},
        {value: 'warning', text: 'Warning'},
        {value: 'info', text: 'Info'},
        {value: 'light', text: 'Light'},
        {value: 'dark', text: 'Dark'}
      ]
    }
  },
  methods: {
    load: function () {
      this.$http.get('/api/issue/edit?id=' + this.$route.params.id)
        .then((res) => {
          let data = res.data.results
          data.tags = data.tags.join(' ').toString()
          this.issueData = data
          this.setLocation()
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSubmit: function (evt) {
      evt.preventDefault()

      let data = Object.assign({}, this.issueData)
      data.tags = (data.tags || '').split(' ')
      if (this.$route.params.id) {
        this.$http.put('/api/issue', data, { headers: {'Content-Type': 'application/json'} })
          .then((res) => {
            this.$refs.alert.show()
            this.load()
            // this.issueData = res.data.results
          })
          .catch((e) => {
            console.error(e)
          })
      } else {
        this.$http.post('/api/issue', data, { headers: {'Content-Type': 'application/json'} })
          .then((res) => {
            if (res.data.errorcode === 1) {
              console.error(res.data.errormessage)
            } else {
              this.$router.push({name: 'IssueList'})
            }
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
    onDelete: function () {
      this.$http.delete('/api/issue?id=' + this.$route.params.id)
        .then((res) => {
          if (res.data.errorcode === 1) {
            console.error(res.data.errormessage)
          } else {
            this.$router.push({name: 'IssueList'})
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSearch: function (searchTxt) {
      this.$router.push({name: 'IssueList', params: {searchTxt: searchTxt}})
    },
    hideModal: function () {
      this.$refs.alert.hide()
    },
    setLocation: function () {
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
            this.issueData.geoLoc = [position.coords.latitude, position.coords.longitude]
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
        this.issueData.geoLoc = []
      }
    }
  },
  computed: {
    convertTags: function () {
      let convertTags = this.issueData.tags.toString()
      return convertTags
    }
  },
  components: {
    EditMarkdown
  },
  created: function () {
    if (this.$route.params.id) {
      this.load()
    }
    this.setLocation()
  }
}
</script>
