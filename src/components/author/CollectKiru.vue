<template>
  <div>
    <!-- 排序方式 -->
    <div
      v-if="collectKiru.length !== 0"
      class="flex justify-end items-center mb-6 text-sm text-myBrown md:mb-12"
    >
      <span class="px-2 border-r-2 border-r-myBrown">排序方式</span>
      <button
        type="button"
        class="px-2 font-semibold"
        @click="defaultSort = !defaultSort"
      >
        {{ defaultSort ? '新 → 舊' : '舊 → 新' }}
      </button>
    </div>
    <!-- 收藏的切切列表 -->
    <ul>
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
          v-for="content in sortHandler"
          v-bind="content"
          :key="content.artId"
          :is-show-author="true"
        ></KiruSearchItem>
      </transition-group>
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
    <!-- 作者沒有收藏切切 -->
    <div
      v-if="collectKiru.length === 0 && isOpen && !isLoading"
      class="text-lg text-center text-myBrown/40"
    >
      沒有收藏的切切
    </div>
    <!-- 作者為開放查看 -->
    <div
      v-if="!isOpen && !isLoading"
      class="text-lg text-center text-myBrown/40"
    >
      此作者未開放查看收藏的文章
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { ElPagination } from 'element-plus'
import KiruSearchItem from '@/components/article/KiruSearchItem.vue'
import {
  getAuthorCollectKiru,
} from '@api'

export default {
  name: 'CollectKiru',
  components: {
    ElPagination,
    KiruSearchItem,
  },
  props: {
    type: {
      type: String,
      default: 'collect-kiru',
    },
  },
  emits: ['is-loading'],
  data() {
    return {
      collectKiru: [],
      paginationVm: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      paginationStyle: {
        '--el-pagination-bg-color': '#ededeb',
        '--el-pagination-button-disabled-bg-color': '#ededeb',
        '--el-pagination-hover-color': '#FF7F24'
      },
      isOpen: false,
      defaultSort: true,
      isLoading: false,
    }
  },
  computed: {
    sortHandler() {
      let sortList = []
      if (this.defaultSort) {
        sortList = [...this.collectKiru].sort((a, b) => {
          return dayjs(b.artInitDate).format('x') - dayjs(a.artInitDate).format('x')
        })
      } else {
        sortList = [...this.collectKiru].sort((a, b) => {
          return dayjs(a.artInitDate).format('x') - dayjs(b.artInitDate).format('x')
        })
      }

      return sortList
    },
  },
  watch: {
    'paginationVm.currentPage': {
      handler(newPage) {
        this.getAuthorCollectKiruHandler(newPage)
      },
    },
  },
  mounted() {
    this.getAuthorCollectKiruHandler(this.paginationVm.currentPage)
  },
  methods: {
    getAuthorCollectKiruHandler(currentPage) {
      this.$emit('is-loading', true)
      this.isLoading = true
      getAuthorCollectKiru({
        authorusername: this.$route.params.authorId,
        nowpage: currentPage,
        showcount: this.paginationVm.pageSize
      }).then(res => {
        this.$emit('is-loading', false)
        console.log('取得作者收藏切切文章: ', res)
        if (res.data.success) {
          this.isOpen = true
          this.collectKiru = res.data.data
        } else {
          this.isOpen = false
          console.warn(res)
        }
        this.isLoading = false
      }).catch(error => console.error(error))
    },
  },
}
</script>