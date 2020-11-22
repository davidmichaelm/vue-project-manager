<template>
  <div>
    <h1>Login</h1>
    <div id="auth"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";



export default {
  name: "Login",
  mounted() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#auth", {
      signInSuccessUrl: "/myboards",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    })
  }
}
</script>

<style scoped>

</style>