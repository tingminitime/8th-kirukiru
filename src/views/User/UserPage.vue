<template>
  <div class="py-11 px-4 mx-auto max-w-[816px] md:px-8">
    <div>User Page</div>
    <router-view :name="view"></router-view>
  </div>
</template>

<script>


export default {
  name: 'UserPage',
  data() {
    return {
      view: 'articles'
    }
  }
}
</script>