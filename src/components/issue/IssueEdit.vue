<template>
  <div>
    <nav-comp @search="onSearch"></nav-comp>
    <div class="my-3">
      <b-form @submit="onSubmit">
        <b-form-group id="titleGroup" horizontal label="Title" label-for="txtTitle">
          <b-form-input id="txtTitle" v-model="issueData.title" placeholder="Enter Issue Title" v-focus></b-form-input>
        </b-form-group>
        <b-form-group id="contentsGroup" horizontal label="Contents" label-for="tarContents">
          <b-form-textarea id="tarContents" v-model="issueData.contents" rows="5" max-rows="10"></b-form-textarea>
        </b-form-group>
        <b-form-group id="solutionsGroup" horizontal label="Solutions" label-for="tarSolutions">
          <b-form-textarea id="tarSolutions" v-model="issueData.solutions" rows="5" max-rows="10"></b-form-textarea>
        </b-form-group>
        <b-form-group id="tagsGroup" horizontal label="Tags" label-for="txtTags">
          <b-form-input id="txtTags" v-model="issueData.tags" placeholder="ex) #tag1 #tag2 ..."></b-form-input>
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
import Nav from '@/components/issue/comp/Nav'

export default {
  name: 'IssueEdit',
  data: function () {
    return {
      msg: 'issue view page',
      issueData: {}
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
      data.tags = data.tags.split(' ')
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
  },
  components: {
    navComp: Nav
  }
}
</script>
