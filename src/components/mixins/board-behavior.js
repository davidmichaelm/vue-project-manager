import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export const boardBehavior = {
    props: ["id"],
    data() {
        return {
            boardLoaded: false
        }
    },
    computed: {
        boardId() {
            return this.board?.id;
        },
        boardTitle() {
            return this.board?.title;
        },
        ...mapGetters([
            "isLoggedIn",
            "board"
        ])
    },
    methods: {
        ...mapActions([
            "initBoard",
            "unbindBoard"
        ])
    },
    created() {
        if (!this.isLoggedIn) {
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