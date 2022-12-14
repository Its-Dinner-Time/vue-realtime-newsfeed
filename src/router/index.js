import { createRouter, createWebHistory } from 'vue-router';
import { pages } from '../constants/env';
import store from '../store';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error/404.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: pages.loginPage(),
    name: 'Login',
    component: () => import('../views/sign/Login.vue'),
  },
  {
    path: pages.signUpPage(),
    name: 'SignUp',
    component: () => import('../views/sign/SignUp.vue'),
  },
  {
    path: pages.authorPage(),
    name: 'Author',
    component: () => import('../views/author/Author.vue'),
  },
  {
    path: `${pages.authorPage()}/:id`,
    name: 'Profile',
    component: () => import('../views/author/_id.vue'),
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
