<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      文章總覽
    </h2>
    <!-- 文章分類 -->
    <div class="flex gap-3 items-center mb-6">
      <button
        type="button"
        class="py-1 px-2 min-w-[144px] font-bold text-myBrown rounded-lg"
        :class="[ articleType === 'MyKiruArticleList' ? 'bg-myYellow' : 'bg-white md:hover:bg-myLightenYellow/60' ]"
        @click="articleType = 'MyKiruArticleList'"
      >
        切切文章
      </button>
      <button
        type="button"
        class="py-1 px-2 min-w-[144px] font-bold text-myBrown rounded-lg"
        :class="[ articleType === 'MyCommonArticleList' ? 'bg-myYellow' : 'bg-white md:hover:bg-myLightenYellow/60' ]"
        @click="articleType = 'MyCommonArticleList'"
      >
        一般文章
      </button>
    </div>
    <!-- 是否已發布 + 文章列表 -->
    <div class="relative min-h-[606px]">
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
            ref="myArticleList"
            @is-loading="isLoading = $event"
            @delete-article="onDeleteMyArticle"
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
    <!-- 提示Modal -->
    <AlertModal
      v-bind="alertInfo"
      :key="'kiru'"
      @alert-confirm="deleteMyArticleHandler"
      @alert-cancel="cancelDelete"
    ></AlertModal>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import AlertModal from '@/components/utils/AlertModal.vue'
import MyKiruArticleList from '@/components/user/MyKiruArticleList.vue'
import MyCommonArticleList from '@/components/user/MyCommonArticleList.vue'
import {
  deleteMyKiruArticle,
  deleteMyCommonArticle,
} from '@api'

export default {
  name: 'UserArticles',
  components: {
    Loading,
    AlertModal,
    MyKiruArticleList,
    MyCommonArticleList,
  },
  data() {
    return {
      articleType: 'MyKiruArticleList',
      alertInfo: null,
      deleteData: null,
      isLoading: false,
    }
  },
  mounted() {

  },
  methods: {
    // 刪除文章事件
    onDeleteMyArticle(deleteData) {
      this.deleteData = deleteData
      this.alertInfo = {
        titleText: '確定刪除此文章 ?',
        message: this.deleteData.articleTitle,
        showTitle: true,
        showClose: true,
        confirmMode: 'nothing',
        messageClass: 'text-lg font-bold text-myBrown md:text-xl line-clamp-2',
      }
      this.$store.commit('SHOW_ALERT')
    },
    // 刪除文章
    deleteMyArticleHandler() {
      this.isLoading = true
      switch (this.articleType) {
        // 刪除切切文章
        case 'MyKiruArticleList':
          deleteMyKiruArticle(this.deleteData.articleId).then(res => {
            if (res.data.success) {
              this.$notify({
                group: 'success',
                title: '已刪除文章',
              })
              this.$refs.myArticleList.getMyKiruArticleHandler(this.$refs.myArticleList.paginationVm.currentPage)
            } else {
              this.$notify({
                group: 'error',
                title: '刪除失敗',
              })
              this.isLoading = false
            }
            this.deleteData = null
          }).catch(error => console.error(error))
          break
        // 刪除一般文章
        case 'MyCommonArticleList':
          deleteMyCommonArticle(this.deleteData.articleId).then(res => {
            if (res.data.success) {
              this.$notify({
                group: 'success',
                title: '已刪除文章',
              })
              this.$refs.myArticleList.getMyCommonArticleHandler(this.$refs.myArticleList.paginationVm.currentPage)
            } else {
              this.$notify({
                group: 'error',
                title: '刪除失敗',
              })
              this.isLoading = false
            }
            this.deleteData = null
          }).catch(error => console.error(error))
          break
        default:
          break
      }
    },
    // 取消刪除
    cancelDelete() {
      this.deleteData = null
    },
  },
}
</script>