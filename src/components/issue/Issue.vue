<template>
  <div>
    <nav-comp @search="goListAndSearch"></nav-comp>
    <b-container fluid class="p-0">
      <b-row>
        <b-col>
          <router-view :key="$route.fullPath"></router-view>
        </b-col>
      </b-row>
    </b-container>
    <div class="commandPanel">
      <b-dropdown id="command-dropup" variant="link" size="lg" dropup right no-caret>
        <template slot="button-content">
          <font-awesome-icon icon="plus-circle" size="3x" />
        </template >
        <b-dropdown-item :to="{name: 'IssueEdit'}" v-show="notEdit">새글</b-dropdown-item>
        <b-dropdown-item :to="{name: 'IssueList'}">목록</b-dropdown-item>
        <b-dropdown-item :to="{name: 'IssueEdit', params: {id: this.$route.params.id}}" v-show="isView">수정</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- <span class="commandPanel">
      <b-nav vertical class="m-3">
      </b-nav>
    </span> -->
  </div>
</template>
<script>
import Nav from '@/components/cmm/Nav'

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
<style>
.commandPanel {
  position: fixed;
  bottom: 50px;
  right: 80px;
  z-index: 100;
}
</style>
