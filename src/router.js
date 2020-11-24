import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/components/routes/LandingPage";
import Login from "@/components/routes/Login";
import Board from "@/components/routes/board/Board";
import PageNotFound from "@/components/routes/PageNotFound";
import BoardsList from "@/components/routes/BoardsList";
import Logout from "@/components/routes/Logout";
import Burndown from "@/components/routes/Burndown";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: LandingPage },
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/board/:id", component: Board, props: true },
    { path: "/board/:id/burndown", component: Burndown, props: true },
    { path: "/myboards", component: BoardsList },
    { path: "*", component: PageNotFound }
];

export const router = new VueRouter({
    mode: "history",
    routes
});