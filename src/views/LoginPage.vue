<template>
  <div>
    LOGIN PAGE
    <LoginModal></LoginModal>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginModal,
  },
}
</script>