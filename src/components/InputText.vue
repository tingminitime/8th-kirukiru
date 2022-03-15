<template>
  <div
    class="relative"
    :class="$attrs.class"
  >
    <input
      :id="$attrs.id"
      :name="$attrs.name"
      type="text"
      class="peer w-full h-10 text-lg tracking-wide text-gray-900 placeholder:text-transparent border-b-2 border-myBrown focus:border-myYellow focus:outline-none placeholder:select-none"
      :placeholder="$attrs.placeholder"
    >
    <label
      :for="$attrs.id"
      class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm font-bold text-myBrown peer-placeholder-shown:text-myBrown/50 peer-focus:text-myBrown transition-all"
    >{{ $attrs.placeholder }}</label>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  inheritAttrs: false,
  props: {}
}
</script>