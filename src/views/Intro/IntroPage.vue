<template>
  <div class="pt-4 pb-16 mx-auto max-w-[816px] md:pt-8 md:pb-24">
    <!-- 分類 -->
    <div class="flex relative gap-3 justify-center items-center mb-12">
      <router-link
        ref="introAbout"
        :to="{ name: 'About' }"
        class="py-1 px-4 min-w-[96px] font-bold text-center text-myBrown rounded-lg md:px-8"
      >
        關於切切
      </router-link>
      <router-link
        ref="introFaq"
        :to="{ name: 'Faq' }"
        class="py-1 px-4 min-w-[96px] font-bold text-center text-myBrown rounded-lg md:px-8"
      >
        切切FAQ
      </router-link>
      <router-link
        ref="introTeam"
        :to="{ name: 'Team' }"
        class="py-1 px-4 min-w-[96px] font-bold text-center text-myBrown rounded-lg md:px-8"
      >
        製作團隊
      </router-link>
      <div
        ref="introBar"
        class="absolute -bottom-2 h-1 bg-myYellow transition-all duration-300 scale-x-75"
      ></div>
    </div>
    <div class="px-8 md:px-12">
      <router-view v-slot="{ Component }">
        <Transition
          appear
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          :enter-from-class="viewEnterClass"
          enter-to-class="transform opacity-100 translate-x-0"
          leave-active-class="transition duration-300 ease-out"
          leave-from-class="transform opacity-100 translate-x-0"
          :leave-to-class="viewLeaveClass"
        >
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroPage',
  props: {
    viewName: {
      type: String,
      default: '',
    },
    viewType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // viewType: ''
      viewEnterClass: '',
      viewLeaveClass: '',
    }
  },
  watch: {
    viewName: {
      handler(name) {
        console.log(name)
        this.introBarHandler(name)
      },
    },
    // 頁面過渡效果
    viewType: {
      handler(newType, oldType) {
        if (newType > oldType) {
          this.viewEnterClass = 'transform opacity-0 translate-x-48'
          this.viewLeaveClass = 'transform opacity-0 -translate-x-48'
        } else {
          this.viewEnterClass = 'transform opacity-0 -translate-x-48'
          this.viewLeaveClass = 'transform opacity-0 translate-x-48'
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.introBarInit()
  },
  methods: {
    introBarInit() {
      this.$refs.introBar.style.width = this.$refs[this.viewName].$el.getBoundingClientRect().width + 'px'
      this.$refs.introBar.style.left = this.$refs[this.viewName].$el.offsetLeft + 'px'
    },
    introBarHandler(viewName) {
      this.$refs.introBar.style.width = this.$refs[viewName].$el.getBoundingClientRect().width + 'px'
      this.$refs.introBar.style.left = this.$refs[viewName].$el.offsetLeft + 'px'
    },
  },
}
</script>