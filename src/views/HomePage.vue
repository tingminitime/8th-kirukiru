<template>
  <!-- <div class="max-w-[816px]"></div> -->
  <div class="px-4 mx-auto md:px-8">
    <router-view></router-view>
    <EditModeModal></EditModeModal>
  </div>
</template>

<script>
import EditModeModal from '@/components/EditModeModal.vue'

export default {
  name: 'HomePage',
  components: {
    EditModeModal,
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>