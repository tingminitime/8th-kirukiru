<template>
  <div class="relative">
    <input
      v-model="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      class="w-full placeholder:text-gray-400 bg-transparent rounded-lg border-2 border-myBrown form-input"
      @blur="handleInput"
    >
    <span
      class="inline-block text-sm font-bold text-red-400 whitespace-nowrap"
      :class="errorClass"
    >{{ errorMessage }}</span>
  </div>
</template>

<script>
import { useField } from 'vee-validate'

export default {
  name: 'Input',
  props: {
    defaultValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'name'
    },
    errorClass: {
      type: String,
      default: '-right-2 translate-x-full top-1/2 -translate-y-1/2'
    },
    placeholder: {
      type: String,
      default: '請輸入',
    },
    errorText: {
      type: String,
      default: '必填欄位',
    },
  },
  emits: ['update', 'error'],
  data() {
    const { value, errorMessage } = useField(this.name, value => {
      if (value === '') {
        return `${this.errorText}`
      }
      return true
    })

    return {
      value,
      errorMessage,
    }
  },
  mounted() {
    if (this.defaultValue) {
      this.value = this.defaultValue
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('update', {
        name: this.name,
        value: e.target.value,
        error: this.errorMessage ? true : false,
      })
    }
  },
}
</script>