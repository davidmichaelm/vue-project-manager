<template>
    <b-container>
      <div class="d-flex flex-row flex-wrap align-items-center">
        <h1 class="mr-3">{{ title }}</h1>

        <div class="d-flex flex-row align-items-center">
          <router-link :to="`/board/${board.id}/burndown`"
                       class="h4 mr-2">
            <b-icon-bar-chart-line-fill flip-h/>
          </router-link>

          <router-link :to="`/board/${board.id}/board-settings`"
                       class="h4 mr-2">
            <b-icon-gear-fill />
          </router-link>

          <a href="#" v-b-toggle.tag-collapse class="h4">
            <b-icon-tag-fill />
          </a>
        </div>
      </div>

      <TagCollapse id="tag-collapse" />

      <div class="board col-12 container-fluid d-flex flex-fill flex-nowrap px-0">
        <Column v-for="column in columns" :key="column.id" :column-data="column"></Column>
        <div class="board-column col-4 col-md-5 m-2 p-2">
          <h4><a href="#" @click="addColumn">+ Add a column</a></h4>
        </div>
      </div>
    </b-container>
</template>

<script>
import Column from "@/components/board/Column";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import {boardBehavior} from "@/components/mixins/board-behavior";
import {BIconBarChartLineFill, BIconGearFill, BIconTagFill} from "bootstrap-vue";
import TagCollapse from "@/components/board/TagCollapse";

export default {
  name: "Board",
  mixins: [boardBehavior],
  components: {
    Column,
    BIconBarChartLineFill,
    BIconGearFill,
    BIconTagFill,
    TagCollapse
  },
  computed: {
    title() {
      return this.board?.title;
    },
    ...mapGetters([
      "columns"
    ])
  },
  methods: {
    ...mapActions([
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


.flex-fill {
  flex: 1 1 auto;
}

</style>