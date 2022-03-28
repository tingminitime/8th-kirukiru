<template>
  <TransitionRoot
    appear
    :show="showSearch"
    as="template"
  >
    <Dialog
      as="div"
      @close="closeModal"
    >
      <div class="overflow-y-auto fixed inset-0 z-50">
        <div class="px-4 min-h-screen text-center">
          <span
            class="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block overflow-hidden z-50 my-8 w-[75vw] text-left align-middle bg-white rounded-b-2xl ring-2 ring-myBrown shadow-xl transition-all sm:w-[60vw] md:max-w-sm"
            >
              <DialogTitle
                as="h2"
                class="relative py-4 text-center bg-myYellow border-b-2 border-myBrown"
              >
                <span
                  v-show="showTitle"
                  class="text-2xl font-bold leading-6 text-myBrown md:text-3xl"
                >{{ titleText }}</span>
                <button
                  v-if="showClose"
                  type="button"
                  class="group absolute top-1/2 right-4 p-4 -translate-y-1/2"
                  @click="closeModal"
                >
                  <span class="transition-all md:group-hover:scale-125 material-icons">close</span>
                </button>
              </DialogTitle>
              <!-- alert 內容 -->
              <div class="flex flex-col gap-3 items-center py-6 md:py-8">
                <div class="py-4">
                </div>
                <div class="flex flex-col gap-3 justify-evenly items-center">
                  <!-- 確認按鈕 -->
                  <button
                    type="button"
                    class="text-myBrown rounded-lg button-md myButtonValid myButtonValidHover"
                    @click="searchHandler"
                  >
                    <span class="font-bold">搜尋</span>
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
} from '@headlessui/vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SearchModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogTitle,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState([
      'showSearch',
    ]),
  },
  watch: {
    showSearch(show) {
      if (show) {
        // this.SET_MASK({ allowDrop: false, isShow: true })
      } else {
        // this.CLOSE_MASK()
      }
    },
  },
  methods: {
    ...mapMutations([
      'SET_MASK',
      'CLOSE_MASK',
      'SHOW_SEARCH',
      'CLOSE_SEARCH',
    ]),
    closeModal() {
      this.CLOSE_MASK()
    },
    searchHandler() {
      
    },
  }
}
</script>