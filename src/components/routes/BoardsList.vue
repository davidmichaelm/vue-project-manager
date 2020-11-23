<template>
  <b-container>
    <div class="d-flex align-items-center">
      <h1>My Boards</h1>
      <div class="ml-auto">
        <a href="#" class="btn btn-primary" @click="$bvModal.show('add-board-modal')">+ Add a new board</a>
      </div>
    </div>
    <b-list-group>
      <b-list-group-item v-for="board in boards" :key="board.id">
        <router-link :to="`/board/${board.id}`">
          {{ board.title }}
        </router-link>
      </b-list-group-item>
    </b-list-group>


    <b-modal
        id="add-board-modal"
        @ok="handleModalOk"
        @show="resetModal"
        @hidden="resetModal">
      <template #modal-title>
        Add a new board
      </template>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            label="Board name"
            label-for="board-name-input"
            invalid-feedback="Board name is required">
          <b-form-input
              id="board-name-input"
              type="text"
              :state="nameState"
              v-model="newBoardName"
              required />
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import {mapState} from "vuex";
import {mapActions} from "vuex";

export default {
  name: "BoardsList",
  data() {
    return {
      nameState: null,
      newBoardName: ""
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.data.id,
      boards: state => state.user.boards,
      loggedIn: state => state.user.loggedIn
    })
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleModalOk(bvModalEvt) {
      bvModalEvt.preventDefault();

      this.handleSubmit();
    },
    handleSubmit() {
      if (this.checkFormValidity()) {
        this.$nextTick(() => {
          this.$bvModal.hide('add-board-modal');
          this.addBoard({
            userId: this.userId,
            title: this.newBoardName
          });

        })
      } else {
        return;
      }
    },
    ...mapActions([
      "bindUserBoards",
      "addBoard"
    ])
  },
  mounted() {
    if (this.loggedIn) {
      this.bindUserBoards(this.userId);
    } else {
      console.log("not logged in");
    }
  }

}
</script>

<style scoped>

</style>