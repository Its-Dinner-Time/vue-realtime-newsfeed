<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="bg-gray-600 rounded-xl" :width="width" :height="height"></svg>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 48,
    },
    height: {
      type: [Number, String],
      default: 48,
    },
  },
};
</script>
