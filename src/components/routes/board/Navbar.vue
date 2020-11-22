<template>
  <b-navbar>
    <b-navbar-brand>
      <router-link to="/">Project Manager</router-link>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="loggedIn">
        <router-link to="/myboards">My Boards</router-link>
      </b-nav-item>
      <b-nav-item v-if="loggedIn">
        <router-link to="/logout">Logout</router-link>
      </b-nav-item>
      <b-nav-item v-if="!loggedIn">
        <router-link to="/login">Login</router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    }
  }
}
</script>

<style scoped>
  a {
    color: initial;
    text-decoration: none;
  }
</style>