<template>
  <LayoutNavbar></LayoutNavbar>
  <router-view></router-view>
</template>

<script>
import LayoutNavbar from '@/components/LayoutNavbar.vue'

export default {
  name: 'PageHome',
  components: {
    LayoutNavbar,
  }
}
</script>