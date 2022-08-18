<script setup>
import LoginForm from '../../components/LoginForm.vue';
import { pages } from '../../constants/env';
const signUpPage = pages.signUpPage();
</script>

<template>
  <main class="absolute top-0 left-0 w-screen h-screen">
    <section class="w-full h-full flex flex-col justify-center items-center">
      <LoginForm />

      <div class="">
        <router-link :to="signUpPage" class="text-green-300 hover:text-green-500 transition-colors duration-200 ease-in-out"
          >아직 회원가입을 안하셨나요?</router-link
        >
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
