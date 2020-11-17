<template>
  <div>
    <div v-if="tags.length !== 0" class="d-flex flex-wrap flex-row align-items-center">
      <Tag
          v-for="(tag, index) in tags"
          :name="tag"
          :tagData="allTagData[tag]"
          :key="tag"
          @removeTag="removeTag(index)"/>
      <a href="#" :id="'add-tag-' + id">
        <b-icon-plus class="h4 mb-0 text-primary"/>
      </a>
      <AddTagPopover @addTag="addTag" :target="'add-tag-' + id" :all-tag-data="allTagData" />
    </div>
    <div v-else>
      <a href="#" :id="'add-tag-' + id" class="text-primary d-flex align-items-center">
        <b-icon-plus class="h4 mb-0"/>
        Add a tag
      </a>
      <AddTagPopover @addTag="addTag" :target="'add-tag-' + id" :all-tag-data="allTagData" />
    </div>

  </div>
</template>

<script>
import { store } from "@/store";
import Tag from "@/components/Tag";
import { BIconPlus } from "bootstrap-vue";
import AddTagPopover from "@/components/AddTagPopover";

export default {
  name: "TagBar",
  props: ["tags", "cardId"],
  components: {
    Tag,
    BIconPlus,
    AddTagPopover
  },
  data() {
    return {
      allTagData: store.boards["0"].tags,
      id: Math.random()
    }
  },
  methods: {
    addTag({newTag, newTagColor}) {
      if (this.tags.includes(newTag)) return;

      if (!(newTag in this.allTagData)) {
        this.allTagData[newTag] = {
          backgroundColor: newTagColor,
          color: "text-white"
        }
      }

      this.tags.push(newTag);
    },
    removeTag(index) { // TODO: props should not be mutated
      this.tags.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>