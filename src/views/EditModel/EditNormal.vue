<template>
  <!-- 編輯文章頂部 Navbar -->
  <EditNavbar
    @save-article="saveHandler"
    @publish-article="publishHandler"
  ></EditNavbar>
  <div class="py-11 px-4 mx-auto max-w-[816px] md:px-8">
    <div class="kiruPartEffect">
      <!-- 切切標題 -->
      <div
        id="editor-normal-title"
        class="mb-12"
      >
        <div class="mb-2">
          <h2 class="inline-block pr-4 text-xl font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl">
            文章標題
          </h2>
        </div>
        <Input
          class="w-full sm:w-2/3"
          error-class="md:-right-2 md:translate-x-full md:top-1/2 md:-translate-y-1/2 md:absolute"
          placeholder="按這裡輸入標題"
          name="title"
          error-text="標題為必填"
          :default-value="articleVm.title"
          @update="titleHandler"
        ></Input>
      </div>
    </div>
    <div class="mb-4 md:mb-6">
      <h2 class="inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl">
        編輯資訊
      </h2>
    </div>
    <div class="kiruPartEffect">
      <!-- 付費閱讀設定 -->
      <div
        id="editor-normal-pay"
        class="mb-6 md:mb-8"
      >
        <SwitchGroup>
          <div class="flex gap-8 items-center">
            <SwitchLabel class="flex gap-2 items-center">
              <span class="font-bold text-myBrown">
                是否要把這篇設為付費閱讀 ?
              </span>
              <span class="text-myBrown material-icons">info</span>
            </SwitchLabel>
            <Switch
              v-model="articleVm.isFree"
              :class="!articleVm.isFree ? 'bg-myBrown' : 'bg-white'"
              class="mySwitchBar"
            >
              <span class="sr-only">是否要把這篇設為付費閱讀</span>
              <span
                :class="!articleVm.isFree ? 'translate-x-8' : 'translate-x-0'"
                class="ring-myBrown mySwitchButton"
              ></span>
            </Switch>
          </div>
        </SwitchGroup>
      </div>
      <!-- 全站分類 -->
      <div
        id="editor-normal-category"
        class="mb-8 w-full sm:w-1/3"
      >
        <h3 class="font-bold text-myBrown">
          全站分類
        </h3>
        <div>
          <FormInputSelect
            v-model="categoryHandler"
            :options="category"
            key-prop="Name"
            label-prop="Name"
            default-text="打開選單"
            options-position="absolute"
          ></FormInputSelect>
        </div>
      </div>
      <!-- 切切敘述 -->
      <div
        id="editor-normal-introduction"
        class="py-4 mb-6"
      >
        <div class="flex gap-2 items-center mb-2">
          <h3 class="font-bold text-myBrown">
            切切敘述
          </h3>
          <span class="py-0.5 px-2 text-sm text-white bg-myBrown rounded">字數 : {{ artInfoCount }}</span>
        </div>
        <TipTap
          v-model="articleVm.introduction"
          placeholder="簡述一下這篇切切的內容吧 _"
          custom-class="min-h-[6rem]"
          word-limit="100"
          @word-count="artInfoCountHandler"
        ></TipTap>
      </div>
    </div>
    <!-- 文章內容 -->
    <div
      id="editor-normal-main"
      class="py-4 mb-12"
    >
      <div class="mb-2">
        <h2 class="inline-block pr-4 text-2xl font-bold text-myBrown md:mb-2 md:text-3xl">
          開始寫作
        </h2>
        <span class="text-sm text-black/60">字數 : {{ mainCount }}</span>
      </div>
      <TipTap
        v-model="articleVm.main"
        placeholder="開始寫作吧 _"
        custom-class="min-h-[18rem] md:min-h-[24rem] border-none py-2 px-0"
        :allow-image="true"
        @word-count="mainCountHandler"
        @check-empty="isMainEmpty = $event"
      ></TipTap>
    </div>
    <!-- 操作 -->
    <div class="flex justify-center text-2xl md:justify-end">
      <button
        type="button"
        class="button-md myButtonValid myButtonValidHover"
        @click="cancelEdit"
      >
        取消編輯
      </button>
    </div>
  </div>
  <AlertModal
    v-bind="alertInfo"
  ></AlertModal>
</template>

<script>
import EditNavbar from '@/components/editor/EditNavbar.vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import FormInputSelect from '@/components/utils/FormInputSelect.vue'
import Input from '@/components/utils/Input.vue'
import TipTap from '@/components/editor/TipTap.vue'
import AlertModal from '@/components/utils/AlertModal.vue'
import _ from 'lodash'
import { useField } from 'vee-validate'
import { getInterestList } from '@api'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage, addNormalArticle, getEditNormalArticle, editNormalArticle } from '@api'

export default {
  name: 'EditNormal',
  components: {
    EditNavbar,
    Switch,
    SwitchGroup,
    SwitchLabel,
    FormInputSelect,
    Input,
    TipTap,
    AlertModal,
  },
  props: {
    articleId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      category: [],
      articleVm: {
        userName: '',
        title: '',
        isFree: true,
        isPush: true,
        articlecategoryId: null,
        introduction: '',
        main: '',
      },
      coverImage: null,
      categoryVm: null,
      artInfoCount: 0,
      mainCount: 0,
      isMainEmpty: true,
      errors: [],
      editMode: false,
      alertInfo: null,
    }
  },
  computed: {
    categoryHandler: {
      get() {
        return this.categoryVm
      },
      set(newVal) {
        this.categoryVm = newVal
        this.articleVm.articlecategoryId = newVal.Id
      }
    },
  },
  async mounted() {
    if (this.articleId) {
      this.editMode = true
      await getEditNormalArticle(this.articleId).then(res => {
        console.log('取得編輯一般文章資料: ', res)
        if (res.data.success) {
          Object.assign(this.articleVm, res.data.data)
        } else {
          this.$notify({
            group: 'error',
            title: '文章資料取得失敗'
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      this.editMode = false
    }

    await getInterestList().then(res => {
      console.log('取得文章分類: ', res)
      this.category = res.data
      if (this.editMode) {
        const categoryId = this.articleVm.articlecategoryId
        const targetCategory = this.category.find(item => item.Id = categoryId)
        this.categoryHandler = targetCategory
      }
    })
    this.articleVm.userName = this.$store.state.userInfo.Username
  },
  methods: {
    // 新增文章發送 API
    postArticle() {
      this.$store.commit('SHOW_OVERLAY_LOADING')
      addNormalArticle(this.articleVm).then(res => {
        console.log('新增成功: ', res)
        if (res.data.success) {
          const alertInfo = {
            message: '文章已發布 !',
            confirmText: '去看內文',
            confirmMode: 'replace',
            confirmTodo: {
              name: 'ArticleCommon',
              params: { articleId: res.data.artId },
            }
          }
          this.alertInfo = alertInfo
          this.$store.commit('HIDE_OVERLAY_LOADING')
          this.$store.commit('SHOW_ALERT')
        } else {
          this.$store.commit('HIDE_OVERLAY_LOADING')
          this.$notify({
            group: 'error',
            title: '發布失敗',
            message: res.data.message,
          })
        }
      })
      .catch(error => {
        this.$store.commit('HIDE_OVERLAY_LOADING')
        console.log(error)
      })
    },
    // 編輯文章發送 API
    editArticle() {
      this.$store.commit('SHOW_OVERLAY_LOADING')
      editNormalArticle(this.articleVm).then(res => {
        console.log('編輯成功: ', res)
        if (res.data.success) {
          const alertInfo = {
            message: '文章已儲存 !',
            confirmText: '回到個人主頁',
            confirmMode: 'replace',
            confirmTodo: {
              name: 'User',
              params: { userId: this.$store.state.userInfo.Username },
            }
          }
          this.alertInfo = alertInfo
          this.$store.commit('SHOW_ALERT')
        } else {
          this.$notify({
            group: 'error',
            title: '發布失敗',
            message: res.data.message,
          })
        }
        this.$store.commit('HIDE_OVERLAY_LOADING')
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 儲存文章
    saveHandler() {
      this.alertInfo = {}
      this.articleVm.isPush = false

      const checkResult = this.checkHandler(this.articleVm)
      console.log(checkResult)
      if (checkResult.success) {
        this.editMode
          ? this.editArticle()
          : this.postArticle()
      } else {
        this.alertInfo = {
          message: `${checkResult.errors[0].message}`,
          showConfirm: false,
          showCancel: true,
          cancelText: '返回',
          cancelMode: 'anchor',
          cancelTodo: {
            name: this.$route.name,
            hash: `#${checkResult.errors[0].anchor}`
          }
        }
        this.$store.commit('SHOW_ALERT')
      }
    },
    // 發布文章
    publishHandler() {
      this.alertInfo = {}
      this.articleVm.isPush = true

      const checkResult = this.checkHandler(this.articleVm)
      console.log(checkResult)
      if (checkResult.success) {
        this.editMode
          ? this.editArticle()
          : this.postArticle()
      } else {
        this.alertInfo = {
          message: `${checkResult.errors[0].message}`,
          showConfirm: false,
          showCancel: true,
          cancelText: '返回',
          cancelMode: 'anchor',
          cancelTodo: {
            name: this.$route.name,
            hash: `#${checkResult.errors[0].anchor}`
          }
        }
        this.$store.commit('SHOW_ALERT')
      }
    },
    cancelEdit() {
      this.alertInfo = {
        message: '確定返回上一頁 ?',
        confirmMode: 'push',
        confirmTodo: { path: this.$store.state.recordPath },
      }
      this.$store.commit('SHOW_ALERT')
    },
    // 上傳圖片
    sendCover(name) {
      const data = new FormData()
      data.append('photo', this.coverImage.file)
      uploadImage(data).then(res => {
        console.log('上傳圖片: ', res)
        if (res.data.success) {
          this.articleVm.firstPhoto = res.data.picname
        } else {
          this.$notify({
            group: 'error',
            title: '上傳圖片失敗 !',
          })
          this.articleVm.firstPhoto = name
        }
      })
      .catch(error => console.log(error))
    },
    // 文章標題
    titleHandler(target) {
      const { name, value, error } = target
      this.articleVm.title = this.titleError(target)
    },
    // 文章標題驗證
    titleError(target) {
      const hasError = this.errors.findIndex(err => err === target.name)
      if (target.error) {
        if (hasError === -1) this.errors.push(target.name)
        return ''
      } else {
        if (hasError !== -1) this.errors.splice(hasError, 1)
        return target.value
      }
    },
    // 敘述字數計算
    artInfoCountHandler: _.throttle(function debounceProcess(value) {
      this.artInfoCount = value
    }, 500),
    // 文章字數計算
    mainCountHandler: _.throttle(function debounceProcess(value) {
      this.mainCount = value
    }, 500),
    // 新增預備工具欄位
    addTool() {
      this.articleVm.fArrayList.push({
        uuid: uuidv4(),
        secPhoto: '',
        mission: '',
      })
    },
    // 儲存 / 發布前檢查
    checkHandler(data) {
      console.log(data)
      const errors = []

      if (!data.title) {
        errors.push({
          key: 'title',
          anchor: 'editor-normal-title',
          message: '切切標題為必填 !',
        })
      }

      if (!data.articlecategoryId) {
        errors.push({
          key: 'articlecategoryId',
          anchor: 'editor-normal-category',
          message: '全站分類為必填 !'
        })
      }

      if (this.isMainEmpty) {
        errors.push({
          key: 'main',
          anchor: 'editor-normal-main',
          message: '文章內容不可為空 !'
        })
      }
  
      if (!errors.length) {
        return {
          success: true,
          message: '文章編輯檢查成功'
        }
      } else {
        return {
          success: false,
          errors,
          message: '必填欄位未填'
        }
      }
    },
    // 初始化資料
    initData(target) {
        this.$data[target] = this.$options.data()[target];
    },
  }
}
</script>