<template>
  <b-card class="draggable mb-2">
    <div class="d-flex">
      <b-card-title class="h5">
        <input
            type="text"
            ref="title"
            placeholder="Card title"
            :value="title"
            v-debounce="debounceTitle"
            @keypress="handleTitleKeypress">
      </b-card-title>
      <a class="ml-auto" href="#" @click="removeCard">
        <b-icon-x class="h4 m-auto"/>
      </a>
    </div>
    <b-card-text>
      <textarea
          placeholder="Enter some text..."
          ref="textarea"
          type="text"
          :value="content"
          v-debounce="debounceContent"
          @input="cardDataChanged">
      </textarea>
    </b-card-text>

    <TagBar :card-id="id"/>
  </b-card>
</template>

<script>
import TagBar from "@/components/board/TagBar";
import { mapActions } from "vuex";
import { BIconX } from "bootstrap-vue";

export default {
  name: "Card",
  props: ["cardData", "columnId"],
  components: {
    TagBar,
    BIconX
  },
  data() {
    return {
      id: this.cardData.id,
      tags: this.cardData.tags
    }
  },
  computed: {
    title: {
      get() {
        return this.cardData.title;
      },
      set(value) {
        this.setCardTitle({
          id: this.id,
          title: value
        })
      }
    },
    content: {
      get() {
        return this.cardData.content;
      },
      set(value) {
        this.setCardContent({
          id: this.id,
          content: value
        })
      }
    }
  },
  methods: {
    setContentHeight() {
      this.$refs.textarea.style.height = "";
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px";
    },
    cardDataChanged() {
      this.setContentHeight();
    },
    handleTitleKeypress(event) {
      if (event.key === "Enter") {
        this.$refs.textarea.focus();
      }
    },
    focusTitle() {
      this.$refs.title.focus();
    },
    removeCard() {
      this.$store.dispatch("removeCard", {
        cardId: this.id,
        columnId: this.columnId
      });
    },
    debounceContent(value) {
      this.content = value;
    },
    debounceTitle(value) {
      this.title = value;
    },
    ...mapActions([
        "setCardTitle",
        "setCardContent"
    ])
  },
  mounted() {
    this.setContentHeight();
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

textarea {
  width: 100%;

  border: none;
  overflow: visible;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
}

a {
  text-decoration: none;
}

.draggable {
  cursor: pointer;
}
</style>