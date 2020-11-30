import {firestoreAction} from "vuexfire";
import {db} from "@/db";

export let boardRef;

export const boardStore = {
    state: {
        board: {
            title: "",
            tags: {},
            roles: {}
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
        }
    },
    actions: {
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
                    context.dispatch("bindCards")])
                    .then(() => {
                        console.log("all data retrieved!")
                        resolve();
                    })
                    .catch((e) => reject(e));
            });
        }
    }
}