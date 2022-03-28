<template> 
  <div
    class="sticky top-0 z-20 w-full"
  >
    <nav class="relative px-4 h-nav bg-myGray/80 border-b border-slate-50/50 drop-shadow-lg backdrop-blur md:px-8">
      <div class="container flex justify-between items-center mx-auto max-w-5xl h-full">
        <router-link
          :to="{ name: 'HomePage' }"
          class="block"
        >
          <img
            class="object-contain w-full h-14"
            src="@img/Logo-editor.svg"
            alt="logo"
          >
        </router-link>
        <div class="flex gap-3 justify-center sm:gap-6">
          <button
            type="button"
            class="block relative before:absolute before:bottom-0 before:left-0 p-4 before:w-full before:h-1 text-sm font-medium text-myBrown before:bg-myYellow/50 before:opacity-0 hover:before:opacity-100 before:transition-all sm:py-6 md:text-base md:font-bold"
            @click="saveArticleHandler"
          >
            儲存文章
          </button>
          <button
            type="button"
            class="block relative before:absolute before:bottom-0 before:left-0 p-4 before:w-full before:h-1 text-sm font-bold text-myBrown before:bg-myYellow/50 before:opacity-0 hover:before:opacity-100 before:transition-all sm:py-6 md:text-base md:text-white md:bg-center md:bg-no-repeat md:bg-contain md:bg-button-publish"
            @click="publishArticleHandler"
          >
            <span>發布文章</span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditNavbar',
  components: {
  },
  props: {
    position: {
      type: String,
      default: 'sticky',
    },
  },
  emits: ['save-article', 'publish-article'],
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    saveArticleHandler() {
      this.$emit('save-article')
    },
    publishArticleHandler() {
      this.$emit('publish-article')
    },
  }
}
</script>