import {mapActions} from "vuex";

export const boardBehavior = {
    props: ["id"],
    data() {
        return {
            boardLoaded: false
        }
    },
    computed: {
        boardId() {
            return this.$store.state.board?.id
        },
        data() {
            return this.$store.state.board;
        },
        loggedIn() {
            return this.$store.state.user.loggedIn;
        }
    },
    methods: {
        ...mapActions([
            "initBoard",
            "unbindBoard"
        ])
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/");
            return;
        }

        if (this.id !== this.boardId) {
            this.initBoard(this.id)
                .then(() => {
                    this.boardLoaded = true;
                    this.$emit("boardLoaded");
                });
        } else if (this.id === this.boardId) {
            this.boardLoaded = true;
            this.$emit("boardLoaded");
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.params.id !== this.id) {
            this.unbindBoard();
        }
        next();
    }
}