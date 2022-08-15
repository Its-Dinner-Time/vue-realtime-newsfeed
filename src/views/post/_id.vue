<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import sanity from '../../client';
import { queries } from '../../constants/env';
import { CreateURL, TextToHtml } from '../../util';

import SkeletonLoading from '../../assets/skeleton-loading.vue';

const route = useRoute();
const id = ref(route.params.id);
const post = ref(null);

const query = queries.getPost('id') + queries.with('author');
const params = { id: id.value };

const getPost = async () => {
  const fetchedPost = await sanity.fetch(query, params);
  post.value = fetchedPost;
};

onMounted(async () => {
  getPost();
});
</script>

<template>
  <main class="post-page">
    <section class="container mx-auto p-4">
      <!-- back button -->
      <button @click="$router.back()" class="flex items-center text-lg text-green-500 hover:text-green-600 duration-300 mb-4">
        <span class="material-icons text-lg">keyboard_double_arrow_left</span>Back
      </button>

      <article v-if="post">
        <!-- img -->
        <img v-if="post.image" :src="CreateURL(post.image, 1280, 300)" class="w-full mb-8" />

        <!-- titie -->
        <h1 class="text-3xl md:text-5xl mb-8">{{ post.title }}</h1>

        <!-- excerpt -->
        <p class="text-gray-500 italic mb-8">{{ post.excerpt }}</p>

        <!-- content -->
        <p v-html="TextToHtml(post.content)" class="text-lg mb-8"></p>

        <!-- author -->
        <div class="flex items-center mb-4">
          <img v-if="post.author.avatar" :src="`${CreateURL(post.author.avatar, 300, 300)}`" class="inline-block w-12 h-12 mr-4 rounded-full" />
          <h1 class="text-gray-500 text-lg">{{ post.author.full_name }}</h1>
        </div>
      </article>

      <article v-else>
        <SkeletonLoading class="h-16 md:text-5xl mb-8 w-full" />

        <SkeletonLoading class="mb-4 h-32 w-full" />
        <SkeletonLoading class="mb-8 h-24 w-full" />

        <div class="flex items-center">
          <SkeletonLoading class="rounded-full mr-4" />
          <SkeletonLoading class="text-lg w-full" />
        </div>
      </article>
    </section>
  </main>
</template>
