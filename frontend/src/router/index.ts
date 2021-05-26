import component from "*.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Articles from "../views/Articles.vue";
import SingleArticle from "../views/SingleArticle.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/articles/:id",
    name: "SingleArticle",
    component: SingleArticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
