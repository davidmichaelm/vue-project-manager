<template>
  <b-container>
    <h1 class="mb-3 text-center">Login or Sign Up</h1>
    <div id="auth"></div>
  </b-container>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      ui: null
    }
  },
  methods: {
    ...mapActions([
      "addNewUser"
    ])
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/myboards");
      return;
    }

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    const component = this;
    const router = this.$router;
    this.ui.start("#auth", {
      signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      }],
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          if (authResult.additionalUserInfo.isNewUser) {
            component.addNewUser(authResult.user);
          }

          router.push("/myboards");
          return false;
        }
      }
    })

  },
  beforeDestroy() {
    if (this.ui) {
      this.ui.delete();
    }
  }
}
</script>

<style scoped>

</style>