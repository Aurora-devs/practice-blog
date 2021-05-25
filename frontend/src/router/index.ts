import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Blogs from "../views/Blogs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Blogs",
    component: Blogs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
