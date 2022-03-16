<template>
  <div>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
      class="inline-flex relative items-center w-11 h-6 rounded-full"
    >
      <span class="sr-only">Enable notifications</span>
      <span
        :class="enabled ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block w-4 h-4 bg-white rounded-full"
      ></span>
    </Switch>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>