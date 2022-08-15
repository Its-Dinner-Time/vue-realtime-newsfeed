<script>
export default {
  props: ['to'],
};
</script>

<template>
  <router-link :to="to" class="flex items-center border-r-4 border-transparent p-4 text-gray-100 hover:text-white hover:bg-gray-900">
    <!-- 자식 요소 삽입 -->
    <slot></slot>
  </router-link>
</template>

<style scoped>
.router-link-exact-active {
  @apply border-green-500 bg-gray-900;
}
</style>
