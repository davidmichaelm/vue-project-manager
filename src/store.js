import Vue from "vue";
import Vuex from "vuex";
import {vuexfireMutations, firestoreAction} from "vuexfire";
import {db} from "./db";
import firebase from 'firebase/app'

Vue.use(Vuex);

let boardRef;

export const store = new Vuex.Store({
    state: {
        board: {
            title: "",
            tags: {},
            roles: {}
        },
        columns: [],
        cards: [],
        user: {
            loggedIn: false,
            data: {},
            boards: []
        },
        users: []
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
            } else {
                return 0;
            }
        },
        getBoardUsers: (state) => () => {
            console.log("hello")
            if (state.board?.roles) {
                console.log(Object.keys(state.board.roles))
                return Object.keys(state.board.roles);
            }

            return null;
        }
    },
    mutations: {
        setLoggedIn(state, value) {
            state.user.loggedIn = value;
        },
        setUserData(state, data) {
            state.user.data = data;
        },
        setUserBoards(state, boards) {
            state.user.boards = boards;
        },
        updateCardsList(state, {column, cards}) {
            column.cards = cards;
        },
        ...vuexfireMutations
    },
    actions: {
        setBoardTitle(context, title) {
            boardRef.update({
                title: title
            })
                .then(() => console.log("title updated!"));
        },
        async addTag(context, {tag, tagData}) {
            boardRef.update({
                [`tags.${tag}`]: tagData
            }).then(() => console.log('tag added!'));
        },
        addColumn({getters}) {
            boardRef.collection("columns")
                .add({
                    title: "",
                    index: getters.getMaxColumnIndex() + 1,
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
        addCard(context, columnId) {
            boardRef.collection("cards").add({
                title: "",
                content: "",
                tags: []
            })
                .then((doc) => {
                    boardRef.collection("columns").doc(columnId)
                        .update({
                            cards: firebase.firestore.FieldValue.arrayUnion(doc.id)
                        })
                        .then(() => console.log('card added!'));
                })
        },
        removeCard(context, {columnId, cardId}) {
            boardRef.collection("columns").doc(columnId)
                .update({
                    cards: firebase.firestore.FieldValue.arrayRemove(cardId)
                })
                .then(() => {
                    boardRef.collection("cards")
                        .doc(cardId)
                        .delete()
                        .then(() => console.log('card removed!'));
                })

        },
        setCardContent(context, {id, content}) {
            boardRef.collection("cards").doc(id)
                .update({
                    content: content
                })
                .then(() => console.log('card content updated!'));
        },
        setCardTitle(context, {id, title}) {
            boardRef.collection("cards").doc(id)
                .update({
                    title: title
                })
                .then(() => {
                    console.log('card title updated!')
                });
        },
        addCardTag(context, {cardId, tag}) {
            boardRef.collection("cards").doc(cardId)
                .update({
                    tags: firebase.firestore.FieldValue.arrayUnion(tag)
                }).then(() => {
                console.log('card tags updated!')
            });
        },
        removeCardTag(context, {cardId, tag}) {
            boardRef.collection("cards").doc(cardId)
                .update({
                    tags: firebase.firestore.FieldValue.arrayRemove(tag)
                }).then(() => {
                console.log('card tag removed!')
            });
        },
        bindBoard: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("board", boardRef);
        }),
        bindColumns: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("columns", boardRef.collection("columns").orderBy("index", "asc"));
        }),
        bindCards: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("cards", boardRef.collection("cards"))
        }),
        initBoard(context, id) {
            return new Promise((resolve, reject) => {
                boardRef = db.collection("boards").doc(id);

                Promise.all([context.dispatch("bindBoard"),
                    context.dispatch("bindColumns"),
                    context.dispatch("bindCards")])
                    .then(() => {
                        console.log("all data retrieved!")
                        resolve();
                    })
                    .catch(() => reject());
            })
        },
        unbindBoard: firestoreAction(({unbindFirestoreRef}) => {
            unbindFirestoreRef("board");
            unbindFirestoreRef("columns");
            unbindFirestoreRef("cards");
        }),
        fetchUser({commit}, user) {
            commit("setLoggedIn", user !== null);
            if (user) {
                commit("setUserData", {
                    id: user.uid,
                    displayName: user.displayName,
                    // email: user.email
                });
            } else {
                commit("setUserData", null);
            }
        },
        getUserBoards({commit}, userId) {
            db.collection("boards")
                .where(`roles.${userId}`, "==", "owner")
                .get()
                .then((querySnapshot) => {
                    let boards = [];
                    querySnapshot.forEach(doc => {
                        boards.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    })
                    commit("setUserBoards", boards);
                });
        },
        bindUserBoards: firestoreAction(({bindFirestoreRef}, userId) => {
            return bindFirestoreRef("user.boards",
                db.collection("boards")
                    .where(`roles.${userId}`, "==", "owner"));
        }),
        unbindUserBoards: firestoreAction(({unbindFirestoreRef}) => {
            unbindFirestoreRef("user.boards");
        }),
        addBoard(context, {userId, title}) {
            db.collection("boards").add({
                title: title,
                tags: {},
                roles: {
                    [userId]: "owner"
                }
            }).then(() => console.log("board added!"));
        },
        deleteBoard(context, boardId) {
            db.collection("boards")
                .doc(boardId)
                .delete()
                .then(() => console.log("board deleted!"))
        },
        addNewUser(context, user) {
            db.collection("users")
                .doc(user.uid)
                .update({
                    displayName: user.displayName,
                    email: user.email
                })
        },
        bindUsers: firestoreAction(({bindFirestoreRef}, users) => {
            return bindFirestoreRef("users",
                db.collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", users));
        })
    }
});