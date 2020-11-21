<template>
  <b-navbar>
    <b-navbar-brand>
      <router-link to="/">Project Manager</router-link>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item><router-link to="/board">My Boards</router-link></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
  a {
    color: initial;
    text-decoration: none;
  }
</style>