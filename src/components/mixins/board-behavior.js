import {mapActions} from "vuex";

export const boardBehavior = {
    props: ["id"],
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
    mounted() {
        if (!this.loggedIn) {
            this.$router.push("/");
            return;
        }

        if (this.id !== this.boardId) {
            this.initBoard(this.id);
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.params.id !== this.id) {
            this.unbindBoard();
        }
        next();
    }
}