<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="boardTitle"
        page-title="Burndown Chart"/>

    <GChart
        v-if="myChartData"
        type="LineChart"
        :data="myChartData"
        :options="chartOptions"/>

    <h5 v-else
        class="text-center bg-dark text-white p-5 m-5">
      Invalid Chart Data
    </h5>

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
import {GChart} from "vue-google-charts";

export default {
  name: "Burndown",
  components: {
    BoardPageHeader,
    GChart
  },
  mixins: [boardBehavior],
  data() {
    return {
      validChartData: true,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Date', 'Ideal Tasks Remaining', 'Actual Tasks Remaining'],
        ['11/30/2020', 2, 2],
        ['12/30/2020', 1, 2],
      ],
      chartOptions: {
        legend: {
          position: "top",
          alignment: "end"
        },
        lineWidth: 3,
        pointSize: 4,
        vAxis: { format: "0" }
      }
    }
  },
  computed: {
    startDate: {
      get() {
        return this.burndown?.startDate;
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
        return this.burndown?.endDate;
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
    startDateObject() {
      const sd = this.startDate.split("-");
      return new Date(sd[0], sd[1] - 1, sd[2]) ?? null;
    },
    endDateObject() {
      const ed = this.endDate.split("-");
      return new Date(ed[0], ed[1] - 1, ed[2]) ?? null;
    },
    doingColumnHistory() {
      return this.$store.getters.getColumnById(this.doingColumn)?.history;
    },
    doneColumnHistory() {
      return this.$store.getters.getColumnById(this.doneColumn)?.history;
    },
    doingStartHistory() {
      return this.doingColumnHistory[this.getDateStringForDate(this.startDateObject)] ?? null;
    },
    daysBetweenDates() {
      const timeBetweenDates = this.endDateObject.getTime() - this.startDateObject.getTime();
      return timeBetweenDates / (1000 * 3600 * 24);
    },
    myChartData() {
      if (!this.startDate
          || !this.endDate
          || !this.doingColumnHistory
          || !this.doneColumnHistory
          || (this.doingColumn === this.doneColumn)
          || !this.doingStartHistory
          || !this.doingStartHistory.numCards
          || this.daysBetweenDates < 0) return null;

      let tasks = this.doingStartHistory.numCards;
      let tasksPerDay = tasks / this.daysBetweenDates;

      let results = [["Date", "Ideal", "Actual"]];
      for (let i = 0; i <= this.daysBetweenDates; i++) {
        let date = new Date(+this.startDateObject).setDate(this.startDateObject.getDate() + i);

        let ideal = tasks - (tasksPerDay * i);
        const dateHistory = this.doneColumnHistory[this.getDateStringForDate(date)];
        let actual = dateHistory ? tasks - dateHistory?.numCards : null;

        results.push([new Date(date), ideal, actual]);
      }
      return results;
    },
    ...mapGetters([
      "columns",
      "burndown"
    ])
  },
  methods: {
    getDateStringForDate(date) {
      date = new Date(date);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    ...mapActions([
      "updateBurndownOption"
    ])
  }
}
</script>

<style scoped>

</style>