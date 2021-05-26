import component from "*.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Articles from "../views/Articles.vue";
import SingleArticle from "../views/SingleArticle.vue";
import Login from "../views/Login.vue";

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
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
