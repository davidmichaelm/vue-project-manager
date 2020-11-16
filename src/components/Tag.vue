<template>
  <div :class="'p-1 ml-1 mt-1 tag ' + this.backgroundColor + ' ' + this.color">{{ name }}</div>
</template>

<script>
import { store } from "@/store";

export default {
  name: "Tag",
  props: ["name"],
  data() {
    return {
      backgroundColor: store.boards[0].tags[this.name].backgroundColor,
      color: store.boards[0].tags[this.name].color
    }
  }
}
</script>

<style scoped>

</style>