<template>
  <router-view></router-view>
  <MaskBlack></MaskBlack>
</template>

<script>
import MaskBlack from '@/components/MaskBlack.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      MaskBlack,
    },
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
    methods: {
      ...mapMutations([
        'SET_COUNT',
      ])
    }
  }
</script>

<style lang="sass">
</style>
