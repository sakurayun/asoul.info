import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/dynamic",
    component: () => import("../views/Dynamic.vue"),
  },
  {
    path: "/rss",
    component: () => import("../views/RSSHub.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
