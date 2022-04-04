<template>
  <!-- 分類的切切列表 -->
  <ul v-if="kiruSearchResult.length !== 0">
    <transition-group
      mode="out-in"
      enter-active-class="transition duration-300 ease-out delay-300"
      enter-from-class="transform opacity-0 translate-x-48"
      enter-to-class="transform opacity-100 translate-x-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform opacity-100 translate-x-0"
      leave-to-class="transform opacity-0 -translate-x-48"
    >
      <KiruSearchItem
        v-for="content in kiruSearchResult"
        v-bind="content"
        :key="content.artId"
        :is-show-author="true"
      ></KiruSearchItem>
    </transition-group>
  </ul>
  <div v-else>
    <span class="block text-center text-myBrown/20">目前分類無文章</span>
  </div>
  <!-- Pagination -->
  <div class="flex justify-center py-4">
    <ElPagination
      v-model:currentPage="paginationVm.currentPage"
      :style="[paginationStyle]"
      layout="prev, pager, next"
      :page-size="paginationCount"
      :pager-count="7"
      :total="paginationVm.total"
      :hide-on-single-page="false"
    ></ElPagination>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus'
import KiruSearchItem from '@/components/article/KiruSearchItem.vue'
import {
  getRelatedKiru,
} from '@api'

export default {
  name: 'CategoryKiru',
  components: {
    ElPagination,
    KiruSearchItem,
  },
  props: {
    categoryId: {
      type: Number,
      default: 1,
    },
    paginationCount: {
      type: Number,
      default: 10,
    },
  },
  emits: ['is-loading', 'result-count'],
  data() {
    return {
      kiruSearchResult: [],
      paginationVm: {
        currentPage: 1,
        // pageSize: 10,
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
    'categoryId': {
      handler() {
        this.searchKiruHandler(this.paginationVm.currentPage)
      },
    },
    'paginationVm.currentPage': {
      handler(newPage) {
        this.searchKiruHandler(newPage)
      },
    },
    'paginationCount': {
      handler() {
        this.searchKiruHandler(this.paginationVm.currentPage)
      },
    },
  },
  mounted() {
    this.searchKiruHandler(this.paginationVm.currentPage)
  },
  methods: {
    searchKiruHandler(newPage) {
      this.$emit('is-loading', true)
      this.isLoading = true
      getRelatedKiru({
        articlecategoryId: this.categoryId,
        nowpage: newPage,
        showcount: this.paginationCount,
      }).then(res => {
        this.$emit('is-loading', false)
        console.log('(分類頁面)取得切切文章: ', res)
        if (res.data.success) {
          this.paginationVm.total = res.data.total
          this.kiruSearchResult = res.data.data
          this.$emit('result-count', this.paginationVm.total)
        } else {
          this.$notify({
            group: 'error',
            title: '(分類頁面)取得切切失敗',
          })
        }
        this.isLoading = false
      }).catch(error => console.error(error))
    },
  },
}
</script>