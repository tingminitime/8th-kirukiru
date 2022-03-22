<template>
  <TransitionRoot
    appear
    :show="showAlert"
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
              class="inline-block overflow-hidden z-50 my-8 w-full text-left align-middle bg-white rounded-2xl shadow-xl transition-all md:max-w-sm"
            >
              <DialogTitle
                as="h2"
                class="relative py-4 text-center bg-myBrown"
              >
                <span
                  v-show="showTitle"
                  class="text-2xl font-bold leading-6 text-myYellow md:text-3xl"
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
              <div class="flex flex-col ">
                <div>
                  <span>切切已發布 !</span>
                </div>
                <div>
                  <button
                    type="button"
                    class="button-xl myButtonValid myButtonValidHover"
                    @click="goEdit('EditNormal')"
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
  name: 'AlertModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogTitle,
  },
  props: {
    showAlert: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: '',
    }
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
    goEdit(pageName) {
      this.closeModal()
      this.$router.push({ name: pageName })
    },
  }
}
</script>