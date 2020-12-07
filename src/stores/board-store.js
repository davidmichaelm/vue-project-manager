import {firestoreAction} from "vuexfire";
import {db} from "@/db";
import firebase from "firebase/app";

export let boardRef;

export const boardStore = {
    state: {
        board: {
            title: "",
            tags: {},
            roles: {},
            burndown: {
                startDate: null,
                endDate: null,
                doingColumn: null,
                doneColumn: null
            }
        }
    },
    getters: {
        board: (state) => {
            return state.board ?? null;
        },
        boardId: (state) => {
            return state.board?.id;
        },
        allTagData: (state, getters) => {
            return getters.board.tags;
        },
        burndown: (state) => {
            return state.board?.burndown;
        }
    },
    actions: {
        addBoard(context, {userId, title}) {
            db.collection("boards").add({
                title: title,
                tags: {},
                roles: {
                    [userId]: "owner"
                },
                burndown: {
                    startDate: null,
                    endDate: null,
                    tasks: null,
                    doneColumn: null,
                    filterByTag: null
                }
            }).then(() => console.log("board added!"));
        },
        deleteBoard(context, boardId) {
            db.collection("boards")
                .doc(boardId)
                .delete()
                .then(() => console.log("board deleted!"))
        },
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
        updateTag(context, {tag, tagField, tagFieldData}) {
            return new Promise((resolve, reject) => {
                boardRef.update({
                    [`tags.${tag}.${tagField}`]: tagFieldData
                })
                    .then(() => {
                    resolve();
                    console.log('tag updated!')
                })
                    .catch((e) => reject(e));
            })
        },
        removeTagFromBoard({getters, dispatch}, tag) {
            boardRef.update({
                [`tags.${tag}`]: firebase.firestore.FieldValue.delete()
            })
                .then(() => {
                    getters.getCardsByTag(tag).forEach(card => {
                        dispatch("removeCardTag", {
                            cardId: card.id,
                            tag: tag
                        });
                    })
                })
                .then(() => console.log('tag deleted!'));
        },
        bindBoard: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("board", boardRef);
        }),
        unbindBoard: firestoreAction(({unbindFirestoreRef}) => {
            unbindFirestoreRef("board");
            unbindFirestoreRef("columns");
            unbindFirestoreRef("cards");
        }),
        initBoard(context, id) {
            return new Promise((resolve, reject) => {
                boardRef = db.collection("boards").doc(id);

                Promise.all([context.dispatch("bindBoard"),
                    context.dispatch("bindColumns"),
                    context.dispatch("bindCards"),
                    context.dispatch("getFilterByTags")])
                    .then(() => {
                        console.log("all data retrieved!")
                        resolve();
                    })
                    .catch((e) => reject(e));
            });
        },
        updateBurndownOption(context, {option, value}) {
            boardRef.update({
                [`burndown.${option}`]: value
            })
        }
    }
}