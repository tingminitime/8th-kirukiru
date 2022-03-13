<template>
  <div class="flex justify-center">
    <p class="text-3xl font-bold text-center text-orange-500">
      Index
    </p>
  </div>
  <p class="text-center">
    {{ $route.query.page }}
  </p>
</template>

<script>
export default {
  name: 'IndexContent',
  // props: {
  //   page: {
  //     type: Boolean,
  //     default: false,
  //   }
  // }
}
</script>