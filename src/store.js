import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        board: {
            title: "Test Board",
            tags: {
                "open": {
                    backgroundColor: "bg-primary",
                    color: "text-white"
                },
                "high priority": {
                    backgroundColor: "bg-danger",
                    color: "text-white"
                },
                "low priority": {
                    backgroundColor: "bg-success",
                    color: "text-white"
                }
            },
            columns: [
                {
                    id: "0",
                    title: "Test Column",
                    cards: [
                        {
                            id: "1",
                            title: "Test Card 1",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                            tags: ["open", "low priority"]
                        },
                        {
                            id: "2",
                            title: "Test Card 2",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                            tags: ["high priority"]
                        }
                    ]
                }
            ]
        }
    },
    getters: {
        getColumnById: (state) => (id) => {
            return state.board.columns.find(column => column.id === id);
        },
        allCards: state => {
            return state.board.columns.map(column => column.cards).flat();
        },
        getCardById: (state, getters) => (id) => {
            return getters.allCards.find(card => card.id === id);
        },
        getTagsByCardId: (state, getters) => (id) => {
            return getters.getCardById(id).tags;
        }
    },
    mutations: {
        setBoardTitle(state, title) {
            state.board.title = title;
        },
        addTag(state, {tag, tagData}) {
            state.board.tags[tag] = tagData;
        },
        addColumn(state, column) {
            state.board.columns.push(column);
        },
        removeColumn(state, index) {
            state.board.columns.splice(index, 1);
        },
        setColumnTitle(state, {column, title}) {
            column.title = title;
        },
        updateCardsList(state, {column, cards}) {
          column.cards = cards;
        },
        addCard(state, {column, card}) {
            column.cards.push(card);
        },
        removeCard(state, {column, index}) {
            column.cards.splice(index, 1);
        },
        setCardContent(state, {card, content}) {
            card.content = content;
        },
        setCardTitle(state, {card, title}) {
            card.title = title;
        },
        addCardTag(state, {card, tag}) {
            card.tags.push(tag);
        },
        removeCardTag(state, {card, index}) {
            card.tags.splice(index, 1);
        }
    },
    actions: {
        setBoardTitle({commit}, title) {
            commit("setBoardTitle", title);
        },
        addTag({commit}, {tag, tagData}) {
            commit("addTag", {tag, tagData});
        },
        addColumn({commit}) {
            commit("addColumn", {
                id: Math.random(), // TODO: get id from firebase first
                title: "",
                cards: []
            });
        },
        removeColumn({state, commit}, id) {
            const index = state.board.columns.findIndex(c => c.id === id);
            commit("removeColumn", index);
        },
        setColumnTitle({commit, getters}, {id, title}) {
            const column = getters.getColumnById(id);
            commit("setColumnTitle", {column, title});
        },
        updateCardsList({commit, getters}, {columnId, cards}) {
            const column = getters.getColumnById(columnId);
            commit("updateCardsList", {column, cards});
        },
        addCard({commit, getters}, columnId) {
            const column = getters.getColumnById(columnId);
            commit("addCard", {
                column,
                card: {
                    id: Math.random(), // TODO: get id from firebase first
                    title: "",
                    content: "",
                    tags: []
                }
            });
        },
        removeCard({commit, getters}, {columnId, cardId}) {
            const column = getters.getColumnById(columnId);
            const index = column.cards.findIndex(c => c.id === cardId);

            commit("removeCard", {column, index});
        },
        setCardContent({commit, getters}, {id, content}) {
            const card = getters.getCardById(id);
            commit("setCardContent", {card, content});
        },
        setCardTitle({commit, getters}, {id, title}) {
            const card = getters.getCardById(id);
            commit("setCardTitle", {card, title});
        },
        addCardTag({commit, getters}, {cardId, tag}) {
            const card = getters.getCardById(cardId);
            commit("addCardTag", {card, tag});
        },
        removeCardTag({commit, getters}, {cardId, tag}) {
            const card = getters.getCardById(cardId);
            const index = card.tags.findIndex(t => t === tag);
            commit("removeCardTag", {card, index});
        }
    }
});