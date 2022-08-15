<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import AuthorCard from '../../components/AuthorCard.vue';

const store = useStore();
const authors = computed(() => store.getters.authors);

onMounted(() => {
  store.dispatch('GetAuthors');
});
</script>

<template>
  <main class="flex justify-center">
    <section class="container mx-auto p-4 grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
      <AuthorCard v-for="(author, i) in authors" :key="i" :author="author" />
    </section>
  </main>
</template>
