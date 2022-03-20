<template> 
  <div class="sticky top-0 z-20 w-full">
    <nav class="relative px-8 h-[72px] bg-myYellow/[0.85] border-b border-slate-50/50 backdrop-blur">
      <router-link
        :to="{ name: 'HomePage' }"
        class="block absolute top-1/2 left-1/2 w-[140px] -translate-x-1/2 -translate-y-1/2"
      >
        <img
          class="object-contain w-full h-[48px]"
          src="@img/Logo-Simple-white.svg"
          alt="logo"
        >
      </router-link>
      <div class="container flex justify-between items-center mx-auto max-w-5xl h-full">
        <button
          type="button"
          class="block py-6 w-12 h-8 text-sm text-gray-500 bg-center bg-no-repeat bg-[length:24px_24px] bg-menu-toggle rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-label="開啟選單"
          @click="toggleMobileNav"
        >
          <span class="sr-only">Open main menu</span>
        </button>

        <!-- Desktop Nav -->
        <div
          class="hidden w-full md:block md:w-auto"
        >
          <ul class="flex flex-col mt-4 md:flex-row md:gap-4 md:mt-0 md:text-sm md:font-medium lg:gap-8">
            <li>
              <a
                href="#"
                class="block text-base font-bold text-myBrown rounded md:py-2 md:px-4 md:bg-transparent"
              >關於切切</a>
            </li>
            <li>
              <a
                href="#"
                class="block text-base font-bold text-myBrown rounded md:py-2 md:px-4 md:bg-transparent"
              >切切分類</a>
            </li>
          </ul>
        </div>
        <div
          class="hidden w-full md:block md:w-auto"
        >
          <ul class="flex flex-col mt-4 md:flex-row md:gap-4 md:items-center md:mt-0 md:text-sm md:font-medium lg:gap-8">
            <li>
              <a
                href="#"
                class="flex justify-center items-center text-lg font-bold text-myBrown rounded md:px-4 md:bg-transparent"
              >
                <span class="text-3xl material-icons">
                  search
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center text-base font-bold text-myBrown rounded md:py-2 md:px-4 md:bg-transparent"
                @click="openEditModal"
              >
                <span class="text-2xl material-icons">edit</span>
                <span class="px-1">撰寫切切</span>
              </button>
            </li>
            <li>
              <router-link
                v-if="userInfo === null"
                class="block text-lg font-bold text-myBrown rounded md:py-2 md:px-4 md:bg-transparent"
                :to="{ name: 'SignIn' }"
              >
                註冊 / 登入
              </router-link>
              <UserAvatar
                v-else
                class="hidden md:block"
                v-bind="userInfo"
              ></UserAvatar>
            </li>
          </ul>
        </div>
        <div class="block md:hidden">
          <UserAvatar
            v-if="userInfo !== null"
            v-bind="userInfo"
          ></UserAvatar>
          <router-link
            v-else
            class="font-bold text-myBrown"
            :to="{ name: 'SignIn' }"
          >
            點我登入
          </router-link>
        </div>
      </div>
    </nav>
  </div>
  <MobileNavbar
    :show-navbar="showNavbar"
    @drop-close="toggleMobileNav"
  ></MobileNavbar>
</template>

<script>
import MobileNavbar from '@/components/MobileNavbar.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { mapState } from 'vuex'

export default {
  name: 'TopNavbar',
  components: {
    MobileNavbar,
    UserAvatar,
  },
  data() {
    return {
      showNavbar: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    toggleMobileNav(val) {
      if (val !== undefined) {
        this.showNavbar = !this.showNavbar
      } else {
        this.showNavbar = val
      }
    },
    openEditModal() {
      this.$store.commit('SET_MASK', {
        allowDrop: false,
        isShow: true,
      })
      this.$store.commit('OPEN_EDIT_MODAL', true)
    }
  }
}
</script>