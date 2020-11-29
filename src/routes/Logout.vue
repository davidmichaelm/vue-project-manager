<template>
  <b-container class="text-center mt-5">
    <h3>{{ message }}</h3>
  </b-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Logout",
  data() {
    return {
      message: ""
    }
  },
  created() {
    if (this.$store.state.user.loggedIn) {
      firebase.auth().signOut()
          .then(() => {
            this.message = "You have been logged out. Redirecting...";
          })
          .catch(() => {
            this.message = "Error: You have not been logged out. Redirecting...";
          });
    } else {
      this.message = "Something went wrong. Redirecting..."
    }

    setTimeout(() => {
      this.$router.push("/");
    }, 3000)
  }
}
</script>

<style scoped>

</style>