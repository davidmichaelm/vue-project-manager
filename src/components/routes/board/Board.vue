<template>
  <div class="container">
    <div class="row">
      <input
          class="h1"
          type="text"
          v-debounce="debounceTitle"
          :value="title"/>
      <div class="col-12">
        <div class="board row d-flex flex-nowrap">
          <Column v-for="column in columns" :key="column.id" :column-data="column"></Column>
          <div class="board-column col-4 col-md-5 m-2 p-2">
            <h4><a href="#" @click="addColumn">+ Add a column</a></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Column from "@/components/routes/board/Column";
import {mapActions} from "vuex";

export default {
  name: "Board",
  components: {
    Column
  },
  computed: {
    data() {
      return this.$store.state.board;
    },
    columns() {
      return this.$store.state.columns
    },
    title: {
      get() {
        return this.data ? this.data.title : null;
      },
      set(value) {
        this.setBoardTitle(value)
      }
    }
  },
  methods: {
    addColumn() {
      this.$store.dispatch("addColumn");
    },
    debounceTitle(value) {
      this.title = value;
    },
    ...mapActions([
      "setBoardTitle"
    ])
  },
  mounted() {
    this.$store.dispatch("init");
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


.board {
  overflow-x: auto;
}

.board-column {
  flex: 0 0 auto;
}

</style>