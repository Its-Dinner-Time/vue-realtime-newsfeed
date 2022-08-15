<script>
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
};
</script>
<script setup>
import { CreateURL } from '../util';
import { pages } from '../constants/env';
</script>

<template>
  <figure class="bg-gray-800 rounded-lg p-4 text-center">
    <img :src="CreateURL(author.avatar)" class="inline-block rounded-full w-32 h-32 mb-4" />

    <figcaption>
      <h3 class="text-2xl font-bold mb-4">{{ author.full_name }}</h3>
      <h3 class="text-gray-400 mb-4">{{ author.short_bio }}</h3>
    </figcaption>

    <router-link class="btn" :to="`${pages.authorPage()}/${author._id}`">더보기</router-link>
  </figure>
</template>
