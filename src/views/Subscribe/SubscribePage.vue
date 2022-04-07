<template>
  <div class="px-4 pt-8 pb-11 mx-auto max-w-[816px] min-h-[calc(100vh-56px-64px)] md:px-0 md:pt-16">
    <div class="mx-auto max-w-[600px] rounded-2xl border-t-8 border-t-myYellow shadow-md md:rounded-t-none md:rounded-b-2xl md:border md:border-myBrown">
      <div class="hidden h-4 bg-myYellow md:block"></div>
      <div class="p-8 md:py-10 md:px-16">
        <!-- 作者資訊 -->
        <div class="flex gap-4 items-center py-4 border-b border-myBrown">
          <div class="overflow-hidden shrink-0 w-16 h-16 rounded-full">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/${authorPlan?.authorPic}`"
              class="object-cover object-center w-full h-full rounded-lg load"
              alt=""
            >
          </div>
          <h2 class="text-xl text-myBrown">
            {{ authorPlan?.author }}
          </h2>
        </div>
        <!-- 方案介紹 -->
        <div class="py-8 mb-4">
          <p class="text-sm text-black/80 whitespace-pre-wrap">
            {{ authorPlan?.info }}
          </p>
        </div>
        <!-- 訂閱方案 -->
        <div class="flex flex-col gap-8 justify-between items-center md:flex-row">
          <div class="flex relative flex-col items-center text-myBrown md:items-start">
            <span class="absolute -top-0.5 py-1 px-2 text-xs font-bold text-white bg-red-500 rounded-lg -translate-y-full md:left-0">50% OFF</span>
            <p class="text-3xl font-bold">
              {{ formatThousand(authorPlan?.amount) }}元 / 月
            </p>
            <p class="text-xs">
              每月自動扣款，僅限信用卡支付
            </p>
          </div>
          <div class="grow w-full md:w-auto">
            <button
              type="button"
              class="w-full userPageButton"
              :disabled="checkSub(authorId)"
              @click="paySubscribeHandler"
            >
              {{ checkSub(authorId) ? '您已訂閱該作者': '確認訂閱' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 金流 -->
    <form
      ref="subscribeSubmit"
      class="hidden"
      name="form"
      action="https://ccore.spgateway.com/MPG/mpg_gateway"
      method="post"
    >
      <input
        name="MerchantID"
        value="MS132153993"
      ><input
        ref="tradeInfo"
        name="TradeInfo"
      ><input
        ref="tradeSha"
        name="TradeSha"
      ><input
        name="Version"
        value="1.5"
      >
      <input
        type="submit"
        value="Submit"
      >
    </form>
  </div>
</template>

<script>
import {
  getAuthorPlan,
  paySubscribe,
} from '@api'
import { mapState } from 'vuex'

export default {
  name: 'SubscribePage',
  props: {
    authorId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      authorPlan: null,
      payType: 'WEBATM',
      payData: [],
      tradeInfoValue: '',
      tradeShaValue: '',
      isPaying: false,
    }
  },
  computed: {
    ...mapState([
      'userSubscribeList',
    ]),
  },
  created() {
    this.getAuthorPlanHandler()
  },
  methods: {
    getAuthorPlanHandler() {
      getAuthorPlan(this.authorId).then(res => {
        console.log('(訂閱頁面)取得作者方案: ', res)
        if (res.data.success) {
          this.authorPlan = res.data.data
        } else {
          this.$notify({
            group: 'error',
            title: '取得方案內容失敗'
          })
        }
      }).catch(error => console.error(error))
    },
    paySubscribeHandler() {
      if (this.checkSub(this.authorId) || this.isPaying) return
      this.isPaying = true
      this.$store.commit('SHOW_OVERLAY_LOADING')
      const data = {
        main: this.authorId,
        payType: this.payType,
        returnUrl: `${location.origin}/#/author/${this.authorId}`
      }
      console.log('paySubscribeHandler: ', data)
      paySubscribe(data).then(res => {
        console.log('取得藍新付款資訊', res)
        if (res.data.Status) {
          this.tradeInfoValue = res.data.PayData.find(data => data.Key === 'TradeInfo').Value
          this.tradeShaValue = res.data.PayData.find(data => data.Key === 'TradeSha').Value
          this.$refs.tradeInfo.value = this.tradeInfoValue
          this.$refs.tradeSha.value = this.tradeShaValue
          this.$refs.subscribeSubmit.submit()
        } else {
          this.$notify({
            group: 'error',
            title: '連接失敗',
          })
          this.isPaying = false
          this.$store.commit('HIDE_OVERLAY_LOADING')
        }
      }).catch(error => console.error(error))
    },
    // 檢查訂閱狀態
    checkSub(authorAccount) {
      const checkSubList = this.userSubscribeList.some(author => {
        return author.Author === authorAccount
      })
      console.log('(作者頁面)檢查訂閱狀態: ', checkSubList)
      return checkSubList
    },
    // 千分位逗點格式化
    formatThousand(str) {
      return String(str).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    },
  },
}
</script>