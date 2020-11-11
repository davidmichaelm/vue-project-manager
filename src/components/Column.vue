<template>
  <div class="col-4 d-flex flex-column m-2">
    <div class="d-flex p-2">
      <h4>
      <label>
        <input type="text" v-model="columnDataLocal.title" @keypress="columnDataChanged"/>
      </label>
      </h4>
      <h4 class="ml-auto"><a href="#" @click="addCard">+</a></h4>
    </div>

    <Card v-for="(card, index) in this.columnData.cards" :key="card.id" :card-data=card @remove-card="removeCard(index)" @card-data-changed="columnDataChanged" />
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
  data() {
    return {
      columnDataLocal: this.columnData
    }
  },
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
    },
    removeCard(index) {
      this.columnData.cards.splice(index, 1)
    },
    columnDataChanged() {
      this.$emit("column-data-changed", this.columnDataLocal);
    }
  }
}
</script>

<style scoped>
.col-4 {
  display: inline-block !important;
  float: none;
}

input {
  border: none;
}

input:focus {
  outline: none;
}
</style>