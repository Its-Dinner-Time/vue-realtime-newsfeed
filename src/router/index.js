import { createRouter, createWebHistory } from 'vue-router';
import { pages } from '../constants/env';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: pages.authorPage(),
    name: 'Author',
    component: () => import('../views/author/Author.vue'),
  },
  {
    path: `${pages.postPage()}/:id`,
    name: 'Post',
    component: () => import('../views/post/_id.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (from.name) {
    document.documentElement.scrollTop = 0;
    store.dispatch('CloseMenu');
    return;
  }
});

export default router;
