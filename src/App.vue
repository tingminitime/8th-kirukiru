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
      ...mapState([
        'openLoginModal',
        'openRegisterModal',
      ])
    }
  }
</script>

<style lang="sass">
*
  &::-webkit-scrollbar
    width: 8px
  &::-webkit-scrollbar-track
    opacity: 0
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    background-color: #553529
    border-radius: 8px
</style>
