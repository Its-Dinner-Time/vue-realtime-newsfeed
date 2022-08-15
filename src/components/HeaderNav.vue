<script setup>
import { useStore } from 'vuex';

const store = useStore();
const isMenuActive = () => store.state.menu_is_active;
const ToggleMenu = () => store.dispatch('ToggleMenu');
</script>

<template>
  <header class="flex w-full items-center justify-center p-4">
    <div class="menu-toggle" :class="{ 'is-active': isMenuActive() }" @click="ToggleMenu">
      <div class="hamburger"><span></span></div>
    </div>

    <h1 class="text-center text-3xl uppercase font-light">Sanity News</h1>
  </header>
</template>

<style scoped>
.menu-toggle {
  @apply absolute top-4 left-4 cursor-pointer z-50;
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
</style>
