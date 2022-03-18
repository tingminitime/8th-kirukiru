<template>
  <!-- <div class="max-w-[816px]"></div> -->
  <div class="px-4 mx-auto md:px-8">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'HomePage',
  components: {
    
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>