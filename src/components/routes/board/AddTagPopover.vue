<template>
  <b-popover
      :target="target"
      ref="popover"
      :show.sync="popoverShow"
      @shown="onPopoverShown"
      triggers="focus"
      placement="bottom">
    <div class="d-flex flex-row">
      <input
          type="text"
          :class="newTagColor + ' text-light'"
          ref="tagInput"
          v-model="newTag"
          @keypress="handleKeypress"
          @keyup="handleKeyUp">
      <a href="#" @click="addTag">
        <b-icon-plus class="h4 mb-0 text-primary"/>
      </a>
    </div>
    <div>
      <a href="#" class="btn btn-primary m-1" @click="setTagColor('bg-primary')"></a>
      <a href="#" class="btn btn-secondary m-1" @click="setTagColor('bg-secondary')"></a>
      <a href="#" class="btn btn-success m-1" @click="setTagColor('bg-success')"></a>
      <a href="#" class="btn btn-danger m-1" @click="setTagColor('bg-danger')"></a>
      <a href="#" class="btn btn-warning m-1" @click="setTagColor('bg-warning')"></a>
      <a href="#" class="btn btn-info m-1" @click="setTagColor('bg-info')"></a>
      <a href="#" class="btn btn-dark m-1" @click="setTagColor('bg-dark')"></a>
    </div>
  </b-popover>
</template>

<script>
import {BIconPlus} from "bootstrap-vue";

export default {
  name: "AddTagPopover",
  props: ["target", "allTagData"],
  components: {
    BIconPlus
  },
  data() {
    return {
      popoverShow: false,
      newTag: "",
      newTagColor: "bg-primary"
    }
  },
  methods: {
    onPopoverShown() {
      this.focusPopoverInput();
    },
    focusPopoverInput() {
      this.$refs.tagInput.focus();
    },
    closePopover() {
      this.newTag = "";
      this.popoverShow = false;
    },
    addTag() {
      this.$emit("addTag", {newTag: this.newTag, newTagColor: this.newTagColor});
      this.closePopover()

    },
    handleKeypress(event) {
      if (event.key === "Enter") {
        this.addTag();
      }
    },
    handleKeyUp() {
      if (Object.prototype.hasOwnProperty.call(this.allTagData, this.newTag)) {
        this.newTagColor = this.allTagData[this.newTag]["backgroundColor"];
      } else {
        this.newTagColor = "bg-primary";
      }
    },
    setTagColor(color) {
      this.newTagColor = color;
      this.focusPopoverInput();
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;

  border: none;
}

input:focus {
  outline: none;
}
</style>