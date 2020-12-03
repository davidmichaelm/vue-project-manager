<template>
  <b-navbar toggleable="md" class="mb-4">
    <b-navbar-brand to="/">
      Vue Project Manager
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
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
        <b-nav-item @click="logOut">
          Logout
        </b-nav-item>
      </template>
      <template v-else>
        <b-nav-item to="/login">
          Login
        </b-nav-item>
      </template>

    </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapGetters} from "vuex";
import firebase from "firebase/app";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters([
        "isLoggedIn",
        "boardId"
    ])
  },
  methods: {
    logOut() {
      if (this.isLoggedIn) {
        firebase.auth().signOut()
            .then(() => {
              if (this.$route.path !== "/") {
                this.$router.push("/");
              }
            })
            .catch(() => {
              console.log("Error: Unable to sign out.");
            });
      } else {
        console.log("Error: Unable to sign out.");
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>