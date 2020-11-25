<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="data.title"
        page-title="Burndown Chart" />
  </b-container>
</template>

<script>
import {boardBehavior} from "@/components/mixins/board-behavior";
import BoardPageHeader from "@/components/board/BoardPageHeader";

export default {
  name: "Burndown",
  components: {
    BoardPageHeader
  },
  mixins: [boardBehavior]
}
</script>

<style scoped>

</style>