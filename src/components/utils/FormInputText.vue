<template>
  <div
    class="relative"
    :class="{ 'text-red-500': !!errorMessage }"
  >
    <input
      :id="name"
      v-focus="focus"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="inputValue"
      :class="[{ 'text-red-500': !!errorMessage }, inputBorder]"
      class="peer placeholder-shown:py-2 px-2 pt-8 focus:pt-8 pb-4 focus:pb-4 w-full h-10 text-base tracking-wide placeholder:text-transparent rounded-lg focus:outline-none transition-all placeholder:select-none"
      @input="handleInput"
      @blur="handleBlur"
    >
    <label
      :for="name"
      class="absolute top-1 peer-placeholder-shown:top-2.5 peer-focus:top-1 left-2.5 text-xs peer-placeholder-shown:text-sm peer-focus:text-xs font-medium text-myBrown peer-placeholder-shown:text-myBrown/50 peer-focus:text-myBrown transition-all"
    >{{ placeholder }}</label>

    <p
      v-show="errorMessage || meta.valid"
      class="absolute -bottom-6 left-0 m-0 text-sm"
    >
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
import { setLocale } from 'yup';
import { nextTick, watch } from '@vue/runtime-core';

export default {
  name: 'FormInputText',
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    initValue: {
      type: Boolean,
      default: false,
    },
    inputBorder: {
      type: String,
      default: 'border-2 border-myBrown focus:border-myYellow',
    },
  },
  emits: ['update:model-value'],
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    })

    watch(
      inputValue,
      // 若有 defaultValue 則自動帶入
      (newVal) => {
        if (props.initValue) {
          nextTick(() => {
            inputValue.value = props.defaultValue
          })
        }
      },
      {
        immediate: true,
      }
    )

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    }
  },
  methods: {
    handleInput(e) {
      this.handleChange(e)
      this.$emit('update:model-value', e.target.value.trim())
    }
  }
}
</script>