<template>
  <div class="px-2 mx-auto">
    <Swiper
      v-if="commonInfo.length !== 0"
      class="mySwiper"
      :modules="modules"
      :slides-per-view="'auto'"
      :space-between="4"
      :pagination="{
        clickable: true,
        bulletActiveClass: 'mySwiper-bulletActive',
      }"
    >
      <SwiperSlide
        v-for="article in commonInfo"
        :key="article.artId"
        class="normalCard-slide"
      >
        <CommonCard
          v-bind="article"
          :key="article.artId"
          class="w-80 scale-95"
        ></CommonCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Pagination, Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import CommonCard from '@/components/article/utils/CommonCard.vue'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

export default {
  name: 'CommonCardSwiper',
  components: {
    Swiper,
    SwiperSlide,
    CommonCard,
  },
  props: {
    commonInfo: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      modules: [Pagination, Navigation, A11y],
    }
  },
}
</script>

<style lang="sass" scope>
  .normalCard-slide
    width: auto
    padding: 8px 0 24px 0
</style>