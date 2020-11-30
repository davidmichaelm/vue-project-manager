<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="boardTitle"
        page-title="Burndown Chart"/>

    <div class="d-flex flex-row flex-wrap justify-content-center">
      <div class="col-12 col-md-6 my-3">
        <label>Start Date</label>
        <b-form-datepicker v-model="startDate"></b-form-datepicker>
      </div>

      <div class="col-12 col-md-6 my-3">
        <label>End Date</label>
        <b-form-datepicker v-model="endDate"></b-form-datepicker>
      </div>

    </div>

    <div class="d-flex flex-row flex-wrap justify-content-center">

      <div class="d-flex flex-column col-12 col-md-6 my-3">
        <label>Doing Column</label>
        <b-form-select v-model="doingColumn" :options="columnOptions">
        </b-form-select>
      </div>


      <div class="d-flex flex-column col-12 col-md-6 my-3">
        <label>Done Column</label>
        <b-form-select v-model="doneColumn" :options="columnOptions">
        </b-form-select>
      </div>
    </div>

  </b-container>
</template>

<script>
import {boardBehavior} from "@/components/mixins/board-behavior";
import BoardPageHeader from "@/components/board/BoardPageHeader";
import {mapGetters} from "vuex";
import {mapActions} from "vuex";

export default {
  name: "Burndown",
  components: {
    BoardPageHeader
  },
  mixins: [boardBehavior],
  computed: {
    startDate: {
      get() {
        return this.burndown.startDate;
      },
      set(value) {
        this.updateBurndownOption({
          option: "startDate",
          value: value
        });
      }
    },
    endDate: {
      get() {
        return this.burndown.endDate;
      },
      set(value) {
        this.updateBurndownOption({
          option: "endDate",
          value: value
        });
      }
    },
    doingColumn: {
      get() {
        return this.burndown.doingColumn;
      },
      set(value) {
        this.updateBurndownOption({
          option: "doingColumn",
          value: value
        });
      }
    },
    doneColumn: {
      get() {
        return this.burndown.doneColumn;
      },
      set(value) {
        this.updateBurndownOption({
          option: "doneColumn",
          value: value
        });
      }
    },

    columnOptions() {
      return this.columns.map(c => {
        return {
          value: c.id,
          text: c.title
        }
      })
    },
    ...mapGetters([
      "columns",
      "burndown"
    ])
  },
  methods: {
    ...mapActions([
      "updateBurndownOption"
    ])
  }
}
</script>

<style scoped>

</style>