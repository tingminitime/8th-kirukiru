<template>
  <div class="flex relative gap-3 justify-center">
    <div class="pb-32 min-w-[375px] md:pt-16 md:pl-8 md:w-[848px]">
      <router-view
        :key="$route.path"
        :love-count="authorInfo?.loveCount"
        :is-add-love="authorInfo?.isAddLove"
        :is-collect="isCollect"
        @author-info="authorInfoHandler"
        @add-love="addLoveHandler"
        @is-add-love="changeLoveStatus"
        @add-collection="addCollectionHandler"
      ></router-view>
    </div>
    <!-- 側邊攔 -->
    <div
      v-if="authorInfo"
      class="hidden sticky top-16 pl-4 mt-16 mb-4 w-48 h-screen border-l border-myBrown/60 lg:block"
    >
      <div class="py-12">
        <div class="flex flex-col gap-3 justify-center items-center">
          <router-link
            class="block overflow-hidden w-24 h-24 rounded-full"
            :to="{ name: 'Author', params: { authorId: authorInfo.Username } }"
          >
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/${authorInfo.Userpic}`"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </router-link>
          <div class="w-full">
            <div class="text-center bg-myYellow">
              <p class="py-2 text-myBrown">
                {{ authorInfo.Name }}
              </p>
            </div>
            <div class="border-2 border-myYellow">
              <router-link
                class="block py-2 text-center text-myBrown hover:text-myOrange"
                :to="{ name: 'Author', params: { authorId: authorInfo.Username } }"
              >
                關注
              </router-link>
            </div>
          </div>
          <div>
            <p
              v-if="authorInfo.Introduction"
              class="pb-10 text-justify text-myBrown"
            >
              {{ authorInfo.Introduction }}
            </p>
            <p
              v-else
              class="text-sm text-myBrown/60"
            >
              此作者沒有簡介
            </p>
          </div>
          <div class="flex justify-center py-4 w-full border-t border-myBrown/20">
            <!-- 愛心 -->
            <AddLove
              button-class="block py-2 w-full text-myBrown hover:text-myOrange border-2 border-myYellow"
              :article-type="$route.meta.articleType"
              :love-count="authorInfo.loveCount"
              :is-add-love="authorInfo.isAddLove"
              @add-love="addLoveHandler"
            ></AddLove>
            <!-- 收藏 -->
            <AddCollection
              button-class="block py-2 w-full text-myBrown hover:text-myOrange border-y-2 border-r-2 border-myYellow"
              :is-collect="isCollect"
              @add-collection="addCollectionHandler"
            ></AddCollection>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ScrollToTop></ScrollToTop>
</template>

<script>
import ScrollToTop from '@/components/utils/ScrollToTop.vue'
import AddLove from '@/components/article/AddLove.vue'
import AddCollection from '@/components/article/AddCollection.vue'
import { mapState } from 'vuex'

export default {
  name: 'ArticlePage',
  components: {
    ScrollToTop,
    AddLove,
    AddCollection,
  },
  data() {
    return {
      authorInfo: null,
      isCollect: false,
    }
  },
  computed: {
    ...mapState([
      'userKiruCollections',
      'userCommonCollections',
    ]),
  },
  watch: {
    userKiruCollections() {
      this.checkAddCollection('userKiruCollections')
    },
    userCommonCollections() {
      this.checkAddCollection('userCommonCollections')
    },
  },
  methods: {
    authorInfoHandler(info) {
      console.log('側邊欄用作者資訊: ', info)
      this.authorInfo = info
    },
    changeLoveStatus(val) {
      this.authorInfo.isAddLove = val
    },
    // 按愛心，可重複
    addLoveHandler(res) {
      console.log('Article Page 按愛心: ', res)
      if (res.success) {
        this.authorInfo.loveCount += 1
        this.authorInfo.isAddLove = true
        this.$notify({
          group: 'normal',
          title: '已按喜歡',
        }, 2500)
      } else {
        console.log(res)
        this.$router.push({ name: 'SignIn' })
      }
    },
    // 檢查是否有收藏過文章
    checkAddCollection(collectionsName) {
      const checkResult = this[collectionsName].findIndex(item => item.artId === Number(this.$route.params.articleId))
      if (checkResult !== -1) this.isCollect = true
    },
    // 收藏文章
    addCollectionHandler() {
      switch (this.$route.meta.articleType) {
        case 'kiru':
          if (!this.isCollect) {
            this.$store.dispatch('ADD_KIRU_COLLECTION', {
              artId: this.$route.params.articleId
            }).then(res => {
              if (res.success) {
                this.isCollect = true
                this.$notify({
                  group: 'normal',
                  title: '收藏成功',
                })
              } else {
                console.log(res)
              }
            }).catch(error => console.error(error))
          } else {
            this.$store.dispatch('REMOVE_KIRU_COLLECTIONS', {
              artId: this.$route.params.articleId
            }).then(res => {
              if (res.success) {
                this.isCollect = false
                this.$notify({
                  group: 'normal',
                  title: '已取消收藏',
                })
              } else {
                console.log(res)
              }
            }).catch(error => console.error(error))
          }
          break
        case 'common':
          if (!this.isCollect) {
            this.$store.dispatch('ADD_COMMON_COLLECTION', {
              artId: this.$route.params.articleId
            }).then(res => {
              if (res.success) {
                this.isCollect = true
                this.$notify({
                  group: 'normal',
                  title: '收藏成功',
                })
              } else {
                console.log(res)
              }
            }).catch(error => console.error(error))
          } else {
            this.$store.dispatch('REMOVE_COMMON_COLLECTIONS', {
              artId: this.$route.params.articleId
            }).then(res => {
              if (res.success) {
                this.isCollect = false
                this.$notify({
                  group: 'normal',
                  title: '已取消收藏',
                })
              } else {
                console.log(res)
              }
            }).catch(error => console.error(error))
          }
          break
      }
    },
  },
}
</script>