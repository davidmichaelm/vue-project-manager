<template>
  <div class="container">
    <h1>{{ this.data.title }}</h1>
    <div class="row d-flex">
      <Column v-for="column in this.data.columns" :key="column.id" :column-data="column"></Column>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";
import Column from "@/components/Column";

export default {
  name: "Board",
  components: {
    Column
  },
  data() {
    return {
      data: store.boards["0"]
    }
  }
}
</script>

<style scoped>
 a {
   text-decoration: none;
 }
</style>