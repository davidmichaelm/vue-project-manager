import {db} from "@/db";
import {firestoreAction} from "vuexfire";
import firebase from "firebase/app";
import {boardRef} from "./board-store";

export const userStore = {
    state: {
        user: {
            loggedIn: false,
            data: {},
            boards: []
        },
        boardUsers: [],
        userSearch: []
    },
    mutations: {
        setLoggedIn(state, value) {
            state.user.loggedIn = value;
        },
        setUserData(state, data) {
            state.user.data = data;
        },
        setUsers(state, users) {
            state.boardUsers = users;
        },
    },
    getters: {
        userId: (state) => {
            return state.user.data.id;
        },
        boards: (state) => {
            return state.user.boards;
        },
        isLoggedIn: (state) => {
            return state.user.loggedIn;
        },
        boardOwner: (state, getters) => {
            const roles = getters.board?.roles;
            if (roles) {
                const ownerId = Object.keys(roles).find(r => roles[r] === "owner");
                return state.boardUsers.filter(u => u.id === ownerId)[0];
            }

            return null;
        },
        boardUsersNoOwner: (state, getters) => {
            const boardUsers = getters.boardUserIds;
            if (!boardUsers) return null;

            const ids = boardUsers
                .filter(u => u !== getters.boardOwner?.id);
            return state.boardUsers.filter(u => ids.includes(u.id));
        },
        boardUserIds: (state, getters) => {
            if (getters.board?.roles) {
                return Object.keys(getters.board.roles);
            }

            return null;
        },
        boardUserData: (state) => {
            return state.boardUsers ?? null;
        },
        userOwnedBoards: (state, getters) => {
            return state.user.boards.filter(b => b.roles[getters.userId] === "owner");
        },
        userEditorBoards: (state, getters) => {
            return state.user.boards.filter(b => b.roles[getters.userId] === "editor");
        }
    },
    actions: {
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
        bindUserBoards: firestoreAction(({bindFirestoreRef}, userId) => {
            return bindFirestoreRef("user.boards",
                db.collection("boards")
                    .where(`roles.${userId}`, "in", ["owner", "editor"]));
        }),
        unbindUserBoards: firestoreAction(({unbindFirestoreRef}) => {
            unbindFirestoreRef("user.boards");
        }),
        addNewUser(context, user) {
            console.log(user)
            db.collection("users")
                .doc(user.uid)
                .set({
                    displayName: user.displayName
                })
                .then(() => console.log("new user added!"))
                .catch((e) => console.log(e))
        },
        fetchBoardUsers({commit, getters}) {
            return new Promise((resolve, reject) => {
                db.collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", getters.boardUserIds)
                    .get()
                    .then(querySnapshot => {
                        let users = [];
                        querySnapshot.forEach(doc => {
                            let user = doc.data();
                            user.id = doc.id;
                            users.push(user);
                        })
                        commit("setUsers", users);
                        resolve();
                    })
                    .catch((e) => reject(e));
            });
        },
        addUserToBoard({dispatch}, userId) {
            return new Promise((resolve, reject) => {
                boardRef
                    .update({
                        ["roles." + userId]: "editor"
                    })
                    .then(() => {
                        dispatch("fetchUsers")
                            .then(() => resolve());
                    })
                    .catch((e) => reject(e));
            });
        },
        removeUserFromBoard({dispatch}, userId) {
            boardRef
                .update({
                    ["roles." + userId]: firebase.firestore.FieldValue.delete()
                })
                .then(() => {
                    dispatch("fetchUsers");
                });
        }
    }
}