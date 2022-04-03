<template>
  <div class="min-h-[calc(100vh-64px-56px)]">
    <div class="py-4 mx-auto max-w-[816px] md:py-12">
      <!-- 選擇切切 / 一般 -->
      <div
        class="before:hidden flex relative before:absolute before:top-0 before:left-0 gap-4 justify-center items-center px-8 before:w-1/2 before:h-full before:bg-myYellow before:transition-all md:before:block md:gap-0 md:px-0"
        :class="{ 'before:translate-x-full': searchType === 'common' }"
      >
        <button
          type="button"
          class="block z-10 py-1 w-full text-sm font-semibold text-center text-myBrown rounded-xl border border-myYellow transition-all md:py-2 md:text-base md:hover:bg-myYellow/10 md:rounded-none"
          :class="{ 'bg-myYellow': searchType === 'kiru' }"
          @click="searchType = 'kiru'"
        >
          切切文章
        </button>
        <button
          type="button"
          class="block z-10 py-1 w-full text-sm font-semibold text-center text-myBrown rounded-xl border border-myYellow transition-all md:py-2 md:text-base md:hover:bg-myYellow/10 md:rounded-none md:border-l-0"
          :class="{ 'bg-myYellow': searchType === 'common' }"
          @click="searchType = 'common'"
        >
          一般文章
        </button>
      </div>
      <!-- 選擇類別 -->
      <!-- 手機板 -->
      <div
        v-if="isMobile"
        class="px-8 my-4"
      >
        <FormInputSelect
          v-model="selectCategory"
          :options="articleCategories"
          key-prop="Name"
          label-prop="Name"
          default-text="請選擇文章類別"
          options-position="absolute"
        ></FormInputSelect>
      </div>
      <!-- 桌面板 -->
      <div
        v-else
        class="py-8 border-b border-black/10"
      >
        <ul class="grid grid-cols-6 grid-flow-row gap-x-6 gap-y-4">
          <li
            v-for="category in articleCategories"
            :key="category.Id"
          >
            <button
              type="button"
              class="py-0.5 px-6 font-semibold hover:bg-myYellow/10 rounded-b-xl border border-myYellow"
              :class="[ selectCategory?.Id === category?.Id ? 'bg-myYellow text-myBrown' : 'bg-myGray text-myYellow' ]"
              @click="selectCategory = category"
            >
              {{ category.Name }}
            </button>
          </li>
        </ul>
      </div>
      <router-view :name="searchType"></router-view>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import FormInputSelect from '@/components/utils/FormInputSelect.vue'
import {
  getInterestList,
} from '@api'

export default {
  name: 'SearchPage',
  components: {
    FormInputSelect,
  },
  data() {
    return {
      searchType: 'kiru',
      articleCategories: [],
      selectCategory: null,
      isMobile: false,
    }
  },
  computed: {
    
  },
  created() {
    this.getArticleCategories()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    getArticleCategories() {
      getInterestList().then(res => {
        console.log(res)
        this.articleCategories = res.data
      }).catch(error => console.error(error))
    },
    onResize: _.throttle(function() {
      if (window.innerWidth > 768) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    }, 300),
  },
}
</script>