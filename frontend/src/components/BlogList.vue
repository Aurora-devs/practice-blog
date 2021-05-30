<template>
  <section class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <BlogItem
      v-for="article in state.articles"
      :img="article.thumbnail"
      :tags="article.tag"
      :title="article.title"
      :author="article.user.name"
      :id="article._id"
      dateCreated="Nov 11, 2019"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import BlogItem from "./BlogItem.vue";

export default defineComponent({
  name: "BlogList",
  components: {
    BlogItem,
  },
  setup: () => {
    const route = useRoute();
    const store = useStore();
    const state = store.state;

    if (route.query.keyword) {
      store.commit("getQueryArticles", route.query.keyword);
    } else {
      store.commit("getAllArticles");
    }

    return {
      state,
    };
  },
});
</script>
