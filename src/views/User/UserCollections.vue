<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      收藏總覽
    </h2>
    <!-- 文章分類 -->
    <div class="flex gap-3 items-center mb-6">
      <button
        type="button"
        class="py-1 px-2 min-w-[144px] font-bold text-myBrown rounded-lg"
        :class="[ articleType === 'MyCollectKiruArticles' ? 'bg-myYellow' : 'bg-white md:hover:bg-myLightenYellow/60' ]"
        @click="articleType = 'MyCollectKiruArticles'"
      >
        切切文章
      </button>
      <button
        type="button"
        class="py-1 px-2 min-w-[144px] font-bold text-myBrown rounded-lg"
        :class="[ articleType === 'MyCollectCommonArticles' ? 'bg-myYellow' : 'bg-white md:hover:bg-myLightenYellow/60' ]"
        @click="articleType = 'MyCollectCommonArticles'"
      >
        一般文章
      </button>
    </div>
    <!-- 文章列表 -->
    <div>
      <Transition
        appear
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-x-48"
        enter-to-class="transform opacity-100 translate-x-0"
      >
        <KeepAlive>
          <component
            :is="articleType"
          ></component>
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>

<script>
import MyCollectKiruArticles from '@/components/user/MyCollectKiruArticles.vue'
import MyCollectCommonArticles from '@/components/user/MyCollectCommonArticles.vue'

export default {
  name: 'UserCollections',
  components: {
    MyCollectKiruArticles,
    MyCollectCommonArticles,
  },
  data() {
    return {
      articleType: 'MyCollectKiruArticles',
    }
  },
  methods: {

  },
}
</script>