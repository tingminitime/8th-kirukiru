<template>
  <!-- <div class="px-4 mx-auto md:px-8"> -->
  <div class="overflow-x-hidden mx-auto md:overflow-visible">
    <div
      id="progressBar"
      class="fixed inset-x-0 h-1"
    ></div>
    <div class="min-h-[calc(100vh-64px-56px)]">
      <router-view></router-view>
      <router-view name="landing"></router-view>
    </div>
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