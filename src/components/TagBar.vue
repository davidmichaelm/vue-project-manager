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
        <input type="text" ref="tagInput" v-model="newTag" @keypress="handleKeypress">
        <a href="#" @click="addTag">
          <b-icon-plus class="h4 mb-0 text-primary"/>
        </a>
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
      allTagData: store.boards["0"].tags,
      popoverShow: false,
      id: Math.random()
    }
  },
  methods: {
    onPopoverShown() {
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
          backgroundColor: "bg-primary",
          color: "text-white"
        }
      }

      this.tags.push(this.newTag);
      this.closePopover()
    },
    closePopover() {
      this.newTag = "";
      this.popoverShow = false;
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