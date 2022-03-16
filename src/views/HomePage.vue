<template>
  <TopNavbar></TopNavbar>
  <!-- <div class="max-w-[816px]"></div> -->
  <div class="px-4 pt-[72px] mx-auto md:px-8">
    <router-view></router-view>
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