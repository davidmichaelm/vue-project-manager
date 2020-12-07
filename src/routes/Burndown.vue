<template>
  <b-container>
    <BoardPageHeader
        :board-id="boardId"
        :board-title="boardTitle"
        page-title="Burndown Chart"/>

    <GChart
        v-if="chartData"
        type="LineChart"
        :data="chartData"
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
        <label>Total Number of Tasks</label>
        <b-input type="number" v-model="tasks" />
      </div>

      <div class="d-flex flex-column col-12 col-md-6 my-3">
        <label>Done Column</label>
        <b-form-select v-model="doneColumn" :options="columnOptions">
        </b-form-select>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap">
      <div class="col-12 col-md-6 my-3">
        <label>Filter By Tag</label>
        <b-select v-model="filterByTag" :options="filterByTagOptions">
          <b-select-option :value="null">None</b-select-option>
        </b-select>
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
      chartOptions: {
        legend: {
          position: "top",
          alignment: "end"
        },
        lineWidth: 3,
        pointSize: 4,
        vAxis: {
          title: "Tasks Completed",
          format: "0"
        },

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
    tasks: {
      get() {
        return parseInt(this.burndown?.tasks);
      },
      set(value) {
        this.updateBurndownOption({
          option: "tasks",
          value: parseInt(value)
        });
      }
    },
    doneColumn: {
      get() {
        return this.burndown?.doneColumn;
      },
      set(value) {
        this.updateBurndownOption({
          option: "doneColumn",
          value: value
        });
      }
    },
    filterByTag: {
      get() {
        return this.burndown?.filterByTag;
      },
      set(value) {
        this.updateBurndownOption({
          option: "filterByTag",
          value: value
        })
      }
    },
    filterByTagOptions() {
      return Object.keys(this.allTagData);
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
    doneColumnHistory() {
      return this.$store.getters.getColumnById(this.doneColumn)?.history;
    },
    daysBetweenDates() {
      const timeBetweenDates = this.endDateObject.getTime() - this.startDateObject.getTime();
      return timeBetweenDates / (1000 * 3600 * 24);
    },
    chartData() {
      if (!this.startDate
          || !this.endDate
          || !this.doneColumnHistory
          || this.daysBetweenDates < 0
          || !this.tasks) return null;

      let tasksPerDay = this.tasks / this.daysBetweenDates;

      let results = [["Date", "Ideal Tasks Completed", "Actual Tasks Completed"]];
      let latestTasksComplete = this.tasks;
      for (let i = 0; i <= this.daysBetweenDates; i++) {
        let date = new Date(+this.startDateObject).setDate(this.startDateObject.getDate() + i);

        let ideal = this.tasks - (tasksPerDay * i);

        const dateHistory = this.doneColumnHistory[this.getDateStringForDate(date)];
        let numCards = !this.filterByTag
            ? dateHistory?.numCards
            : dateHistory?.numCardsWithTag[this.filterByTag];

        let actual;
        if (this.isTodayOrEarlier(date)) {
          actual = numCards ? this.tasks - numCards : latestTasksComplete;
          latestTasksComplete = actual;
        } else {
          actual = null;
        }

        results.push([new Date(date), ideal, actual]);
      }
      return results;
    },
    ...mapGetters([
      "columns",
      "burndown",
      "allTagData"
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
    isTodayOrEarlier(date) {
      const today = new Date()
      today.setHours(0,0,0,0);
      return date <= today;
    },
    ...mapActions([
      "updateBurndownOption"
    ])
  }
}
</script>

<style scoped>

</style>