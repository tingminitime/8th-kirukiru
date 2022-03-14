<template>
  <div
    class="hidden overflow-x-hidden overflow-y-auto fixed inset-x-0 top-4 z-50 justify-center items-center h-modal md:inset-0 md:h-full"
  >
    <div class="relative px-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white dark:bg-gray-700 rounded-lg shadow">
        <div class="flex justify-end p-2">
          <button
            type="button"
            class="inline-flex items-center p-1.5 ml-auto text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg>
          </button>
        </div>
        <form
          class="px-6 pb-4 space-y-6 sm:pb-6 lg:px-8 xl:pb-8"
          action="#"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your email</label>
            <input
              id="email"
              type="email"
              name="email"
              class="block p-2.5 w-full text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-500 focus:ring-blue-500"
              placeholder="name@company.com"
              required=""
            >
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Your password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="block p-2.5 w-full text-sm text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-500 focus:ring-blue-500"
              required=""
            >
          </div>
          <div class="flex justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 bg-gray-50 dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required=""
                >
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="remember"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label>
              </div>
            </div>
            <a
              href="#"
              class="text-sm text-blue-700 dark:text-blue-500 hover:underline"
            >Lost Password?</a>
          </div>
          <button
            type="submit"
            class="py-2.5 px-5 w-full text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a
              href="#"
              class="text-blue-700 dark:text-blue-500 hover:underline"
            >Create account</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
}
</script>