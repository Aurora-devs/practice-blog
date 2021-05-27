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
import { useStore } from "vuex";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const store = useStore();
    window.addEventListener("storage", () => {
      if (!localStorage.token) {
        store.commit("removeToken");
      } else {
        return;
      }
    });
  },
});
</script>
