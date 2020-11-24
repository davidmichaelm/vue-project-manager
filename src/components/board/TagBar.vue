<template>
  <div>
    <div v-if="tags.length !== 0" class="d-flex flex-wrap flex-row align-items-center">
      <Tag
          v-for="tag in tags"
          :name="tag"
          :tagData="allTagData[tag]"
          :key="tag"
          @removeTag="removeTag(tag)"/>
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
import Tag from "@/components/board/Tag";
import { BIconPlus } from "bootstrap-vue";
import AddTagPopover from "@/components/board/AddTagPopover";

export default {
  name: "TagBar",
  props: ["cardId"],
  components: {
    Tag,
    BIconPlus,
    AddTagPopover
  },
  data() {
    return {
      id: Math.random()
    }
  },
  computed: {
    tags() {
      return this.$store.getters.getTagsByCardId(this.cardId)
    },
    allTagData() {
      return this.$store.state.board.tags
    }
  },
  methods: {
    async addTag({newTag, newTagColor}) {
      if (this.tags.includes(newTag)) return;

      if (!(newTag in this.allTagData)) {
        await this.$store.dispatch("addTag", {
          tag: newTag,
          tagData: {
            backgroundColor: newTagColor,
            color: "text-white"
          }
        });
      }

      await this.$store.dispatch("addCardTag", {
        cardId: this.cardId,
        tag: newTag
      });
    },
    removeTag(tag) {
      this.$store.dispatch("removeCardTag", {
        cardId: this.cardId,
        tag: tag
      });
    }
  }
}
</script>

<style scoped>

</style>