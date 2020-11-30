import Vue from "vue";
import Vuex from "vuex";
import {vuexfireMutations} from "vuexfire";
import {boardStore} from "@/stores/board-store";
import {cardStore} from "@/stores/card-store";
import {userStore} from "@/stores/user-store";
import {columnStore} from "@/stores/column-store";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        boardStore,
        columnStore,
        cardStore,
        userStore
    },
    mutations: {
        ...vuexfireMutations
    }
});