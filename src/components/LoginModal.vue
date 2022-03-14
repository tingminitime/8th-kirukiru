<template>
  <div
    id="defaultModal"
    aria-hidden="true"
    class="hidden overflow-x-hidden overflow-y-auto fixed inset-x-0 top-4 z-50 justify-center items-center h-modal md:inset-0 md:h-full"
  ></div>
  <div class="flex justify-center items-center py-12 px-4 min-h-full sm:px-6 lg:px-8">
    <div class="space-y-8 w-full max-w-md">
      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <div class="relative">
          <input
            id="email"
            name="email"
            type="text"
            class="peer w-full h-10 text-gray-900 placeholder:text-transparent bg-transparent border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
            placeholder="Email address"
          >
          <label
            for="email"
            class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 transition-all"
          >
            Email Address
          </label>
        </div>
        <div class="relative mt-2">
          <input
            id="password"
            name="password"
            type="password"
            class="peer w-full h-10 text-gray-900 placeholder:text-transparent bg-transparent border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
            placeholder="Email address"
          >
          <label
            for="password"
            class="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-gray-600 transition-all"
          >
            Password
          </label>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 form-checkbox"
            >
            <label
              for="remember-me"
              class="block ml-2 text-sm text-gray-900"
            > Remember me </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            > Forgot your password? </a>
          </div>
        </div>

        <div>
          <button
            type="button"
            class="group flex relative justify-center py-2 px-4 w-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="flex absolute inset-y-0 left-0 items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>