<template>
  <!-- 留言 -->
  <ul>
    <li
      v-for="reply in replies"
      :key="reply.messageId"
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
                v-src="`https://kirukiru.rocket-coding.com/Pic/${reply.messageMemberPic}`"
                class="object-cover w-full h-full scale-[102%] load"
                alt=""
              >
            </a>
            <div class="flex flex-col">
              <p class="font-medium">
                {{ reply.messageMember }} 的留言 :
              </p>
              <p class="text-justify text-gray-900">
                {{ reply.messageMain }}
              </p>
            </div>
          </div>
          <!-- 留言時間及功能 -->
          <div class="flex gap-3 justify-end items-center md:flex-col md:gap-1 md:justify-start md:items-end">
            <p
              v-timeformat="{
                time: reply.messageInitDate,
                format: 'YYYY/MM/DD HH:mm'
              }"
              class="order-2 px-1 text-black/60 md:order-1"
            ></p>
            <div class="flex order-1 md:order-2">
              <button
                v-if="1"
                type="button"
                class="group block px-1 text-sm font-medium text-black/60 hover:text-black/80"
              >
                <span class="inline-block px-0.5 text-lg align-middle opacity-0 group-hover:opacity-100 transition-all material-icons">edit</span>
                <span class="inline-block align-middle">編輯</span>
              </button>
              <button
                type="button"
                class="group flex justify-center items-center px-1 text-sm font-medium text-black/60 hover:text-black/80"
                @click="toggleInnerReply(reply.messageId)"
              >
                <span class="inline-block text-xl font-bold align-middle opacity-0 group-hover:opacity-100 transition-all material-icons">turn_left</span>
                <span class="inline-block align-middle">回覆</span>
              </button>
            </div>
          </div>
        </div>
        <!-- 回覆留言功能 -->
        <div
          v-show="replyInner === reply.messageId"
          class="grid grid-cols-4 gap-4 mb-4 md:pl-16"
        >
          <div class="relative col-span-3">
            <textarea
              rows="2"
              class="block py-2 px-3 w-full text-black/80 bg-white/0 rounded outline-1 focus:outline-2 outline-myBrown/20 focus:outline-myYellow outline resize-none"
            ></textarea>
            <button
              type="button"
              class="absolute top-0 right-0 opacity-0 hover:opacity-100 translate-x-full -translate-y-1/2"
              @click="toggleInnerReply(reply.messageId)"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="flex justify-center items-center md:justify-start">
            <button
              type="button"
              class="py-1 px-4 text-sm text-black/60 hover:text-black hover:bg-myYellow/20 transition-all"
            >
              <span>送出</span>
            </button>
          </div>
        </div>
        <!-- 回覆留言資訊 -->
        <ul
          v-show="reply.reMessageArrayList?.length !== 0"
          class="mb-4 md:pl-16"
        >
          <li
            v-for="innerReply in reply.reMessageData"
            :key="innerReply.reMessageId"
            class="flex mb-4"
          >
            <div class="flex flex-col w-full md:grid md:grow md:shrink md:grid-cols-4 md:gap-4 md:p-4 md:w-auto md:bg-myYellow/20">
              <div class="flex gap-3 items-start p-4 bg-myYellow/20 md:col-span-3 md:p-0 md:bg-myYellow/0 md:border-none">
                <div class="flex flex-col gap-1">
                  <p class="">
                    <span class="mr-1 text-sm font-bold text-black/60">作者</span> XXX 的回覆 :
                  </p>
                  <p class="text-justify text-gray-900">
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
                  class="order-2 px-1 text-black/60 md:order-1"
                ></p>
                <div class="flex order-1 md:order-2">
                  <button
                    v-if="1"
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
  </ul>
</template>

<script>
import KiruReply from '@/components/article/kiru/KiruReply.vue'

export default {
  name: 'KiryReply',
  props: {
    replies: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      replyInner: null,
    }
  },
  methods: {
    toggleInnerReply(messageId) {
      if (this.replyInner === messageId) {
        this.replyInner = null
        return
      }
      this.replyInner = messageId
    }
  },
}
</script>