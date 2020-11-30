<template>
  <div id="app" class="d-flex flex-column">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import {store} from "./stores/store";
import {router} from "./router";


export default {
  name: 'App',
  router,
  store,
  components: {
    Navbar
  }
}
</script>

<style>
body, #app {
  min-height: 100vh;
}
</style>
