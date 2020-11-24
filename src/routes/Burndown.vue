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
import {mapActions} from "vuex";
import {BIconArrowReturnLeft} from "bootstrap-vue";

export default {
  name: "Burndown",
  components: {
    BIconArrowReturnLeft
  },
  props: ["id"],
  computed: {
    boardId() {
      return this.$store.state.board?.id
    },
    data() {
      return this.$store.state.board;
    }
  },
  methods: {
    ...mapActions([
        "initBoard",
        "unbindBoard"
    ])
  },
  mounted() {
    if (this.id !== this.boardId) {
      this.initBoard(this.id);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.params.id !== this.id) {
      this.unbindBoard();
    }
    next();
  }
}
</script>

<style scoped>

</style>