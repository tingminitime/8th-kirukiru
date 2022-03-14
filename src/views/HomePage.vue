<template>
  <TopNavbar></TopNavbar>
  <div class="container pt-[72px]">
    <router-view name="login"></router-view>
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