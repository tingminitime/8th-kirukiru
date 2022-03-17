<template>
  <Listbox
    :model-value="value || modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="relative mt-1">
      <ListboxButton
        class="myListboxButton"
      >
        <span class="block truncate">{{
          (value || modelValue)?.[labelProp] || defaultText
        }}</span>
        <span
          class="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none"
        >
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="overflow-auto sticky z-50 py-1 mt-2 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-2 ring-myYellow shadow-lg sm:text-sm"
        >
          <ListboxOption
            v-for="option in options"
            v-slot="{ active, selected }"
            :key="option[keyProp]"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >{{ option[labelProp] }}</span>
              <span
                v-if="selected"
                class="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600"
              >
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: null,
    },
    value: {
      type: null,
    },
    keyProp: {
      type: String,
      required: true,
    },
    labelProp: {
      type: String,
      required: true,
    },
    defaultText: {
      type: String,
      default: '請選擇'
    }
  },
  emits: ["update:modelValue"],
};
</script>