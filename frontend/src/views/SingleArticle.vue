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
        <b class="text-green-600 m-2" v-if="article.user">{{
          article.user.name
        }}</b>
        |
        <span class="flex items-center"
          ><ClockIcon class="h-5 w-5 ml-2 mr-1 inline" />9 min</span
        >
      </p>
    </header>
    <section class="my-4">
      <img :src="article.thumbnail" alt="article-img" />
      <p class="mt-4 prose">{{ article.description }}</p>
      <div class="my-4" v-if="isEditable">
        <router-link :to="`/articles/edit/${article._id}`">
          <button
            class="
              border-2 border-blue-500
              text-blue-500
              transition-colors
              cursor-pointer
              rounded
              px-4
              py-0.5
              mr-4
              font-semibold
              hover:text-white
              hover:bg-blue-500
            "
          >
            EDIT
          </button>
        </router-link>
        <button
          class="
            border-2 border-red-500
            text-red-500
            transition-colors
            cursor-pointer
            rounded
            px-4
            py-0.5
            mr-4
            font-semibold
            hover:text-white
            hover:bg-red-500
          "
          @click="deleteArticle"
        >
          DELETE
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ClockIcon } from "@heroicons/vue/outline";

export default defineComponent({
  name: "SingleArticle",
  components: {
    ClockIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const article = ref({} as any);
    const isEditable = ref(false);
    axios
      .get(`/api/articles/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(res => {
        article.value = res.data.article;
        isEditable.value = res.data.edit;
      });

    function deleteArticle() {
      axios
        .delete(`/api/articles/${article.value._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then(() => {
          router.push("/");
        });
    }
    return {
      deleteArticle,
      isEditable,
      article,
    };
  },
});
</script>
