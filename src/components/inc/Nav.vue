<template>
  <b-navbar toggleable="md" type="dark" variant="info" id="navigation_bar">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="/main">A Quester</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">한국어</b-dropdown-item>
          <b-dropdown-item href="#">English</b-dropdown-item>
          <b-dropdown-item href="#">中文</b-dropdown-item>
          <b-dropdown-item href="#">日本語</b-dropdown-item>
          <b-dropdown-item href="#">Русский</b-dropdown-item>
          <b-dropdown-item href="#">Português</b-dropdown-item>
          <b-dropdown-item href="#">Français</b-dropdown-item>
          <b-dropdown-item href="#">Tiếng Việt</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          <b-dropdown-item href="/login">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

export default {
  name: 'Nav',
  data: function () {
    return {}
  }
}
</script>
<style>
#navigation_bar {
  margin-bottom: 60px;
}
</style>
