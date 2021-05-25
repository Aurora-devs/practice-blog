<template>
  <main class="bg-gray-100 min-h-screen py-2 px-8 md:py-8 md:px-32">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
