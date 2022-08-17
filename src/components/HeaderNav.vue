<script setup>
import { useStore } from 'vuex';
import { pages } from '../constants/env';

const store = useStore();
const isMenuActive = () => store.state.menu_is_active;
const ToggleMenu = () => store.dispatch('ToggleMenu');
</script>

<template>
  <div class="menu-toggle" :class="{ 'is-active': isMenuActive() }" @click="ToggleMenu">
    <div class="hamburger"><span></span></div>
  </div>
  <header class="flex w-full items-center justify-center sticky top-0 left-0 p-4 z-10 bg-gray-600">
    <h1 class="text-center text-3xl uppercase font-light">dinner times</h1>

    <div class="flex items-center absolute top-0 right-4 h-full sign-wrap">
      <span class="material-symbols-outlined md:hidden inline-block text-4xl cursor-pointer"> account_circle </span>

      <ul class="md:flex hidden">
        <li class="">
          <router-link :to="pages.loginPage()" class="btn font-normal ml-4">로그인</router-link>
        </li>
        <li class="">
          <router-link :to="pages.signUpPage()" class="btn font-normal ml-4">회원가입</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.menu-toggle {
  @apply fixed top-4 left-4 cursor-pointer z-50;
  @apply w-[32px] h-[32px];
}

.hamburger {
  @apply absolute top-1/2 left-1/2;
  @apply -translate-x-1/2 -translate-y-1/2;
  @apply w-full h-full;
}

.hamburger span,
.hamburger span::after,
.hamburger span::before {
  @apply absolute;
  @apply w-full h-[3px];
  @apply rounded-full;
  @apply bg-white;
  @apply transition ease-in-out duration-300;
}
.hamburger span {
  @apply top-1/2 before:top-[-8px] after:top-[8px];
}

.menu-toggle.is-active .hamburger > span {
  @apply rotate-45 before:rotate-0 before:top-0 after:top-0 after:rotate-90;
}

.sign-wrap .router-link-active {
  @apply hidden;
}
</style>
