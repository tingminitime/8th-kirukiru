<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-x-48"
    enter-to-class="transform opacity-100 translate-x-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 translate-x-0"
    leave-to-class="transform opacity-0 -translate-x-48"
  >
    <div
      class="flex fixed top-0 left-0 z-50 justify-center items-center w-screen h-full"
    >
      <div
        class="flex justify-center items-center drop-shadow-2xl"
      >
        <div class="overflow-hidden mx-auto w-80 bg-white rounded-3xl shadow-xl md:w-96">
          <div class="relative py-4 bg-myYellow">
            <h1 class="text-2xl font-bold text-center text-myBrown select-none">
              會員註冊
            </h1>
            <button
              type="button"
              class="inline-block absolute top-1/2 right-2 p-2 leading-none align-middle -translate-y-1/2"
              @click="closeModal"
            >
              <span class="font-bold material-icons">
                close
              </span>
            </button>
          </div>
          <div class="overflow-x-hidden h-[50vh]">
            <div class="flex justify-center h-48">
              <img
                src="@img/register-sayhi.png"
                alt="hi"
              >
            </div>
            <div class="px-10 pb-8 bg-white">
              <v-form
                :validation-schema="schema"
                @submit="onSubmit"
                @invalid-submit="onInvalidSubmit"
              >
                <!-- Email -->
                <InputText
                  name="register-email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  class="mb-10"
                  success-message=""
                ></InputText>
                <!-- 暱稱 -->
                <InputText
                  name="register-name"
                  type="text"
                  label="暱稱"
                  placeholder="暱稱"
                  class="mb-10"
                  success-message=""
                ></InputText>
                <!-- 帳號 -->
                <InputText
                  name="register-account"
                  type="text"
                  label="帳號"
                  placeholder="帳號"
                  class="mb-10"
                  success-message=""
                ></InputText>
                <!-- 密碼 -->
                <InputText
                  name="register-password"
                  type="text"
                  label="密碼"
                  placeholder="密碼"
                  class="mb-10"
                  success-message=""
                ></InputText>
                <!-- 再次輸入密碼 -->
                <InputText
                  name="register-confirm_password"
                  type="text"
                  label="再次輸入密碼"
                  placeholder="再次輸入密碼"
                  class="mb-10"
                  success-message=""
                ></InputText>

                <div>
                  <v-field
                    v-slot="{ field, errorMessage }"
                    v-model="interest"
                    name="interest"
                    :rules="validateField"
                  >
                    <InputSelect
                      :options="interestList"
                      v-bind="field"
                      key-prop="name"
                      label-prop="name"
                    ></InputSelect>
                    <span class="text-red-500">{{ errorMessage }}</span>
                  </v-field>
                </div>

                <div class="flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    class="block py-2 px-4 mt-12 w-48 text-xl font-bold text-center text-white hover:text-myYellow bg-myYellow hover:bg-transparent rounded focus:outline-none hover:ring-4 focus:ring hover:ring-myYellow focus:ring-myYellow/80 focus:ring-offset-2 cursor-pointer"
                  >
                    註冊
                  </button>
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </transition>
</template>

<script>
import InputText from '@/components/InputText.vue'
import InputSelect from '@/components/InputSelect.vue'
import * as Yup from 'yup'
import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: '無效的輸入',
    required: '必填欄位'
  },
  string: {
    min: '長度不可小於 ${min}',
    email: '須符合 Email 格式 !'
  }
})

export default {
  name: 'RegisterModal',
  components: {
    InputText,
    InputSelect,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    const schema = Yup.object().shape({
      'register-email': Yup.string().email().required(),
      'register-name': Yup.string().required(),
      'register-account': Yup.string().required(),
      'register-password': Yup.string().min(6).required(),
      'register-confirm_password': Yup.string().oneOf([Yup.ref('register-password'), null], '密碼需一致 !'),
    })

    return {
      schema,
      interest: null,
      interestList: [
        {
          name: '123',
        },
        {
          name: '456',
        },
      ]
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('CLOSE_REGISTER_MODAL')
    },
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2))
    },
    onInvalidSubmit(val) {
      console.log(val)
    },
    validateField(value) {
      if (!value) {
        return "This field is required";
      }

      if (value.name === "Invalid Person") {
        return "This field is invalid";
      }

      return true;
    },
  }
}
</script>