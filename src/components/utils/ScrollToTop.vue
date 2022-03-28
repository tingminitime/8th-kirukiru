<template>
  <Transition
    appear
    mode="out-in"
    enter-active-class="transition duration-300 ease-out delay-300"
    enter-from-class="transform opacity-0 translate-y-48"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in delay-300"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-48"
  >
    <div
      v-if="show"
      class="hidden fixed right-8 bottom-[15%] z-30 md:block"
    >
      <router-link
        class="flex flex-col justify-center items-center p-2 hover:bg-myYellow/20 active:bg-myYellow/20 rounded-full transition-all"
        :to="{ name: $route.name }"
      >
        <span class="text-3xl font-bold leading-6 text-myBrown material-icons">keyboard_double_arrow_up</span>
        <span class="text-sm text-myBrown">Top</span>
      </router-link>
    </div>
  </Transition>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ScrollToTop',
  data() {
    return {
      show: false,
      debounceScroll: null,
    }
  },
  created() {
    this.debounceScroll = _.debounce(this.scrollHandler, 100)
    window.addEventListener('scroll', this.debounceScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.debounceScroll)
  },
  methods: {
    scrollHandler(event) {
      if (window.scrollY >= window.innerHeight * 0.1) this.show = true
      else this.show = false
    },
  }
}
</script>