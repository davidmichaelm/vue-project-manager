<template>
  <div>
    <div v-if="tags.length !== 0" class="d-flex flex-wrap flex-row align-items-center">
      <Tag
          v-for="tag in tags"
          :name="tag"
          :key="tag"/>
      <a href="#" :id="'add-tag-' + id">
        <b-icon-plus class="h4 mb-0 text-primary"/>
      </a>
    </div>
    <div v-else>
      <a href="#" :id="'add-tag-' + id" class="text-primary d-flex align-items-center">
        <b-icon-plus class="h4 mb-0"/>
        Add a tag
      </a>
    </div>

    <b-popover
        :target="'add-tag-' + id"
        ref="popover"
        :show.sync="popoverShow"
        @shown="onPopoverShown"
        triggers="focus"
        placement="bottom">
      <div class="d-flex flex-row">
        <input type="text" :class="newTagColor + ' text-light'" ref="tagInput" v-model="newTag" @keypress="handleKeypress">
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
  </div>
</template>

<script>
import { store } from "@/store";
import Tag from "@/components/Tag";
import { BIconPlus } from "bootstrap-vue";

export default {
  name: "TagBar",
  props: ["tags", "cardId"],
  components: {
    Tag,
    BIconPlus
  },
  data() {
    return {
      newTag: "",
      newTagColor: "bg-primary",
      allTagData: store.boards["0"].tags,
      popoverShow: false,
      id: Math.random()
    }
  },
  methods: {
    onPopoverShown() {
      this.focusPopoverInput();
    },
    focusPopoverInput() {
      this.$refs.tagInput.focus();
    },
    handleKeypress(event) {
      if (event.key === "Enter") {
        this.addTag();
      }
    },
    addTag() {
      if (this.tags.includes(this.newTag)) {
        this.closePopover()
        return;
      }

      if (!(this.newTag in this.allTagData)) {
        this.allTagData[this.newTag] = {
          backgroundColor: this.newTagColor,
          color: "text-white"
        }
      }

      this.tags.push(this.newTag);
      this.closePopover()
    },
    closePopover() {
      this.newTag = "";
      this.popoverShow = false;
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