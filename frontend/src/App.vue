<template>
  <main class="bg-gray-100 min-h-screen py-2 px-8 md:py-8 md:px-32">
    <Searchbar />
    <BlogList />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Searchbar from "./components/Searchbar.vue";
import BlogList from "./components/BlogList.vue";

export default defineComponent({
  name: "App",
  components: {
    Searchbar,
    BlogList,
  },
});
</script>

<style></style>
