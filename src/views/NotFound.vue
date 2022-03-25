<template>
  <div class="flex justify-center items-center p-12">
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
    <div v-else>
      404 Not Found!
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    message: {
      type: String,
      default: '',
    }
  }
}
</script>