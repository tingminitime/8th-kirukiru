<template>
  <!-- <div class="px-4 mx-auto md:px-8"> -->
  <div class="mx-auto">
    <div
      id="progressBar"
      class="fixed inset-x-0 h-1"
    ></div>
    <router-view></router-view>
    <EditModeModal></EditModeModal>
  </div>
</template>

<script>
import EditModeModal from '@/components/editor/EditModeModal.vue'
import NProgress from 'nprogress'

export default {
  name: 'HomePage',
  components: {
    EditModeModal,
  },
  mounted() {
    NProgress.configure({
      parent: '#progressBar'
    })
  }
}
</script>