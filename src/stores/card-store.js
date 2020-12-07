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
        },
        totalCardsByTagInColumn: (state, getters) => (columnId) => {
            if (state.cards.length > 0) {
                const cards = getters.getCardsByColumnId(columnId);
                let tags = {};

                cards.forEach(card => {
                    card.tags.forEach(tag => {
                        tags[tag] = tags[tag] + 1 || 1;
                    })
                });

                return tags;
            }
        },
        getCardsByTag: (state) => (tag) => {
            return state.cards.filter(c => c.tags.includes(tag));
        },
        getCardsByColumnIdAndTags: (state, getters) => (columnId, tags) => {
            // Get all cards from a column
            const cardsByColumn = getters.getCardsByColumnId(columnId);
            if (cardsByColumn) {
                // filter down to cards with tags that are in the given tags array
                return cardsByColumn.filter(card => card.tags.some(t => tags.includes(t)));
            }
        }
    },
    actions: {
        addCard({getters}, columnId) {
            boardRef.collection("cards").add({
                title: "",
                content: "",
                tags: getters.filterByTags ?? []
            })
                .then((doc) => {
                    boardRef.collection("columns").doc(columnId)
                        .update({
                            cards: firebase.firestore.FieldValue.arrayUnion(doc.id),
                            [`history.${getters.historyDateString}.numCards`]: firebase.firestore.FieldValue.increment(1)
                        })
                        .then(() => console.log('card added!'));
                })
        },
        removeCard({getters}, {columnId, cardId}) {
            let tags = {};

            getters.getTagsByCardId(cardId).forEach(tag => {
                tags[`history.${getters.historyDateString}.numCardsWithTag.${tag}`] = firebase.firestore.FieldValue.increment(-1);
            });

            boardRef.collection("columns").doc(columnId)
                .update({
                    cards: firebase.firestore.FieldValue.arrayRemove(cardId),
                    [`history.${getters.historyDateString}.numCards`]: firebase.firestore.FieldValue.increment(-1),
                    ...tags
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