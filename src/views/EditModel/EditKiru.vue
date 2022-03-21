<template>
  <EditNavbar></EditNavbar>
  <div class="py-11 px-4 mx-auto max-w-[816px] md:px-8">
    <!-- 上傳圖片 -->
    <div>
      <CoverUpload @file-change="coverHandler"></CoverUpload>
      <!-- <input
        ref="coverImg"
        type="file"
        name="coverImg"
        accept="image/png, image/jpg, image/jpeg"
        class="hidden"
        @change="coverImgChange($event)"
      > -->
      <!-- <div class="mb-4 w-full sm:w-2/3">
        <div class="aspect-w-16 aspect-h-9">
          <button
            type="button"
            class="block w-full h-full bg-center bg-no-repeat rounded-lg border-2 bg-myLightBrown bg-upload-cover border-myBrown"
            @click="$refs.coverImg.click()"
          >
            <span class="sr-only">上傳圖片</span>
          </button>
        </div>
      </div> -->
    </div>
    <!-- 切切標題 -->
    <div class="mb-8">
      <h2 class="mb-1 text-lg font-bold md:mb-2 md:text-xl text-myBrown">
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
    <div class="mb-6 md:mb-8 bg-myBrown">
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
        <span class="py-0.5 px-2 text-sm text-white rounded bg-myBrown">字數 : {{ artInfoCount }}</span>
      </div>
      <TipTap
        v-model="articleVm.artInfo"
        placeholder="簡述一下這篇切切的內容吧 _"
        custom-class="min-h-[6rem]"
        word-limit="100"
        @word-count="artInfoCountHandler"
      ></TipTap>
    </div>
    <!-- 預備工具 -->
    <div class="mb-2 md:mb-8 bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        預備工具
      </h2>
    </div>
    <div class="py-2">
      <!-- 說明 -->
      <p class="mb-6 text-sm font-bold text-myBrown">
        會用到的物品、工具、材料、環境...等
      </p>
      <!-- 預備工具欄位 -->
      <PrepareTool
        v-for="content in tools"
        :key="content.uuid"
        v-bind="content"
        @remove-item="removeTool"
        @update:tool="content.tool = $event"
        @update:count="content.count = $event"
      ></PrepareTool>
      <!-- 新增欄位 -->
      <div class="flex justify-center my-4">
        <button
          type="button"
          class="flex before:block relative before:absolute before:top-1 before:left-[65%] justify-center py-2 w-1/2 before:w-6 before:h-6 before:rounded-full before:opacity-0 hover:before:opacity-50 before:transition-all before:-translate-x-1/2 before:bg-myYellow"
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
    <div>
      <div class="flex gap-3 items-center mb-8">
        <h2 class="mb-1 text-2xl font-bold md:mb-2 text-myBrown">
          開始切切
        </h2>
        <span class="text-sm font-bold text-red-400">請至少填寫 1 個切切</span>
      </div>
      <div></div>
    </div>
    <!-- 附屬任務 -->
    <div class="mb-2 md:mb-8 bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        附屬任務
      </h2>
    </div>
    <div>
      <!-- 說明 -->
      <p class="mb-6 text-sm font-bold md:text-base text-myBrown">
        完成這個切切的補充知識與延伸是什麼呢? Ex.閱讀的書、相關的知識、要備妥的文件、要安裝的檔案...
      </p>
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
        送出
      </button>
    </div>
  </div>
</template>

<script>
import CoverUpload from '@/components/editor/CoverUpload.vue'
import _ from 'lodash'
import EditNavbar from '@/components/editor/EditNavbar.vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import FormInputSelect from '@/components/utils/FormInputSelect.vue'
import Input from '@/components/utils/Input.vue'
import TipTap from '@/components/editor/TipTap.vue'
import PrepareTool from '@/components/editor/PrepareTool.vue'
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
  },
  data() {
    return {
      category: [],
      articleVm: {
        title: '',
        isFree: true,
        articlecategory: null,
        artInfo: '',
        artTitlePic: '',
      },
      coverImage: null,
      categoryVm: null,
      artInfoCount: 0,
      errors: [],
      tools: [],
      coverUpload: false,
      imgDataUrl: '',
    }
  },
  computed: {
    categoryHandler: {
      get() {
        console.log('get')
        console.log(this.categoryVm)
        return this.categoryVm
      },
      set(newVal) {
        console.log('set')
        this.categoryVm = newVal
        this.articleVm.articlecategory = newVal.Id
      }
    },
  },
  mounted() {
    getInterestList().then(res => {
      this.category = res.data
    })
  },
  methods: {
    coverHandler(file) {
      console.log(file)
      this.coverImage = file
    },
    sendImage() {
      const data = new FormData()
      data.append('photo', this.coverImage.file)
      console.log(data)
      uploadImage(data).then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
    },
    titleHandler(target) {
      console.log(target)
      const { name, value, error } = target
      this.articleVm.title = this.errorHandler(target)
    },
    artInfoCountHandler: _.throttle(function debounceProcess(value) {
      console.log(value)
      this.artInfoCount = value
    }, 500),
    errorHandler(target) {
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
    addTool() {
      this.tools.push({
        uuid: uuidv4(),
        toolImage: '',
        tool: '',
        count: '0',
      })
    },
    removeTool(id) {
      console.log(id)
      const removeIndex = this.tools.findIndex(tool => tool.uuid === id)
      this.tools.splice(removeIndex, 1)
    },
    toolHandler(value) {
      console.log(value)
    }
  }
}
</script>