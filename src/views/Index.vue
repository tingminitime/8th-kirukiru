<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'Index',
    components: {
      Header,
    }
  }
</script>