<template>
  <b-navbar>
    <b-navbar-brand>
      <router-link to="/">Project Manager</router-link>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <template v-if="boardId">
        <b-nav-item>
          <router-link :to="`/board/${boardId}/burndown`">Burndown</router-link>
        </b-nav-item>
      </template>
      <template v-if="loggedIn">
        <b-nav-item>
          <router-link to="/myboards">My Boards</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/logout">Logout</router-link>
        </b-nav-item>
      </template>
      <template v-else>
        <b-nav-item>
          <router-link to="/login">Login</router-link>
        </b-nav-item>
      </template>

    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn;
    },
    boardId() {
      return this.$store.state.board?.id;
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