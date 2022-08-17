<template>
  <main class="absolute top-0 left-0 w-screen h-screen">
    <section class="w-full h-full flex flex-col justify-center items-center">
      <form class="m-8 w-full sm:w-96">
        <section class="p-4 mb-8 sm:border border-green-400 border-solid rounded-lg sm:shadow-lg sm:shadow-green-700">
          <h1 class="text-3xl mb-12 py-4 border-b-2 border-solid border-green-400/25">Login</h1>

          <section class="mb-8">
            <div class="flex mb-8 border-b-2 border-solid border-green-400/75 pb-2">
              <span class="material-symbols-outlined mr-2"> account_circle </span>
              <input class="bg-transparent w-full focus:outline-none" type="text" placeholder="사용자 ID" autocomplete="username" />
            </div>

            <div class="flex mb-8 border-b-2 border-solid border-green-400/75 pb-2">
              <span class="material-symbols-outlined mr-2"> lock </span>
              <input class="bg-transparent w-full focus:outline-none" type="password" placeholder="비밀번호" autocomplete="current-password" />
            </div>

            <div class="flex mb-12">
              <input id="save_id" class="accent-green-400 w-5 cursor-pointer" type="checkbox" />
              <label for="save_id" class="w-max ml-2 cursor-pointer">아이디 기억</label>
            </div>
          </section>

          <button class="btn w-full">로그인</button>
        </section>

        <div class="pl-4">
          <router-link :to="signUpPage" class="text-green-300 hover:text-green-500 transition-colors duration-200 ease-in-out"
            >아직 회원가입을 안하셨나요?</router-link
          >
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { pages } from '../../constants/env';
export default {
  setup() {
    const signUpPage = pages.signUpPage();

    return { signUpPage };
  },
};
</script>

<style lang="scss" scoped></style>
