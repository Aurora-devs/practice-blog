<template>
  <Searchbar />
  <BlogList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Searchbar from "../components/Searchbar.vue";
import BlogList from "../components/BlogList.vue";

export default defineComponent({
  name: "Blogs",
  components: {
    Searchbar,
    BlogList,
  },
});
</script>
