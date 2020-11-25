import {mapActions} from "vuex";

export const boardBehavior = {
    props: ["id"],
    computed: {
        boardId() {
            return this.$store.state.board?.id
        },
        data() {
            return this.$store.state.board;
        }
    },
    methods: {
        ...mapActions([
            "initBoard",
            "unbindBoard"
        ])
    },
    mounted() {
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