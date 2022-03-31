<template>
  <!-- 留言 -->
  <Transition
    appear
    mode="out-in"
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-y-48"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-48"
  >
    <li
      class="flex before:absolute relative before:top-0 before:left-0 justify-between p-6 mb-6 before:w-2 before:h-full before:bg-myYellow/40 before:opacity-0 hover:before:opacity-100 before:transition-all"
    >
      <!-- 留言及回覆區塊 -->
      <div class="flex flex-col grow shrink">
        <!-- 留言者區塊 -->
        <div class="flex flex-col mb-4 md:grid md:grid-cols-4 md:gap-4">
          <!-- 留言者資訊及內容 -->
          <div class="flex col-span-3 gap-3 items-start">
            <a
              href="javascript:;"
              class="block overflow-hidden shrink-0 w-16 h-16 rounded-full select-none"
            >
              <img
                v-src="`https://kirukiru.rocket-coding.com/Pic/${messageMemberPic}`"
                class="object-cover w-full h-full scale-[102%] load"
                alt=""
              >
            </a>
            <div class="flex flex-col">
              <p class="font-medium">
                {{ messageMember }} 的留言 :
              </p>
              <p
                class="text-justify text-gray-900 whitespace-pre-wrap"
              >
                {{ messageMain }}
              </p>
            </div>
          </div>
          <!-- 留言時間及功能 -->
          <div class="flex gap-3 justify-end items-center md:flex-col md:gap-1 md:justify-start md:items-end">
            <p
              v-timeformat="{
                time: messageInitDate,
                format: 'YYYY/MM/DD HH:mm'
              }"
              class="order-2 px-1 text-sm text-black/60 md:order-1"
            ></p>
            <div class="flex order-1 md:order-2">
              <button
                v-if="messageUserName === userInfo.Username"
                type="button"
                class="group block px-1 text-sm font-medium text-black/60 hover:text-black/80"
              >
                <span class="inline-block px-0.5 text-lg align-middle opacity-0 group-hover:opacity-100 transition-all material-icons">edit</span>
                <span class="inline-block align-middle">編輯</span>
              </button>
              <button
                v-if="articleUsername === userInfo.Username"
                type="button"
                class="group flex justify-center items-center px-1 text-sm font-medium text-black/60 hover:text-black/80"
                @click="toggleInnerReply(messageId)"
              >
                <span class="inline-block text-xl font-bold align-middle opacity-0 group-hover:opacity-100 transition-all material-icons">turn_left</span>
                <span class="inline-block align-middle">回覆</span>
              </button>
            </div>
          </div>
        </div>
        <!-- 回覆留言功能 -->
        <transition
          appear
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform opacity-0 translate-x-48"
          enter-to-class="transform opacity-100 translate-x-0"
        >
          <div
            v-if="replyInner === messageId"
            class="grid grid-cols-4 gap-4 mb-4 md:pl-16"
          >
            <div class="relative col-span-3">
              <DynamicTextarea
                v-model.trim="replyInnerVm"
                :set-focus="true"
                class="h-full"
                @enter-exact="replyInnerHandler(messageId)"
              >
              </DynamicTextarea>
              <button
                type="button"
                class="absolute top-0 right-0 opacity-0 hover:opacity-100 translate-x-full -translate-y-1/2"
                @click="toggleInnerReply(messageId)"
              >
                <span class="material-icons">close</span>
              </button>
            </div>
            <div class="flex justify-center items-center md:justify-start">
              <button
                type="button"
                class="py-1 px-4 text-sm text-black/60 hover:text-black hover:bg-myYellow/20 transition-all"
                @click="replyInnerHandler(messageId)"
              >
                <span>送出</span>
              </button>
            </div>
          </div>
        </transition>
        <!-- 回覆留言資訊 -->
        <ul
          v-if="reMessageData?.length !== 0"
          class="mb-4 md:pl-16"
        >
          <li
            v-for="innerReply in reMessageData"
            :key="innerReply.reMessageId"
            class="flex mb-4"
          >
            <div class="flex flex-col w-full md:grid md:grow md:shrink md:grid-cols-4 md:gap-4 md:p-4 md:w-auto md:bg-myYellow/20">
              <div class="flex gap-3 items-start p-4 bg-myYellow/20 md:col-span-3 md:p-0 md:bg-myYellow/0 md:border-none">
                <div class="flex flex-col gap-1">
                  <p class="">
                    <span class="mr-1 text-sm font-bold text-black/60">作者 </span>
                    <span class="text-myOrange">{{ innerReply.author }}</span>
                    <span class="text-sm font-bold text-black/60"> 的回覆 :</span>
                  </p>
                  <p class="text-justify text-gray-900 whitespace-pre-wrap">
                    {{ innerReply.reMessageMain }}
                  </p>
                </div>
              </div>
              <div class="flex gap-1 justify-end items-center md:flex-col md:justify-start md:items-end">
                <p
                  v-timeformat="{
                    time: innerReply.reMessageInitDate,
                    format: 'YYYY/MM/DD HH:mm'
                  }"
                  class="order-2 px-1 text-sm text-black/60 md:order-1"
                ></p>
                <div class="flex order-1 md:order-2">
                  <button
                    v-if="articleUsername === userInfo.Username"
                    type="button"
                    class="group block px-1 text-sm font-medium text-black/60 hover:text-black/80"
                  >
                    <span class="inline-block px-0.5 text-lg align-middle opacity-0 group-hover:opacity-100 transition-all material-icons">edit</span>
                    <span class="inline-block align-middle">編輯</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </Transition>
</template>

<script>
import _ from 'lodash'
import DynamicTextarea from '@/components/utils/DynamicTextarea.vue'
import { addKiruReMessage } from '@api'
import { mapState } from 'vuex'

export default {
  name: 'KiryReply',
  components: {
    DynamicTextarea,
  },
  props: {
    messageId: {
      type: Number,
      default: null,
    },
    messageInitDate: {
      type: String,
      default: '',
    },
    messageMain: {
      type: String,
      default: '',
    },
    messageMember: {
      type: String,
      default: '',
    },
    messageMemberPic: {
      type: String,
      default: '',
    },
    reMessageData: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    messageUserName: {
      type: String,
      default: '',
    },
    articleUsername: {
      type: String,
      default: '',
    },
  },
  emits: ['update-reply', 'reply-inner'],
  data() {
    return {
      replyInner: null,
      replyInnerVm: '',
      inputHeight: '0',
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  methods: {
    toggleInnerReply(messageId) {
      if (this.replyInner === messageId) {
        this.replyInner = null
        this.replyInnerVm = ''
        return
      }
      this.replyInner = messageId
    },
    replyInnerHandler(messageId) {
      const params = {
        messageId,
        main: this.replyInnerVm,
      }
      console.log(params)
      this.$emit('reply-inner', params)
      // addKiruReMessage(params).then(res => {
      //   console.log('addKiruReMessage: ', res)
      //   this.$emit('update-reply', messageId)
      // }).catch(error => {
      //   console.error(error)
      // })
      this.toggleInnerReply(messageId)
    },
    resize: _.throttle(function throttleResize() {
      this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
    }, 100),
  },
}
</script>