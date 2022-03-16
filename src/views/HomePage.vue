<template>
  <TopNavbar></TopNavbar>
  <div class="px-4 mx-auto max-w-[816px] md:px-8">
    <p>HOME PAGE</p>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'

export default {
  name: 'HomePage',
  components: {
    TopNavbar,
  },
}
</script>