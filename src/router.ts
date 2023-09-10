import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./pages/Home.vue";
import GettingStarted from "./pages/GettingStarted.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/getting-started", component: GettingStarted },
];

export default createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
