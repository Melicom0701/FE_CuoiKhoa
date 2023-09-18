<template>
    <div class="min-h-screen flex items-center justify-center bg-blue-500">
        <div class="bg-gray-800 p-8 rounded shadow-md w-96">
            <h2 class="text-2xl font-semibold mb-4 text-center">Đăng nhập</h2>
            <div class="flex justify-center">
                <router-link to="/register" class="text-blue-500 hover:underline focus:outline-none">
                    Đăng ký tài khoản mới
                </router-link>

            </div>

            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label for="username" class="text-white block font-medium">Tài khoản:</label>
                    <input type="text" id="username" v-model="username" class="text-black w-full mt-1 p-2 border rounded"
                        required />
                </div>
                <div class="mb-4">
                    <label for="password" class="text-white block font-medium">Mật khẩu:</label>
                    <input type="password" id="password" v-model="password"
                        class="text-black w-full mt-1 p-2 border rounded" required />
                </div>
                <label for="remember" class="text-white block mt-2">
                    <input type="checkbox" id="remember" v-model="rememberPassword" class="mr-1" />
                    Nhớ mật khẩu
                </label>
                <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Đăng nhập
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>


            <div class="mt-4 text-center">
                <button @click="showForgotPassword = !showForgotPassword"
                    class="text-blue-500 hover:underline focus:outline-none">
                    Quên mật khẩu?
                </button>
                <div v-if="showForgotPassword">
                    <label for="email" class="text-white block font-medium mt-4">Địa chỉ email:</label>
                    <input type="email" id="email" v-model="email" class="text-black w-full mt-1 p-2 border rounded"
                        required />
                    <p v-if="errorMail" class="text-red-500 mt-2">{{ errorMail }}</p>
                    <button @click="requestPasswordReset"
                        class="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Gửi yêu cầu
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";
import router from '../../route/router';
import { useLoginStore } from '../../store';
export default {

    setup() {

        const username = ref('')
        const password = ref('')
        const email = ref('')
        const errorMessage = ref('')
        const errorMail= ref('')
        const showForgotPassword = ref(false)
        const rememberPassword = ref(false)
        const accessToken = ref('')
        //const isLoggedIn = computed(() => !!accessToken.value)
        const resetData = () => {
            username.value = ''
            password.value = ''
            email.value = ''
            errorMessage.value = ''
            showForgotPassword.value = ''
            rememberPassword.value = false
        }

        const submit = async () => {
            try {
                const LoginStore = useLoginStore();
                await LoginStore.login(username.value, password.value);
                router.push({ name: 'dashboard',path:"/" });
                notify({
                    title: "Authorization",
                    text: "You have been logged in!",
                    type: "success",
                });
                resetData();
            } catch (error) {
                notify({
                    title: "Authorization",
                    text: error,
                    type: "error",
                });
                errorMessage.value = error.response.data.message;

            }
        }

        const requestPasswordReset = async () => {
            try {
                // Gửi yêu cầu đặt lại mật khẩu dựa trên địa chỉ email
                const response = await axios.post('http://localhost:3000/auth/forgot-password', {
                    mailTo: email.value
                });
                console.log(response);
                router.push({ name: 'reset-pass', params: { email: email.value } });
                // Thêm xử lý gửi yêu cầu đặt lại mật khẩu tại đây
                showForgotPassword.value = false; // Ẩn phần quên mật khẩu sau khi gửi yêu cầu thành công
                notify({
                    title: "Password Reset",
                    text: "Yêu cầu đặt lại mật khẩu đã được gửi!",
                    type: "success",
                });
            } catch (error) {
                errorMail.value = error.response.data.message;
            }
        }

        return {
            username,
            password,
            email,
            errorMessage,
            errorMail,
            showForgotPassword,
            submit,
            requestPasswordReset,
            rememberPassword,
            accessToken,
        }
    },
}
</script>

<style scoped>
/* Thêm các lớp Tailwind CSS tại đây nếu cần thiết */
</style>
