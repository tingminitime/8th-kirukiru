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

  <button
    type="button"
    class="py-2 px-4 my-6 bg-gray-300 hover:bg-gray-200 rounded transition-all"
    @click="count++"
  >
    count is: {{ count }}
  </button>
</template>

<style scoped></style>
