<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Logout",
  data() {
    return {
      message: "You have been logged out"
    }
  },
  mounted() {
    if (this.$store.state.user.loggedIn) {
      firebase.auth().signOut()
          .then(() => {
            this.message = "You have been logged out";
          })
          .catch(() => {
            this.message = "Error: You have not been logged out";
          });
    } else {
      this.message = "Something went wrong. Redirecting..."
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>

</style>