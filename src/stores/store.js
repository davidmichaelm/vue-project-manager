import Vue from "vue";
import Vuex from "vuex";
import {vuexfireMutations} from "vuexfire";
import {boardStore} from "@/stores/board-store";
import {userStore} from "@/stores/user-store";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        boardStore,
        userStore
    },
    mutations: {
        ...vuexfireMutations
    }
});