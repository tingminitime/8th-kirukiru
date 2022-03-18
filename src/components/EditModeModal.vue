<template>
  <TransitionRoot
    appear
    :show="$store.state.openEditModal"
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
              class="inline-block overflow-hidden z-50 my-8 w-full text-left align-middle bg-white rounded-2xl shadow-xl transition-all md:max-w-3xl"
            >
              <DialogTitle
                as="h2"
                class="relative py-4 text-2xl font-bold leading-6 text-center text-myYellow bg-myBrown md:text-3xl"
              >
                <span>選擇編輯模式</span>
                <button
                  type="button"
                  class="group absolute top-1/2 right-4 p-4 -translate-y-1/2"
                  @click="closeModal"
                >
                  <span class="transition-all md:group-hover:scale-125 material-icons">close</span>
                </button>
              </DialogTitle>
              <div class="grid grid-rows-2 gap-8 py-6 px-4 bg-myGray md:grid-cols-2 md:grid-rows-none md:py-12 md:px-20">
                <div class="flex flex-col justify-between items-center">
                  <div class="w-36 h-36 md:w-[160px] md:h-[160px]">
                    <img
                      src="@img/edit-kiruMode.svg"
                      alt="kiru mode"
                    >
                  </div>
                  <p class="my-6 font-bold text-myBrown">
                    切切獨創的編輯模式，讓你不用再為了編排而煩惱，專注在內容撰寫的好幫手。
                  </p>
                  <button
                    type="button"
                    class="group button-xl myButtonValid myButtonValidHover"
                  >
                    <span>切切模式</span>
                  </button>
                </div>
                <div class="flex flex-col justify-between items-center">
                  <div class="w-36 h-36 md:w-[160px] md:h-[160px]">
                    <img
                      src="@img/edit-normalMode.svg"
                      alt="kiru mode"
                    >
                  </div>
                  <p class="my-6 font-bold text-myBrown">
                    具備常見文字編輯器功能的寫作模式。
                  </p>
                  <button
                    type="button"
                    class="button-xl myButtonValid myButtonValidHover"
                  >
                    <span>一般模式</span>
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

export default {
  name: 'EditModeModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogTitle,
  },
  data() {
    return {
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('CLOSE_MASK')
      this.$store.commit('CLOSE_EDIT_MODAL')
    },
  }
}
</script>