<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import sanity from '../../client';

import { queries } from '../../constants/env.js';
import PostCard from '../../components/PostCard.vue';

const subscription = ref(null);
const store = useStore();

const posts = computed(() => store.getters.posts);
const buttonClickHandler = () => {
  store.dispatch('LoadMorePosts', 1);
};

onMounted(() => {
  store.dispatch('FetchPosts', store.state.max_posts);

  const query = queries.getPost();
  const listenQuery = (action) => {
    return async (data) => {
      // 삭제 발생
      if (action === 'RemovePost') return store.dispatch(action, data.documentId);

      const author = await sanity.getDocument(data.result.author._ref); // 수정한 글의 작성자
      // 수정된 내용 적용 ( 작성자의 _id값은 author key에 등록되어있기 때문에 수정한 글에 author._ref에 담긴 _id값을 author key에 할당)
      store.dispatch(action, { ...data.result, author });
    };
  };

  const updateState = {
    update: listenQuery('UpdatePost'), // data가 수정되었을때
    appear: listenQuery('AddNewPost'), // data가 생성되었을때
    disappear: listenQuery('RemovePost'), // data가 삭제되었을때
  };

  subscription.value = sanity.listen(query).subscribe((update) => {
    updateState[update.transition](update);
  });
});

onUnmounted(() => {
  subscription.value.unsubscribe();
});
</script>

<template>
  <main class="home">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">최신 글</h1>

      <div class="grid gap-4">
        <PostCard v-for="(post, i) in posts" :key="i" :post="post"></PostCard>
      </div>

      <button v-if="$store.state.total_posts > posts.length" @click="buttonClickHandler" class="btn mt-8">
        더보기 ({{ store.state.total_posts - posts.length }})
      </button>
    </section>
  </main>
</template>
