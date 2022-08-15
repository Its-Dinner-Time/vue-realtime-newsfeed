<script setup>
import { useStore } from 'vuex';
import { pages } from '../constants/env';
import MenuItem from './MenuItem.vue';

const store = useStore();
const isMenuActive = () => store.state.menu_is_active;
const overlayClickHandler = () => {
  store.dispatch('CloseMenu');
};
</script>

<template>
  <aside
    class="fixed top-0 left-0 w-full min-h-screen z-40 backdrop-blur-sm transform duration-500 lg:duration-400 xl:duration-300"
    :class="`${isMenuActive() ? 'translate-x-0' : '-translate-x-full'}`"
    @click="overlayClickHandler"
  >
    <div class="w-full max-w-xs min-h-screen pt-16 bg-gray-800">
      <div class="p-4">
        <h2 class="text-gray-500 text-sm font-bold uppercase mb-2">menu</h2>

        <div class="-ml-4">
          <MenuItem to="/"><span class="material-icons mr-2">home</span> 홈으로 가기</MenuItem>
          <MenuItem :to="pages.authorPage()"><span class="material-icons mr-2">groups</span> 작가보기</MenuItem>
        </div>
      </div>
    </div>
  </aside>
</template>
