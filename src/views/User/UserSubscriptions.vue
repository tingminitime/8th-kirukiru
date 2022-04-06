<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      我的訂閱
    </h2>
    <p class="text-myBrown">
      這裡是你所訂閱的創作者總覽，每月固定幾號扣款啦，如果你想怎樣怎樣那就怎樣怎樣。
    </p>
    <!-- 訂閱列表 -->
    <!-- Pagination -->
    <div class="flex justify-center py-4">
      <ElPagination
        v-model:currentPage="paginationVm.currentPage"
        :style="[paginationStyle]"
        layout="prev, pager, next"
        :page-size="paginationVm.pageSize"
        :pager-count="7"
        :total="paginationVm.total"
        :hide-on-single-page="false"
      ></ElPagination>
    </div>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus'

export default {
  name: 'UserSubscriptions',
  components: {
    ElPagination,
  },
  data() {
    return {
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
    }
  },
}
</script>