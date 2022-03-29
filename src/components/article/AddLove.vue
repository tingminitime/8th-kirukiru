<template>
  <button
    :class="buttonClass"
    @click="addLoveHandler"
  >
    <span
      v-if="isAddLove"
      :class="iconClass"
    >favorite</span>
    <span
      v-else
      :class="iconClass"
    >favorite_border</span>
    <span
      v-if="showLoveCount"
      :class="countClass"
    >{{ loveCount }}</span>
  </button>
</template>

<script>
export default {
  name: 'AddLove',
  props: {
    buttonClass: {
      type: String,
      default: 'block text-myBrown hover:text-myOrange'
    },
    iconClass: {
      type: String,
      default: 'inline-block px-1 text-lg align-middle material-icons'
    },
    countClass: {
      type: String,
      default: 'inline-block px-1 text-lg align-middle'
    },
    isAddLove: {
      type: Boolean,
      default: false,
    },
    showLoveCount: {
      type: Boolean,
      default: false,
    },
    loveCount: {
      type: [String, Number],
      default: 0,
    },
    articleType: {
      type: String,
      default: '',
    },
  },
  emits: ['add-love'],
  methods: {
    // 按愛心，可重複
    addLoveHandler() {
      switch (this.articleType) {
        case 'kiru':
          this.$store.dispatch('ADD_KIRU_LOVE', {
            artId: this.$route.params.articleId,
            putlove: true,
          }).then(res => {
            this.$emit('add-love', res)
          }).catch(error => console.error(error))
          break
        case 'common':
          this.$store.dispatch('ADD_COMMON_LOVE', {
            artId: this.$route.params.articleId,
            putlove: true,
          }).then(res => {
            this.$emit('add-love', res)
          }).catch(error => console.error(error))
          break
      }
    },
  },
}
</script>