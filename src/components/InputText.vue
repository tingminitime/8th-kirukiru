<template>
  <div
    class="relative"
    :class="{ 'text-red-500': !!errorMessage }"
  >
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="inputValue"
      :class="{ 'text-red-500': !!errorMessage }"
      class="peer w-full h-10 text-lg tracking-wide placeholder:text-transparent border-b-2 border-myBrown focus:border-myYellow focus:outline-none placeholder:select-none"
      @input="handleChange"
      @blur="handleBlur"
    >
    <label
      :for="name"
      class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm font-bold text-myBrown peer-placeholder-shown:text-myBrown/50 peer-focus:text-myBrown transition-all"
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

export default {
  name: 'InputText',
  props: {
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
  },
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

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    }
  }
}
</script>