<template>
  <EditNavbar></EditNavbar>
  <div class="py-11 px-4 mx-auto max-w-[816px] md:px-8">
    <!-- 上傳圖片 -->
    <div>
      <CoverUpload
        name="cover"
        class="mb-4 max-w-[536px]"
        fix-text="點我修改封面圖片"
        upload-bg="bg-upload-cover"
        upload-container="mb-4 w-full sm:w-2/3"
        :orig-image="articleVm.firstPhoto"
        :mode="editMode"
        @file-change="coverHandler"
      ></CoverUpload>
    </div>
    <!-- 切切標題 -->
    <div class="mb-8">
      <h2 class="mb-1 text-lg font-bold text-myBrown md:mb-2 md:text-xl">
        切切標題
      </h2>
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
    <div class="mb-6 bg-myBrown md:mb-8">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        編輯資訊
      </h2>
    </div>
    <!-- 付費閱讀設定 -->
    <div class="mb-6 md:mb-8">
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
    <div class="mb-8 w-full sm:w-1/3">
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
    <div class="py-4 mb-6">
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
    <!-- 預備工具 -->
    <div class="mb-4 bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        預備工具
      </h2>
    </div>
    <div class="py-2 mb-8 md:mb-12">
      <!-- 說明 -->
      <p class="mb-6 text-sm font-bold text-myBrown md:text-base">
        會用到的物品、工具、材料、環境...等
      </p>
      <!-- 預備工具欄位 -->
      <PrepareTool
        v-for="content in tools"
        :key="content.uuid"
        v-bind="content"
        :orig-image="content.toolImage"
        :edit-mode="editMode"
        @remove-item="removeTool"
        @update:tool="content.tool = $event"
        @tool-img-upload="content.toolImage = $event"
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
    <div class="mb-8 md:mb-12">
      <div class="flex gap-3 items-center mb-8">
        <h2 class="mb-1 text-2xl font-bold text-myBrown md:mb-2">
          開始切切
        </h2>
        <span class="text-sm font-bold text-red-400">請至少填寫 1 個切切</span>
      </div>
      <KiruItem
        v-for="content in articleVm.mArrayList"
        :key="content.uuid"
        v-bind="content"
        :orig-image="content.thirdPhoto"
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
    <div class="mb-8 md:mb-12">
      <div class="mb-4 bg-myBrown">
        <h2 class="py-1 text-xl font-bold text-center text-white">
          附屬任務
        </h2>
      </div>
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
        :orig-auxiliary="content.auxiliary"
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
    <div class="mb-8 md:mb-12">
      <!-- finaldata -->
      <h2 class="mb-1 text-2xl font-bold text-center text-myBrown md:mb-2">
        附註與補充
      </h2>
      <TipTap
        v-model="articleVm.finaldata.final"
        placeholder="補充事項、提醒、小撇步等等 _"
        custom-class="min-h-[6rem]"
        word-limit="100"
        @word-count="artInfoCountHandler"
      ></TipTap>
    </div>
    <!-- 操作 -->
    <div class="flex justify-between items-start text-2xl">
      <button
        type="button"
        class="button-md myButtonValid myButtonValidHover"
      >
        取消編輯
      </button>
      <button
        type="button"
        class="button-md myButtonValid myButtonValidHover"
        @click="sendImage"
      >
        測試用按鈕
      </button>
    </div>
  </div>
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
import _ from 'lodash'
import { useField } from 'vee-validate'
import { getInterestList } from '@api'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage } from '@api'

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
  },
  data() {
    return {
      category: [],
      articleVm: {
        memberUserName: '',
        title: '',
        isFree: true,
        isPush: false,
        articlecategory: null,
        introduction: '',
        firstPhoto: '',
        // 切切欄位
        mArrayList: [
          {
            uuid: uuidv4(),
            mId: null,
            thirdPhoto: '',
            main: '',
          },
        ],
        // 附屬任務欄位
        fMissionList: [
          {
            fId: null,
            uuid: uuidv4(),
            auxiliary: '',
            auxiliarymain: '',
          },
        ],
        finaldata: {
          final: '',
        },
      },
      coverImage: null,
      categoryVm: null,
      artInfoCount: 0,
      finalCount: 0,
      errors: [],
      tools: [],
      // tools: [
      //   {
      //     uuid: uuidv4(),
      //     toolImage: 'Photo132923562178381541.jpg',
      //     tool: '123',
      //   }
      // ],
      coverUpload: false,
      imgDataUrl: '',
      editMode: false,
    }
  },
  computed: {
    categoryHandler: {
      get() {
        console.log(this.categoryVm)
        return this.categoryVm
      },
      set(newVal) {
        this.categoryVm = newVal
        this.articleVm.articlecategory = newVal.Id
      }
    },
  },
  watch: {
    // 封面圖片上傳後加入檔名
    coverImage(newVal) {
      if (newVal) {
        // this.articleVm.firstPhoto = newVal.name
        this.sendImage(newVal.name)
      }
    },
  },
  mounted() {
    getInterestList().then(res => {
      this.category = res.data
    })
    this.articleVm.memberUserName = this.$store.state.userInfo.Username
  },
  methods: {
    coverHandler(file) {
      console.log(file)
      this.coverImage = file
    },
    // 上傳圖片
    sendImage(name) {
      const data = new FormData()
      data.append('photo', this.coverImage.file)
      uploadImage(data).then(res => {
        console.log(res)
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
    titleError(target) {
      const hasError = this.errors.findIndex(err => err === target.name)
      if (target.error) {
        console.log(hasError)
        if (hasError === -1) this.errors.push(target.name)
        return ''
      } else {
        if (hasError !== -1) this.errors.splice(hasError, 1)
        return target.value
      }
    },

    // 切切敘述字數計算
    artInfoCountHandler: _.throttle(function debounceProcess(value) {
      console.log(value)
      this.artInfoCount = value
    }, 500),
    // 補充事項字數計算
    finalCountHandler: _.throttle(function debounceProcess(value) {
      console.log(value)
      this.finalCount = value
    }, 500),
    // 新增預備工具欄位
    addTool() {
      this.tools.push({
        uuid: uuidv4(),
        toolImage: '',
        tool: '',
      })
    },
    // 新增切切欄位
    addKiru() {
      this.articleVm.mArrayList.push({
        uuid: uuidv4(),
        mId: null,
        thirdPhoto: '',
        main: '',
      })
    },
    addMission() {
      this.articleVm.fMissionList.push({
        uuid: uuidv4(),
        mId: null,
        auxiliary: '',
        auxiliarymain: '',
      })
    },
    removeTool(id) {
      console.log(id)
      const removeIndex = this.tools.findIndex(tool => tool.uuid === id)
      this.tools.splice(removeIndex, 1)
    },
    removeKiru(id) {
      console.log(id)
      const removeIndex = this.articleVm.mArrayList.findIndex(m => m.uuid === id)
      this.articleVm.mArrayList.splice(removeIndex, 1)
    },
    removeMission(id) {
      console.log(id)
      const removeIndex = this.articleVm.fMissionList.findIndex(m => m.uuid === id)
      this.articleVm.fMissionList.splice(removeIndex, 1)
    },
    toolHandler(value) {
      console.log(value)
    },
    // 初始化資料
    initData(target) {
        this.$data[target] = this.$options.data()[target];
    },
  }
}
</script>