<template>
  <main>
    <h1>{{ article.title }}</h1>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "SingleArticle",
  setup: async () => {
    const route = useRoute();
    const res = await axios.get(
      `http://localhost:5000/api/articles/${route.params.id}`,
    );
    const article = res.data;
    return {
      article,
    };
  },
});
</script>
