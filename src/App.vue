<template>
  <Nav></Nav>
  <router-view></router-view>
  <div class="flex justify-center">
    <button
      type="button"
      class="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded"
      @click="clickHandler"
    >
      Go to USER page
    </button>
  </div>
</template>

<script>
  import Nav from '@/components/Nav.vue'

  export default {
    name: 'App',
    components: {
      Nav,
    },
    data() {
      return {
        show: 1
      }
    },
    methods: {
      clickHandler() {
        this.$router.push('/user')
      },
    }
  }
</script>

<style lang="sass">
  .router-link-active
    transition: all .2s
    background-color: #eee
    color: #49c4d3
    font-size: 1.25rem
</style>
