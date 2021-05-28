<template>
  <div
    v-if="showError"
    @click="showError = false"
    class="
      error-success
      text-red-700
      border-red-700
      bg-red-200
      hover:bg-opacity-80
    "
  >
    <ExclamationCircleIcon class="w-6 h-6 text-red-700 top-4 absolute" />
    error/success message
  </div>
  <div
    v-if="showSuccess"
    @click="showSuccess = false"
    class="
      error-success
      text-green-700
      border-green-700
      bg-green-200
      hover:bg-opacity-80
    "
  >
    <CheckCircleIcon class="w-6 h-6 text-green-700 top-4 absolute" />
    error/success message
  </div>
  <form @submit.prevent="createArticle" class="prose-sm my-4">
    <h2>Create New Article</h2>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="title" />
    </div>
    <div class="form-group">
      <label for="tag">Tags</label>
      <input type="text" name="tag" id="tag" v-model="tag" />
      <p class="flex items-center text-gray-400 ml-4">
        <span class="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>Seperate with
        space
      </p>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        v-model="description"
        class="h-64"
      ></textarea>
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
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  UploadIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/outline";
import axios from "axios";

export default defineComponent({
  name: "CreateArticle",
  components: {
    UploadIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
  },
  setup() {
    // form fields and file upload customization
    const title = ref("");
    const tag = ref("");
    const description = ref("");
    const fileName = ref("No file chosen");
    const thumbnail = ref({} as File);

    function fileLoaded(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target?.files) {
        fileName.value = target.files[0].name;
        thumbnail.value = target.files[0];
      }
    }

    const showError = ref(false);
    const showSuccess = ref(false);

    // Create article
    function createArticle() {
      const bodyFormData = new FormData();
      bodyFormData.append("image", thumbnail.value, fileName.value);
      axios
        .post("/api/upload", bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res => {
          axios
            .post(
              "/api/articles/new",
              {
                title: title.value,
                description: description.value,
                tag: tag.value,
                thumbnail: res.data,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.token}`,
                },
              },
            )
            .then(() => {
              showSuccess.value = true;
            });
        })
        .catch(() => {
          showError.value = true;
        });
    }

    return {
      title,
      tag,
      description,
      fileName,
      fileLoaded,
      showError,
      showSuccess,
      createArticle,
    };
  },
});
</script>

<style lang="postcss" scoped>
.error-success {
  @apply bg-opacity-50 cursor-pointer transition-colors absolute bottom-8 left-8 right-8 md:left-1/3 md:right-1/3 text-center p-4 -mt-4 border-2 rounded;
}
.form-group {
  @apply flex flex-col my-4;
}
textarea,
input[type="text"] {
  @apply rounded py-1.5;
}
</style>
