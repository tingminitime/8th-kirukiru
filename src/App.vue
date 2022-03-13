<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
      }),
      ...mapGetters([
        'filterTodos'
      ])
    },
    mounted() {
      // apiTest().then((res) => {
      //   console.log(res)
      // })
      console.log(this.filterTodos(1).content)
      console.log(this.$store.getters.filterTodos(2).content)
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
