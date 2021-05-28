<template>
  <main class="md:px-20">
    <header>
      <h1 class="text-4xl mb-6 font-semibold">
        {{ article.title }}
      </h1>
      <p class="text-gray-600">
        tags:
        <span
          v-for="tag in article.tag"
          class="
            p-2
            text-blue-400
            hover:text-blue-600
            hover:underline
            cursor-pointer
            transition-colors
            duration-150
          "
          >{{ tag }}</span
        >
      </p>
      <p class="text-gray-600 flex items-center mt-1">
        By
        <b class="text-green-600 m-2">{{ article.user.name }}</b> |
        <span class="flex items-center"
          ><ClockIcon class="h-5 w-5 ml-2 mr-1 inline" />9 min</span
        >
      </p>
    </header>
    <section class="my-4">
      <img :src="article.thumbnail" alt="article-img" />
      <p class="mt-4 prose">{{ article.description }}</p>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ClockIcon } from "@heroicons/vue/outline";

export default defineComponent({
  name: "SingleArticle",
  components: {
    ClockIcon,
  },
  setup: async () => {
    const route = useRoute();
    const res = await axios.get(`/api/articles/${route.params.id}`);
    const article = res.data;
    return {
      article,
    };
  },
});
</script>
