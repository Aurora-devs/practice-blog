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
    Invalid data or server error!
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
    Article edited successfully!
  </div>
  <h1 class="text-2xl font-semibold">Edit profile</h1>
  <form @submit.prevent="updateProfile">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" v-model="name" id="name" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" name="email" v-model="email" id="email" />
    </div>
    <div class="form-group">
      <label for="pass1">New password</label>
      <input type="password" name="pass1" v-model="pass1" id="pass1" />
    </div>
    <div class="form-group">
      <label for="pass2">Confirm password</label>
      <input type="password" name="pass2" v-model="pass2" id="pass2" />
    </div>
    <input
      type="submit"
      value="EDIT PROFILE"
      class="
        border-2
        font-semibold
        border-blue-500
        text-blue-500
        py-1
        px-4
        mt-4
        rounded
        cursor-pointer
        transition-colors
        hover:bg-blue-500
        hover:text-white
      "
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EditProfile",
  components: {
    CheckCircleIcon,
    ExclamationCircleIcon,
  },
  setup() {
    const router = useRouter();
    const showError = ref(false);
    const showSuccess = ref(false);

    const name = ref("");
    const email = ref("");
    const pass1 = ref("");
    const pass2 = ref("");

    axios
      .get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(res => {
        name.value = res.data.user.name;
        email.value = res.data.user.email;
      });

    function updateProfile() {
      if (pass1.value) {
        if (pass1.value === pass2.value) {
          const newData = {
            name: name.value,
            email: email.value,
            password: pass1.value,
          };

          axios
            .put("/api/users/profile", newData, {
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
              },
            })
            .then(() => {
              showSuccess.value = true;
              router.push("/");
            });
        } else {
          pass1.value = "";
          pass2.value = "";
          showError.value = true;
        }
      } else {
        const newData = {
          name: name.value,
          email: email.value,
        };
        axios
          .put("/api/users/profile", newData, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          })
          .then(() => {
            showSuccess.value = true;
            router.push("/");
          });
      }
    }

    return {
      showError,
      showSuccess,
      name,
      email,
      pass1,
      pass2,
      updateProfile,
    };
  },
});
</script>

<style lang="postcss" scoped>
.error-success {
  @apply bg-opacity-50 cursor-pointer transition-colors absolute
bottom-8 left-8 right-8 md:left-1/3 md:right-1/3 text-center p-4 -mt-4 border-2
rounded;
}
.form-group {
  @apply flex flex-col my-4 rounded;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  @apply rounded py-1.5;
}
</style>
