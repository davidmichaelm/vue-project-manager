<template>
  <div class="container" >
    <input class="h1" type="text" v-model="data.title">
    <div class="row d-flex flex-nowrap">
      <Column v-for="(column, index) in data.columns" :key="column.id" :column-data="column" @column-data-changed="handleColumnDataChanged" @remove-column="handleRemoveColumn(index)"></Column>
      <div class="board-column col-4 col-md-5 m-2 p-2">
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
        title: "",
        cards: []
      })
    },
    handleColumnDataChanged() {
      console.log("changed")
    },
    handleRemoveColumn(index) {
      console.log(index)
      this.data.columns.splice(index, 1);
    }
  }
}
</script>

<style scoped>
 a {
   text-decoration: none;
 }

 input {
   width: 100%;

   border: none;
 }

 input:focus {
   outline: none;
 }


 .container > .row {
   overflow-x: auto;
   display: flex;
 }

 .board-column {
   flex: 0 0 auto;
 }

</style>