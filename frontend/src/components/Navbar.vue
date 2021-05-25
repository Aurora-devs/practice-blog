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
    <h1 class="text-xl">Blog</h1>
    <div>
      <button class="btn">Login</button>
      <button class="btn">Register</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Navbar",
});
</script>

<style lang="postcss">
.btn {
  @apply border-2 px-4 py-0.5 m-2 rounded hover:bg-green-300 hover:border-green-300 hover:text-black transition-colors duration-150;
}
</style>
