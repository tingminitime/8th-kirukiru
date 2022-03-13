<template>
  <div class="flex gap-3 justify-center bg-gray-300">
    <p class="font-bold">
      User Info UID: {{ uid }}
    </p>
    <p class="font-bold">
      User Info TEST: {{ test }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    uid: {
      type: [String, Number],
      default: null,
    },
    test: {
      type: [String, Number],
      default: '',
    },
  }
}
</script>