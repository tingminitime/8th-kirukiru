<template>
  <!-- 分類的切切列表 -->
  <ul v-if="commonSearchResult.length !== 0">
    <transition-group
      mode="out-in"
      enter-active-class="transition duration-300 ease-out delay-300"
      enter-from-class="transform opacity-0 translate-x-48"
      enter-to-class="transform opacity-100 translate-x-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform opacity-100 translate-x-0"
      leave-to-class="transform opacity-0 -translate-x-48"
    >
      <CommonSearchItem
        v-for="content in commonSearchResult"
        v-bind="content"
        :key="content.artId"
        :is-show-author="true"
      ></CommonSearchItem>
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
import CommonSearchItem from '@/components/article/utils/CommonSearchItem.vue'
import {
  getRelatedCommon,
} from '@api'

export default {
  name: 'CategoryCommon',
  components: {
    ElPagination,
    CommonSearchItem,
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
      commonSearchResult: [],
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
        this.searchCommonHandler(this.paginationVm.currentPage)
      },
    },
    'paginationVm.currentPage': {
      handler(newPage) {
        this.searchCommonHandler(newPage)
      },
    },
    'paginationCount': {
      handler() {
        this.searchCommonHandler(this.paginationVm.currentPage)
      },
    },
  },
  mounted() {
    this.searchCommonHandler(this.paginationVm.currentPage)
  },
  methods: {
    searchCommonHandler(newPage) {
      this.$emit('is-loading', true)
      this.isLoading = true
      getRelatedCommon({
        articlecategoryId: this.categoryId,
        nowpage: newPage,
        showcount: this.paginationCount,
      }).then(res => {
        this.$emit('is-loading', false)
        console.log('(分類頁面)取得一般文章: ', res)
        if (res.data.success) {
          this.paginationVm.total = res.data.total
          this.commonSearchResult = res.data.data
          this.$emit('result-count', this.paginationVm.total)
        } else {
          this.$notify({
            group: 'error',
            title: '(分類頁面)取得一般文章失敗',
          })
        }
        this.isLoading = false
      }).catch(error => console.error(error))
    },
  },
}
</script>