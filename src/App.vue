<template>
  <router-view></router-view>
  <p>{{ $store.state.count }}</p>
  <p>{{ count }}</p>
</template>

<script>
import { mapState } from 'vuex'
import { apiTest } from '@/http/api'

  export default {
    name: 'App',
    data() {
      return {
        // count: 0,
      }
    },
    computed: {
      ...mapState({
        // count: state => state.count,
        count: 'count',
      })
    },
    mounted() {
      // apiTest().then((res) => {
      //   console.log(res)
      // })
    },
  }
</script>

<style lang="sass">
  .router-link-active
    transition: all .2s
    background-color: #eee
    color: #49c4d3
    font-size: 1.25rem
</style>
