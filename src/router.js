import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./views/Homepage.vue";
import GalleryPage from "./views/GalleryPage.vue";
import ChinaPage from "./views/ChinaPage.vue";
import DenmarkPage from "./views/DenmarkPage.vue";
import GermanyPage from "./views/GermanyPage.vue";
import GreecePage from "./views/GreecePage.vue";
import HungaryPage from "./views/HungaryPage.vue";
import NetherlansPage from "./views/NetherlandsPage.vue";
import SwedenPage from "./views/SwedenPage.vue";

const routes = [
  { path: "/", component: Homepage },
  { path: "/gallery", component: GalleryPage },
  { path: "/gallery/denmark", component: DenmarkPage },
  { path: "/gallery/germany", component: GermanyPage },
  { path: "/gallery/china", component: ChinaPage },
  { path: "/gallery/greece", component: GreecePage },
  { path: "/gallery/hungary", component: HungaryPage },
  { path: "/gallery/netherlands", component: NetherlansPage },
  { path: "/gallery/sweden", component: SwedenPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
});

export default router;
