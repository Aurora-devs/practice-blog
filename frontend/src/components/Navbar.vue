<template>
  <nav
    class="
      relative
      flex
      items-center
      justify-between
      py-2
      px-8
      shadow-md
      text-white
      bg-blue-500
    "
  >
    <router-link to="/"><h1 class="text-xl">Blog</h1></router-link>
    <div v-if="!store.state.token">
      <router-link to="/login"
        ><button class="btn btn-green">Login</button></router-link
      >
      <router-link to="/register"
        ><button class="btn btn-green">Register</button></router-link
      >
    </div>
    <div v-else>
      <button class="btn btn-red" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Navbar",
  setup() {
    const store = useStore();
    function logout() {
      store.commit("removeToken");
    }
    return { store, logout };
  },
});
</script>

<style lang="postcss">
.btn {
  @apply border-2 px-4 py-0.5 m-2 rounded transition-colors;
}
.btn-green {
  @apply hover:bg-green-600 hover:border-green-600;
}
.btn-red {
  @apply hover:bg-red-500 hover:border-red-500;
}
</style>
