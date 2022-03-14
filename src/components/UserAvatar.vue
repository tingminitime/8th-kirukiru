<template>
  <div>
    <Menu
      as="div"
      class="inline-block relative text-left"
    >
      <div>
        <MenuButton
          class="align-middle rounded-full ring-2 ring-myBrown"
        >
          <img
            class="w-8 h-8 rounded-full"
            src="@img/user-avatar.jpg"
            alt="User avatar"
          >
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right"
        >
          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                撰寫切切
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                個人主頁
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                設定
              </button>
            </MenuItem>
          </div>

          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                登出
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  }
}
</script>