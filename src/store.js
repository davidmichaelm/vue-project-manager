import Vue from "vue";
import Vuex from "vuex";
import {vuexfireMutations, firestoreAction} from "vuexfire";
import {db} from "./db";
import firebase from 'firebase/app'

Vue.use(Vuex);

const testBoardRef = db.collection("boards").doc("WzwoDyMcFyVolflObXLK");

export const store = new Vuex.Store({
    state: {
        board: {
            title: "",
            tags: {}
        },
        columns: [],
        cards: []
    },
    getters: {
        getColumnById: (state) => (id) => {
            return state.columns.find(column => column.id === id);
        },
        getCardById: (state) => (id) => {
            return state.cards.find(card => card.id === id);
        },
        getTagsByCardId: (state, getters) => (id) => {
            return getters.getCardById(id).tags;
        },
        getCardsByColumnId: (state, getters) => (id) => {
            if (state.cards.length > 0) {
                return getters.getColumnById(id).cards.map(c => getters.getCardById(c));
            }
        },
        getMaxColumnIndex: (state) => () => {
            if (state.columns.length > 0) {
                return state.columns.map(column => column.index)
                    .reduce((a, b) => Math.max(a, b));
            }
        }
    },
    mutations: {
        updateCardsList(state, {column, cards}) {
            column.cards = cards;
        },
        ...vuexfireMutations
    },
    actions: {
        setBoardTitle(context, title) {
            testBoardRef.update({
                title: title
            })
                .then(() => console.log("title updated!"));
        },
        async addTag(context, {tag, tagData}) {
            testBoardRef.update({
                [`tags.${tag}`]: tagData
            }).then(() => console.log('tag added!'));
        },
        addColumn({getters}) {
            testBoardRef.collection("columns")
                .add({
                    title: "",
                    index: getters.getMaxColumnIndex() + 1,
                    cards: []
                })
                .then(() => console.log('column added!'));
        },
        removeColumn(context, id) {
            testBoardRef.collection("columns")
                .doc(id)
                .delete()
                .then(() => console.log('column removed!'));
        },
        setColumnTitle(context, {id, title}) {
            testBoardRef.collection("columns").doc(id)
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

            testBoardRef.collection("columns").doc(columnId)
                .update({
                    cards: cards
                }).then(() => console.log('cards list updated!'));
        },
        addCard(context, columnId) {
            testBoardRef.collection("cards").add({
                title: "",
                content: "",
                tags: []
            })
                .then((doc) => {
                    testBoardRef.collection("columns").doc(columnId)
                        .update({
                            cards: firebase.firestore.FieldValue.arrayUnion(doc.id)
                        })
                        .then(() => console.log('card added!'));
                })
        },
        removeCard(context, {columnId, cardId}) {
            testBoardRef.collection("columns").doc(columnId)
                .update({
                    cards: firebase.firestore.FieldValue.arrayRemove(cardId)
                })
                .then(() => {
                    testBoardRef.collection("cards")
                        .doc(cardId)
                        .delete()
                        .then(() => console.log('card removed!'));
                })

        },
        setCardContent(context, {id, content}) {
            testBoardRef.collection("cards").doc(id)
                .update({
                    content: content
                })
                .then(() => console.log('card content updated!'));
        },
        setCardTitle(context, {id, title}) {
            testBoardRef.collection("cards").doc(id)
                .update({
                    title: title
                })
                .then(() => {
                    console.log('card title updated!')
                });
        },
        addCardTag(context, {cardId, tag}) {
            testBoardRef.collection("cards").doc(cardId)
                .update({
                    tags: firebase.firestore.FieldValue.arrayUnion(tag)
                }).then(() => {
                console.log('card tags updated!')
            });
        },
        removeCardTag(context, {cardId, tag}) {
            testBoardRef.collection("cards").doc(cardId)
                .update({
                    tags: firebase.firestore.FieldValue.arrayRemove(tag)
                }).then(() => {
                console.log('card tag removed!')
            });
        },
        bindBoard: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("board", testBoardRef);
        }),
        bindColumns: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("columns", testBoardRef.collection("columns").orderBy("index", "asc"));
        }),
        bindCards: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("cards", testBoardRef.collection("cards"))
        }),
        init(context) {
            Promise.all([context.dispatch("bindBoard"),
                context.dispatch("bindColumns"),
                context.dispatch("bindCards")])
                .then(() => {
                    console.log("all data retrieved!")
                });
        }
    }
});