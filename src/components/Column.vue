<template>
  <div class="column d-flex flex-column m-2">
    <div class="d-flex p-2">
      <h4>{{ this.columnData.title }}</h4>
      <h4 class="ml-auto"><a href="#" @click="addCard">+</a></h4>
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
  props: ["columnData"],
  methods: {
    getMaxId() {
      return Math.max(...this.columnData.cards.map(c => c.id), 0);
    },
    addCard() {
      let id = this.getMaxId() + 1
      let newCard = {
        id: id,
        title: "Test Card " + id,
        content: "Some quick example text to build on the card title and make up the bulk of the card's content."
      }
      this.columnData.cards.push(newCard);
    }
  }
}
</script>

<style scoped>

</style>