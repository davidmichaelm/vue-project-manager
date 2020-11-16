import Vue from "vue";

export const store = Vue.observable({
    boards: {
        "0": {
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
                    id: 0,
                    title: "Test Column",
                    cards: [
                        {
                            id: 1,
                            title: "Test Card 1",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                            tags: ["open", "low priority"]
                        },
                        {
                            id: 2,
                            title: "Test Card 2",
                            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                            tags: ["high priority"]
                        }
                    ]
                }
            ]
        }
    },
    users: {

    }
});
