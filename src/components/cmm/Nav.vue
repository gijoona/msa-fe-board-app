<template>
  <b-navbar toggleable="md" type="dark" variant="info" id="navigation_bar" fixed="top">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/main">WorkSpace</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!-- <b-nav-item :to="{ name: 'IssueEdit', params: {} }">새글</b-nav-item>
        <b-nav-item :to="{ name: 'IssueList', params: {} }">목록</b-nav-item>
        <b-nav-item :to="{ name: 'IssueEdit', params: {id: this.$route.params.id} }" v-show="isView">수정</b-nav-item> -->

        <b-nav-form @submit="onSubmit" class="ml-3">
          <b-input-group>
            <b-form-input size="sm" type="text" v-model="searchTxt" placeholder="제목 + 내용 검색"/>
            <b-input-group-append>
              <b-button size="sm" type="submit">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Nav',
  data: function () {
    return {
      msg: 'Nav',
      searchTxt: ''
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      this.$emit('search', this.searchTxt)
    }
  }
}
</script>
