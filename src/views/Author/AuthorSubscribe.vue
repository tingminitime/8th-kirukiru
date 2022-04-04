<template>
  <div class="mx-auto max-w-[816px] md:px-0">
    <div
      ref="searchSwitch"
      class="flex overflow-x-auto justify-between items-center py-2 mb-4 md:overflow-x-hidden md:justify-evenly md:mb-8 xScrollbar"
      @touchstart="searchSwitchTouch(true, $event)"
      @touchend="searchSwitchTouch(false, $event)"
    >
      <button
        type="button"
        class="text-myBrown/40 whitespace-nowrap searchSwitchBtn"
        :class="{ 'before:opacity-100 text-myBrown/100': type === 'publish-kiru' }"
        @click="searchSwitchHandler('publish-kiru', 'PublishKiru')"
      >
        發布的切切
      </button>
      <button
        type="button"
        class="text-myBrown/40 whitespace-nowrap searchSwitchBtn"
        :class="{ 'before:opacity-100 text-myBrown/100': type === 'collect-kiru' }"
        @click="searchSwitchHandler('collect-kiru', 'CollectKiru')"
      >
        收藏的切切
      </button>
      <button
        type="button"
        class="text-myBrown/40 whitespace-nowrap searchSwitchBtn"
        :class="{ 'before:opacity-100 text-myBrown/100': type === 'publish-common' }"
        @click="searchSwitchHandler('publish-common', 'PublishCommon')"
      >
        發布的文章
      </button>
      <button
        type="button"
        class="text-myBrown/40 whitespace-nowrap searchSwitchBtn"
        :class="{ 'before:opacity-100 text-myBrown/100': type === 'collect-common' }"
        @click="searchSwitchHandler('collect-common', 'CollectCommon')"
      >
        收藏的文章
      </button>
    </div>
    <!-- 列表 -->
    <div class="relative min-h-[720px] rounded-lg">
      <Transition
        appear
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-x-48"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 -translate-x-48"
      >
        <KeepAlive>
          <component
            :is="component"
            :type="type"
            @is-loading="isLoading = $event"
          ></component>
        </KeepAlive>
      </Transition>
      <!-- 局部 Loading -->
      <Loading
        v-model:active="isLoading"
        :is-full-page="false"
        background-color="#EDEDEB"
      >
        <GlobalLoading
          class="la-2x"
          :show="isLoading"
        ></GlobalLoading>
      </Loading>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import PublishKiru from '@/components/author/PublishKiru.vue'
import CollectKiru from '@/components/author/CollectKiru.vue'
import PublishCommon from '@/components/author/PublishCommon.vue'
import CollectCommon from '@/components/author/CollectCommon.vue'

export default {
  name: 'AuthorSubscribe',
  components: {
    Loading,
    PublishKiru,
    CollectKiru,
    PublishCommon,
    CollectCommon,
  },
  props: {
    authorId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      // publish-kiru | collect-kiru | publish-common | collect-common
      type: 'publish-kiru',
      component: 'PublishKiru',
      isLoading: false,
    }
  },
  mounted() {

  },
  methods: {
    searchSwitchTouch(status, event) {
      console.log('touching...', status)
      if (status) {
        event.currentTarget.classList.add('xScrollbarTouch')
      } else {
        event.currentTarget.classList.remove('xScrollbarTouch')
      }
    },
    searchSwitchHandler(type, component) {
      this.type = type
      this.component = component
    },
  },
}
</script>

<style lang="sass" scoped>
.xScrollbar
  &::-webkit-scrollbar
    height: 4px
  &::-webkit-scrollbar-thumb
    background-color: rgba(#553529, 0)

.xScrollbarTouch
  &::-webkit-scrollbar-thumb
    background-color: rgba(#553529, 0.25)
</style>