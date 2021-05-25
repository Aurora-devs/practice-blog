<template>
  <main class="bg-gray-200 h-screen p-8">
    <Searchbar />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Searchbar from "./components/Searchbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Searchbar,
  },
});
</script>

<style></style>
