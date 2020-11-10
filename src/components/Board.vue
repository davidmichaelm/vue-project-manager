<template>
  <div class="container">
    <h1>{{ this.name }}</h1>
    <div class="row d-flex">

      <div class="column d-flex flex-column m-2">
        <h4>Column Title</h4>
        <b-card title="Card Title" style="max-width: 20rem;">
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
        </b-card>
        <b-card title="Card Title" style="max-width: 20rem;">
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
        </b-card>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  data() {
    return {
      name: "Test Board"
    }
  }
}
</script>

<style scoped>

</style>