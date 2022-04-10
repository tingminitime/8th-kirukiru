<template>
  <!-- 是否已發布 -->
  <div class="flex relative gap-3 items-center mb-6">
    <button
      ref="isPushBtn"
      type="button"
      class="py-1 px-2 min-w-[96px] font-bold text-myBrown rounded-lg md:hover:bg-white/40"
      @click="isPushBarHandler(true, $event)"
    >
      已發布
    </button>
    <button
      ref="noPushBtn"
      type="button"
      class="py-1 px-2 min-w-[96px] font-bold text-myBrown rounded-lg md:hover:bg-white/40"
      @click="isPushBarHandler(false, $event)"
    >
      草稿匣
    </button>
    <div
      ref="isPushBar"
      class="absolute -bottom-1 h-1 bg-myYellow transition-all scale-x-75"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'PushSelect',
  emits: ['is-push'],
  mounted() {
    this.isPushBarInit()
  },
  methods: {
    isPushBarInit() {
      this.$refs.isPushBar.style.width = this.$refs.isPushBtn.getBoundingClientRect().width + 'px'
      this.$refs.isPushBar.style.left = this.$refs.isPushBtn.offsetLeft + 'px'
    },
    isPushBarHandler(isPush, e) {
      this.$emit('is-push', isPush)
      this.$refs.isPushBar.style.width = e.target.getBoundingClientRect().width + 'px'
      this.$refs.isPushBar.style.left = e.target.offsetLeft + 'px'
    },
  },
}
</script>