<template>
  <!-- 成功通知 -->
  <NotificationGroup group="success">
    <div
      class="flex fixed inset-0 z-50 justify-center items-end py-16 px-4 pointer-events-none md:justify-end md:items-start"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex overflow-hidden mx-auto mt-4 w-3/4 max-w-sm bg-white rounded-lg shadow-md"
          >
            <div class="flex flex-col justify-start items-center py-2.5 pl-4">
              <div class="w-6 h-6 bg-myYellow rounded-full">
                <span class="font-bold text-white scale-75 material-icons">done</span>
              </div>
            </div>

            <div class="py-2 px-4 -mx-3">
              <div class="mx-3">
                <span class="text-lg font-semibold text-myYellow">{{ notification.title }}</span>
                <p class="py-1 text-sm text-gray-600">
                  {{ notification.text }}
                </p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <!-- 錯誤通知 -->
  <NotificationGroup group="error">
    <div
      class="flex fixed inset-0 z-50 justify-center items-end py-16 px-4 pointer-events-none md:justify-end md:items-end"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex overflow-hidden mx-auto mt-4 w-3/4 max-w-sm bg-white rounded-lg shadow-md"
          >
            <div class="flex flex-col justify-start items-center py-2.5 pl-4">
              <div class="w-6 h-6 bg-red-500 rounded-full">
                <span class="font-bold text-white scale-75 material-icons">close</span>
              </div>
            </div>

            <div class="py-2 px-4 -mx-3">
              <div class="mx-3">
                <span class="text-xl font-bold text-red-500">{{ notification.title }}</span>
                <p class="py-1 text-sm text-gray-600">
                  {{ notification.text }}
                </p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script>
export default {
  name: 'NotiWind',
}
</script>