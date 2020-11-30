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
import Column from "@/components/board/Column";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import {boardBehavior} from "@/components/mixins/board-behavior";

export default {
  name: "Board",
  mixins: [boardBehavior],
  components: {
    Column
  },
  computed: {
    title: {
      get() {
        return this.board?.title;
      },
      set(value) {
        this.setBoardTitle(value)
      }
    },
    ...mapGetters([
        "columns",
    ])
  },
  methods: {
    debounceTitle(value) {
      this.title = value;
    },
    ...mapActions([
      "setBoardTitle",
      "addColumn",
      "initBoard",
      "unbindBoard"
    ])
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