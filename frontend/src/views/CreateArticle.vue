<template>
  <main class="prose-sm my-4">
    <h2>Create New Article</h2>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" />
    </div>
    <div class="form-group">
      <label for="description">description</label>
      <textarea name="description" id="description" class="h-64"></textarea>
    </div>
    <div class="flex items-center">
      <label
        for="thumbnail-img"
        class="
          cursor-pointer
          rounded
          border-2
          py-1
          pl-4
          pr-6
          border-blue-400
          flex
          items-center
          font-semibold
          transition-colors
          text-blue-400
          hover:bg-blue-400
          hover:text-white
        "
      >
        <UploadIcon class="w-5 h-5 mr-4" />
        UPLOAD IMAGE
      </label>
      <input
        type="file"
        name="thumbnail-img"
        id="thumbnail-img"
        ref="actualFileInput"
        @change="fileLoaded"
        hidden
      />
      <span class="loaded-file-name ml-2">{{ fileName }}</span>
    </div>
    <input
      type="submit"
      value="CREATE"
      class="
        border-2
        font-semibold
        border-green-600
        text-green-600
        py-1
        px-4
        mt-4
        rounded
        cursor-pointer
        transition-colors
        hover:bg-green-600
        hover:text-white
      "
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UploadIcon } from "@heroicons/vue/outline";
export default defineComponent({
  name: "CreateArticle",
  components: {
    UploadIcon,
  },
  setup() {
    const fileName = ref("No file chosen");
    function fileLoaded(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target?.files) {
        fileName.value = target.files[0].name;
      }
    }
    return {
      fileName,
      fileLoaded,
    };
  },
});
</script>

<style lang="postcss" scoped>
.form-group {
  @apply flex flex-col my-4;
}
textarea,
input[type="text"] {
  @apply rounded py-1.5;
}
</style>
