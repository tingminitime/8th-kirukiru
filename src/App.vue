<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="text-center selection:bg-green-100">
    <img
      class="mx-auto mt-12 mb-8"
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <!-- <HelloWorld msg="Vite + Vue 3 + Tailwindcss v3" /> -->
    <router-view></router-view>

    <div class="py-2 px-4 text-white bg-sky-700 hover:bg-sky-800 sm:py-3 sm:px-8">
      123
    </div>
    <img
      class="my-8 mx-auto"
      alt="powered-by"
      src="./assets/powered-by-vitawind-bright.png"
    >
  </div>
</template>

<style></style>
