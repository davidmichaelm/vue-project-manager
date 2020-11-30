import {boardRef} from "@/stores/board-store";
import {firestoreAction} from "vuexfire";

export const columnStore = {
    state: {
        columns: []
    },
    mutations: {
        updateCardsList(state, {column, cards}) {
            column.cards = cards;
        }
    },
    getters: {
        columns: (state) => {
            return state.columns ?? null;
        },
        getColumnById: (state) => (id) => {
            return state.columns.find(column => column.id === id);
        },
        maxColumnIndex: (state) => {
            if (state.columns.length > 0) {
                return state.columns.map(column => column.index)
                    .reduce((a, b) => Math.max(a, b));
            } else {
                return 0;
            }
        }
    },
    actions: {
        addColumn({getters}) {
            boardRef.collection("columns")
                .add({
                    title: "",
                    index: getters.maxColumnIndex + 1,
                    cards: []
                })
                .then(() => console.log('column added!'));
        },
        removeColumn(context, id) {
            boardRef.collection("columns")
                .doc(id)
                .delete()
                .then(() => console.log('column removed!'));
        },
        setColumnTitle(context, {id, title}) {
            boardRef.collection("columns").doc(id)
                .update({
                    title: title
                })
                .then(() => {
                    console.log('title updated!')
                });
        },
        updateCardsList({commit, getters}, {columnId, cards}) {
            const column = getters.getColumnById(columnId);
            commit("updateCardsList", {column, cards});

            boardRef.collection("columns").doc(columnId)
                .update({
                    cards: cards
                }).then(() => console.log('cards list updated!'));
        },
        bindColumns: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("columns", boardRef.collection("columns").orderBy("index", "asc"));
        })
    }
}