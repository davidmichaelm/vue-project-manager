<template>
  <b-collapse :id="id">
    <div class="p-3 mb-3 border rounded col-lg-9 col-xl-8">
      <div class="d-flex flex-row">
        <h4>Tags</h4>
        <a href="#" class="ml-auto" v-b-toggle="id">Close</a>
      </div>
      <div class="d-flex flex-column flex-md-row">
        <div class="col-md-6 px-0">
          <div class="d-flex flex-row flex-wrap align-items-center align-content-start col-12 px-0">
            <div v-for="tag in tags" :key="tag">
              <Tag
                  class="tag"
                  :name="tag"
                  :tagData="allTagData[tag]"
                  @click="showTag(tag)"/>
            </div>

            <a href="#" id="'add-tag-collapse" class="text-primary d-flex align-items-center">
              <b-icon-plus class="h4 mb-0"/>
              Add a tag
            </a>
            <AddTagPopover @addTag="addTag" target="'add-tag-collapse" :all-tag-data="allTagData" />
          </div>
        </div>

        <div v-if="tagToShow" class="col-12 col-md-6 border rounded p-2 mt-2 mt-md-0">
          <Tag
              :name="tagToShow.name"
              :tagData="tagToShow"/>

          <div class="m-1">
            <div class="d-flex">
              <div class="text-nowrap mr-3">Color:</div>
              <a href="#" id="tag-bg" :class="tagToShow.backgroundColor + ' btn btn-block col-6'"></a>
            </div>

            <b-popover
                target="tag-bg"
                ref="popover"
                triggers="focus"
                placement="bottom">
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

            <div class="mt-2">
              <b-button variant="outline-danger" size="sm" @click="removeTagFromBoard(tagToShow.name)">Delete</b-button>
            </div>
          </div>

        </div>

        <div v-else
             class="d-flex col-12 col-md-6 p-4 p-md-0 mt-2 mt-md-0 border rounded justify-content-center align-items-center text-secondary">
          Click a tag to edit
        </div>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import Tag from "@/components/board/Tag";
import {mapActions, mapGetters} from "vuex";
import {BIconPlus} from "bootstrap-vue";
import AddTagPopover from "@/components/board/AddTagPopover";

export default {
  name: "TagCollapse",
  props: ["id"],
  components: {
    AddTagPopover,
    Tag,
    BIconPlus
  },
  data() {
    return {
      tagToShowName: null
    }
  },
  computed: {
    tags() {
      return Object.keys(this.allTagData);
    },
    selectAll: {
      get: function () {
        return this.tags ? this.selected.length === this.tags.length : false;
      },
      set: function (value) {
        if (value) {
          this.selected = this.tags;
        } else if (this.selected === this.tags) {
          this.selected = [];
        }
      }
    },
    selected: {
      get() {
        return this.filterByTags;
      },
      set(value) {
        this.setFilterByTags(value);
      }
    },
    tagToShow() {
      if (!this.tagToShowName) return null;

      return {
        name: this.tagToShowName,
        ...this.allTagData[this.tagToShowName]
      }
    },
    ...mapGetters([
      "allTagData",
      "filterByTags"
    ])
  },
  methods: {
    showTag(tag) {
      this.tagToShowName = tag;
    },
    removeTagFromBoard(tag) {
      this.$store.dispatch("removeTagFromBoard", tag)
          .then(() => {
            this.tagToShowName = null;
          });
    },
    setTagColor(color) {
      this.updateTag({
        tag: this.tagToShow.name,
        tagField: "backgroundColor",
        tagFieldData: color
      })
    },
    addTag({newTag, newTagColor}) {
      if (this.tags.includes(newTag)) return;

      if (!(newTag in this.allTagData)) {
        this.$store.dispatch("addTag", {
          tag: newTag,
          tagData: {
            backgroundColor: newTagColor,
            color: "text-white"
          }
        });
      }
    },
    ...mapActions([
      "setFilterByTags",
      "updateTag"
    ])
  }
}
</script>

<style scoped>
.tag {
  cursor: pointer;
}
</style>