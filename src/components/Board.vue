<template>
  <div class="container" >
    <h1>{{ this.data.title }}</h1>
    <div class="row d-flex flex-nowrap">
      <Column v-for="column in this.data.columns" :key="column.id" :column-data="column" @column-data-changed="handleColumnDataChanged"></Column>
      <div class="col-4 m-2 p-2">
        <h4><a href="#" @click="addColumn">+ Add a column</a></h4>
      </div>
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
  },
  methods: {
    addColumn() {
      this.data.columns.push({
        title: "New Column",
        cards: []
      })
    },
    handleColumnDataChanged() {
      console.log("changed")
    }
  }
}
</script>

<style scoped>
 a {
   text-decoration: none;
 }

 .container > .row {
   overflow-x: auto;
   display: flex;
 }

 .col-4 {
   flex: 0 0 auto;
 }

</style>