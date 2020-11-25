<template>
  <div>
    <div>
      <h1>
        {{ boardTitle }}
        <router-link :to="`/board/${boardId}`">
          <b-icon-arrow-return-left class="h2 m-auto"/>
        </router-link>
      </h1>
    </div>

    <h3>{{ pageTitle }}</h3>
  </div>
</template>

<script>
import {BIconArrowReturnLeft} from "bootstrap-vue";

export default {
  name: "BoardPageHeader",
  props: ["boardTitle", "boardId", "pageTitle"],
  components: {
    BIconArrowReturnLeft
  }
}
</script>

<style scoped>

</style>