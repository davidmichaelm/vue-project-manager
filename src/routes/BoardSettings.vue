<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="data.title"
        page-title="Board Settings" />
  </b-container>
</template>

<script>
import {boardBehavior} from "@/components/mixins/board-behavior";
import BoardPageHeader from "@/components/board/BoardPageHeader";

export default {
  name: "BoardSettings",
  components: {BoardPageHeader},
  mixins: [boardBehavior]
}
</script>

<style scoped>

</style>