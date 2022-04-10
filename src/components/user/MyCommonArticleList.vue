<template>
  <div>
    <PushSelect @is-push="isPush = $event"></PushSelect>
    <ul>
      <MyArticleItem
        v-for="content in commonArticleList"
        :key="content.artId"
        v-bind="{ ...content, ...$attrs }"
        :show-feature="true"
        :show-edit="true"
        :show-delete="true"
        edit-link="EditNormal"
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
      v-if="commonArticleList.length === 0 && !isLoading"
      class="text-lg text-center text-myBrown/40"
    >
      沒有任何文章
    </div>
  </div>
</template>

<script>
import PushSelect from '@/components/user/PushSelect.vue'
import MyArticleItem from '@/components/user/MyArticleItem.vue'
import { ElPagination } from 'element-plus'
import {
  getMyCommonArticle,
} from '@api'

export default {
  name: 'MyCommonArticleList',
  components: {
    PushSelect,
    MyArticleItem,
    ElPagination,
  },
  props: {
    
  },
  emits: ['is-loading'],
  data() {
    return {
      isPush: true,
      commonArticleList: [],
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
    isPush: {
      handler(newVal) {
        this.getMyCommonArticleHandler(this.paginationVm.currentPage)
      },
      immediate: true,
    },
    'paginationVm.currentPage': {
      handler(newVal) {
        this.getMyCommonArticleHandler(this.paginationVm.currentPage)
      },
    },
  },
  methods: {
    getMyCommonArticleHandler(newPage) {
      this.isLoading = true
      this.$emit('is-loading', true)
      getMyCommonArticle(this.isPush, {
        nowpage: newPage,
        showcount: this.paginationVm.pageSize,
      }).then(res => {
        console.log('(文章總覽)取得一般文章: ', res)
        if (res.data.success) {
          this.paginationVm.total = res.data.total
          this.commonArticleList = res.data.data
        } else {
          this.$notify({
            group: 'error',
            title: '一般文章取得失敗'
          })
        }
        this.isLoading = false
        this.$emit('is-loading', false)
      }).catch(error => console.error(error))
    },
  },
}
</script>