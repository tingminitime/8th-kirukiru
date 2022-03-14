<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
      console.log(this.filterTodos(1).content)
      console.log(this.$store.getters.filterTodos(2).content)
    },
  }
</script>

<style lang="sass">
</style>
