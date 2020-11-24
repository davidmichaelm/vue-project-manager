<template>
  <b-container class="col-12 col-sm-9 col-md-7 col-lg-6">
    <div class="d-flex flex-wrap align-items-center">
      <h1 class="mr-auto col-12 col-sm-6 p-0">My Boards</h1>
      <div class="col-12 col-sm-auto p-0">
        <a href="#" class="btn btn-primary" @click="$bvModal.show('add-board-modal')">+ Add a new board</a>
      </div>
    </div>
    <b-list-group class="mt-3">
      <b-list-group-item class="d-flex align-items-center" v-for="board in boards" :key="board.id">
        <router-link :to="`/board/${board.id}`">
          {{ board.title }}
        </router-link>

        <router-link :to="`/board/${board.id}/burndown`"
                     class="ml-auto mb-auto h5 pr-2">
          <b-icon-bar-chart-line-fill flip-h=true />
        </router-link>

        <a href="#" class="mb-auto h4" :id="'dots-' + board.id" tabindex="0">
          <b-icon-three-dots/>
        </a>
        <b-popover
            ref="popover"
            :target="'dots-' + board.id"
            triggers="focus"
            placement="bottom">
          <button class="btn btn-danger" @click="deleteBoard(board.id)">Delete</button>
        </b-popover>
      </b-list-group-item>
      <b-list-group-item v-if="boards.length === 0">
        You haven't created any boards yet!
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
              required/>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import {mapState} from "vuex";
import {mapActions} from "vuex";
import {BIconThreeDots, BIconBarChartLineFill} from "bootstrap-vue";

export default {
  name: "BoardsList",
  components: {
    BIconThreeDots,
    BIconBarChartLineFill
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
      "addBoard",
      "deleteBoard"
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