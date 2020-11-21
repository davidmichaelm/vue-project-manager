<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/routes/board/Navbar";
// import Board from "@/components/Board";
import {store} from "./store";
import {router} from "./router";


export default {
  name: 'App',
  router,
  store,
  components: {
    Navbar
    // Board
  }
}
</script>

<style>
</style>
