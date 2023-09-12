import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Features from "./pages/Features.vue";
import GettingStarted from "./pages/GettingStarted.vue";
import Autocomplete from "./pages/examples/Autocomplete.vue";
import CustomDelimeter from "./pages/examples/CustomDelimeter.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Features },
  { path: "/getting-started", component: GettingStarted },
  { path: "/examples/autocomplete", component: Autocomplete },
  { path: "/examples/custom-delimeter", component: CustomDelimeter },
];

export default createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
