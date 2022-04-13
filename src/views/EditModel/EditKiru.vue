<template>
  <!-- 編輯文章頂部 Navbar -->
  <EditNavbar
    @save-article="saveHandler"
    @publish-article="publishHandler"
  ></EditNavbar>
  <div class="py-11 px-4 mx-auto max-w-[816px] md:px-8">
    <div class="kiruPartEffect">
      <!-- 上傳圖片 -->
      <div
        id="editor-kiru-cover"
        class="mb-8"
      >
        <CoverUpload
          name="cover"
          class="max-w-[768px]"
          fix-text="點我修改封面圖片"
          upload-bg="bg-upload-cover"
          upload-container="mb-4 w-full sm:w-2/3"
          :orig-image="articleVm.firstPhoto"
          :edit-mode="editMode"
          @file-change="coverChange"
          @file-confirm="coverConfirm"
          @file-cancel="coverCancel"
        ></CoverUpload>
      </div>
      <!-- 切切標題 -->
      <div
        id="editor-kiru-title"
        class="mb-12"
      >
        <div class="mb-2">
          <h2 class="inline-block pr-4 text-xl font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl">
            切切標題
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
        id="editor-kiru-pay"
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
        id="editor-kiru-category"
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
        id="editor-kiru-introduction"
        class="py-4 mb-6"
      >
        <div class="flex items-end mb-2">
          <h3 class="font-bold text-myBrown">
            切切敘述
          </h3>
          <span class="py-0.5 px-2 text-sm text-myBrown">( 上限 100 字元 )</span>
          <span class="py-0.5 px-2 text-xs text-myBrown rounded">字數 : {{ artInfoCount }}</span>
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
    <!-- 預備工具 -->
    <div class="mb-2">
      <h2 class="inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl">
        預備工具
      </h2>
    </div>
    <div
      id="editor-kiru-tools"
      class="mb-8 md:mb-12 kiruPartEffect"
    >
      <!-- 說明 -->
      <p class="mb-6 text-sm font-bold text-myBrown md:text-base">
        會用到的物品、工具、材料、環境...等
      </p>
      <!-- 預備工具欄位 -->
      <PrepareTool
        v-for="content in articleVm.fArrayList"
        :key="content.uuid"
        v-bind="content"
        :orig-image="content.secPhoto"
        :edit-mode="editMode"
        @remove-item="removeTool"
        @update:tool="content.mission = $event"
        @tool-img-upload="content.secPhoto = $event"
      ></PrepareTool>
      <!-- 新增欄位 -->
      <div class="flex justify-center my-4">
        <button
          type="button"
          class="flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2"
          @click="addTool"
        >
          <img
            src="@img/add-item.svg"
            alt="add item"
          >
        </button>
      </div>
    </div>
    <!-- 開始切切 -->
    <div
      id="editor-kiru-kiru"
      class="mb-12 md:mb-16 kiruPartEffect"
    >
      <div class="flex gap-3 items-center mb-8">
        <h2 class="inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-3xl">
          開始切切
        </h2>
        <span class="text-sm font-bold text-red-400">請至少填寫 1 個切切</span>
      </div>
      <KiruItem
        v-for="content in articleVm.mArrayList"
        :key="content.uuid"
        v-bind="content"
        :orig-image="content.thirdPhoto"
        :orig-main="content.main"
        :edit-mode="editMode"
        @remove-item="removeKiru"
        @kiru-content="content.main = $event"
        @kiru-img-upload="content.thirdPhoto = $event"
      ></KiruItem>
      <!-- 新增欄位 -->
      <div class="flex justify-center my-4">
        <button
          type="button"
          class="flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2"
          @click="addKiru"
        >
          <img
            src="@img/add-item.svg"
            alt="add item"
          >
        </button>
      </div>
    </div>
    <!-- 附屬任務 -->
    <div class="mb-2">
      <h2 class="inline-block pr-4 mb-1 text-lg font-bold text-myBrown border-r-2 border-myBrown md:mb-2 md:text-2xl">
        附屬任務
      </h2>
    </div>
    <div
      id="editor-kiru-mission"
      class="mb-12 md:mb-12 kiruPartEffect"
    >
      <div class="mb-8 md:mb-12">
        <!-- 說明 -->
        <p class="mb-6 text-sm font-bold text-myBrown md:text-base">
          完成這個切切的補充知識與延伸是什麼呢? Ex.閱讀的書、相關的知識、要備妥的文件、要安裝的檔案...
        </p>
      </div>
      <MissionItem
        v-for="content in articleVm.fMissionList"
        :key="content.uuid"
        v-bind="content"
        :edit-mode="editMode"
        @remove-item="removeMission"
        @update:title="content.auxiliary = $event"
        @update:link="content.auxiliarymain = $event"
      ></MissionItem>
      <!-- 新增附屬任務欄位 -->
      <div class="flex justify-center my-4">
        <button
          type="button"
          class="flex before:block relative before:absolute before:top-6 hover:before:top-1 before:left-[55%] hover:before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:bg-myYellow before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2"
          @click="addMission"
        >
          <img
            src="@img/add-item.svg"
            alt="add item"
          >
        </button>
      </div>
    </div>
    <!-- 附註與補充 -->
    <div
      id="editor-kiru-remark"
      class="mb-12 md:mb-12 kiruPartEffect"
    >
      <!-- finaldata -->
      <h2 class="mb-1 text-2xl font-bold text-center text-myBrown md:mb-2">
        附註與補充
      </h2>
      <TipTap
        v-model="articleVm.final"
        placeholder="補充事項、提醒、小撇步等等 _"
        custom-class="min-h-[6rem]"
        word-limit="300"
        @word-count="artInfoCountHandler"
      ></TipTap>
    </div>
    <!-- 操作 -->
    <div class="flex justify-center md:justify-start">
      <button
        type="button"
        class="userPageCancelButton"
        @click="cancelKiru"
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
import CoverUpload from '@/components/editor/CoverUpload.vue'
import EditNavbar from '@/components/editor/EditNavbar.vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import FormInputSelect from '@/components/utils/FormInputSelect.vue'
import Input from '@/components/utils/Input.vue'
import TipTap from '@/components/editor/TipTap.vue'
import PrepareTool from '@/components/editor/PrepareTool.vue'
import KiruItem from '@/components/editor/KiruItem.vue'
import MissionItem from '@/components/editor/MissionItem.vue'
import AlertModal from '@/components/utils/AlertModal.vue'
import _ from 'lodash'
import { useField } from 'vee-validate'
import { getInterestList } from '@api'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage, addKiruArticle, getEditKiruArticle, editKiruArticle } from '@api'

export default {
  name: 'EditKiru',
  components: {
    EditNavbar,
    CoverUpload,
    Switch,
    SwitchGroup,
    SwitchLabel,
    FormInputSelect,
    Input,
    TipTap,
    PrepareTool,
    KiruItem,
    MissionItem,
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
        // memberUserName: '',
        title: '',
        isFree: true,
        isPush: true,
        articlecategoryId: null,
        introduction: '',
        firstPhoto: '',
        fArrayList: [],
        // 切切欄位
        mArrayList: [
          {
            uuid: uuidv4(),
            thirdPhoto: '',
            main: '',
          },
        ],
        // 附屬任務欄位
        fMissionList: [],
        final: '',
      },
      coverImage: null,
      categoryVm: null,
      artInfoCount: 0,
      finalCount: 0,
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
      await getEditKiruArticle(this.articleId).then(res => {
        console.log('取得編輯切切文章資料: ', res)
        if (res.data.success) {
          let { ArtInitDate, artArtlog, fArrayList, fMissionList, mArrayList, ...rest } = res.data.data
          const filter_fArrayList = this.pushUuid(fArrayList)
          const filter_fMissionList = this.pushUuid(fMissionList)
          const filter_mArrayList = this.pushUuid(mArrayList)
          const data = {
            ...rest,
            fArrayList: filter_fArrayList,
            fMissionList: filter_fMissionList,
            mArrayList: filter_mArrayList,
          }
          Object.assign(this.articleVm, data)
          console.log(this.articleVm)
        } else {
          this.$notify({
            group: 'error',
            title: '文章資料取得失敗 !'
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
      this.category = [ ...res.data ]
      if (this.editMode) {
        const categoryId = this.articleVm.articlecategoryId
        const targetCategory = this.category.find(item => item.Id === categoryId)
        this.categoryHandler = targetCategory
      }
    })
    // this.articleVm.memberUserName = this.$store.state.userInfo.Username
  },
  methods: {
    // 新增文章發送 API
    postArticle() {
      this.$store.commit('SHOW_OVERLAY_LOADING')
      addKiruArticle(this.articleVm).then(res => {
        console.log('新增成功: ', res)
        if (res.data.success) {
          const alertInfo = {
            message: this.articleVm.isPush ? '切切已發布 !' : '切切已儲存',
            confirmText: this.articleVm.isPush ? '去看內文' : '回個人頁面',
            confirmMode: 'replace',
            confirmTodo: {
              name: this.articleVm.isPush ? 'ArticleKiru' : 'UserDetail',
              params: this.articleVm.isPush
                ? { articleId: res.data.artId }
                : {
                  userId: this.$store.state.userInfo.Username,
                  target: 'articles',
                },
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
      editKiruArticle(this.articleVm).then(res => {
        console.log('編輯成功: ', res)
        if (res.data.success) {
          let alertInfo = {}
          if (this.articleVm.isPush) {
            alertInfo = {
              message: '文章已發布 !',
              confirmText: '去看內文',
              confirmMode: 'replace',
              confirmTodo: {
                name: 'ArticleKiru',
                params: { articleId: this.articleId },
              }
            }
          } else {
            alertInfo = {
              message: '文章已儲存 !',
              confirmText: '回到個人主頁',
              confirmMode: 'replace',
              confirmTodo: {
                name: 'UserDetail',
                params: {
                  userId: this.$store.state.userInfo.Username,
                  target: 'articles',
                },
              }
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
    // 取得編輯切切資料後，補上 uuid 的欄位
    pushUuid(ary) {
      ary.forEach(item => item.uuid = uuidv4())
      return ary
    },
    cancelKiru() {
      this.alertInfo = {
        message: '確定取消這次的切切 ?',
        confirmMode: 'push',
        confirmTodo: { path: this.$store.state.recordPath },
      }
      this.$store.commit('SHOW_ALERT')
    },
    // 封面圖片選擇後
    coverChange(file) {
      this.coverImage = file
    },
    coverConfirm() {
      this.sendCover(this.coverImage.name)
    },
    coverCancel() {
      this.coverImage = null
      this.articleVm.firstPhoto = ''
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
    // 切切標題
    titleHandler(target) {
      const { name, value, error } = target
      this.articleVm.title = this.titleError(target)
    },
    // 切切標題驗證
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

    // 切切敘述字數計算
    artInfoCountHandler: _.throttle(function debounceProcess(value) {
      this.artInfoCount = value
    }, 500),
    // 補充事項字數計算
    finalCountHandler: _.throttle(function debounceProcess(value) {
      this.finalCount = value
    }, 500),
    // 新增預備工具欄位
    addTool() {
      this.articleVm.fArrayList.push({
        uuid: uuidv4(),
        secPhoto: '',
        mission: '',
      })
    },
    // 新增切切欄位
    addKiru() {
      this.articleVm.mArrayList.push({
        uuid: uuidv4(),
        thirdPhoto: '',
        main: '',
      })
    },
    addMission() {
      this.articleVm.fMissionList.push({
        uuid: uuidv4(),
        auxiliary: '',
        auxiliarymain: '',
      })
    },
    removeTool(id) {
      const removeIndex = this.articleVm.fArrayList.findIndex(tool => tool.uuid === id)
      this.articleVm.fArrayList.splice(removeIndex, 1)
    },
    removeKiru(id) {
      const removeIndex = this.articleVm.mArrayList.findIndex(m => m.uuid === id)
      this.articleVm.mArrayList.splice(removeIndex, 1)
    },
    removeMission(id) {
      const removeIndex = this.articleVm.fMissionList.findIndex(m => m.uuid === id)
      this.articleVm.fMissionList.splice(removeIndex, 1)
    },
    // 儲存 / 發布前檢查
    checkHandler(data) {
      console.log(data)
      const errors = []

      if (!data.firstPhoto) {
        errors.push({
          key: 'firstPhoto',
          anchor: 'editor-kiru-cover',
          message: '必須上傳封面圖片 !',
        })
      }

      if (!data.title) {
        errors.push({
          key: 'title',
          anchor: 'editor-kiru-title',
          message: '切切標題為必填 !',
        })
      }

      if (!data.articlecategoryId) {
        errors.push({
          key: 'articlecategoryId',
          anchor: 'editor-kiru-category',
          message: '全站分類為必填 !'
        })
      }

      const kiruError = data.mArrayList.find(kiru => !kiru.main)
      if (data.mArrayList.length === 0 || kiruError) {
        errors.push({
          key: 'mArrayList',
          anchor: 'editor-kiru-kiru',
          message: '切切內容不能留空 !',
        })
      }

      const missionError = data.fMissionList.some(mission => {
        return mission.auxiliary === '' || mission.auxiliarymain === ''
      })
      if (missionError) {
        errors.push({
          key: 'fMissionList',
          anchor: 'editor-kiru-mission',
          message: '任務欄位不可為空 !',
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