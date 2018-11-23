<template>
  <div>
    <div class="my-3">
      <b-form @submit="onSubmit">
        <b-form-group id="titleGroup" horizontal label="제목" label-for="txtTitle">
          <b-form-input id="txtTitle" v-model="issueData.title" placeholder="Enter Issue Title" v-focus></b-form-input>
        </b-form-group>
        <b-form-group id="contentsGroup" horizontal label="내용" label-for="tarContents">
          <b-form-textarea id="tarContents" v-model="issueData.contents" rows="5" max-rows="10"></b-form-textarea>
        </b-form-group>
        <b-form-group id="solutionsGroup" horizontal label="방안" label-for="tarSolutions">
          <b-form-textarea id="tarSolutions" v-model="issueData.solutions" rows="5" max-rows="10"></b-form-textarea>
        </b-form-group>
        <b-form-group id="tagsGroup" horizontal label="해시태그" label-for="txtTags">
          <b-form-input id="txtTags" v-model="issueData.tags" placeholder="ex) #tag1 #tag2 ..."></b-form-input>
        </b-form-group>
        <b-form-group id="stateGroup" horizontal label="상태" label-for="selState">
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
      <b-modal ref="alert">저장되었습니다.</b-modal>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IssueEdit',
  data: function () {
    return {
      msg: 'issue view page',
      issueData: {state: null},
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
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSubmit: function (evt) {
      let data = Object.assign({}, this.issueData)
      data.tags = (data.tags || '').split(' ')
      evt.preventDefault()
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
    }
  },
  computed: {
    convertTags: function () {
      let convertTags = this.issueData.tags.toString()
      return convertTags
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.load()
    }
  }
}
</script>
