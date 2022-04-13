<template>
  <div class="flex flex-col gap-3 items-center mb-12 md:flex-row md:gap-0 md:justify-between">
    <!-- 上傳圖片 -->
    <CoverUpload
      name="kiru"
      class="w-full sm:w-[256px]"
      upload-bg="bg-upload-image"
      upload-container="w-full"
      :orig-image="origImage"
      :aspect-width="1"
      :aspect-height="1"
      upload-class="aspect-w-1 aspect-h-1"
      :edit-mode="editMode"
      @file-change="imageChange"
      @file-confirm="imageConfirm"
      @file-cancel="imageCancel"
    ></CoverUpload>
    <!-- 切切內容 -->
    <div class="relative w-full md:w-1/2">
      <TipTap
        v-model="content"
        placeholder="簡述一下這篇切切的內容吧 _"
        custom-class="min-h-[6rem]"
        word-limit="100"
        @word-count="kiruCountHandler"
      ></TipTap>
      <span class="inline-block absolute right-0 bottom-0 py-0.5 px-1 text-xs text-myBrown rounded translate-y-full">字數 : {{ kiruCount }} ( 上限 100 字元 )</span>
    </div>
    <!-- 移除欄位 -->
    <div class="flex justify-center self-stretch py-4 w-full sm:w-auto md:self-center md:bg-transparent">
      <button
        type="button"
        class="flex gap-3 justify-center p-2 w-2/3 bg-gray-200 hover:bg-gray-300 rounded-lg md:gap-0 md:my-0 md:w-full"
        @click="removeItem"
      >
        <span class="text-myBrown material-icons">delete_sweep</span>
        <span class="text-myBrown md:hidden">移除欄位</span>
      </button>
    </div>
  </div>
</template>

<script>
import CoverUpload from '@/components/editor/CoverUpload.vue'
import TipTap from '@/components/editor/TipTap.vue'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage } from '@api'

export default {
  name: 'KiruItem',
  components: {
    CoverUpload,
    TipTap,
  },
  props: {
    uuid: {
      type: String,
      required: true,
    },
    origImage: {
      type: String,
      default: '',
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    origMain: {
      type: String,
      default: '',
    }
  },
  emits: ['remove-item', 'kiru-img-upload', 'kiru-content'],
  data() {
    return {
      image: null,
      content: '',
      kiruCount: 0,
    }
  },
  watch: {
    content(newVal) {
      if (newVal) {
        this.$emit('kiru-content', newVal)
      }
    },
  },
  mounted() {
    this.content = this.origMain
  },
  methods: {
    removeItem() {
      this.$emit('remove-item', this.uuid)
    },
    imageChange(file) {
      console.log(file)
      this.image = file?.file
    },
    imageConfirm() {
      this.sendImage(this.image.name)
    },
    imageCancel() {
      this.image = null
    },
    sendImage(name) {
      const data = new FormData()
      data.append('photo', this.image)
      uploadImage(data).then(res => {
        console.log('上傳切切圖片: ', res)
        if (res.data.success) {
          this.$emit('kiru-img-upload', res.data.picname)
        } else {
          this.$notify({
            group: 'error',
            title: '上傳圖片失敗 !',
          })
          this.$emit('kiru-img-upload', name)
        }
        this.image = null
      })
      .catch(error => console.log(error))
    },
    // 切切字數
    kiruCountHandler: _.throttle(function debounceProcess(value) {
      this.kiruCount = value
    }, 500),
  },
}
</script>