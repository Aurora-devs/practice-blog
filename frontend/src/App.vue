<template>
  <Navbar />
  <main class="bg-gray-100 min-h-screen py-2 px-8 md:py-8 md:px-32">
    <Suspense>
      <router-view />
    </Suspense>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
});
</script>
