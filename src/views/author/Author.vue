<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import { CreateURL } from '../../util';

const store = useStore();
const authors = computed(() => store.getters.authors);

onMounted(() => {
  store.dispatch('GetAuthors');
});
</script>

<template>
  <main class="flex justify-center">
    <section class="container my-8 grid grid-cols-4 grid-flow-col gap-4">
      <figure v-for="(author, i) in authors" :key="i">
        <img :src="CreateURL(author.avatar, 480, 320)" />

        <figcaption>
          <span>{{ author.full_name }}</span>
        </figcaption>
      </figure>
    </section>
  </main>
</template>
