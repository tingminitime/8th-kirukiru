<template>
  <div class="mb-4 max-w-[640px]">
    <!-- 圖片 Input -->
    <div class="hidden">
      <FileUpload
        ref="upload"
        v-model="files"
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        name="cover"
        :drop="true"
        @input-filter="coverFilter"
        @input-file="coverFile"
      >
      </FileUpload>
    </div>
    <!-- 上傳後顯示圖片 -->
    <div
      v-show="!edit"
      class="mb-4 w-full sm:w-2/3"
    >
      <div
        v-show="files.length !== 0"
        class="group relative border-2 aspect-w-16 aspect-h-9 border-myBrown"
      >
        <img
          :src="files[0]?.url"
          alt=""
        >
        <button
          type="button"
          class="block absolute w-full h-full font-bold text-white bg-black/20 opacity-0 group-hover:opacity-100 transition-all"
          @click="toggleUploadCover"
        >
          修改封面照片
        </button>
      </div>
    </div>
    <!-- 上傳後顯示操作 -->

    <!-- 編輯圖片 -->
    <div
      v-show="files.length && edit"
      class="mb-4 w-full sm:w-2/3"
    >
      <div
        v-if="files.length"
        class="w-full h-full sm:w-[480px] sm:h-[270px] md:w-[640px] md:h-[360px]"
      >
        <img
          ref="editImage"
          :src="files[0].url"
          alt="edit cover image"
        >
      </div>
    </div>
    <!-- 編輯圖片操作按鈕 -->
    <div
      v-show="edit"
      class="flex gap-4"
    >
      <button
        type="button"
        class="button-md myButtonValid myButtonValidHover"
        @click.prevent="$refs.upload.clear"
      >
        取消
      </button>
      <button
        type="button"
        class="button-md myButtonValid myButtonValidHover"
        @click.prevent="editSave"
      >
        確定
      </button>
    </div>
    <div
      v-show="!edit && files.length === 0"
      class="mb-4 w-full sm:w-2/3"
    >
      <div class="aspect-w-16 aspect-h-9">
        <button
          type="button"
          class="block w-full h-full bg-center bg-no-repeat rounded-lg border-2 bg-myLightBrown bg-upload-cover border-myBrown"
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
  emits: ['file-change'],
  data() {
    return {
      files: [],
      fileName: '',
      edit: false,
      cropper: false,
    }
  },
  watch: {
    edit(status) {
      if (status) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) return
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 16 / 9,
            initialAspectRatio: 16 / 9,
            viewMode: 0,
          })
          this.cropper = cropper
        })
      } else {
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
    },
    coverFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    coverFilter(newFile, oldFile, prevent) {
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
        this.$emit('file-change', this.files[0])
      }
    },
  },
}
</script>