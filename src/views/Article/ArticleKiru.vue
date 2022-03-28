<template>
  <!-- 文章頂部作者資訊 -->
  <KiruAuthor
    v-bind="articleAuthor"
    :replies-count="articleVm.messageArrayList?.length"
  ></KiruAuthor>
  <!-- 文章頂部資訊 -->
  <KiruInfo
    v-bind="articleInfo"
    :kiru-count="articleVm.mArrayList?.length"
  ></KiruInfo>
  <div v-if="articleVm.isFree">
    <!-- 預備工具 -->
    <KiruTools
      v-if="articleVm.fArrayList.length !== 0"
      :tools="articleVm.fArrayList"
    ></KiruTools>
    <!-- 切切內容 -->
    <KiruContent :content="articleVm.mArrayList"></KiruContent>
    <!-- 附註與補充 -->
    <div v-if="articleVm.final !== ''">
      <div class="mb-7">
        <div class="flex gap-12 justify-between px-4 mb-2 md:px-0">
          <div class="myArticlePartTitle">
            <h2>附註<span class="hidden md:block">與補充</span></h2>
          </div>
          <div class="before:absolute relative before:top-1/2 grow w-1/5 before:w-full before:h-px before:bg-myBrown"></div>
        </div>
      </div>
      <div class="px-16 mb-16 text-myBrown">
        <p v-html="articleVm.final"></p>
      </div>
    </div>
    <!-- 附屬切切 -->
    <KiruMission
      v-if="articleVm.fMissionList?.length !== 0"
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
    <div class="px-4 mb-24 md:px-0">
      <div class="grid grid-cols-1 grid-flow-row gap-6 md:grid-cols-2">
        <KiruCard></KiruCard>
        <KiruCard></KiruCard>
        <NormalCard></NormalCard>
      </div>
    </div>
    <!-- 留言功能 -->
    <div
      v-if="userSignInStatus"
      class="flex gap-8 justify-between px-6 mb-12"
    >
      <div class="overflow-hidden w-16 h-16 rounded-full ">
        <img
          v-src="userInfo.Userpic ? 'https://kirukiru.rocket-coding.com/Pic/' + userInfo.Userpic : userDefaultAvatar"
          alt=""
          class="object-cover w-full h-full scale-[102%] load"
        >
      </div>
      <div class="flex flex-col grow gap-3 justify-between items-end md:flex-row">
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
      v-else
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
      id="article-kiru-replies"
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
          :key="reply.messageId"
          v-bind="reply"
          @update-reply="replyHandler"
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
  </div>
  <div
    v-else
    class="mx-auto max-w-[80%]"
  >
    <div
      class="p-4 w-full text-center bg-myBrown rounded-lg shadow-md sm:p-8"
    >
      <h3 class="hidden mb-2 text-3xl font-bold text-gray-900 dark:text-white md:block">
        以下內容僅限訂閱者閱覽
      </h3>
      <h3 class="block mb-2 text-3xl font-bold text-gray-900 dark:text-white md:hidden">
        限訂閱者閱覽
      </h3>
      <div class="flex gap-3 justify-center items-start py-4 mb-4">
        <router-link
          class="block overflow-hidden shrink-0 mt-2 w-12 h-12 rounded-full"
          :to="{ name: 'Author', params: { authorId: 1 } }"
        >
          <img
            v-src="'https://kirukiru.rocket-coding.com/Pic/origin.jpg'"
            class="object-cover w-full h-full bg-center scale-[103%] load"
            alt=""
          >
        </router-link>
        <div class="max-w-[80%] text-left text-white">
          <p class="text-myYellow">
            {{ authorInfo.Name }}
          </p>
          <p
            v-if="!authorInfo.Introduction"
            class="text-sm leading-6 text-left text-white"
          >
            {{ authorInfo.Introduction }}我是自我介紹我是自我介紹我是自我介紹我是自我介紹我是自我介紹我是自我介紹我是自我介紹我是自我介紹
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <router-link
          class="py-2 px-4 text-lg text-white bg-myYellow/40 hover:bg-myYellow/60 rounded-lg"
          :to="{ name: 'Author', params: { authorId: '123' } }"
        >
          訂閱作者，觀看此文章
        </router-link>
      </div>
    </div>
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
import NormalCard from '@/components/article/NormalCard.vue'
import KiruReply from '@/components/article/kiru/KiruReply.vue'
import DynamicTextarea from '@/components/utils/DynamicTextarea.vue'
import {
  getKiruArticle,
  getArticleMessage,
  getArticleReMessage,
  addArticleMessage,
  getAuthorInfo,
} from '@api'
import { mapGetters, mapState } from 'vuex'
import userDefaultAvatar from '@img/user-origin.jpg'
console.log(userDefaultAvatar)

export default {
  name: 'ArticleKiru',
  components: {
    KiruAuthor,
    KiruInfo,
    KiruTools,
    KiruContent,
    KiruMission,
    KiruCard,
    NormalCard,
    KiruReply,
    DynamicTextarea,
  },
  beforeRouteUpdate(to, from) {
    console.log('beforeRouteUpdate: ', to, from)
    this.$store.commit('SHOW_OVERLAY_LOADING')
    this.articleId = to.params.articleId
    this.getArticleInfo(this.articleId)
  },
  data() {
    return {
      articleId: null,
      articleVm: {},
      authorInfo: {},
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
    }
  },
  computed: {
    loadMessage() {
      const ms = this.messageSettings
      let sortMessage = []
      if (ms.topNewDate) {
        sortMessage = [...this.articleMessage].sort((a, b) => {
          return dayjs(b.messageInitDate, 'x') - dayjs(a.messageInitDate)
        })
      } else {
        sortMessage = [...this.articleMessage].sort((a, b) => {
          return dayjs(a.messageInitDate, 'x') - dayjs(b.messageInitDate)
        })
      }

      const offset = (ms.currentPage - 1) * ms.loadCount
      return sortMessage.slice(0, ms.pageSize + offset)
    },
    showLoadMessageBtn() {
      return this.articleMessage.length > this.messageSettings.pageSize && this.loadMessage.length < this.articleMessage.length
    },
    ...mapState([
      'userInfo',
    ]),
    ...mapGetters([
      'userSignInStatus',
    ]),
    articleAuthor() {
      const {
        author,
        lovecount,
        authorPic,
      } = this.articleVm
      const authorInfo = {
        author,
        lovecount,
        authorPic,
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
  created() {
    this.articleId = this.$route.params.articleId
  },
  mounted() {
    console.log(this.$store.state.userInfo.Userpic)
    this.getArticleInfo(this.articleId)
  },
  methods: {
    // 取得文章所需資訊
    async getArticleInfo(articleId) {
      // 取得文章資料
      await getKiruArticle(articleId).then(res => {
        console.log(res)
        if (res.data.success) {
          this.articleVm = res.data.data
        } else {
          this.$router.replace({ name: 'NotFound', query: { message: res.data.message || '查無此文章' } })
        }
      }).catch(error => {
        console.log('getKiruArticle: ', error)
      })

      // 取得留言資料
      const params = {
        artId: this.articleId,
        ...this.messagePagination,
      }
      await getArticleMessage(params).then(res => {
        console.log(res)
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
        console.error('addArticleMessage: ', error)
      })
      this.$store.commit('HIDE_OVERLAY_LOADING')

      // 取得作者資訊
      await getAuthorInfo(this.articleVm.username).then(res => {
        console.log('取得作者資訊: ', res)
        if (res.data.success) {
          this.authorInfo = res.data.data
        } else {
          this.$notify({
            group: 'error',
            title: '作者資訊取得失敗',
          })
        }
      })
    },
    // 發送留言
    async sendMessageHandler() {
      if (this.userMessageVm === '') return
      const sendVm = {
        artId: this.articleId,
        Main: this.userMessageVm,
      }
      await addArticleMessage(sendVm).then(res => {
        this.userMessageVm = '',
        console.log(res)
      }).catch(error => {
        console.log(error)
      })

      const getVm = {
        artId: this.articleId,
        ...this.messagePagination,
      }
      await getArticleMessage(getVm).then(res => {
        if (res.data.success) {
          // 比較新舊留言資料，取出新的資料
          const newMessageList = res.data.data
          this.updateMessage(newMessageList)
        } else {
          this.$notify({
            group: 'error',
            title: '留言內容取得失敗',
          })
        }
      }).catch(error => {
        console.error('addArticleMessage: ', error)
      })
    },
    // 更新留言資料
    updateMessage(newData) {
      this.articleMessage = newData
      // 比較新舊留言資料，取出新的資料
      // const oldMessageIdList = this.articleMessage.map(msg => msg.messageId)
      // const uniqNewMessageList = newData.filter(newMsg => {
      //   return oldMessageIdList.indexOf(newMsg.messageId) === -1
      // })

      // uniqNewMessageList.forEach(newMsg => {
      //   this.articleMessage.unshift(newMsg)
      // })
    },
    // 發送回覆
    async replyHandler(messageId) {
      try {
        const getVm = {
          artId: this.articleId,
          ...this.messagePagination,
        }
        // 取得完最新留言資料才能避免回覆過程中有人留言造成 index 錯誤
        // 未來可用 websocket 實現
        const newReplyData = await getArticleReMessage(messageId)
        const newMessageData = await getArticleMessage(getVm)
        if (newReplyData.data.success) {
          if (newMessageData.data.success) {
            this.updateMessage(newMessageData.data.data)
            const currentMessageIndex = this.articleMessage.findIndex(message => {
              return message.messageId === messageId
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