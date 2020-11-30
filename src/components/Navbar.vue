<template>
  <b-navbar type="dark" variant="dark" class="mb-4">
    <b-navbar-brand to="/">
      Project Manager
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <template v-if="boardId">
        <b-nav-item :to="`/board/${boardId}/burndown`">
          Burndown
        </b-nav-item>
        <b-nav-item :to="`/board/${boardId}/board-settings`">
          Board Settings
        </b-nav-item>
      </template>
      <template v-if="isLoggedIn">
        <b-nav-item to="/myboards">
          My Boards
        </b-nav-item>
        <b-nav-item to="/logout">
          Logout
        </b-nav-item>
      </template>
      <template v-else>
        <b-nav-item to="/login">
          Login
        </b-nav-item>
      </template>

    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters([
        "isLoggedIn",
        "boardId"
    ])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>