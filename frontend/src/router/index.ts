import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Articles from "../views/Articles.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Articles",
    component: Articles,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
