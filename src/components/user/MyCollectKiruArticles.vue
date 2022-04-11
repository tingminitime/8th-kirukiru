<template>
  <div class="relative min-h-[606px]">
    <ul>
      <MyArticleItem
        v-for="content in kiruArticleList"
        :key="content.artId"
        v-bind="{ ...content, ...$attrs }"
        :show-feature="true"
        :show-edit="false"
        :show-delete="true"
        :show-author="true"
        title-link="ArticleKiru"
        @delete-article="deleteMyCollectionHandler"
      ></MyArticleItem>
    </ul>
    <!-- Pagination -->
    <div class="flex justify-center py-4">
      <ElPagination
        v-model:currentPage="paginationVm.currentPage"
        :style="[paginationStyle]"
        layout="prev, pager, next"
        :page-size="paginationVm.pageSize"
        :pager-count="7"
        :total="paginationVm.total"
        :hide-on-single-page="true"
      ></ElPagination>
    </div>
    <!-- 若沒有文章 -->
    <div
      v-if="kiruArticleList.length === 0 && !isLoading"
      class="text-lg text-center text-myBrown/40"
    >
      沒有任何文章
    </div>
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
</template>

<script>
import Loading from 'vue-loading-overlay'
import MyArticleItem from '@/components/user/MyArticleItem.vue'
import { ElPagination } from 'element-plus'
import {
  getKiruCollections,
  deleteKiruCollection,
} from '@api'

export default {
  name: 'MyCollectKiruArticles',
  components: {
    Loading,
    MyArticleItem,
    ElPagination,
  },
  props: {

  },
  emits: ['is-loading'],
  data() {
    return {
      kiruArticleList: [],
      paginationVm: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      paginationStyle: {
        '--el-pagination-bg-color': '#ededeb',
        '--el-pagination-button-disabled-bg-color': '#ededeb',
        '--el-pagination-hover-color': '#FF7F24'
      },
      isLoading: false,
    }
  },
  watch: {
    'paginationVm.currentPage': {
      handler(newVal) {
        this.getKiruCollectionsHandler(this.paginationVm.currentPage)
      },
      immediate: true,
    },
  },
  methods: {
    getKiruCollectionsHandler(newPage) {
      this.isLoading = true
      getKiruCollections({
        nowpage: newPage,
        showcount: this.paginationVm.pageSize,
      }).then(res => {
        console.log('(收藏總覽)取得切切文章: ', res)
        if (res.data.success) {
          this.paginationVm.total = res.data.total
          this.kiruArticleList = res.data.data
        } else {
          this.$notify({
            group: 'error',
            title: '切切文章取得失敗'
          })
        }
        this.isLoading = false
      }).catch(error => console.error(error))
    },
    // 取消收藏文章
    deleteMyCollectionHandler(deleteData) {
      this.isLoading = true
      deleteKiruCollection(deleteData.articleId).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'normal',
            title: '已取消收藏',
          })
          this.getKiruCollectionsHandler(this.paginationVm.currentPage)
        } else {
          this.$notify({
            group: 'error',
            title: '取消收藏失敗',
          })
          this.isLoading = false
        }
      }).catch(error => console.error(error))
    },
  },
}
</script>