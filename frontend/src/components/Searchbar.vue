<template>
  <div
    class="flex flex-col w-full md:flex-row md:items-center md:justify-between"
  >
    <p>Showing <b>1</b> to <b>12</b> of 2442 posts</p>
    <form
      class="relative bg-white border rounded-md mt-2 md:m-0"
      :class="searchFocus ? 'border-blue-500' : 'border-gray-400'"
      @submit.prevent="searchQuery(searchString)"
    >
      <input
        type="text"
        name="search"
        id="search"
        class="
          ml-8
          py-1
          focus:ring-0
          focus:outline-none
          border-none
          bg-transparent
          placeholder-gray-300
        "
        placeholder="Search blog..."
        @focusin="searchFocus = true"
        @focusout="searchFocus = false"
        v-model="searchString"
        autocomplete="off"
      />
      <SearchIcon
        class="w-5 h-5 absolute left-1.5 top-1.5"
        :class="searchFocus ? 'text-blue-500' : 'text-gray-400'"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { SearchIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";

export default defineComponent({
  name: "Searchbar",
  components: {
    SearchIcon,
  },
  setup: () => {
    const store = useStore();

    const searchFocus = ref(false);
    const searchString = ref("");

    function searchQuery(query: string) {
      store.commit("getQueryArticles", query);
    }
    return {
      searchFocus,
      searchString,
      searchQuery,
    };
  },
});
</script>
