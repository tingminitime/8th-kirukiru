<template>
  <router-view></router-view>
  <MaskBlack></MaskBlack>
  <LoginModal :is-open="openLoginModal"></LoginModal>
</template>

<script>
import MaskBlack from '@/components/MaskBlack.vue'
import LoginModal from '@/components/LoginModal.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      MaskBlack,
      LoginModal,
    },
    data() {
      return {
        // count: 0,
      }
    },
    computed: {
      ...mapState([
        'openLoginModal'
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
    border-radius: 6px
</style>
