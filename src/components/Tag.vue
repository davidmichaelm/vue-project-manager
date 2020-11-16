<template>
  <div class="m-1 mb-2">
    <span :class="'p-1 tag ' + this.backgroundColor + ' ' + this.color">{{ name }}</span>
    <b-icon-x-circle
        class="closeButton bg-light border-dark rounded-circle"
        variant="dark"
        @click="removeTag" />
  </div>
</template>

<script>
import {store} from "@/store";
import {BIconXCircle} from "bootstrap-vue";

export default {
  name: "Tag",
  props: ["name"],
  components: {
    BIconXCircle
  },
  data() {
    return {
      backgroundColor: store.boards[0].tags[this.name].backgroundColor,
      color: store.boards[0].tags[this.name].color
    }
  },
  methods: {
    removeTag() {
      this.$emit("removeTag");
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
}

.closeButton {
  position: absolute;
  right: -7px;
  top: -7px;
  z-index: 5;
  display: none;
}

span:hover + .closeButton, .closeButton:hover {
  display: initial;
}

.closeButton:hover {
  cursor: pointer;
}
</style>