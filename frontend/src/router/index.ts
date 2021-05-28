import component from "*.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Articles from "../views/Articles.vue";
import SingleArticle from "../views/SingleArticle.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CreateArticle from "../views/CreateArticle.vue";

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
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/articles/new",
    name: "CreateArticle",
    component: CreateArticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
