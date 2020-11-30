<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="boardTitle"
        page-title="Burndown Chart"/>

    <div class="d-flex flex-row flex-wrap justify-content-center">
      <div class="m-3 col-12 col-md-5">
        <label>Start Date</label>
        <b-form-datepicker v-model="startDate"></b-form-datepicker>
      </div>

      <div class="m-3 col-12 col-md-5">
        <label>End Date</label>
        <b-form-datepicker v-model="endDate"></b-form-datepicker>
      </div>

    </div>

    <div class="d-flex flex-row flex-wrap justify-content-center">

      <div class="d-flex flex-column m-3 col-12 col-md-5">
        <label>Doing Column</label>
        <b-form-select v-model="doingColumn" :options="columnOptions">
          <b-form-select-option :value="null">Please select a column</b-form-select-option>
        </b-form-select>
      </div>


      <div class="d-flex flex-column m-3 col-12 col-md-5">
        <label>Done Column</label>
        <b-form-select v-model="doneColumn" :options="columnOptions">
          <b-form-select-option :value="null">Please select a column</b-form-select-option>
        </b-form-select>
      </div>
    </div>

  </b-container>
</template>

<script>
import {boardBehavior} from "@/components/mixins/board-behavior";
import BoardPageHeader from "@/components/board/BoardPageHeader";
import {mapGetters} from "vuex";

export default {
  name: "Burndown",
  components: {
    BoardPageHeader
  },
  mixins: [boardBehavior],
  data() {
    return {
      startDate: null,
      endDate: null,
      doingColumn: null,
      doneColumn: null
    }
  },
  computed: {
    columnOptions() {
      return this.columns.map(c => {
        return {
          value: c.id,
          text: c.title
        }
      })
    },
    ...mapGetters([
        "columns"
    ])
  }
}
</script>

<style scoped>

</style>