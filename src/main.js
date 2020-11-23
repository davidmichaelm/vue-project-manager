import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/vue-debounce";
import App from "./App.vue";
import firebase from "firebase/app";
import {store} from "./store";

Vue.config.productionTip = false

let vueInstance;

firebase.auth().onAuthStateChanged(async (user) => {
    store.dispatch("fetchUser", user)
        .then(() => {
            if (!vueInstance) {
                vueInstance = new Vue({
                    render: h => h(App),
                }).$mount("#app")
            }
        });
});