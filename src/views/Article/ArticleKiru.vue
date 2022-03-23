<template>
  <div class="mb-6 border border-myBrown">
    <!-- 文章頂部作者資訊 -->
    <div class="flex sticky justify-between items-center py-3 px-6 border-b border-myBrown">
      <div class="flex gap-8 items-center">
        <router-link
          class="block"
          :to="{ name: 'Author', params: { authorId: 1 } }"
        >
          <img
            class="object-cover w-14 h-14 rounded-full"
            src="https://kirukiru.rocket-coding.com/Pic/origin.jpg"
            alt="author avatar"
          >
        </router-link>
        <h2 class="font-bold">
          水電皮卡的切切生活
        </h2>
        <button class="font-bold border transition-all text-myBrown hover:text-myOrange border-myYellow button-sm">
          關注
        </button>
      </div>
      <div class="flex gap-5 justify-end items-center">
        <!-- 喜歡 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle material-icons">favorite_border</span>
          <span class="inline-block px-1 text-lg align-middle">12</span>
        </button>
        <!-- 留言 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle material-icons-outlined">mode_comment</span>
          <span class="inline-block px-1 text-lg align-middle">2</span>
        </button>
        <!-- 收藏 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-lg align-middle scale-110 material-icons-outlined">bookmark_border</span>
        </button>
        <!-- 回覆 -->
        <button class="block text-myBrown hover:text-myOrange">
          <span class="inline-block px-1 text-2xl align-middle material-icons-outlined">file_upload</span>
        </button>
      </div>
    </div>
    <!-- 分類 -->
    <div class="py-3 px-6">
      <span class="text-myBrown">切切分類 ><a
        href="javascript:;"
        class="hover:text-myYellow"
      >居家生活</a></span>
    </div>
    <!-- 標題 -->
    <div class="grid grid-cols-3 py-8 px-6">
      <h1 class="flex col-span-2 items-center text-3xl font-bold text-myBrown">
        如何更換淋浴水龍頭? 標題很長的話就會變這樣最多二十八個字
      </h1>
      <div class="flex justify-end items-center">
        <p class="font-bold text-right text-gray-900">
          2022/02/22<br>此切切共有 9 個步驟
        </p>
      </div>
    </div>
    <!-- 文章封面圖片 -->
    <div class="border-y border-myBrown">
      <img
        src="https://picsum.photos/816/248?random=1"
        alt="article cover image"
      >
    </div>
    <!-- 文章簡述 -->
    <div class="py-7 px-6">
      <p class="text-myBrown">
        填寫的切切資訊會在這裡，如果沒有填寫的話此欄位不顯示 Quodsi haberent magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec.
      </p>
    </div>
    <!-- 預備工具 -->
    <div class="bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        預備工具
      </h2>
    </div>
    <!-- 預備工具內容 -->
    <div class="grid grid-cols-2 grid-flow-row gap-x-2 gap-y-6 p-4 border-b border-myBrown">
      <div class="flex flex-col justify-between border md:flex-row border-myBrown">
        <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 border-myBrown aspect-w-16 aspect-h-9 md:aspect-w-12 md:aspect-h-4">
          <img
            class="object-cover absolute"
            src="https://picsum.photos/800/600?random=1"
            alt="tool image"
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>1 支</p>
        </div>
      </div>
      <div class="flex flex-col justify-between border md:flex-row border-myBrown">
        <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 border-myBrown aspect-w-16 aspect-h-9 md:aspect-w-12 md:aspect-h-4">
          <img
            class="object-cover absolute"
            src="https://picsum.photos/800/600?random=2"
            alt="tool image"
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>2 支</p>
        </div>
      </div>
      <div class="flex flex-col justify-between border md:flex-row border-myBrown">
        <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 border-myBrown aspect-w-16 aspect-h-9 md:aspect-w-12 md:aspect-h-4">
          <img
            class="object-cover absolute"
            src="https://picsum.photos/800/600?random=3"
            alt="tool image"
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>3 支</p>
        </div>
      </div>
      <div class="flex flex-col justify-between border md:flex-row border-myBrown">
        <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 border-myBrown aspect-w-16 aspect-h-9 md:aspect-w-12 md:aspect-h-4">
          <img
            class="object-cover absolute"
            src="https://picsum.photos/800/600?random=4"
            alt="tool image"
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>4 支</p>
        </div>
      </div>
      <div class="flex flex-col justify-between border md:flex-row border-myBrown">
        <div class="w-full border-b md:w-1/2 md:border-r md:border-b-0 border-myBrown aspect-w-16 aspect-h-9 md:aspect-w-12 md:aspect-h-4">
          <img
            class="object-cover absolute"
            src="https://picsum.photos/800/600?random=5"
            alt="tool image"
          >
        </div>
        <div class="flex flex-col justify-center p-4">
          <p class="mb-2 font-bold text-myBrown line-clamp-2">
            電風扇這裡可以放26個字兩行
          </p>
          <p>5 支</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 切切內容 -->
  <div class="pb-12">
    <div class="flex mb-6 border border-myBrown">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div class="flex grow items-center px-6 border-x border-myBrown">
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div class="w-64 h-64">
        <img
          class="object-cover w-full h-full"
          src="https://picsum.photos/800/600?random=9"
          alt="tool image"
        >
      </div>
    </div>
    <div class="flex mb-6 border border-myBrown">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div class="flex grow items-center px-6 border-x border-myBrown">
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div class="w-64 h-64">
        <img
          class="object-cover w-full h-full"
          src="https://picsum.photos/800/600?random=7"
          alt="tool image"
        >
      </div>
    </div>
    <div class="flex mb-6 border border-myBrown">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div class="flex grow items-center px-6 border-x border-myBrown">
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div class="w-64 h-64">
        <img
          class="object-cover w-full h-full"
          src="https://picsum.photos/800/600?random=8"
          alt="tool image"
        >
      </div>
    </div>
    <div class="flex mb-6 border border-myBrown">
      <!-- 序號 -->
      <div class="flex justify-center items-center w-16">
        <span class="text-4xl font-bold -translate-y-1.5 md:text-5xl">12</span>
      </div>
      <!-- 內容 -->
      <div class="flex grow items-center px-6 border-x border-myBrown">
        <p>在拆水龍頭前，先將家裡的總水源關閉（水塔上或</p>
      </div>
      <!-- 圖片 -->
      <div class="w-64 h-64">
        <img
          class="object-cover w-full h-full"
          src="https://picsum.photos/800/600?random=6"
          alt="tool image"
        >
      </div>
    </div>
  </div>
  <!-- TIPS -->
  <div class="mb-12 border border-myBrown">
    <div class="bg-myYellow">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        TIPS
      </h2>
    </div>
    <div class="py-8 px-12">
      <ul class="list-disc">
        <li class="mb-4">
          <p>換裝一般水龍頭時，若活動扳手轉1~2圈後水龍頭不正，勿以蠻力轉正，建議重新拆下，繞止水帶後再裝回。</p>
        </li>
        <li class="mb-4">
          <p>馬鈴薯壓成泥後加入奶油和鮮奶會是薯泥更順滑，尤其經過烘烤後薯泥質感會比較乾，不妨多加一點</p>
        </li>
      </ul>
    </div>
  </div>
  <!-- 附屬切切 -->
  <div class="mb-12 border border-myBrown">
    <div class="bg-myBrown">
      <h2 class="py-1 text-xl font-bold text-center text-white">
        附屬切切
      </h2>
    </div>
    <div class="py-8 px-12">
      <div class="grid grid-cols-2 grid-flow-row gap-4">
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
        <a
          href="javascript:;"
          class="flex flex-col gap-1 justify-center p-4 border border-myBrown"
        >
          <span class="text-myBrown line-clamp-1">Google 連結啦</span>
          <span class="text-sm text-gray-900 line-clamp-1">https://www.google.com</span>
        </a>
      </div>
    </div>
  </div>
  <!-- 相關切切 -->
  <h2 class="text-2xl font-bold text-myBrown">
    相關切切
  </h2>
</template>

<script>


export default {
  name: 'ArticleKiru',
}
</script>