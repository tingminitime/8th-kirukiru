<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      收藏總覽
    </h2>
    <div class="flex gap-3 mb-8">
      <!-- 是否公開收藏 -->
      <span class="font-bold text-myBrown">
        是否公開你的文章收藏 ?
      </span>
      <SwitchGroup>
        <div class="flex items-center">
          <Switch
            :value="openMyCollections"
            :class="openMyCollections ? 'bg-myYellow' : 'bg-white'"
            class="mySwitchBar"
            @click="onChangeOpenMyCollections"
          >
            <span class="sr-only">您是否同意切切規範</span>
            <span
              :class="openMyCollections ? 'translate-x-8' : 'translate-x-0'"
              class="mySwitchButton"
            ></span>
          </Switch>
        </div>
      </SwitchGroup>
    </div>
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
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import MyCollectKiruArticles from '@/components/user/MyCollectKiruArticles.vue'
import MyCollectCommonArticles from '@/components/user/MyCollectCommonArticles.vue'
import {
  changeMyCollectionsOpen,
} from '@api'
import { mapState } from 'vuex'

export default {
  name: 'UserCollections',
  components: {
    Switch,
    SwitchGroup,
    SwitchLabel,
    MyCollectKiruArticles,
    MyCollectCommonArticles,
  },
  data() {
    return {
      articleType: 'MyCollectKiruArticles',
      isInit: false,
      openMyCollections: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  mounted() {
    this.openMyCollections = this.userInfo.isCollect
  },
  methods: {
    onChangeOpenMyCollections() {
      this.openMyCollections = !this.openMyCollections
      this.changeMyCollectionsOpenHandler(this.openMyCollections)
    },
    changeMyCollectionsOpenHandler(isOpen) {
      changeMyCollectionsOpen(isOpen).then(res => {
        console.log('修改公開收藏文章設定: ', res)
        if (res.data.success) {
          this.$notify({
            group: 'normal',
            title: '修改成功',
          })
        } else {
          this.$notify({
            group: 'error',
            title: '修改失敗',
          })
        }
      }).catch(error => console.error(error))
    },
  },
}
</script>