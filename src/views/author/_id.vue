<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import sanity from '../../client';
import { queries } from '../../constants/env';
import { CreateURL } from '../../util';

import PostCard from '../../components/PostCard.vue';
import BackButton from '../../components/ui/BackButton.vue';

const route = useRoute();
const id = ref(route.params.id);
const author = ref(null);

const query = `${queries.getAuthor('id')} 
{
  ..., 
  'posts': 
    *[_type == "post" && author->_id == $id] 
    ${queries.with('author')} 
}`;
const params = { id: id.value };

const getAuthor = async () => {
  const fetchedAuthor = await sanity.fetch(query, params);
  author.value = fetchedAuthor;
};

onMounted(async () => {
  getAuthor();
});
</script>

<template>
  <main>
    <section class="container mx-auto p-4">
      <BackButton class="mb-8" />

      <article v-if="author">
        <section class="mb-8">
          <div class="flex items-center mb-4">
            <img :src="CreateURL(author.avatar)" class="inline-block rounded-full w-16 h-16 mr-4" alt="" />

            <h3 class="text-2xl uppercase font-bold">{{ author.full_name }}</h3>
          </div>

          <p class="text-gray-500 mb-5">{{ author.short_bio }}</p>
        </section>

        <section>
          <div class="grid gap-4">
            <PostCard v-for="(post, i) in author.posts" :key="i" :post="post"></PostCard>
          </div>
        </section>
      </article>

      <article v-else>Loading...</article>
    </section>
  </main>
</template>
