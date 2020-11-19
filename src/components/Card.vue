<template>
  <b-card class="draggable">
    <div class="d-flex">
      <b-card-title class="h5">
        <input
            type="text"
            ref="title"
            placeholder="Card title"
            v-model="title"
            @keypress="handleTitleKeypress">
      </b-card-title>
      <a class="ml-auto" href="#" @click="removeCard">x</a>
    </div>
    <b-card-text>
      <textarea
          placeholder="Enter some text..."
          ref="textarea"
          type="text"
          v-model="content"
          @input="cardDataChanged">
      </textarea>
    </b-card-text>

    <TagBar :card-id="id"/>
  </b-card>
</template>

<script>
import TagBar from "@/components/TagBar";
import { mapActions } from "vuex";

export default {
  name: "Card",
  props: ["cardData", "columnId"],
  components: {
    TagBar
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
        columnId: this.columnId,
        cardId: this.id
      });
    },
    ...mapActions([
        "setCardTitle",
        "setCardContent",
        "setCardTags"
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