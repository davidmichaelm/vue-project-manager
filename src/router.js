import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/components/routes/LandingPage";
import Login from "@/components/routes/Login";
import Board from "@/components/routes/board/Board";
import PageNotFound from "@/components/routes/PageNotFound";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: LandingPage },
    { path: "/login", component: Login },
    { path: "/board", component: Board },
    { path: "*", component: PageNotFound }
];

export const router = new VueRouter({
    mode: "history",
    routes
});