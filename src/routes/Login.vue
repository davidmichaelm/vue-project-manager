<template>
  <b-container>
    <h1>Login</h1>
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
  methods: {
    ...mapActions([
        "addNewUser"
    ])
  },
  mounted() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const component = this;
    ui.start("#auth", {
      signInSuccessUrl: "/myboards",
      signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      }],
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          if (authResult.additionalUserInfo.isNewUser) {
            component.addNewUser(authResult.user);
          }
          return true;
        }
      }

    })
  }
}
</script>

<style scoped>

</style>