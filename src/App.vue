<template>
  <TopNavbar v-if="$route.meta.navbar"></TopNavbar>
  <router-view></router-view>

  <!-- 開啟 Modal(Dialog) 遮罩 -->
  <MaskBlack></MaskBlack>

  <!-- 右上 Notify -->
  <NotiWind></NotiWind>

  <!-- 右下 Loading -->
  <RequestLoading
    class="fixed right-8 bottom-8 la-2x"
    :show="requestLoading"
  ></RequestLoading>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue'
import MaskBlack from '@/components/MaskBlack.vue'
import NotiWind from '@/components/utils/NotiWind.vue'
import RequestLoading from '@/components/utils/RequestLoading.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { getUserInfo } from '@api'

  export default {
    name: 'App',
    components: {
      TopNavbar,
      MaskBlack,
      NotiWind,
      RequestLoading,
    },
    data() {
      return {
        // count: 0,
      }
    },
    computed: {
      ...mapState([
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

          getUserInfo(token).then(res => {
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
