<template>
  <div class="flex justify-center items-center p-12 mx-auto max-w-[816px]">
    <div v-if="message">
      <p class="text-center">
        {{ message }}
      </p>
      <div>
        <img
          src="@img/404NotFound.svg"
          alt="404 not fount"
        >
      </div>
    </div>
    <div v-else>
      <div>
        <img
          class="w-full"
          src="@img/404NotFound.svg"
          alt="404 not fount"
        >
      </div>
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