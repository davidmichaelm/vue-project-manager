<template>
  <div id="app">
    <Navbar/>
    <Board/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Board from "@/components/Board";
import {store} from "./store";

export default {
  name: 'App',
  store,
  components: {
    Navbar,
    Board
  }
}
</script>

<style>
</style>
