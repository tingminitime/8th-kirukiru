<template>
  <div class="mx-auto">
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
    >
      <SwiperSlide class="mySwiper-slide">
        <div class="w-full h-[35vh] md:h-full">
          <img
            class="object-cover object-center w-full h-full select-none"
            src="@img/swiper1.png"
            alt=""
          >
        </div>
      </SwiperSlide>
      <SwiperSlide class="mySwiper-slide">
        <div class="w-full h-[35vh] md:h-full">
          <img
            class="object-cover object-left w-full h-full select-none"
            src="@img/swiper2.png"
            alt=""
          >
        </div>
      </SwiperSlide>
      <SwiperSlide class="mySwiper-slide">
        <div class="w-full h-[35vh] md:h-full">
          <img
            class="object-cover object-center w-full h-full select-none"
            src="@img/swiper3.png"
            alt=""
          >
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Pagination, Autoplay, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

export default {
  name: 'MainBanner',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Autoplay, A11y],
    }
  },
}
</script>

<style lang="sass" scope>
  .mySwiper-bulletActive
    background: #FFB11B
    opacity: 1

  // .mySwiper-slide
  //   @media (max-width: 767px)
  //     height: 35vh
</style>