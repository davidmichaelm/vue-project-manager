<template>
  <b-container>
    <div class="position-relative">

      <h1>
        {{ data.title }}
        <router-link :to="`/board/${id}`">
        <b-icon-arrow-return-left class="h2 m-auto" />
      </router-link></h1>
    </div>

    <h3>Burndown Chart</h3>
  </b-container>
</template>

<script>
import {BIconArrowReturnLeft} from "bootstrap-vue";
import {boardBehavior} from "@/components/mixins/board-behavior";

export default {
  name: "Burndown",
  components: {
    BIconArrowReturnLeft
  },
  mixins: [boardBehavior]
}
</script>

<style scoped>

</style>