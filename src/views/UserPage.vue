<template>
  <div class="border-4 border-purple-500">
    <p class="text-center">
      User Detail : {{ $route.params.uid }}
    </p>
    <p class="text-center">
      {{ uid }}
    </p>
    <p class="text-center">
      {{ test }}
    </p>
    <UserInfo
      :uid="uid"
      :test="test"
    ></UserInfo>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'UserDetail',
  components: {
    UserInfo,
  },
  props: {
    uid: {
      type: [String, Number],
      default: '',
    },
    test: {
      type: [String, Number],
      default: null,
    }
  }
}
</script>