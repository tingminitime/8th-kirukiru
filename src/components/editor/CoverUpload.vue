<template>
  <div>
    <!-- 圖片 Input -->
    <div class="hidden">
      <FileUpload
        ref="upload"
        v-model="files"
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        :name="name"
        :drop="true"
        @input-filter="inputFilter"
        @input-file="inputFile"
      >
      </FileUpload>
    </div>
    <!-- 上傳後顯示圖片 -->
    <div
      v-show="!edit && showPreview"
      class="w-full"
    >
      <div
        v-show="files.length !== 0 || (origImage !== '' && origImage !== '.' && editMode)"
        class="group relative"
        :class="`aspect-w-${aspectWidth} aspect-h-${aspectHeight}`"
      >
        <img
          class="object-cover"
          :src="editMode && !userUploadStatus ? `https://kirukiru.rocket-coding.com/Pic/${origImage}` : files[0]?.url"
          alt="show image"
        >
        <button
          type="button"
          class="block absolute w-full h-full font-bold text-white bg-black/20 opacity-0 group-hover:opacity-100 transition-all"
          @click="toggleUploadCover"
        >
          {{ fixText }}
        </button>
      </div>
    </div>
    <!-- 編輯圖片 -->
    <!-- class="mb-4 w-full sm:w-2/3" -->
    <div
      v-show="files.length && edit"
      class="flex fixed top-0 left-0 z-50 flex-col gap-4 justify-center items-center mb-4 w-full h-full"
    >
      <!-- w-full h-full sm:w-[480px] sm:h-[270px] md:w-[640px] md:h-[360px] -->
      <div
        v-if="files.length"
        class="w-[75vw] h-auto sm:w-[480px] sm:h-[270px] md:w-[640px] md:h-[360px]"
      >
        <img
          ref="editImage"
          :src="files[0].url"
          alt="edit cover image"
        >
      </div>
      <!-- 編輯圖片操作按鈕 -->
      <div
        v-show="edit"
        class="flex gap-4"
      >
        <button
          type="button"
          class="hover:text-myBrown button-md myButtonValid"
          @click.prevent="editCancel"
        >
          取消
        </button>
        <button
          type="button"
          class="hover:text-myBrown button-md myButtonValid"
          @click.prevent="editSave"
        >
          確定
        </button>
      </div>
    </div>
    <!-- 尚未上傳圖片顯示 -->
    <div
      v-show="showUploadButton && !edit && files.length === 0 && (origImage === '' || origImage === '.')"
      :class="uploadContainer"
    >
      <div :class="uploadClass">
        <button
          type="button"
          :class="uploadBg"
          class="block w-full h-full bg-myLightBrown bg-center bg-no-repeat rounded-lg border-2 border-myBrown"
          @click="toggleUploadCover"
        >
          <span class="sr-only">上傳圖片</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  name: 'CoverUpload',
  props: {
    name: {
      type: String,
      default: 'name',
    },
    fixText: {
      type: String,
      default: '修改圖片'
    },
    // 第一次上傳圖片的背景圖
    uploadBg: {
      type: String,
      default: 'bg-upload-image',
    },
    // 上傳圖片的容器 Class
    uploadContainer: {
      type: String,
      default: 'w-full',
    },
    origImage: {
      type: String,
      default: '',
    },
    aspectWidth: {
      type: [String, Number],
      default: 16,
    },
    aspectHeight: {
      type: [String, Number],
      default: 9,
    },
    uploadClass: {
      type: String,
      default: 'aspect-w-16 aspect-h-9'
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    showPreview: {
      type: Boolean,
      default: true,
    },
    showUploadButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['file-change', 'file-confirm', 'file-cancel'],
  data() {
    return {
      files: [],
      fileName: '',
      edit: false,
      cropper: false,
      userUploadStatus: false,
    }
  },
  watch: {
    edit(status) {
      if (status) {
        this.$store.commit('SET_MASK', {
          allowDrop: false,
          isShow: true,
        })
        this.$nextTick(function () {
          if (!this.$refs.editImage) return
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: Number(this.aspectWidth) / Number(this.aspectHeight),
            initialAspectRatio: Number(this.aspectWidth) / Number(this.aspectHeight),
            viewMode: 0,
          })
          this.cropper = cropper
        })
      } else {
        this.$store.commit('CLOSE_MASK')
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    },
  },
  methods: {
    toggleUploadCover() {
      this.$refs.upload.$refs.input.click()
    },
    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      })
      this.$emit('file-confirm')
    },
    editCancel() {
      this.$refs.upload.clear()
      this.$emit('file-cancel')
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.$notify({
            group: 'error',
            title: '圖片上傳失敗 !',
            text: '檔案格式錯誤',
          })
          return prevent()
        }
      }
      if (newFile.size > 1024 * 1024 * 3) {
        this.$notify({
          group: 'error',
          title: '檔案大小超過限制 !',
          text: '檔案大小超過 3 MB，請重新上傳',
        })
        return prevent()
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
        this.userUploadStatus = true
        this.$emit('file-change', newFile)
      }
    },
  },
}
</script>