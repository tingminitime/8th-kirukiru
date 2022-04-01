<template>
  <div class="mx-auto">
    <div>
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
          bulletActiveClass: 'mySwiper-bulletActive',
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide>
          <div>
            <img
              class="w-full h-full select-none"
              src="@img/swiper1.png"
              alt=""
            >
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              class="w-full h-full select-none"
              src="@img/swiper2.png"
              alt=""
            >
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img
              class="w-full h-full select-none"
              src="@img/swiper3.png"
              alt=""
            >
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
  name: 'LandingPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay, A11y],
    }
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    }
  },
}
</script>

<style lang="sass">
  .mySwiper-bulletActive
    background: #FFB11B
    opacity: 1
</style>