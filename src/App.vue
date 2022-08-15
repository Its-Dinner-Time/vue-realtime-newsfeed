<script setup>
import HeaderNav from './components/HeaderNav.vue';
import SidebarNav from './components/SidebarNav.vue';
</script>

<template>
  <div class="bg-gray-700 min-h-screen text-white">
    <HeaderNav />
    <SidebarNav />
    <router-view />
  </div>
</template>

<style>
.btn {
  @apply duration-200 font-bold py-2 px-4 rounded-lg inline-block bg-green-600 hover:bg-green-700;
}
</style>
