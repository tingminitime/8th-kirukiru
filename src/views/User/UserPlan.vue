<template>
  <div class="w-full">
    <h2 class="mb-4 text-2xl font-bold text-myBrown">
      我的方案
    </h2>
    <!-- 開通方案 -->
    <div
      v-if="!openPlan"
      class="py-4 text-myBrown"
    >
      <p class="py-2 px-4 mb-4 font-medium text-myOrange bg-myOrange/20 rounded-lg">
        請先點選開通方案，才能享受完整的切切功能哦
      </p>
      <div class="mb-4">
        <button
          type="submit"
          class="userPageButton"
          @click="openPlanHandler"
        >
          開通方案
        </button>
      </div>
    </div>
    <div v-if="getDataComplete">
      <!-- 已開通方案 -->
      <div>
        <p class="py-2 px-4 mb-8 font-medium text-myOrange bg-myOrange/20 rounded-lg">
          您已開通方案 !
        </p>
        <!-- 我的方案價格 -->
        <div class="mb-8">
          <h3 class="mb-2 text-lg font-bold text-myBrown">
            方案價格
          </h3>
          <div class="flex gap-8 items-center">
            <div
              v-show="!showChangePrice"
              class="font-bold text-myBrown"
            >
              <span class="px-0.5 text-sm align-sub">$</span>
              <span class="px-0.5 text-2xl align-sub">{{ formatThousand(myPlan.amount) }}</span>
              <span class="px-0.5 text-sm align-sub">NTD</span>
            </div>
            <button
              v-show="!showChangePrice"
              type="button"
              class="userPageButton"
              @click="togglePriceChange"
            >
              修改價格
            </button>
            <!-- 顯示修改價格功能 -->
            <div
              v-show="showChangePrice"
              class="relative"
            >
              <input
                :value="planPrice"
                class="w-24 rounded-lg border-none focus:ring-2 focus:ring-myYellow form-input"
                type="text"
                name="plan-price"
                @input="planPriceInputHandler($event)"
              >
              <span class="absolute -bottom-6 left-0 text-sm text-red-500">{{ planPriceError }}</span>
            </div>
            <div
              v-show="showChangePrice"
              class="flex gap-3"
            >
              <button
                type="button"
                class="userPageButton"
                :disabled="planPriceError"
                @click="changePlanPriceHandler"
              >
                確認修改
              </button>
              <button
                type="button"
                class="userPageCancelButton"
                @click="togglePriceChange"
              >
                取消
              </button>
            </div>
          </div>
        </div>
        <!-- 方案敘述 -->
        <div class="mb-12">
          <h3 class="mb-2 text-lg font-bold text-myBrown">
            方案敘述
          </h3>
          <p class="text-myBrown whitespace-pre-wrap">
            {{ myPlan.info }}
          </p>
          <div class="py-4">
            <DynamicTextarea
              v-show="showChangeInfo"
              v-model="planInfo"
              placeholder="請輸入敘述內容"
              class=""
              name="plan-info"
            ></DynamicTextarea>
            <span class="text-sm text-red-500">{{ planInfoError }}</span>
            <div class="flex gap-3 text-right">
              <button
                v-if="showChangeInfo"
                type="button"
                class="userPageButton"
                :disabled="planInfoError"
                @click="onChangePlanInfo"
              >
                確認更改
              </button>
              <button
                type="button"
                :class="[ showChangeInfo ? 'userPageCancelButton' : 'userPageButton' ]"
                @click="toggleInfoChange"
              >
                {{ showChangeInfo ? '取消' : '更改敘述' }}
              </button>
            </div>
          </div>
        </div>
        <!-- 其他資訊 -->
        <div class="flex justify-between">
          <div class="flex flex-col gap-4 items-center">
            <span class="font-semibold text-myBrown">訂閱我的人數</span>
            <span class="text-4xl font-semibold text-myBrown">{{ formatThousand(subscribeCount) }}</span>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <span class="font-semibold text-myBrown">每月收益</span>
            <span class="text-4xl font-semibold text-myBrown">{{ formatThousand(480) }}</span>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <span class="font-semibold text-myBrown">與上月比較</span>
            <span class="text-4xl font-semibold text-green-500">20%</span>
          </div>
        </div>
      </div>
    </div>
    <AlertModal
      v-bind="alertInfo"
      @alert-confirm="changePlanInfoHandler"
    ></AlertModal>
  </div>
</template>

<script>
import DynamicTextarea from '@/components/utils/DynamicTextarea.vue'
import AlertModal from '@/components/utils/AlertModal.vue'
import { mapState } from 'vuex'
import { useField } from 'vee-validate'
import * as Yup from 'yup'
import {
  getMyPlan,
  openMyPlan,
  changeMyPlanPrice,
  changeMyPlanInfo,
  getAuthorSubscribeCount,
} from '@api'

export default {
  name: 'UserPlan',
  components: {
    DynamicTextarea,
    AlertModal,
  },
  data() {
    const { value:infoValue, errorMessage:planInfoError } = useField('plan-info', Yup.string().nullable().max(300))

    const { value:planPriceValue, errorMessage:planPriceError } = useField('plan-price', Yup.number().required().positive().integer())

    return {
      getDataComplete: false,
      myPlan: null,
      openPlan: false,
      showChangePrice: false,
      planPrice: 0,
      checkPrice: planPriceValue,
      shadowPrice: 0,
      planPriceError,
      showChangeInfo: false,
      planInfo: infoValue,
      planInfoError,
      alertInfo: null,
      subscribeCount: 0,
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
  },
  watch: {
    // userInfo: {
    //   handler(newInfo) {
    //     if (Object.keys(newInfo).length !== 0) {
    //       getMyPlan().then(res => {
    //         console.log('取得我的方案: ', res)
    //         if (res.data.success) {
    //           this.myPlan = res.data.data
    //         } else {
    //           this.$notify({
    //             group: 'error',
    //             title: '我的方案取得失敗'
    //           })
    //         }
    //       })
    //     }
    //   },
    //   immediate: true,
    // },
  },
  created() {
    this.getMyPlanHandler()
    this.getSubscribeCount()
  },
  methods: {
    // 取得方案內容
    getMyPlanHandler() {
      getMyPlan().then(res => {
        console.log('取得我的方案: ', res)
        if (res.data.success) {
          this.myPlan = res.data.data
          this.planPrice = this.myPlan.amount
          this.openPlan = true
          this.getDataComplete = true
        } else {
          this.openPlan = false
        }
      }).catch(error => console.error(error))
    },
    // 開通方案
    openPlanHandler() {
      openMyPlan().then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '已開通訂閱方案'
          })
          this.openPlan = true
          this.getMyPlanHandler()
        } else {
          this.$notify({
            group: 'error',
            title: '方案開通失敗',
            test: '請重新檢查您的網路連線'
          })
          this.openPlan = false
        }
      }).catch(error => console.error(error))
    },
    togglePriceChange() {
      this.showChangePrice = !this.showChangePrice
    },
    planPriceInputHandler(event) {
      this.planPrice = event.target.value
      this.checkPrice = event.target.value
    },
    changePlanPriceHandler() {
      if (this.planPriceError) return
      changeMyPlanPrice(this.planPrice).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '訂閱金額修改成功'
          })
          this.getMyPlanHandler()
          this.togglePriceChange()
        } else {
          this.$notify({
            group: 'success',
            title: '訂閱金額修改失敗'
          })
        }
      }).catch(error => console.error(error))
    },
    // 開關更改敘述 Textarea
    toggleInfoChange() {
      this.showChangeInfo = !this.showChangeInfo
    },
    // 更改方案敘述確認
    onChangePlanInfo() {
      if (this.introError) return
      this.alertInfo = {
        message: '是否確定更改敘述 ?',
        confirmMode: 'nothing',
        messageClass: 'text-lg font-bold text-myBrown md:text-xl',
      }
      this.$store.commit('SHOW_ALERT')
    },
    // 更改方案敘述
    changePlanInfoHandler() {
      changeMyPlanInfo(this.planInfo).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '敘述更新成功'
          })
          this.getMyPlanHandler()
          this.toggleInfoChange()
        } else {
          this.$notify({
            group: 'error',
            title: res.data.message
          })
        }
      }).catch(error => console.error(error))
    },
    // 取得訂閱人數
    getSubscribeCount() {
      getAuthorSubscribeCount(this.userInfo.Username).then(res => {
        console.log('取得我的訂閱人數: ', res)
        if (res.data.success) {
          this.subscribeCount = res.data.orderNumber
        } else {
          this.$notify({
            group: 'error',
            title: '訂閱人數取得失敗'
          })
        }
      }).catch(error => console.error(error))
    },
    // 千分位逗點格式化
    formatThousand(str) {
      return String(str).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    },
  },
}
</script>