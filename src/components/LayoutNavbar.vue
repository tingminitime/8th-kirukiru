<template>
  <nav class="py-2.5 px-4 h-32 bg-myYellow sm:h-24 md:px-8">
    <div class="container flex justify-between mx-auto h-full">
      <div></div>
      <div class="w-[140px]">
        <router-link
          :to="{ name: 'HomePage' }"
          class="block w-[140] h-full sm:w-24 md:w-32 navLogo"
        >
        </router-link>
      </div>
      <div></div>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>