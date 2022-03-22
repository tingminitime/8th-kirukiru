<template> 
  <div
    class="sticky top-0 z-20 w-full"
  >
    <nav class="relative px-8 h-nav bg-myGray/80 border-b border-slate-50/50 drop-shadow-lg backdrop-blur">
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
            class="block relative before:absolute before:bottom-0 before:left-0 p-4 before:w-full before:h-1 font-bold text-myBrown before:bg-myYellow/50 before:opacity-0 hover:before:opacity-100 before:transition-all sm:py-6"
            @click="saveArticleHandler"
          >
            儲存文章
          </button>
          <button
            type="button"
            class="block relative before:absolute before:bottom-0 before:left-0 p-4 before:w-full before:h-1 font-bold text-white before:bg-myYellow/50 bg-center bg-no-repeat bg-contain bg-button-publish before:opacity-0 hover:before:opacity-100 before:transition-all sm:py-6"
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