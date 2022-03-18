<template>
  <TopNavbar v-if="$route.meta.navbar"></TopNavbar>
  <router-view></router-view>
  <MaskBlack></MaskBlack>
  <NotiWind></NotiWind>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'
import MaskBlack from '@/components/MaskBlack.vue'
import NotiWind from '@/components/utils/NotiWind.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      TopNavbar,
      MaskBlack,
      NotiWind,
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
    },
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
