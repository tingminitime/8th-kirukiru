<template>
  <div>
    <textarea
      v-focus="setFocus"
      :name="name"
      :value="modelValue"
      :style="inputStyle"
      :class="customizeClass"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter.exact="enterHandler"
    ></textarea>
    <textarea
      ref="shadow"
      :value="modelValue"
      class="m-0 max-h-0 opacity-0 pointer-events-none"
      tabindex="0"
    ></textarea>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DynamicTextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    setFocus: {
      type: Boolean,
      default: false,
    },
    customizeClass: {
      type: String,
      default: 'block py-2 px-3 w-full h-full leading-5 text-black/80 bg-white/0 rounded outline-1 focus:outline-2 outline-myBrown/20 focus:outline-myYellow outline transition-all resize-none',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'dynamic-textarea'
    },
  },
  emits: ['update:modelValue', 'enter-exact'],
  data() {
    return {
      currentValue: '',
      inputHeight: '0',
    }
  },
  computed: {
    inputStyle() {
      return {
        'min-height': this.inputHeight,
      }
    }
  },
  watch: {
    modelValue() {
      this.resize()
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize: _.throttle(function throttleResize() {
      this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
    }, 100),
    enterHandler() {
      this.$emit('enter-exact')
    },
  },
}
</script>