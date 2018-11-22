<template>
  <b-navbar toggleable="md" type="dark" variant="info" id="navigation_bar">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/main">A Quester</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-button-group class="mr-sm-2">
          <router-link :to="{ name: 'IssueEdit', params: {} }">
            <b-btn size="sm">새글</b-btn>
          </router-link>
          <router-link :to="{ name: 'IssueList', params: {} }">
            <b-btn size="sm">목록</b-btn>
          </router-link>
          <router-link :to="{ name: 'IssueEdit', params: {id: this.$route.params.id} }" v-show="isView">
            <b-btn size="sm">수정</b-btn>
          </router-link>
        </b-button-group>
        <b-nav-form @submit="onSubmit">
          <b-form-input size="sm" class="mr-sm-2" type="text" v-model="searchTxt" placeholder="제목 + 내용 검색"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">검색</b-button>
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
  },
  computed: {
    isView: function () {
      // View 화면일 경우에만 수정버튼 노출
      return this.$route.name === 'IssueView'
    }
  }
}
</script>
