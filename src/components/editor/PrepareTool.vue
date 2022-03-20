<template>
  <div class="flex flex-col mb-8 md:flex-row md:justify-between md:items-center">
    <!-- 上傳圖片 -->
    <div class="">
      <input
        ref="coverImg"
        type="file"
        name="coverImg"
        accept="image/png, image/jpg, image/jpeg"
        class="hidden"
        @change="coverImgChange($event)"
      >
      <div class="mx-auto mb-4 w-full sm:w-[256px]">
        <div class="aspect-w-16 aspect-h-9">
          <button
            type="button"
            class="block w-full h-full bg-myLightBrown bg-center bg-no-repeat bg-[length:40%_40%] bg-upload-image rounded-lg border-2 border-myBrown"
            @click="$refs.coverImg.click()"
          >
            <span class="sr-only">上傳圖片</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 工具內容 -->
    <div class="flex flex-col gap-6 justify-center items-center sm:flex-row sm:gap-8 md:gap-4 md:-translate-y-2">
      <div class="flex flex-col gap-1 w-full sm:w-60">
        <span class="inline-block font-bold text-myBrown align-middle">工具</span>
        <input
          :value="tool"
          type="text"
          class=" p-2 w-full bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:outline-none sm:py-1"
          @input="$emit('update:tool', $event.target.value)"
        >
      </div>
      <div class="flex flex-col gap-1 w-full sm:w-36">
        <span class="inline-block font-bold text-myBrown align-middle">數量+單位</span>
        <input
          :value="count"
          type="text"
          class="p-2 w-full bg-transparent rounded-lg border-2 border-myBrown focus:border-myYellow focus:outline-none sm:py-1"
          @input="$emit('update:count', $event.target.value)"
        >
      </div>
    </div>
    <!-- 移除欄位 -->
    <div class="flex justify-center py-4 w-full sm:w-auto md:bg-transparent">
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
  name: 'PrepareTool',
  props: {
    uuid: {
      type: String,
      required: true,
    },
    toolImage: {
      type: String,
      default: '',
    },
    tool: {
      type: String,
      default: '',
    },
    count: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ['update:tool', 'update:count', 'remove-item'],
  methods: {
    removeItem() {
      this.$emit('remove-item', this.uuid)
    },
  },
}
</script>