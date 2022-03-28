<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="maskBlackState.isShow"
      class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300"
      @click="dropToggle"
    ></div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'MaskBlack',
  computed: {
    ...mapState([
      'maskBlackState',
    ])
  },
  watch: {
    // 'maskBlackState.isShow': {
    //   handler(newVal) {
    //     if (newVal === true) {
    //       document.querySelector('body').classList.add('hideScrollbar')
    //     } else {
    //       document.querySelector('body').classList.remove('hideScrollbar')
    //     }
    //   },
    //   immediate: true,
    // }
  },
  methods: {
    ...mapMutations([
      'SET_MASK',
    ]),
    dropToggle() {
      if (this.maskBlackState.allowDrop) {
        this.SET_MASK({
          allowDrop: true,
          isShow: !this.maskBlackState.isShow
        })
      }
    }
  }
}
</script>

<style lang="sass">
.hideScrollbar
  overflow: hidden
</style>