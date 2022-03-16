<template>
  <Listbox
    as="div"
    :model-value="value || modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <ListboxLabel class="sr-only">
      請選擇興趣:
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        class="relative py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg focus-visible:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 shadow-md cursor-default sm:text-sm"
      >
        <span class="block truncate">{{
          (value || modelValue)?.[labelProp] || "請選擇一項興趣主題"
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
          class="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm"
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
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

export default {
  components: {
    Listbox,
    ListboxLabel,
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
  },
  emits: ["update:modelValue"],
};
</script>