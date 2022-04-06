<template>
  <div class="w-full">
    <h2 class="mb-8 text-2xl font-bold text-myBrown">
      我的主頁
    </h2>
    <!-- 我的大頭貼 -->
    <div class="flex justify-between items-center border-b border-myBrown">
      <div class="flex grow items-center py-4 text-myBrown">
        <div class="w-1/4 font-bold">
          大頭貼
        </div>
        <!-- 顯示大頭貼 -->
        <div>
          <CoverUpload
            ref="avatarUploader"
            name="avatar"
            class="overflow-hidden w-[64px] rounded-full"
            fix-text="修改"
            upload-bg="bg-upload-cover"
            :orig-image="userInfo.Userpic"
            :edit-mode="true"
            :aspect-width="1"
            :aspect-height="1"
            :show-upload-button="false"
            @file-change="avatarChange"
            @file-confirm="avatarConfirm"
            @file-cancel="avatarCancel"
          ></CoverUpload>
        </div>
      </div>
      <!-- 上傳 -->
      <div class="text-center">
        <button
          type="button"
          class="userPageButton"
          @click="toggleUploadCover"
        >
          上傳
        </button>
      </div>
    </div>
    <!-- 變更暱稱 -->
    <div class="py-12 border-b border-myBrown">
      <div class="mb-5 w-1/4 font-bold text-myBrown">
        變更暱稱
      </div>
      <div class="flex flex-col gap-6">
        <!-- E-mail -->
        <div class="flex items-center text-myBrown">
          <div class="w-1/4">
            目前暱稱
          </div>
          <div>
            <span class="font-semibold">{{ userInfo.Name }}</span>
          </div>
        </div>
        <v-form
          v-show="isShowNameInput"
          :validation-schema="nameSchema"
          @submit="onNameSubmit"
          @invalid-submit="onNameInvalidSubmit"
        >
          <!-- 輸入暱稱 -->
          <div class="flex gap-3 text-myBrown">
            <FormInputText
              name="user-new-name"
              type="text"
              label="輸入暱稱"
              placeholder="輸入暱稱"
              class="w-full"
              success-message=""
              input-border="focus:ring-2 focus:ring-myYellow"
            ></FormInputText>
            <div class="text-center">
              <button
                type="submit"
                class="userPageButton"
              >
                確認更改
              </button>
            </div>
          </div>
        </v-form>
        <div class="text-center">
          <button
            type="submit"
            class="userPageButton"
            @click="toggleChangeName"
          >
            更改暱稱
          </button>
        </div>
      </div>
    </div>
    <!-- 個人主頁敘述 -->
    <div class="py-12">
      <div class="mb-5 w-1/4 font-bold text-myBrown">
        個人主頁敘述
      </div>
      <div>
        <DynamicTextarea
          v-model="userIntroduction"
          class=""
          name="user-introduction"
        ></DynamicTextarea>
        <span class="text-sm text-red-500">{{ introError }}</span>
        <div class="text-right">
          <button
            type="button"
            class="userPageButton"
            :disabled="introError"
            @click="onChangeIntro"
          >
            更改敘述
          </button>
        </div>
      </div>
    </div>
    <AlertModal
      v-bind="alertInfo"
      @alert-confirm="changeIntroHandler"
    ></AlertModal>
  </div>
</template>

<script>
import CoverUpload from '@/components/editor/CoverUpload.vue'
import DynamicTextarea from '@/components/utils/DynamicTextarea.vue'
import AlertModal from '@/components/utils/AlertModal.vue'
import { mapState } from 'vuex'
import { useField } from 'vee-validate'
import * as Yup from 'yup'
import {
  uploadImage,
  userChangeAvatar,
  userChangeName,
  userChangeIntroduction,
} from '@api'

export default {
  name: 'UserProfile',
  components: {
    CoverUpload,
    DynamicTextarea,
    AlertModal,
  },
  emits: ['get-info'],
  data() {
    const nameSchema = Yup.object().shape({
      'user-new-name': Yup.string().required(),
    })

    const { value:introValue, errorMessage:introError } = useField('user-introduction', Yup.string().nullable().max(300))

    return {
      nameSchema,
      avatarImage: null,
      isShowNameInput: false,
      userIntroduction: introValue,
      introError,
      alertInfo: null,
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  mounted() {
    this.userIntroduction = this.userInfo.Introduction
  },
  methods: {
    toggleUploadCover() {
      console.log(this.$refs)
      this.$refs.avatarUploader.$refs.upload.$refs.input.click()
    },
    // 大頭貼選擇後
    avatarChange(file) {
      this.avatarImage = file
    },
    avatarConfirm() {
      this.sendAvatar(this.avatarImage.name)
    },
    avatarCancel() {
      this.avatarImage = null
      // this.articleVm.firstPhoto = ''
    },
    // 上傳大頭貼、取得新大頭貼
    async sendAvatar(name) {
      const data = new FormData()
      data.append('photo', this.avatarImage.file)
      let newAvatarName = ''

      // 上傳圖片
      await uploadImage(data).then(res => {
        console.log('上傳圖片: ', res)
        if (res.data.success) {
          newAvatarName = res.data.picname
        } else {
          this.$notify({
            group: 'error',
            title: '上傳圖片失敗 !',
          })
          this.articleVm.firstPhoto = name
        }
      }).catch(error => console.log(error))

      await userChangeAvatar(newAvatarName).then(res => {
        console.log('更改會員大頭貼檔案名稱: ', res)
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '大頭貼修改成功'
          })
        }
      }).catch(error => console.error(error))

      this.$emit('get-info')
    },
    // 開關變更暱稱輸入欄位
    toggleChangeName() {
      this.isShowNameInput = !this.isShowNameInput
    },
    // 變更暱稱送出
    onNameSubmit(values) {
      // console.log(JSON.stringify(values, null, 2))
      userChangeName(values['user-new-name']).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '暱稱更新成功'
          })
          this.$emit('get-info')
          this.toggleChangeName()
        } else {
          this.$notify({
            group: 'error',
            title: res.data.message
          })
        }
      }).catch(error => console.error(error))
    },
    // 變更Email表單驗證失敗
    onNameInvalidSubmit(val) {
      console.log(val)
    },
    // 更改敘述
    onChangeIntro() {
      if (this.introError) return
      this.alertInfo = {
        message: '是否確定更改敘述 ?',
        confirmMode: 'nothing',
        messageClass: 'text-lg font-bold text-myBrown md:text-xl',
      }
      this.$store.commit('SHOW_ALERT')
    },
    changeIntroHandler() {
      userChangeIntroduction(this.userIntroduction).then(res => {
        if (res.data.success) {
          this.$notify({
            group: 'success',
            title: '敘述更新成功'
          })
          this.$emit('get-info')
        } else {
          this.$notify({
            group: 'error',
            title: res.data.message
          })
        }
      }).catch(error => console.error(error))
    },
  },
}
</script>