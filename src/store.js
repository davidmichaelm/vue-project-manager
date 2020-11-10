import Vue from "vue";

export const store = Vue.observable({
    boards: {
        "0": {
            title: "Test Board",
            columns: [
                {
                    id: 0,
                    title: "Test Column",
                    cards: [
                        {
                            id: 0,
                            title: "Test Card 1",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                        },
                        {
                            id: 1,
                            title: "Test Card 2",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content."
                        }
                    ]
                }
            ]
        }
    },
    users: {

    }
});
