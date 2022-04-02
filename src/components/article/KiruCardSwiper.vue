<template>
  <div class="px-2 mx-auto">
    <Swiper
      v-if="kiruInfo.length !== 0"
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
        v-for="article in kiruInfo"
        :key="article.artId"
        class="kiruCard-slide"
      >
        <KiruCard
          v-bind="article"
          :key="article.artId"
          class="w-80 scale-95"
        ></KiruCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Pagination, Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import KiruCard from '@/components/article/KiruCard.vue'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

export default {
  name: 'KiruCardSwiper',
  components: {
    Swiper,
    SwiperSlide,
    KiruCard,
  },
  props: {
    kiruInfo: {
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
  .kiruCard-slide
    width: auto
    padding: 8px 0 24px 0
</style>