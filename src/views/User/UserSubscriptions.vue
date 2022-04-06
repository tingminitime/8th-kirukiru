<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      我的訂閱
    </h2>
    <p class="mb-8 text-myBrown">
      這裡是你所訂閱的創作者總覽，每月固定幾號扣款啦，如果你想怎樣怎樣那就怎樣怎樣。
    </p>
    <!-- 每月花費 -->
    <div class="mb-8">
      <h3 class="mb-2 font-bold text-myBrown">
        每月花費
      </h3>
      <div class="text-myBrown">
        <span class="px-0.5 text-4xl font-bold align-sub">${{ formatThousand(totalAmount) }}</span>
        <span class="px-0.5 text-sm align-sub">NTD</span>
      </div>
    </div>
    <!-- 訂閱列表 -->
    <div>
      <div class="flex mb-6">
        <span class="w-2/5 font-semibold text-myBrown">
          創作者
        </span>
        <span class="w-[30%] font-semibold text-myBrown">
          訂閱價格
        </span>
        <span class="w-[30%] font-semibold text-myBrown">
          訂閱日期
        </span>
      </div>
      <ul class="flex flex-col gap-6">
        <li
          v-for="sub in filterSubscribeList"
          :key="sub.ID"
          class="flex"
        >
          <span class="w-2/5 text-myBrown">
            {{ sub.Author }}
          </span>
          <span class="w-[30%] text-myBrown">
            ${{ sub.Amount }}
          </span>
          <span
            v-timeformat="{
              time: sub.InitDate,
              format: 'YYYY/MM/DD'
            }"
            class="w-[30%] text-myBrown"
          >
          </span>
        </li>
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
          :hide-on-single-page="false"
        ></ElPagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus'
import {
  getMySubscribeList,
} from '@api'

export default {
  name: 'UserSubscriptions',
  components: {
    ElPagination,
  },
  data() {
    return {
      mySubscribeList: [],
      totalAmount: 0,
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
  computed: {
    filterSubscribeList() {
      return this.mySubscribeList.filter(sub => sub.IsSuceess)
    },
  },
  watch: {
    'paginationVm.currentPage': {
      handler(newPage) {
        this.getMySubscribeListHandler(newPage)
      },
    },
  },
  created() {
    this.getMySubscribeListHandler(this.paginationVm.currentPage)
  },
  methods: {
    getMySubscribeListHandler(newPage) {
      getMySubscribeList({
        nowpage: newPage,
        showcount: this.paginationVm.pageSize,
      }).then(res => {
        console.log('取得我的訂閱清單: ', res)
        if (res.data.success) {
          const { data, total, pay } = res.data
          this.mySubscribeList = data
          this.paginationVm.total = total
          this.totalAmount = pay
        } else {
          this.$notify({
            group: 'error',
            title: '訂閱清單取得失敗',
          })
        }
      })
    },
    // 千分位逗點格式化
    formatThousand(str) {
      return String(str).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    },
  },
}
</script>