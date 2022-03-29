<template>
  <button
    type="button"
    :class="buttonClass"
    @click="$emit('add-collection')"
  >
    <span
      v-if="!isCollect"
      class="material-icons-outlined"
      :class="iconClass"
    >bookmark_border</span>
    <span
      v-else
      class="material-icons"
      :class="iconClass"
    >bookmark</span>
  </button>
</template>

<script>
export default {
  name: 'AddCollection',
  props: {
    buttonClass: {
      type: String,
      default: 'block text-myBrown hover:text-myOrange'
    },
    iconClass: {
      type: String,
      default: 'inline-block px-1 text-lg align-middle scale-110'
    },
    isCollect: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['add-collection'],
}
</script>