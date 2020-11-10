<template>
  <div class="column d-flex flex-column m-2">
    <div class="d-flex p-2">
      <h4>{{ this.columnData.title }}</h4>
    </div>

    <Card v-for="card in this.columnData.cards" :key="card.id" :card-data=card />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Column",
  components: {
    Card
  },
  props: ["columnData"]
}
</script>

<style scoped>

</style>