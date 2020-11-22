<template>
  <b-container>
    <h1>My Boards</h1>
    <b-list-group>
      <b-list-group-item v-for="board in boards" :key="board.id">
        <router-link :to="`/board/${board.id}`">
          {{ board.title }}
        </router-link>
      </b-list-group-item>
    </b-list-group>

  </b-container>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";


export default {
  name: "BoardsList",
  computed: {
    ...mapState({
      userId: state => state.user.data.id,
      boards: state => state.user.boards,
      loggedIn: state => state.user.loggedIn
    })
  },
  watch: {
    loggedIn(newValue) {
      if (newValue) {
        this.getUserBoards(this.userId)
      }
    }
  },
  methods: {
    ...mapActions([
        "getUserBoards"
    ])
  }
}
</script>

<style scoped>

</style>