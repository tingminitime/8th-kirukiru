<template>
  <!-- 頂部 Navbar -->
  <TopNavbar v-if="$route.meta.navbar"></TopNavbar>

  <!-- 主要 router view -->
  <router-view></router-view>

  <!-- 底部 Footer -->
  <FooterInfo></FooterInfo>

  <!-- 全域 Loading -->
  <Loading v-model:active="overlayLoading">
    <GlobalLoading
      class="scale-150 la-2x"
      :show="overlayLoading"
    ></GlobalLoading>
  </Loading>

  <!-- 開啟 Modal(Dialog) 遮罩 -->
  <MaskBlack></MaskBlack>

  <!-- 右上 Notify -->
  <NotiWind></NotiWind>

  <!-- 右下 Loading -->
  <RequestLoading
    class="fixed right-10 bottom-14 la-2x"
    :show="requestLoading"
  ></RequestLoading>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import MaskBlack from '@/components/MaskBlack.vue'
import Loading from 'vue-loading-overlay'
import NotiWind from '@/components/utils/NotiWind.vue'
import RequestLoading from '@/components/utils/RequestLoading.vue'
import GlobalLoading from '@/components/utils/GlobalLoading.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { getUserInfo } from '@api'

  export default {
    name: 'App',
    components: {
      TopNavbar,
      FooterInfo,
      MaskBlack,
      Loading,
      NotiWind,
      RequestLoading,
      GlobalLoading,
    },
    data() {
      return {
        // count: 0,
      }
    },
    computed: {
      ...mapState([
        'overlayLoading',
        'openLoginModal',
        'openRegisterModal',
        'requestLoading',
      ])
    },
    created() {
      this.checkLoginState()
    },
    methods: {
      ...mapMutations([
        'SET_TOKEN',
        'SET_USER_INFO',
      ]),
      checkLoginState() {
        const token = localStorage.getItem('kirukiruToken')
        if (token) {
          this.SET_TOKEN(token)

          getUserInfo().then(res => {
            console.log('自動登入API(200): ', res)
            this.SET_USER_INFO(res.data.data)
            this.$notify({
              group: "success",
              title: "登入成功 !",
              text: `歡迎回來，${res.data.data.Name}`
            }, 3000)
          })
          .catch(error => {
            this.$notify({
              group: "error",
              title: "登入失敗 !",
              text: `${res.data.message}`
            }, 2500)
          })
        }
      }
    }
  }
</script>

<style lang="sass">
*
  &::-webkit-scrollbar
    width: 8px
  &::-webkit-scrollbar-track
    opacity: 0
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    background-color: #553529
    border-radius: 8px
</style>
