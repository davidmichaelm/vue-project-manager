import firebase from "firebase/app";
import {firestoreAction} from "vuexfire";
import {boardRef} from "@/stores/board-store";

export const cardStore = {
    state: {
        cards: []
    },
    getters: {
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
        }
    },
    actions: {
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
        bindCards: firestoreAction(({bindFirestoreRef}) => {
            return bindFirestoreRef("cards", boardRef.collection("cards"))
        })
    }
}