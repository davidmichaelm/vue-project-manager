<template>
  <div class="container">
    <h1>{{ this.data.title }}</h1>
    <div class="row d-flex">

      <div v-for="column in this.data.columns" :key="column.id" class="column d-flex flex-column m-2">
        <h4>{{ column.title }}</h4>
        <b-card v-for="card in column.cards" :key="card.id" :title=card.title style="max-width: 20rem;">
          <b-card-text>
            {{ card.content }}
          </b-card-text>
        </b-card>
      </div>

    </div>
  </div>
</template>

<script>
import { store } from "@/store";

export default {
  name: "Board",
  data() {
    return {
      data: store.boards["0"]
    }
  }
}
</script>

<style scoped>

</style>