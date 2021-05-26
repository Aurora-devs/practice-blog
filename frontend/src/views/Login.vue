<template>
  <form class="flex flex-col items-center p-4 my-4 bg-white shadow-md">
    <h2 class="mb-4 text-2xl font-bold">Login</h2>
    <input
      type="email"
      name="email"
      id="email"
      class="w-full rounded my-2"
      placeholder="Email..."
    />
    <input
      type="password"
      name="password"
      id="password"
      class="w-full rounded my-2"
      placeholder="Password..."
    />
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
