<template>
  <!-- 文章頂部作者資訊 -->
  <KiruAuthor
    v-bind="articleAuthor"
    :love-count="loveCount"
    :is-add-love="isAddLove"
    :replies-count="messageTotal"
    :is-collect="isCollect"
    article-type="kiru"
    @add-love="addLoveHandler"
    @add-collection="addCollectionHandler"
  ></KiruAuthor>
  <!-- 文章頂部資訊 -->
  <KiruInfo
    class="p-4 mb-16 w-full"
    v-bind="articleInfo"
    :show-kiru-count="true"
    :kiru-count="articleVm.mArrayList?.length"
  ></KiruInfo>
  <!-- 預備工具 -->
  <KiruTools
    v-if="articleVm.fArrayList?.length !== 0 && (articleVm.isFree || checkSubResult)"
    :tools="articleVm.fArrayList"
  ></KiruTools>
  <!-- 切切內容 -->
  <KiruContent
    v-if="articleVm.isFree || checkSubResult"
    :content="articleVm.mArrayList"
  ></KiruContent>
  <!-- 附註與補充 -->
  <div v-if="articleVm.final !== '' && (articleVm.isFree || checkSubResult)">
    <div class="mb-7">
      <div class="flex gap-12 justify-between px-4 mb-2 md:px-0">
        <div class="myArticlePartTitle myArticlePartTitleBg">
          <h2>附註<span class="hidden md:inline-block">補充</span></h2>
        </div>
        <div class="hidden before:absolute relative before:top-1/2 grow w-1/5 before:w-full before:h-px before:bg-myBrown md:block"></div>
      </div>
    </div>
    <div class="px-16 mb-16 text-myBrown">
      <p v-html="articleVm.final"></p>
    </div>
  </div>
  <!-- 附屬切切 -->
  <KiruMission
    v-if="articleVm.fMissionList?.length !== 0 && (articleVm.isFree || checkSubResult)"
    :missions="articleVm.fMissionList"
  ></KiruMission>
  <!-- 相關切切 -->
  <div class="flex gap-12 justify-between mb-4">
    <div class="py-2">
      <h2 class="text-2xl font-bold text-myBrown">
        相關切切
      </h2>
    </div>
  </div>
  <div class="px-4 mb-32 md:px-0">
    <div
      v-if="relatedArticle.length !== 0"
      class="grid grid-cols-1 grid-flow-row gap-6 md:grid-cols-2"
    >
      <KiruCard
        v-for="article in relatedArticle"
        v-bind="article"
        :key="article.artId"
      ></KiruCard>
    </div>
    <div
      v-else
      class="py-2"
    >
      <p class="text-center text-myBrown/60">
        沒有相關的切切
      </p>
    </div>
  </div>
  <!-- 留言功能 -->
  <div
    v-if="userSignInStatus && (articleVm.isFree || checkSubResult)"
    v-loading="isSendingMessage"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-text="正在送出留言..."
    class="flex overflow-hidden gap-8 justify-between py-4 px-6 mb-12 rounded-lg"
  >
    <div class="overflow-hidden w-16 h-16 rounded-full ">
      <img
        v-src="userInfo.Userpic ? 'https://kirukiru.rocket-coding.com/Pic/' + userInfo.Userpic : userDefaultAvatar"
        alt=""
        class="object-cover w-full h-full scale-[102%] load"
      >
    </div>
    <div
      class="flex flex-col grow gap-3 justify-between items-end md:flex-row"
    >
      <DynamicTextarea
        v-model.trim="userMessageVm"
        class="w-full h-full"
        placeholder="我要留言"
        @enter-exact="sendMessageHandler"
      >
      </DynamicTextarea>
      <button
        type="button"
        class="flex gap-1 justify-center items-center py-1 px-4 text-white bg-myBrown md:flex-col md:py-0 md:px-2 md:h-full md:transition-all"
        @click="sendMessageHandler"
      >
        <span class="inline-block text-lg md:-translate-y-1 material-icons">reply</span>
        <span class="text-sm whitespace-nowrap md:-translate-y-1">送出</span>
      </button>
    </div>
  </div>
  <!-- 登入後留言 -->
  <div
    v-if="!userSignInStatus && (articleVm.isFree || checkSubResult)"
    class="mb-12"
  >
    <div class="flex justify-center items-center py-6 bg-myYellow/20">
      <router-link
        class="block text-myBrown underline decoration-myBrown/60 underline-offset-4 transition-all"
        :to="{ name: 'SignIn' }"
      >
        登入後留言
      </router-link>
    </div>
  </div>
  <!-- 留言內容 -->
  <div
    v-if="articleVm.isFree || checkSubResult"
    id="article-replies"
    class="mb-16"
  >
    <!-- 留言排序變更 -->
    <div class="flex justify-between px-6">
      <span class="text-black/60">此文共有 {{ messageTotal }} 筆留言</span>
      <button
        type="button"
        class="text-sm text-myBrown/40 hover:text-myBrown/60"
        @click="messageSettings.topNewDate = !messageSettings.topNewDate"
      >
        {{ messageSettings.topNewDate ? '留言時間 新 → 舊' : '留言時間 舊 → 新' }}
      </button>
    </div>
    <ul v-if="articleMessage.length !== 0">
      <KiruReply
        v-for="reply in loadMessage"
        v-bind="reply"
        :key="reply.messageId"
        :article-username="articleVm.username"
        @reply-inner="replyHandler"
      ></KiruReply>
    </ul>
    <div
      v-if="showLoadMessageBtn"
      class="px-6"
    >
      <button
        type="button"
        class="block py-4 mx-auto w-1/2 text-sm text-myBrown bg-myOrange/20 hover:bg-myOrange/40 rounded-xl transition-all"
        @click="messageSettings.currentPage += 1"
      >
        查看更多留言 ({{ articleMessage.length - loadMessage.length }})
      </button>
    </div>
  </div>
  <!-- 未訂閱顯示 -->
  <div
    v-if="(!articleVm.isFree && !checkSubResult) && isArticleVmLoading"
    class="mx-auto max-w-[80%]"
  >
    <SubscribeView v-bind="authorInfo"></SubscribeView>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import KiruAuthor from '@/components/article/kiru/KiruAuthor.vue'
import KiruInfo from '@/components/article/kiru/KiruInfo.vue'
import KiruTools from '@/components/article/kiru/KiruTools.vue'
import KiruContent from '@/components/article/kiru/KiruContent.vue'
import KiruMission from '@/components/article/kiru/KiruMission.vue'
import KiruCard from '@/components/article/KiruCard.vue'
import KiruReply from '@/components/article/kiru/KiruReply.vue'
import SubscribeView from '@/components/article/SubscribeView.vue'
import DynamicTextarea from '@/components/utils/DynamicTextarea.vue'
import {
  getKiruArticle,
  getAuthorInfo,
  getKiruContentRelated,
  getKiruMessage,
  getKiruReMessage,
  addKiruMessage,
  addKiruReMessage,
} from '@api'
import { mapGetters, mapState } from 'vuex'
import userDefaultAvatar from '@img/user-origin.jpg'

export default {
  name: 'ArticleKiru',
  components: {
    KiruAuthor,
    KiruInfo,
    KiruTools,
    KiruContent,
    KiruMission,
    KiruCard,
    KiruReply,
    SubscribeView,
    DynamicTextarea,
  },
  beforeRouteUpdate(to, from) {
    console.log('beforeRouteUpdate: ', to, from)
    if (to.params.articleId !== from.params.articleId) {
      this.$store.commit('SHOW_OVERLAY_LOADING')
    }
    // this.articleId = to.params.articleId
    this.getArticleInfo(this.articleId)
  },
  props: {
    articleId: {
      type: [String, Number],
      default: '',
    },
    loveCount: {
      type: [String, Number],
      default: 0,
    },
    isAddLove: {
      type: Boolean,
      default: false,
    },
    isCollect: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['author-info', 'add-love', 'add-collection', 'is-add-love'],
  data() {
    return {
      // articleId: null,
      articleVm: {},
      authorInfo: {},
      relatedArticleVm: {
        nowpage: 1,
        showcount: 2,
      },
      relatedArticle: [],
      userMessageVm: '',
      messagePagination: {
        nowpage: 1,
        showcount: 9999,
      },
      messageSettings: {
        pageSize: 5,
        currentPage: 1,
        loadCount: 5,
        total: 0,
        topNewDate: true
      },
      articleMessage: [],
      sortMessage: [],
      messageTotal: 0,
      userDefaultAvatar: userDefaultAvatar,
      // isAddLove: false,
      isArticleVmLoading: false,
      checkSubResult: false,
      isSendingMessage: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'userAddLoveList',
      'userKiruCollections',
      'userSubscribeList',
      'checkUserSubscribeStatus',
    ]),
    ...mapGetters([
      'userSignInStatus',
    ]),
    loadMessage() {
      const ms = this.messageSettings
      let sortMessage = []
      if (ms.topNewDate) {
        sortMessage = [...this.articleMessage].sort((a, b) => {
          return dayjs(b.messageInitDate).format('x') - dayjs(a.messageInitDate).format('x')
        })
      } else {
        sortMessage = [...this.articleMessage].sort((a, b) => {
          return dayjs(a.messageInitDate).format('x') - dayjs(b.messageInitDate).format('x')
        })
      }

      const offset = (ms.currentPage - 1) * ms.loadCount
      return sortMessage.slice(0, ms.pageSize + offset)
    },
    showLoadMessageBtn() {
      return this.articleMessage.length > this.messageSettings.pageSize && this.loadMessage.length < this.articleMessage.length
    },
    articleAuthor() {
      const {
        author,
        // lovecount,
        authorPic,
        username,
      } = this.articleVm
      const authorInfo = {
        author,
        // lovecount,
        authorPic,
        username,
      }
      return authorInfo
    },
    articleInfo() {
      const {
        title,
        firstPhoto,
        introduction,
        articlecategoryId,
        artArtlog,
        ArtInitDate: artInitDate,
      } = this.articleVm
      const info = {
        title,
        firstPhoto,
        introduction,
        articlecategoryId,
        artArtlog,
        artInitDate,
      }
      return info
    },
  },
  watch: {
    'articleVm.articlecategoryId': {
      handler(newVal) {
        if (newVal) {
          this.getRelatedArticle(newVal)
        }
      },
    },
    'userSubscribeList': {
      handler() {
        this.checkSubResult = this.checkSub(this.articleVm.username)
      },
      deep: true,
      // immediate: true,
    },
  },
  mounted() {
    this.getArticleInfo(this.articleId)
  },
  methods: {
    checkSub(authorAccount) {
      const checkSubList = this.userSubscribeList.some(author => {
        return author.Author === authorAccount
      })
      console.log('(切切文章)檢查訂閱狀態: ', checkSubList)
      const checkAccount = this.$store.state.userInfo.Username === authorAccount
      console.log('(切切文章)檢查是否為本人文章: ', checkAccount)
      return checkSubList || checkAccount
    },
    // 取得文章所需資訊
    async getArticleInfo(articleId) {
      // 取得文章資料
      await getKiruArticle(articleId).then(res => {
        console.log('取得切切文章資訊: ', res)
        if (res.data.success) {
          if (this.checkSub(res.data.data.username)) {
            this.checkSubResult = true
          }
          this.articleVm = res.data.data
          this.isArticleVmLoading = true
        } else {
          this.$router.replace({ name: 'NotFound', query: { message: res.data.message || '查無此文章' } })
        }
      }).catch(error => {
        console.log('getKiruArticle: ', error)
      })

      // 取得作者資訊 - 用在需付費訂閱內容
      await getAuthorInfo(this.articleVm.username).then(res => {
        console.log('取得作者資訊: ', res)
        if (res.data.success) {
          this.authorInfo = res.data.data
          this.$emit('author-info', { ...this.authorInfo, loveCount: this.articleVm.lovecount, isAddLove: this.isAddLove })
          this.checkAddLoveStatus()
        } else {
          this.$notify({
            group: 'error',
            title: '作者資訊取得失敗',
          })
        }
      })

      // 取得留言資料
      const params = {
        artId: this.articleId,
        ...this.messagePagination,
      }
      await getKiruMessage(params).then(res => {
        // console.log('取得留言資料: ', res)
        if (res.data.success) {
          this.articleMessage = res.data.data
          this.messageTotal = res.data.total || this.articleMessage.length
        } else {
          this.articleMessage = []
          // this.$notify({
          //   group: 'error',
          //   title: '留言取得失敗',
          // })
        }
      }).catch(error => {
        console.error('getKiruMessage: ', error)
      })
      this.$store.commit('HIDE_OVERLAY_LOADING')
    },
    // 取得相關類別文章
    getRelatedArticle(categoryId) {
      getKiruContentRelated({
        articlecategoryId: categoryId,
        ...this.relatedArticleVm,
      }).then(res => {
        console.log('取得相關切切文章: ', res)
        if (res.data.success) {
          const filterResult = res.data.data.filter(data => {
            return Number(this.articleId) !== data.artId
          })
          this.relatedArticle = filterResult
        } else {
          this.$notify({
            group: 'error',
            title: '相關文章資料取得失敗',
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 檢查是否有按過愛心
    checkAddLoveStatus() {
      const checkResult = this.userAddLoveList.findIndex(item => item.articleId === this.articleId)
      if (checkResult !== -1) this.$emit('is-add-love', true)
    },
    // 按愛心，可重複
    addLoveHandler(res) {
      this.$emit('add-love', res)
    },
    // 收藏文章
    addCollectionHandler() {
      this.$emit('add-collection')
    },
    // 發送留言
    async sendMessageHandler() {
      if (this.userMessageVm === '' || this.isSendingMessage) return
      this.isSendingMessage = true
      const sendVm = {
        artId: this.articleId,
        Main: this.userMessageVm,
      }
      await addKiruMessage(sendVm).then(res => {
        this.userMessageVm = '',
        this.isSendingMessage = false
        console.log(res)
      }).catch(error => {
        this.isSendingMessage = false
        console.log(error)
      })

      const getVm = {
        artId: this.articleId,
        ...this.messagePagination,
      }
      await getKiruMessage(getVm).then(res => {
        console.log('取得留言資料: ', res)
        if (res.data.success) {
          // 比較新舊留言資料，取出新的資料
          const newMessageList = res.data.data
          this.updateMessage(newMessageList)
          this.messageTotal = res.data.total || this.articleMessage.length
        } else {
          this.$notify({
            group: 'error',
            title: '留言內容取得失敗',
          })
        }
      }).catch(error => {
        console.error('getKiruMessage: ', error)
      })
    },
    // 更新留言資料
    updateMessage(newData) {
      this.articleMessage = newData
    },
    // 發送回覆
    async replyHandler(params) {
      try {
        addKiruReMessage(params).then(res => {
          console.log('addKiruReMessage: ', res)
          // this.$emit('update-reply', messageId)
        }).catch(error => {
          console.error(error)
        })

        const getVm = {
          artId: this.articleId,
          ...this.messagePagination,
        }
        // 取得完最新留言資料才能避免回覆過程中有人留言造成 index 錯誤
        // 未來可用 websocket 實現
        const newReplyData = await getKiruReMessage(params.messageId)
        console.log('取得切切回覆: ', newReplyData)
        const newMessageData = await getKiruMessage(getVm)
        if (newReplyData.data.success) {
          if (newMessageData.data.success) {
            this.updateMessage(newMessageData.data.data)
            const currentMessageIndex = this.articleMessage.findIndex(message => {
              return message.messageId === params.messageId
            })

            const oldReplyIdList = this.articleMessage[currentMessageIndex].reMessageData.map(reply => reply.reMessageId)
            const newReplyList = newReplyData.data.data
            const uniqNewReplyList = newReplyList.filter(newReply => {
              return oldReplyIdList.indexOf(newReply.reMessageId) === -1
            })

            uniqNewReplyList.forEach(newReply => {
              this.articleMessage[currentMessageIndex].reMessageData.push(newReply)
            })
          } else {
            this.$notify({
              group: 'error',
              title: '留言內容取得失敗',
            })
          }
        } else {
          this.$notify({
            group: 'error',
            title: '回覆內容取得失敗',
          })
        }
      }
      catch(error) {
        console.error(error)
      }
    }
  },
}
</script>