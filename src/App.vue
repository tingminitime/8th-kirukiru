<template>
  <router-view></router-view>
  <MaskBlack></MaskBlack>
  <!-- <transition
    mode="out-in"
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-48"
    enter-to-class="transform opacity-100 translate-x-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 translate-x-0"
    leave-to-class="transform opacity-0 -translate-x-48"
  >
    <LoginModal v-if="openLoginModal"></LoginModal>
    <RegisterModal v-else-if="openRegisterModal"></RegisterModal>
  </transition> -->
</template>

<script>
import MaskBlack from '@/components/MaskBlack.vue'
// import LoginModal from '@/components/LoginModal.vue'
// import RegisterModal from '@/components/RegisterModal.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      MaskBlack,
      // LoginModal,
      // RegisterModal,
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
