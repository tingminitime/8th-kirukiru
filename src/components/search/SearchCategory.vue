<template>
  <!-- 選擇類別 -->
  <div>
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
      class="pt-8"
    >
      <ul class="grid grid-cols-6 grid-flow-row gap-x-6 gap-y-4">
        <li
          v-for="category in articleCategories"
          :key="category.Id"
        >
          <button
            type="button"
            class="py-0.5 min-w-[114px] text-sm font-semibold hover:bg-myYellow/10 rounded-b-xl border border-myYellow"
            :class="[ selectCategoryId === category?.Id ? 'bg-myYellow text-myBrown' : 'bg-myGray text-myYellow' ]"
            @click="selectHandler(category.Id)"
          >
            {{ category.Name }}
          </button>
        </li>
      </ul>
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
  name: 'SearchCategory',
  components: {
    FormInputSelect,
  },
  props: {
    defaultSelect: {
      type: Number,
      default: 1,
    },
  },
  emits: ['select'],
  data() {
    return {
      articleCategories: [],
      selectCategoryId: 1,
      isMobile: false,
    }
  },
  created() {
    window.addEventListener('resize', this.onResize)
    this.getArticleCategories()
  },
  mounted() {
    this.selectCategoryId = this.defaultSelect
    this.$emit('select', this.selectCategoryId)
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
    selectHandler(categoryId) {
      this.selectCategoryId = categoryId
      this.$emit('select', this.selectCategoryId)
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