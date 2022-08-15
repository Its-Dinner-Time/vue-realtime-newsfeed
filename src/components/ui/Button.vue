<script>
export default {
  props: {
    primary: Boolean,
  },
};
</script>

<template>
  <button :class="{ primary: primary }">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  @apply duration-200 font-bold py-2 px-4 rounded-lg inline-block;
}

button.primary {
  @apply bg-green-600 hover:bg-green-700;
}
</style>
