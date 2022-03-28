<template>
  <router-link
    :to="{ name: 'ArticleContent', params: { articleId: 2 } }"
    class="block relative w-[256px] min-h-[184px] bg-myGray rounded-b-2xl border border-myBrown drop-shadow-md"
  >
    <div class="flex flex-col">
      <p class="py-1 px-2 w-1/2 text-myBrown bg-myYellow">
        科學宇宙
      </p>
      <h3 class="py-4 px-2 text-lg font-semibold text-myBrown line-clamp-2">
        怎麼跟外星人偷來暗去不被FBI發現?
      </h3>
      <div class="p-2 bg-myYellow">
        <p class="text-sm text-myBrown text-ellipsis line-clamp-2">
          大手但間康中，搪他粉作韋遼然研話影朗竿，就並中起喜向他粉市代就並中起…
        </p>
      </div>
      <div class="flex justify-end items-center py-1 px-2">
        <router-link
          class="flex gap-2 items-center"
          :to="{ name: 'Author', params: { authorId: 1 } }"
        >
          <p class="text-sm text-myBrown">
            快樂的切切人
          </p>
          <div class="overflow-hidden w-8 h-8 rounded-full md:w-8 md:h-8">
            <img
              v-src="`https://kirukiru.rocket-coding.com/Pic/origin.jpg`"
              class="object-cover w-full h-full bg-center scale-[103%] load"
              alt=""
            >
          </div>
        </router-link>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'NormalCard',
}
</script>