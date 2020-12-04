<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="boardTitle"
        page-title="Board Settings"/>

    <b-card class="mt-4" header="Users">
      <div class="mb-3">{{ owner }} is the owner of this board.</div>

      <h5>Editors</h5>
      <b-list-group>
        <b-list-group-item
            class="d-flex align-items-center"
            v-for="user in boardUsersNoOwner"
            :key="user.id">
          {{ user.displayName }}

          <a href="#" class="h4 ml-auto mb-0" :id="'user-dots-' + user.id" tabindex="0">
            <b-icon-three-dots/>
          </a>
          <b-popover
              ref="popover"
              :target="'user-dots-' + user.id"
              triggers="focus"
              placement="bottom">
            <button class="btn btn-danger" @click="removeUserFromBoard(user.id)">Remove</button>
          </b-popover>
        </b-list-group-item>
        <b-list-group-item>
          <input
              id="userSearch"
              :value="userSearchString"
              v-debounce="debounceUserSearchString"
              placeholder="Search users by display name to add as an editor..."/>
        </b-list-group-item>
      </b-list-group>
      <b-list-group class="ml-5 shadow rounded-0 p-0">
        <b-list-group-item
            class="d-flex align-items-center bg-light"
            v-for="user in userResults"
            :key="user.id">
          {{ user.displayName }}
          <b-button class="ml-auto"
                    variant="primary"
                    @click="handleUserInvite(user.id)">
            Invite to edit
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card class="mt-4" header="Board Title">
      <b-input-group>
        <b-form-input v-model="boardTitleInput" @keypress="handleTitleKeypress"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" @click="setBoardTitle(boardTitleInput)">Rename</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card>
  </b-container>
</template>

<script>
import {boardBehavior} from "@/components/mixins/board-behavior";
import BoardPageHeader from "@/components/board/BoardPageHeader";
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import {db} from "@/db";
import {BIconThreeDots} from "bootstrap-vue";

export default {
  name: "BoardSettings",
  components: {
    BoardPageHeader,
    BIconThreeDots
  },
  mixins: [boardBehavior],
  data() {
    return {
      userSearchString: "",
      userResults: [],
      boardTitleInput: ""
    }
  },
  computed: {
    owner() {
      return this.$store.getters.boardOwner?.displayName;
    },
    ...mapGetters([
      "boardOwner",
      "boardUsersNoOwner",
      "boardUserIds",
      "boardUserData"
    ])
  },
  methods: {
    init() {
      if (this.boardUserIds) {
        this.fetchBoardUsers();
      } else {
        console.log("Error loading users");
      }

      this.boardTitleInput = this.boardTitle;
    },
    handleUserInvite(userId) {
      this.addUserToBoard(userId)
          .then(() => {
            this.searchUsers(this.userSearchString);
          });
    },
    debounceUserSearchString(value) {
      this.userSearchString = value;
      this.searchUsers(value);
    },
    searchUsers(value) {
      if (value === "") {
        this.userResults = [];
        return;
      }

      let newResults = [];
      db.collection("users")
          .where("displayName", "not-in", this.boardUserData.map(u => u.displayName))
          .where("displayName", ">=", value)
          .where("displayName", "<=", value + "\uf8ff")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((result) => {
              newResults.push({
                ...result.data(),
                id: result.id
              });
            });
            this.userResults = newResults;
          });
    },
    handleTitleKeypress(event) {
      if (event.key === "Enter") {
        console.log("keypress")

        this.setBoardTitle(this.boardTitleInput);
      }
    },
    ...mapActions([
      "addUserToBoard",
      "fetchBoardUsers",
      "removeUserFromBoard",
      "setBoardTitle"
    ])
  },
  created() {
    if (this.boardLoaded) {
      this.init();
    } else {
      this.$on("boardLoaded", () => {
        this.init();
      });
    }
  }
}
</script>

<style scoped>
#userSearch {
  width: 100%;

  border: none;
}

input:focus {
  outline: none;
}
</style>