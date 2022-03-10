<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1
    class="text-5xl font-black text-transparent bg-clip-text selection:bg-transparent bg-gradient-to-r from-green-600 to-sky-400"
  >
    {{ msg }}
  </h1>

  <p class="mt-6 space-x-4">
    Recommended IDE setup:
    <a
      href="https://code.visualstudio.com/"
      class="text-emerald-500 hover:text-emerald-400 underline transition-all"
      target="_blank"
    >VSCode</a>
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      class="text-emerald-500 hover:text-emerald-400 underline transition-all"
      target="_blank"
    >Volar</a>
  </p>

  <p class="mt-4 space-x-4">
    <a
      href="https://vitejs.dev/guide/features.html"
      class="text-emerald-500 hover:text-emerald-400 underline transition-all"
      target="_blank"
    >
      Vite Documentation
    </a>
    |
    <a
      href="https://v3.vuejs.org/"
      class="text-emerald-500 hover:text-emerald-400 underline transition-all"
      target="_blank"
    >Vue 3 Documentation</a>
  </p>

  <button
    type="button"
    class="py-2 px-4 my-6 bg-gray-300 hover:bg-gray-200 rounded transition-all"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code class="text-gray-400">components/HelloWorld.vue</code> to test hot
    module replacement.
  </p>
</template>

<style scoped></style>
