<template>
  <b-container>
    <div class="d-flex align-items-center justify-content-center flex-wrap-reverse flex-md-nowrap">
      <div class="col m-3">
        <h1>Manage your projects</h1>
        <p>Vue Project Manager is a Scrum or Kanban-style project board with real-time <b>cloud saving</b> and <b>collaboration</b>.
          Plus, visualize your progress with a <b>Burndown chart</b>.</p>
        <p v-if="isLoggedIn">
          <router-link to="/myboards">
            <b-button variant="primary">Go to My Boards</b-button>
          </router-link>
        </p>
        <p v-else>
          <router-link to="/login">
            <b-button variant="primary">Sign up</b-button>
          </router-link>
        </p>
      </div>
      <div class="m-3 col-12 col-md-6">
        <img width="100%" :src="require('@/assets/undraw_Scrum_board_re_wk7v.svg')"/>
      </div>
    </div>

    <div class="d-flex flex-column align-items-center m-5">
      <div><h2>Built with</h2></div>
      <div class="d-flex flex-row m-3 justify-content-center flex-wrap flex-md-nowrap">
        <div class="d-flex flex-column align-items-center m-3">
          <a href="https://vuejs.org"><img height="128px" class="m-2" alt="Vue.js logo" :src="require('@/assets/256px-Vue.js_Logo_2.svg.png')"/></a>
          <h4>Vue.js</h4>
        </div>

        <div class="d-flex flex-column align-items-center m-3">
          <a href="https://firebase.google.com"><img height="128px" class="m-2" alt="Firebase logo" :src="require('@/assets/Firebase_Logo_Logomark.svg')"/></a>
          <h4>Firebase</h4>
        </div>

        <div class="d-flex flex-column align-items-center m-3">
          <a href="https://getbootstrap.com"><img height="128px" class="m-2" alt="Bootstrap logo" :src="require('@/assets/bootstrap-solid.svg')"/></a>
          <h4>Bootstrap</h4>
        </div>
      </div>
    </div>
  </b-container>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LandingPage",
  computed: {
    ...mapGetters([
      "isLoggedIn"
    ])
  }
}
</script>

<style scoped>

</style>