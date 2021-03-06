<template>
  <div class="board-column col-8 col-sm-6 col-md-5 col-xl-3 d-flex flex-column px-0 mr-3">
    <div class="d-flex">
      <label class="mr-auto h5">
        <input
            type="text"
            placeholder="Column name"
            :value="title"
            v-debounce="debounceTitle"
            @keypress="handleTitleKeypress" />
      </label>

      <template v-if="ready">
        <a href="#" class="h4" :id="'col-dots-' + id" tabindex="0">
          <b-icon-three-dots/>
        </a>
        <b-popover
            ref="popover"
            :target="'col-dots-' + id"
            triggers="focus"
            placement="bottom">
          <button class="btn btn-danger" @click="removeColumn(id)">Delete</button>
        </b-popover>
        <a href="#" class="h4" @click="addCard(id)">
          <b-icon-plus/>
        </a>
      </template>

    </div>

    <template v-if="cards">
      <draggable
          v-model="cards"
          group="cards"
          :emptyInsertThreshold="100">
        <Card
            v-for="card in cards"
            :key="card.id"
            ref="card"
            :column-id="id"
            :card-data=card />
      </draggable>
    </template>


  </div>
</template>

<script>
import Card from "@/components/board/Card";
import {BIconThreeDots, BIconPlus} from 'bootstrap-vue';
import draggable from "vuedraggable";
import {mapActions, mapGetters} from 'vuex'

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
      id: this.columnData.id,
      cardAdded: false,
      ready: false
    }
  },
  computed: {
    title: {
      get() {
        return this.columnData.title;
      },
      set(value) {
        this.setColumnTitle({
          id: this.id,
          title: value});
      }
    },
    cards: {
      get() {
        if (this.filterByTags.length > 0) {
          return this.$store.getters.getCardsByColumnIdAndTags(this.id, this.filterByTags) ?? [];
        } else {
          return this.$store.getters.getCardsByColumnId(this.id) ?? [];
        }
      },
      set(value) {
        this.$store.dispatch("updateCardsList", {
          columnId: this.id,
          cards: value.map(v => v.id)
        });
      }
    },
    ...mapGetters([
        "getCardsByColumnIdAndTags",
        "filterByTags"
    ])
  },
  methods: {
    handleTitleKeypress(event) {
      if (event.key === "Enter") {
        // Add a card if there aren't any
        if (this.cards.length === 0) {
          this.addCard(this.id)

          // Set a flag to show we have just added a card
          this.cardAdded = true;
        }
      }
    },
    debounceTitle(value) {
      this.title = value;
    },
    addCard(columnId) {
      this.cardAdded = true;
      this.$store.dispatch("addCard", columnId);
    },
    ...mapActions([
      "removeColumn",
      "setColumnTitle"
    ])
  },
  watch: {
    // Watch the cards list and focus a card if it was just created
    cards(newValue, oldValue) {
      if (this.cardAdded) {
        // Exit early if we don't know about any cards in refs
        if (!("card" in this.$refs)) return;

        this.$nextTick(() => {
          // Make sure there is a card ref and that we're adding 1 card
          if (this.$refs.card.length > 0 && newValue.length === oldValue.length + 1) {
            this.cardAdded = false;
            this.$refs.card[newValue.length - 1].focusTitle();
          }
        });
      }
    }
  },
  mounted() {
    this.ready = true;
  }
}
</script>

<style scoped>
.board-column {
  display: inline-block !important;
  float: none;
}

input {
  border: none;
  width: 100%;
}

input:focus {
  outline: none;
}

@media only screen and (min-width: 768px) {
  .board-column {
    max-width: 300px;
  }
}
</style>