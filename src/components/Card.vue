<template>
  <b-card>
    <div class="d-flex">
      <b-card-title class="h5">
        <input
            type="text"
            ref="title"
            placeholder="Card title"
            v-model="cardDataLocal.title"
            @keypress="handleTitleKeypress">
      </b-card-title>
      <a class="ml-auto" href="#" @click="removeCard">x</a>
    </div>
    <b-card-text>
      <textarea
          placeholder="Enter some text..."
          ref="textarea"
          type="text"
          v-model="cardDataLocal.content"
          @input="cardDataChanged">
      </textarea>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: ["cardData"],
  data() {
    return {
      cardDataLocal: this.cardData,
    }
  },
  methods: {
    removeCard() {
      this.$emit("remove-card");
    },
    setContentHeight() {
      this.$refs.textarea.style.height = "";
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + "px";
    },
    cardDataChanged() {
      this.setContentHeight();
      this.$emit("card-data-changed");
    },
    handleTitleKeypress(event) {
      if (event.key === "Enter") {
        this.$refs.textarea.focus();
      }
    },
    focusTitle() {
      this.$refs.title.focus();
    }
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
</style>