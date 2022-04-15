<template>
  <!-- 附屬切切 -->
  <div class="p-4 mb-12">
    <div class="flex gap-12 justify-between mb-2">
      <div class="myArticlePartTitle myArticlePartTitleBg">
        <h2>附屬切切</h2>
      </div>
      <div class="hidden before:absolute relative before:top-1/2 grow w-1/5 before:w-full before:h-px before:bg-myBrown md:block"></div>
    </div>
    <div class="py-8 px-12">
      <ul class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2">
        <li
          v-for="mission in missions"
          :key="mission.fId"
        >
          <a
            :href="missionUrlParser(mission.auxiliarymain)"
            target="_blank"
            class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
          >
            <span class="text-myBrown line-clamp-1">{{ mission.auxiliary }}</span>
            <span class="text-sm text-gray-900 line-clamp-1">{{ mission.auxiliarymain }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KiruMission',
  props: {
    missions: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    missionUrlParser(url) {
      const urlRegex = /https?:\/\//
      let result
      if (urlRegex.test(url)) {
        result = url
      } else {
        result = `http://${url}`
      }
      return result
    },
  },
}
</script>