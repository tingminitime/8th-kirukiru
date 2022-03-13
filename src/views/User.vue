<template>
  <div class="mb-4 w-full border-8 border-emerald-500">
    <div class="grid grid-cols-2 sm:grid-cols-3">
      <router-link
        :to="{ name: `profile` }"
        class="py-2 text-center hover:bg-blue-200"
      >
        Profile
      </router-link>
      <router-link
        :to="{ name: `posts` }"
        class="py-2 text-center hover:bg-blue-200"
      >
        Posts
      </router-link>
      <router-link
        :to="{ name: `user` }"
        class="py-2 text-center hover:bg-blue-200"
      >
        User Detail
      </router-link>
    </div>
    <p class="text-center">
      User
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('User Log')
    }
  }
</script>