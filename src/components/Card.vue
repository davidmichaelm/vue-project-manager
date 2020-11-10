<template>
  <b-card>
    <div class="d-flex">
      <b-card-title>{{ this.cardData.title }}</b-card-title>
      <a class="ml-auto" href="#" @click="removeCard">x</a>
    </div>
    <b-card-text>
      {{ this.cardData.content }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: ["cardData"],
  methods: {
    removeCard() {
      this.$emit("removeCard");
    }
  }
}
</script>

<style scoped>

</style>