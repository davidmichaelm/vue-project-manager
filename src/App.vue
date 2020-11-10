<template>
  <div id="app">
    <Navbar />
    <Board />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Board from "@/components/Board";

export default {
  name: 'App',
  components: {
    Navbar,
    Board
  }
}
</script>

<style>
</style>
