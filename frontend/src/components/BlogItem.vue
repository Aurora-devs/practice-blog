<template>
  <div class="bg-white shadow-md">
    <img :src="img" />
    <div class="p-4">
      <small class="tag mr-2 my-1" v-for="tag in tags">{{ tag }}</small>
      <h3 class="my-4 text-lg line-clamp-2 font-semibold">{{ title }}</h3>
      <small class="flex items-center text-gray-500"
        >By
        <span class="font-bold text-green-600 ml-1">{{ author }}</span>
        <span class="divide-circle"></span> {{ dateCreated }}</small
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BlogItem",
  props: {
    img: String,
    tags: Array,
    title: String,
    author: String,
    dateCreated: String,
  },
  setup: props => {},
});
</script>

<style lang="postcss" scoped>
.tag {
  @apply inline-block border-2 font-semibold px-4 py-0.5 text-blue-400 border-blue-400;
}

.divide-circle {
  display: inline-block;
  width: 4px;
  height: 4px;
  @apply bg-gray-400 rounded-full mx-2;
}
</style>
