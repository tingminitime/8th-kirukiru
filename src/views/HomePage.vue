<template>
  <TopNavbar></TopNavbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'

export default {
  name: 'HomePage',
  components: {
    TopNavbar,
  }
}
</script>