<template>
  <div>
    <div>
      <router-link :to="{ name: 'IssueList', params: {} }">
        <b-btn size="sm">List</b-btn>
      </router-link>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group id="titleGroup" horizontal
                    label="Title"
                    label-for="txtTitle">
        <b-form-input id="txtTitle" v-model="issueData.title" placeholder="Enter Issue Title" v-focus></b-form-input>
      </b-form-group>
      <b-form-group id="contentsGroup" horizontal
                    label="Contents"
                    label-for="tarContents">
        <b-form-textarea id="tarContents" v-model="issueData.contents" rows="5" max-rows="10"></b-form-textarea>
      </b-form-group>
      <b-form-group id="solutionsGroup" horizontal
                    label="Solutions"
                    label-for="tarSolutions">
        <b-form-textarea id="tarSolutions" v-model="issueData.solutions" rows="5" max-rows="10"></b-form-textarea>
      </b-form-group>
      <b-btn type="submit" variant="primary">Submit</b-btn>
      <b-btn type="reset">Reset</b-btn>
      <b-btn variant="danger" @click.stop="onDelete">Delete</b-btn>
    </b-form>
    <b-modal ref="alert">저장되었습니다.</b-modal>
  </div>
</template>
<script>
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
          this.issueData = res.data.results
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSubmit: function (evt) {
      evt.preventDefault()
      if (this.$route.params.id) {
        this.$http.put('/api/issue', this.issueData, { headers: {'Content-Type': 'application/json'} })
          .then((res) => {
            this.$refs.alert.show()
            this.issueData = res.data.results
          })
          .catch((e) => {
            console.error(e)
          })
      } else {
        this.$http.post('/api/issue', this.issueData, { headers: {'Content-Type': 'application/json'} })
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
    }
  },
  created: function () {
    if (this.$route.params.id) {
      this.load()
    }
  }
}
</script>
