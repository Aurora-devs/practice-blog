<template>
  <form
    @submit.prevent="login(email, password)"
    class="
      flex flex-col
      items-center
      p-4
      my-4
      bg-white
      shadow-md
      lg:w-1/3
      m-auto
    "
  >
    <h2 class="mb-4 text-2xl font-bold">Login</h2>
    <input
      type="email"
      name="email"
      v-model="email"
      id="email"
      class="w-full rounded my-2"
      placeholder="Email..."
    />
    <input
      type="password"
      name="password"
      v-model="password"
      id="password"
      class="w-full rounded my-2"
      placeholder="Password..."
    />
    <div
      class="
        relative
        text-green-700
        bg-green-100
        w-full
        text-center
        p-2
        my-4
        border
        rounded
        border-green-700
      "
      v-if="showSuccess"
    >
      <CheckCircleIcon class="w-6 h-6 text-green-700 top-2 absolute" />
      You logged in!
    </div>
    <div
      class="
        relative
        text-red-700
        bg-red-100
        w-full
        text-center
        p-2
        my-4
        border
        rounded
        border-red-700
      "
      v-if="showError"
    >
      <ExclamationCircleIcon class="w-6 h-6 text-red-700 top-2 absolute" />
      Invalid data!
    </div>
    <input
      type="submit"
      value="Login"
      class="
        bg-blue-500
        text-white
        w-full
        p-2
        mt-8
        rounded
        cursor-pointer
        hover:bg-blue-400
        transition-colors
      "
    />
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
export default defineComponent({
  name: "Login",
  components: {
    ExclamationCircleIcon,
    CheckCircleIcon,
  },
  setup: () => {
    const router = useRouter();
    localStorage.token && router.push("/");

    const store = useStore();

    const showError = ref(false);
    const showSuccess = ref(false);
    const email = ref("");
    const password = ref("");

    function login(email: string, password: string) {
      axios
        .post("/api/users/login", { email, password })
        .then(res => {
          showError.value = false;
          showSuccess.value = true;
          store.commit("setToken", res.data.token);

          router.push("/");
        })
        .catch(() => (showError.value = true));
    }
    return {
      showSuccess,
      showError,
      email,
      password,
      login,
    };
  },
});
</script>
