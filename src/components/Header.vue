<template>
  <div class="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
    <router-link
      to="/"
      class="py-2 hover:bg-blue-200"
    >
      Index
    </router-link>
    <router-link
      to="/page1"
      class="py-2 hover:bg-blue-200"
    >
      Page 1
    </router-link>
    <router-link
      to="/user"
      class="py-2 hover:bg-blue-200"
    >
      User
    </router-link>
  </div>
</template>