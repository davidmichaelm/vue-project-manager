<template>
  <b-list-group-item class="d-flex align-items-center">
    <router-link :to="`/board/${board.id}`">
      {{ board.title }}
    </router-link>

    <span class="ml-1" v-if="boardOwnerName">
      ({{ boardOwnerName }})
    </span>

    <router-link :to="`/board/${board.id}/burndown`"
                 class="ml-auto mb-auto h5 pr-2">
      <b-icon-bar-chart-line-fill flip-h/>
    </router-link>

    <router-link :to="`/board/${board.id}/board-settings`"
                 class="mb-auto h5 pr-2">
      <b-icon-gear-fill/>
    </router-link>

    <template v-if="!notOwner">
      <a href="#" class="mb-auto h4" :id="'dots-' + board.id" tabindex="0">
        <b-icon-three-dots/>
      </a>
      <b-popover
          ref="popover"
          :target="'dots-' + board.id"
          triggers="focus"
          placement="bottom">
        <button class="btn btn-danger" @click="deleteBoard">Delete</button>
      </b-popover>
    </template>
  </b-list-group-item>
</template>

<script>
import {BIconThreeDots, BIconBarChartLineFill, BIconGearFill} from "bootstrap-vue";
import {db} from "@/db";
import firebase from "firebase/app";

export default {
  name: "BoardListItem",
  props: ["board", "notOwner"],
  components: {
    BIconThreeDots,
    BIconBarChartLineFill,
    BIconGearFill
  },
  data() {
    return {
      boardOwnerName: ""
    }
  },
  methods: {
    deleteBoard() {
      if (!this.notOwner) {
        this.$emit("delete-board", this.board.id);
      }
    },
    getBoardOwnerId() {
      const roles = this.board.roles;
      return Object.keys(roles).filter(r => roles[r] === "owner")[0];
    }
  },
  created() {
    if (this.notOwner) {
      db.collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "==", this.getBoardOwnerId())
        .limit(1)
          .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            this.boardOwnerName = doc.data().displayName;
          })

        })
    }
  }
}
</script>

<style scoped>

</style>