<template>
  <b-card :title=this.cardData.title style="max-width: 20rem;">
    <b-card-text>
      {{ this.cardData.content }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: ["cardData"]
}
</script>

<style scoped>

</style>