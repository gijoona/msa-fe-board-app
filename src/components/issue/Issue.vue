<template>
  <div>
    <nav-comp @search="goListAndSearch"></nav-comp>
    <b-container fluid class="p-0">
      <b-row>
        <b-col cols="11">
          <router-view :key="$route.fullPath"></router-view>
        </b-col>
        <b-col sm="true">
          <b-nav vertical class="m-3">
            <b-nav-item :to="{name: 'IssueEdit'}" v-show="notEdit">새글</b-nav-item>
            <b-nav-item :to="{name: 'IssueList'}">목록</b-nav-item>
            <b-nav-item :to="{name: 'IssueEdit', params: {id: this.$route.params.id}}" v-show="isView">수정</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Nav from '@/components/issue/comp/Nav'

export default {
  name: 'Issue',
  data: function () {
    return {
      msg: 'Issue'
    }
  },
  methods: {
    goListAndSearch: function (searchTxt) {
      this.$router.push({path: '/issue', query: { searchTxt: searchTxt }})
    }
  },
  computed: {
    isView: function () {
      // View 화면일 경우에만 수정버튼 노출
      return this.$route.name === 'IssueView'
    },
    notEdit: function () {
      // Edit 화면이 아닐경우에만 새글버튼 노출
      return !(this.$route.name === 'IssueEdit')
    }
  },
  components: {
    navComp: Nav
  }
}
</script>
