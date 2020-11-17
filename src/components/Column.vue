<template>
  <div class="board-column col-7 col-md-5 col-lg-4 col-xl-3 d-flex flex-column m-2">
    <div class="d-flex p-2">
      <label class="mr-auto h5">
        <input
            type="text"
            placeholder="Column name"
            v-model="columnDataLocal.title"
            @keypress="handleTitleKeypress" />
      </label>

      <a href="#" class="h4" :id="'col-dots-' + columnDataLocal.id" tabindex="0">
        <b-icon-three-dots/>
      </a>
      <b-popover
          :target="'col-dots-' + columnDataLocal.id"
          triggers="focus"
          placement="bottom">
        <button class="btn btn-danger" @click="removeColumn">Delete</button>
      </b-popover>
      <a href="#" class="h4" @click="addCard">
        <b-icon-plus/>
      </a>
    </div>

    <draggable v-model="columnDataLocal.cards" group="cards" :emptyInsertThreshold="100">
        <Card
            v-for="(card, index) in columnData.cards"
            :key="card.id"
            ref="card"
            :card-data=card
            @remove-card="removeCard(index)"
            @card-data-changed="columnDataChanged" />
    </draggable>

  </div>
</template>

<script>
import Card from "@/components/Card";
import {BIconThreeDots, BIconPlus} from 'bootstrap-vue';
import draggable from "vuedraggable";

export default {
  name: "Column",
  components: {
    Card,
    BIconThreeDots,
    BIconPlus,
    draggable
  },
  props: ["columnData"],
  data() {
    return {
      columnDataLocal: this.columnData
    }
  },
  methods: {
    addCard() {
      let id = Math.random();
      let newCard = {
        id: id,
        title: "",
        content: "",
        tags: []
      }
      this.columnData.cards.push(newCard);
    },
    removeCard(index) {
      this.columnData.cards.splice(index, 1);
    },
    handleTitleKeypress(event) {
      if (event.key === "Enter") {
        // Add a card if there aren't any
        if (this.columnDataLocal.cards.length === 0) {
          this.addCard();
        }

        // Then focus the first card
        this.$nextTick(() =>
            this.$refs.card[0].focusTitle()
        );
      } else {
        this.columnDataChanged();
      }
    },
    columnDataChanged() {
      this.$emit("column-data-changed", this.columnDataLocal);
    },
    removeColumn() {
      this.$emit("remove-column", this.columnDataLocal.id);
    }
  }
}
</script>

<style scoped>
.board-column {
  display: inline-block !important;
  float: none;
}

.empty-column {
  height: 144px;
}

input {
  border: none;
  width: 100%;
}

input:focus {
  outline: none;
}
</style>