<script setup>
import { useStore } from 'vuex';
import { pages } from '../constants/env';
import MenuItem from './MenuItem.vue';

const store = useStore();
const isMenuActive = () => store.state.menu_is_active;
</script>

<template>
  <aside
    class="fixed top-0 left-0 min-h-screen pt-16 z-40 w-full max-w-xs transform duration-300 bg-gray-800"
    :class="`${isMenuActive() ? 'translate-x-0' : '-translate-x-full'}`"
  >
    <div class="p-4">
      <h2 class="text-gray-500 text-sm font-bold uppercase mb-2">menu</h2>

      <div class="-ml-4">
        <MenuItem to="/"><span class="material-icons mr-2">home</span> 홈으로 가기</MenuItem>
        <MenuItem :to="pages.authorPage()"><span class="material-icons mr-2">groups</span> 작가보기</MenuItem>
      </div>
    </div>
  </aside>
</template>
