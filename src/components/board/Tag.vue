<template>
  <div class="m-1 mb-2" @click="$emit('click')" v-if="tagData">
    <span :class="'p-1 tag ' + tagData.backgroundColor + ' ' + tagData.color">{{ name }}</span>
    <b-icon-x-circle
        v-if="removeButton"
        class="closeButton bg-light border-dark rounded-circle"
        variant="dark"
        @click="removeTag" />
  </div>
</template>

<script>
import {BIconXCircle} from "bootstrap-vue";

export default {
  name: "Tag",
  props: ["name", "tagData", "removeButton"],
  components: {
    BIconXCircle
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
  display: inline-block;
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