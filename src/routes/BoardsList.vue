<template>
  <b-container class="col-12 col-sm-9 col-md-7 col-lg-6">
    <div class="d-flex flex-wrap align-items-center">
      <h1 class="mr-auto col-12 col-sm-6 p-0">My Boards</h1>
      <div class="col-12 col-sm-auto p-0">
        <a href="#" class="btn btn-primary" @click="$bvModal.show('add-board-modal')">+ Add a new board</a>
      </div>
    </div>
    <b-list-group class="mt-3">
      <BoardListItem
          v-for="board in getUserOwnedBoards()"
          :key="board.id"
          :board="board"
          @delete-board="deleteBoard"/>

      <b-list-group-item v-if="getUserOwnedBoards().length === 0">
        Nothing to see here... yet!
      </b-list-group-item>
    </b-list-group>

    <h5 class="mt-3" v-if="getUserEditorBoards().length > 0">Boards you have access to</h5>
    <b-list-group class="mt-3">
      <BoardListItem
          v-for="board in getUserEditorBoards()"
          :key="board.id"
          :board="board"
          not-owner=true />
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
              required/>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import {mapState} from "vuex";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import BoardListItem from "@/components/BoardListItem";

export default {
  name: "BoardsList",
  components: {
    BoardListItem,
  },
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
    }),
    ...mapGetters([
      "getUserOwnedBoards",
      "getUserEditorBoards"
    ])
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
      "unbindUserBoards",
      "addBoard",
      "deleteBoard"
    ])
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push("/");
      return;
    }

    this.bindUserBoards(this.userId);
  },
  destroyed() {
    this.unbindUserBoards();
  }

}
</script>

<style scoped>

</style>