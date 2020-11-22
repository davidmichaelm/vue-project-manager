import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-debounce";
import App from "./App.vue";
import firebase from "firebase/app";
import {store} from "./store";

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  render: h => h(App),
}).$mount("#app")
