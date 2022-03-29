<template>
  <div class="flex flex-col gap-3 items-center mb-8 md:flex-row md:gap-0 md:justify-between">
    <!-- 上傳圖片 -->
    <CoverUpload
      name="tool"
      class="w-full sm:w-[256px]"
      upload-bg="bg-upload-image"
      upload-container="w-full"
      :orig-image="secPhoto === '.' ? '' : secPhoto"
      :edit-mode="editMode"
      @file-change="imageChange"
      @file-confirm="imageConfirm"
      @file-cancel="imageCancel"
    ></CoverUpload>
    <!-- 工具內容 -->
    <div class="flex flex-col gap-1 w-full sm:w-72 md:-translate-y-3">
      <span class="inline-block font-bold text-center text-myBrown align-middle md:text-left">工具</span>
      <input
        :value="mission"
        type="text"
        placeholder="請輸入工具內容"
        class=" p-2 w-full bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:outline-none sm:py-1"
        @input="$emit('update:tool', $event.target.value)"
      >
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
import { uploadImage } from '@api'

export default {
  name: 'PrepareTool',
  components: {
    CoverUpload,
  },
  props: {
    uuid: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      default: '',
    },
    secPhoto: {
      type: String,
      default: '',
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:tool', 'remove-item', 'tool-img-upload'],
  data() {
    return {
      image: null,
    }
  },
  watch: {
    // image(newVal) {
    //   if (newVal) {
    //     // this.$emit('tool-img-upload', newVal.name)
    //     this.sendImage(newVal.name)
    //   }
    // },
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
        console.log('上傳預備工具圖片: ', res)
        if (res.data.success) {
          this.$emit('tool-img-upload', res.data.picname)
        } else {
          this.$notify({
            group: 'error',
            title: '上傳圖片失敗 !',
          })
          this.$emit('tool-img-upload', name)
        }
        this.image = null
      })
      .catch(error => console.log(error))
    },
  },
}
</script>