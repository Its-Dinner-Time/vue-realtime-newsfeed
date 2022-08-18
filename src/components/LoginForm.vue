<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import sanity from '../client';
import SanityQuery from '../constants/sanity-querybuilder';

const loginData = {
  userId: ref(null),
  password: ref(null),
};
const saveId = ref(false);

const router = useRouter();
const store = useStore();

const query = new SanityQuery('user') //
  .and('user_id', 'userId')
  .and('password', 'password')
  .getOne()
  .done();

const loginSuccessHandler = (user) => {
  store.dispatch('LoginToken', { userId: user.user_id });
  router.replace('/');
};

const loginFailHandler = () => {
  router.go();
};

const requiredHandler = (refKey) => {
  loginData[refKey].value.focus();
};

const submitEventHandler = async () => {
  const param = { userId: loginData.userId.value.value, password: loginData.password.value.value };

  for (const key in param) {
    if (!param[key]) return requiredHandler(key);
  }

  const result = await sanity.fetch(query, param);

  if (result) return loginSuccessHandler(result);
  loginFailHandler();
};
</script>

<template>
  <form class="m-8 w-full sm:w-96" @submit.prevent="submitEventHandler">
    <section class="p-4 mb-8 sm:border border-green-400 border-solid rounded-lg sm:shadow-lg sm:shadow-green-700">
      <h1 class="text-3xl mb-12 py-4 border-b-2 border-solid border-green-400/25">Login</h1>

      <section class="mb-8">
        <div class="flex mb-8 border-b-2 border-solid border-green-400/75 pb-2">
          <span class="material-symbols-outlined mr-2"> account_circle </span>
          <input
            :ref="loginData.userId"
            class="bg-transparent w-full focus:outline-none"
            type="text"
            placeholder="사용자 ID"
            autocomplete="username"
          />
        </div>

        <div class="flex mb-8 border-b-2 border-solid border-green-400/75 pb-2">
          <span class="material-symbols-outlined mr-2"> lock </span>
          <input
            :ref="loginData.password"
            class="bg-transparent w-full focus:outline-none"
            type="password"
            placeholder="비밀번호"
            autocomplete="current-password"
          />
        </div>

        <div class="flex mb-12">
          <input id="saveId" class="accent-green-400 w-5 cursor-pointer" type="checkbox" v-model="saveId" />
          <label for="saveId" class="w-max ml-2 cursor-pointer">아이디 기억</label>
        </div>
      </section>

      <button class="btn w-full">로그인</button>
    </section>
  </form>
</template>

<style lang="scss" scoped></style>
