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
            class="object-cover w-8 h-8 rounded-full"
            :src="userPic"
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
          class="absolute right-0 mt-2 w-60 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black/5 shadow-lg origin-top-right"
        >
          <div class="py-2 px-4 text-left">
            <span class="block py-1 text-sm font-medium text-myBrown break-words">哈囉! {{ $store.state.userInfo?.Name }}</span>
            <span class="block text-xs tracking-wider text-gray-500 break-words">{{ $store.state.userInfo?.Email }}</span>
          </div>
          <div class="block p-1 md:hidden">
            <MenuItem v-slot="{ active }">
              <button
                class="text-base font-medium"
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-myBrown',
                  'group flex rounded-md items-center w-full px-4 py-2',
                ]"
                @click="openEditModal"
              >
                撰寫切切
              </button>
            </MenuItem>
          </div>
          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <button
                class="text-base font-medium"
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-myBrown',
                  'group flex rounded-md items-center w-full px-4 py-2',
                ]"
              >
                個人主頁
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                class="text-base font-medium"
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-myBrown',
                  'group flex rounded-md items-center w-full px-4 py-2',
                ]"
              >
                設定
              </button>
            </MenuItem>
          </div>

          <div class="p-1">
            <MenuItem v-slot="{ active }">
              <button
                class="text-base font-medium"
                :class="[
                  active ? 'bg-myBrown text-white' : 'text-myBrown',
                  'group flex rounded-md items-center w-full px-4 py-2',
                ]"
                @click="signOut"
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
  },
  props: {
    email: {
      type: String,
      default: '',
    },
    introduction: {
      type: String,
      default: '',
    },
    nickname: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    hobby: {
      type: String,
      default: '',
    },
    userPic: {
      type: String,
      default: 'https://kirukiru.rocket-coding.com/Pic/origin.jpg',
    },
  },
  methods: {
    openEditModal() {
      this.$store.commit('SET_MASK', {
        allowDrop: false,
        isShow: true,
      })
      this.$store.commit('OPEN_EDIT_MODAL', true)
    },
    signOut() {
      localStorage.removeItem('kirukiruToken')
      this.$store.commit('SIGN_OUT')
      this.$router.replace({ name: 'HomePage' })
      location.reload()
    },
  },
}
</script>