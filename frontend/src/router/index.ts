import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "Shades",
  //   component: Shades
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
