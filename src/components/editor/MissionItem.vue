<template>
  <div class="flex flex-col gap-4 items-center mb-8 md:flex-row md:justify-between">
    <div class="flex flex-col gap-1 w-full sm:w-72 md:-translate-y-3">
      <span class="inline-block font-bold text-center text-myBrown align-middle md:text-left">任務標題</span>
      <input
        type="text"
        placeholder="請輸入任務標題"
        class="w-full placeholder:text-gray-400 bg-transparent rounded-lg border-2 border-myBrown form-input"
        :value="title"
        @input="titleHandler"
      >
    </div>
    <div class="flex flex-col flex-1 gap-1 w-full sm:w-72 md:-translate-y-3">
      <div class="text-center translate-x-4 md:text-left md:translate-x-0">
        <span class="inline-block font-bold text-center text-myBrown align-middle md:text-left">任務連結</span>
        <span class="inline-block ml-2 text-myBrown align-middle material-icons">link</span>
      </div>
      <input
        type="text"
        placeholder="請貼上任務連結"
        class="w-full placeholder:text-gray-400 bg-transparent rounded-lg border-2 border-myBrown form-input"
        :value="link"
        @input="linkHandler"
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
export default {
  name: 'MissionItem',
  props: {
    uuid: {
      type: String,
      required: true,
    },
    origAuxiliary: {
      type: String,
      default: '',
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove-item', 'update:title', 'update:link'],
  data() {
    return {
      title: '',
      link: '',
    }
  },
  methods: {
    removeItem() {
      this.$emit('remove-item', this.uuid)
    },
    titleHandler(e) {
      this.title = e.target.value
      this.$emit('update:title', e.target.value)
    },
    linkHandler(e) {
      this.link = e.target.value
      this.$emit('update:link', e.target.value)
    }
  },
}
</script>