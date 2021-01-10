import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/routes/LandingPage";
import Login from "@/routes/Login";
import Board from "@/routes/Board";
import PageNotFound from "@/routes/PageNotFound";
import BoardsList from "@/routes/BoardsList";
import Burndown from "@/routes/Burndown";
import BoardSettings from "@/routes/BoardSettings";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: LandingPage },
    { path: "/login", component: Login },
    { path: "/board/:id", component: Board, props: true },
    { path: "/board/:id/burndown", component: Burndown, props: true },
    { path: "/board/:id/board-settings", component: BoardSettings, props: true },
    { path: "/myboards", component: BoardsList },
    { path: "*", component: PageNotFound }
];

export const router = new VueRouter({
    mode: "history",
    routes
});