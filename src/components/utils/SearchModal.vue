<template>
  <TransitionRoot
    appear
    :show="showSearch"
    as="template"
  >
    <Dialog
      as="div"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 -translate-y-full"
        enter-to="opacity-100 translate-y-0"
        leave="duration-200 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 -translate-y-full"
      >
        <div
          class="fixed top-16 left-1/2 z-40 w-[75vw] max-w-3xl text-left bg-white rounded-xl shadow-xl transition-all -translate-x-1/2 sm:w-[60vw] md:w-[50vw]"
        >
          <!-- <DialogTitle
            as="h2"
            class="relative py-4 text-center bg-myYellow border-b border-myBrown"
          >
            <span
              v-show="showTitle"
              class="text-2xl font-bold leading-6 text-myBrown md:text-3xl"
            >{{ titleText }}</span>
            <button
              v-if="showClose"
              type="button"
              class="group absolute top-1/2 right-4 p-4 -translate-y-1/2"
              @click="closeModal"
            >
              <span class="transition-all md:group-hover:scale-125 material-icons">close</span>
            </button>
          </DialogTitle> -->
          <!-- search 內容 -->
          <div class="flex flex-col gap-3 items-center py-4 transition-all md:py-6">
            <div class="flex gap-16 justify-between mb-2">
              <label
                for="searchKeyword"
                class="py-1.5 px-2 font-semibold text-myBrown rounded-xl transition-all cursor-pointer"
                :class="{ 'ring-1 ring-myBrown': searchType === 'kiru' }"
                @click="searchType = 'kiru'"
              >
                切切文章
              </label>
              <label
                for="searchKeyword"
                class="py-1.5 px-2 font-semibold text-myBrown rounded-xl transition-all cursor-pointer"
                :class="{ 'ring-1 ring-myBrown': searchType === 'normal' }"
                @click="searchType = 'normal'"
              >
                一般文章
              </label>
            </div>
            <div class="flex flex-col gap-3 justify-center items-center md:grid md:grid-cols-4 md:px-8 md:w-full">
              <!-- <input
                id="searchKeyword"
                v-model.trim="searchVm.keywords"
                name="search"
                type="search"
                placeholder="搜尋"
                class="w-full bg-myGray rounded-lg focus:border-myBrown focus:outline-none focus:ring-2 focus:ring-myYellow form-input"
              > -->
              <!-- 搜尋功能 -->
              <div class="md:col-span-3">
                <Combobox v-model="selected">
                  <div class="relative">
                    <div class="relative w-full text-left bg-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 shadow-md cursor-default sm:text-sm">
                      <ComboboxInput
                        class="py-2 px-3 w-full bg-white rounded-lg border-2 border-myBrown focus:border-myBrown focus:outline-none focus:ring-2 focus:ring-myYellow form-input"
                        :display-value="(result) => result.title"
                        @compositionstart="compositionStatus = true"
                        @compositionend="compositionendHandler($event)"
                        @keyup.enter="goSearchPage"
                        @input="inputHandler($event)"
                      ></ComboboxInput>
                    </div>
                    <TransitionRoot
                      enter="duration-100 transition ease-out"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="transition ease-in duration-100"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                    >
                      <ComboboxOptions
                        v-show="searchTitleList.length !== 0"
                        class="overflow-auto fixed -bottom-4 left-1/2 z-50 p-2 mt-1 w-full max-h-60 text-base bg-white rounded-lg focus:outline-none ring-1 ring-black/5 shadow-lg -translate-x-1/2 translate-y-full sm:text-sm"
                      >
                        <ComboboxOption
                          v-for="result in searchTitleList"
                          :key="result.artId"
                          v-slot="{ selected, active }"
                          :value="result"
                          as="template"
                        >
                          <li
                            class="relative py-2 px-4 text-gray-900 rounded-lg cursor-default select-none"
                            :class="{
                              'text- bg-myYellow': active
                            }"
                          >
                            <span
                              class="block truncate"
                              :class="{ 'font-bold': selected, 'font-normal': !selected }"
                            >
                              {{ result.title }}
                            </span>
                          </li>
                        </ComboboxOption>
                      </ComboboxOptions>
                    </TransitionRoot>
                  </div>
                </Combobox>
              </div>
              <!-- 確認搜尋 -->
              <button
                type="button"
                class="w-full max-w-[144px] text-myBrown rounded-lg button-md myButtonValid myButtonValidHover"
                @click="searchHandler"
              >
                <span class="font-bold">搜尋</span>
              </button>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import _ from 'lodash'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import { mapMutations, mapState } from 'vuex'
import { searchKiru, searchNormal } from '@api'

export default {
  name: 'SearchModal',
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    // DialogTitle,
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
  },
  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 文章分類 kiru (default) | normal
      searchType: 'kiru',
      searchVm: {
        nowpage: 1,
        showcount: 10,
      },
      keywords: '',
      searchResult: [],
      selected: {
        id: 0,
        title: ''
      },
      compositionStatus: false,
    }
  },
  computed: {
    ...mapState([
      'showSearch',
    ]),
    searchTitleList() {
      return this.searchResult.map(result => {
        return {
          artId: result.artId,
          title: result.title,
        }
      })
    },
  },
  watch: {
    showSearch(status) {
      if (status) {
        this.SET_MASK({ allowDrop: false, isShow: true })
      } else {
        this.CLOSE_MASK()
      }
    },
    'selected.title': {
      handler(newVal) {
        console.log('關鍵字改變偵聽: ', newVal)
        if (newVal !== '') {
          switch (this.searchType) {
            case 'kiru':
              this.searchKiru()
              break
            case 'normal':
              this.searchNormal()
              break
            default:
              break
          }
        } else {
          this.searchResult.length = 0
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      'SET_MASK',
      'CLOSE_MASK',
      'SHOW_SEARCH',
      'CLOSE_SEARCH',
    ]),
    closeModal() {
      this.CLOSE_SEARCH()
    },
    inputHandler(event) {
      console.log('輸入事件', this.compositionStatus)
      if (this.compositionStatus) return
      else {
        this.selected.title = event.target.value
      }
    },
    // 搜尋切切文章
    searchKiru: _.throttle(function () {
      searchKiru({
        keywords: this.selected.title,
        ...this.searchVm,
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.searchResult.length = 0
          this.searchResult.push(...res.data.data)
        }
      }).catch(error => {
        console.error(error)
      })
    }, 300),
    // 搜尋一般文章
    searchNormal: _.throttle(function () {
      searchNormal({
        keywords: this.selected.title,
        ...this.searchVm,
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.searchResult.length = 0
          this.searchResult.push(...res.data.data)
        }
      }).catch(error => {
        console.error(error)
      })
    }, 200),
    // 搜尋功能
    searchHandler() {
      if (this.selected.title !== '') {
        switch (this.searchType) {
          case 'kiru':
            // this.searchKiru()
            console.log('前往搜尋頁面', this.selected.title)
            break
          case 'normal':
            // this.searchNormal()
            console.log('前往搜尋頁面', this.selected.title)
            break
          default:
            break
        }
      }
    },
    // 拼音結束事件
    compositionendHandler(event) {
      this.compositionStatus = false
      this.selected.title = event.target.value
      console.log('拼音結束偵聽: ', this.compositionStatus)
      this.keywords = this.selected.title
    },
    // 前往搜尋頁面
    goSearchPage() {
      console.log('enter事件', this.compositionStatus)
      if (
        !this.compositionStatus
        && this.keywords === this.selected.title
        && this.selected !== ''
      ) {
        console.log('前往搜尋頁面')
      } else {
        this.keywords = this.selected.title
      }
    },
  }
}
</script>