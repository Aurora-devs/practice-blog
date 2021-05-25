<template>
  <section class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <BlogItem
      v-for="article in state.articles"
      img="https://www.oberlo.com/media/1603969791-image-1.jpg?fit=max&fm=jpg&w=1824"
      tag="HOW TO"
      title="20 typography examples for tailwindcss typography in vuejs"
      author="Creative Market"
      dateCreated="Nov 11, 2019"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import BlogItem from "./BlogItem.vue";

export default defineComponent({
  name: "BlogList",
  components: {
    BlogItem,
  },
  setup: () => {
    const store = useStore();
    const state = store.state;
    store.commit("getAllArticles");

    return {
      state,
    };
  },
});
</script>
