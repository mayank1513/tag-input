import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Features from "./pages/Features.vue";
import Docs from "./pages/Docs.vue";
import GettingStarted from "./pages/GettingStarted.vue";
import Autocomplete from "./pages/examples/Autocomplete.vue";
import AutocompleteWithAPI from "./pages/examples/AutocompleteWithAPI.vue";
import Validation from "./pages/examples/Validation.vue";
import CustomDelimeter from "./pages/examples/CustomDelimeter.vue";
import CustomPlaceholder from "./pages/examples/CustomPlaceholder.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Features },
  { path: "/getting-started", component: GettingStarted },
  { path: "/examples/autocomplete", component: Autocomplete },
  { path: "/examples/autocomplete-with-api", component: AutocompleteWithAPI },
  { path: "/examples/validation", component: Validation },
  { path: "/examples/custom-delimeter", component: CustomDelimeter },
  { path: "/examples/custom-placeholder", component: CustomPlaceholder },
  { path: "/docs", component: Docs },
];

export default createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
