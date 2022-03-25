<template>
  <!-- 文章頂部資訊 -->
  <KiruInfo v-bind="articleInfo"></KiruInfo>
  <!-- 切切內容 -->
  <KiruContent></KiruContent>
  <!-- TIPS -->
  <div class="mb-12">
    <Disclosure
      v-slot="{ open }"
      :default-open="true"
      as="div"
      class=""
    >
      <DisclosureButton class="block relative py-1 w-full text-xl font-bold text-center bg-myYellow">
        <h2 class="text-center text-white">
          TIPS
        </h2>
        <span
          class="inline-block absolute top-1/2 right-6 text-white transition-all -translate-y-1/2 material-icons"
          :class="open ? 'transform -rotate-180' : 'transform rotate-0'"
        >expand_more</span>
      </DisclosureButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
        mode="out-in"
      >
        <DisclosurePanel
          v-if="open"
          class="py-8 px-12 list-disc text-black"
          as="ul"
          static
        >
          <li class="mb-4">
            <p>換裝一般水龍頭時，若活動扳手轉1~2圈後水龍頭不正，勿以蠻力轉正，建議重新拆下，繞止水帶後再裝回。</p>
          </li>
          <li class="mb-4">
            <p>馬鈴薯壓成泥後加入奶油和鮮奶會是薯泥更順滑，尤其經過烘烤後薯泥質感會比較乾，不妨多加一點</p>
          </li>
        </DisclosurePanel>
        <DisclosurePanel
          v-else
          class="py-8 px-12 list-disc text-black"
          static
          as="div"
        >
          <p class="text-center">
            查看本文補充...
          </p>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
  <!-- 附屬切切 -->
  <div class="mb-12">
    <div class="bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        附屬切切
      </h2>
    </div>
    <div class="py-8 px-12">
      <div class="grid grid-cols-2 grid-flow-row gap-4">
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
      </div>
    </div>
  </div>
  <!-- 相關切切 -->
  <h2 class="text-2xl font-bold text-myBrown">
    相關切切
  </h2>
  <div class="mb-16"></div>
  <!-- 留言功能 -->
  <div class="flex gap-8 justify-between px-6 mb-12">
    <div class="overflow-hidden w-16 h-16 rounded-full ">
      <img
        v-src="'https://picsum.photos/128/128?random=3'"
        alt=""
        class="object-cover w-full h-full scale-[102%] load"
      >
    </div>
    <div class="flex flex-col grow gap-3 justify-between items-end md:flex-row">
      <textarea
        rows="3"
        class="block py-2 px-3 w-full text-black/80 bg-white/0 rounded outline-1 focus:outline-2 outline-myBrown/20 focus:outline-myYellow outline resize-none"
        placeholder="我要留言"
      ></textarea>
      <button
        type="button"
        class="flex gap-1 justify-center items-center py-1 px-4 text-white bg-myBrown md:flex-col md:py-0 md:px-2 md:h-full md:transition-all"
      >
        <span class="inline-block text-lg md:-translate-y-1 material-icons">reply</span>
        <span class="text-sm whitespace-nowrap md:-translate-y-1">送出</span>
      </button>
    </div>
  </div>
  <!-- 留言內容 -->
  <div class="mb-16">
    <KiruReply :replies="articleReplies"></KiruReply>
  </div>
</template>

<script>
import KiruInfo from '@/components/article/kiru/KiruInfo.vue'
import KiruContent from '@/components/article/kiru/KiruContent.vue'
import KiruReply from '@/components/article/kiru/KiruReply.vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { getKiruArticle } from '@api'

export default {
  name: 'ArticleKiru',
  components: {
    KiruInfo,
    KiruContent,
    KiruReply,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  beforeRouteUpdate(to, from) {
    console.log('beforeRouteUpdate: ', to, from)
    this.articleId = to.params.articleId
    this.getArticleInfo(this.articleId)
  },
  data() {
    return {
      articleId: null,
      // articleVm: {
      //   messageArrayList: [
      //     {
      //       messageId: 0,
      //       messageMemberPic: 'https://picsum.photos/128/128?random=1',
      //       messageMember: '路卡利歐',
      //       messageMain: '五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。五星好評，讚ㄉ。',
      //       messageInitDate: Date.now(),
      //       reMessageArrayList: [
      //         {
      //           reMessageId: 0,
      //           reMessageMemberPic: 'https://picsum.photos/128/128?random=2',
      //           reMessageMember: '路歐利',
      //           reMessageMain: '謝啦哪次不謝',
      //           reMessageInitDate: Date.now(),
      //         }
      //       ]
      //     },
      //     {
      //       messageId: 1,
      //       messageMemberPic: 'https://picsum.photos/128/128?random=1',
      //       messageMember: '路卡利歐',
      //       messageMain: '說明不夠清楚，口口卡進電風扇裡面了',
      //       messageInitDate: Date.now(),
      //       reMessageArrayList: [
      //         {
      //           reMessageId: 1,
      //           reMessageMemberPic: 'https://picsum.photos/128/128?random=2',
      //           reMessageMember: '路歐利',
      //           reMessageMain: '謝啦哪次不謝',
      //           reMessageInitDate: Date.now(),
      //         }
      //       ]
      //     },
      //   ]
      // },
      articleVm: {},
    }
  },
  computed: {
    articleInfo() {
      const {
        title,
        firstPhoto,
        introduction,
        articlecategoryId,
        artArtlog,
        lovecount,
        ArtInitDate: artInitDate,
      } = this.articleVm
      const info = {
        title,
        firstPhoto,
        introduction,
        articlecategoryId,
        artArtlog,
        lovecount,
        artInitDate,
      }
      return info
    },
    articleReplies() {
      const { messageArrayList } = this.articleVm
      return messageArrayList
    },
  },
  created() {
    this.articleId = this.$route.params.articleId
  },
  mounted() {
    this.getArticleInfo(this.articleId)
  },
  methods: {
    getArticleInfo(articleId) {
      getKiruArticle(articleId).then(res => {
        console.log(res)
        if (res.data.success) {
          this.articleVm = res.data.data
        } else {
          this.$router.push({ name: 'NotFound', query: { message: res.data.message || '查無此文章' } })
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
}
</script>