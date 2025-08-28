import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./views/Homepage.vue";
import DenmarkPage from "./views/DenmarkPage.vue";
import GermanyPage from "./views/GermanyPage.vue";
import GalleryPage from "./views/GalleryPage.vue";

const routes = [
  { path: "/", component: Homepage },
  { path: "/gallery", component: GalleryPage },
  { path: "/denmark", component: DenmarkPage },
  { path: "/germany", component: GermanyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
});

export default router;
