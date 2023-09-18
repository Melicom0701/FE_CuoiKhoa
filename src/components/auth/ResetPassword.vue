<template>
    <div class="w-full max-w-xs mx-auto mt-8">
        <h1 class="text-center"> Xin chào {{ email }}</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="verificationCode">
                    Mã xác nhận
                </label>
                <input v-model="verificationCode"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="verificationCode" type="text" placeholder="Nhập mã xác nhận">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Mật khẩu mới
                </label>
                <input v-model="password" @input="validatePasswords"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="Nhập mật khẩu mới">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
                    Xác nhận mật khẩu
                </label>
                <input v-model="confirmPassword" @input="validatePasswords"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword" type="password" placeholder="Xác nhận mật khẩu">
                <p v-if="passwordMismatch" class="text-red-500 text-xs italic mt-2">Mật khẩu không khớp.</p>
            </div>
            <div class="flex items-center justify-around">
                <button :disabled="passwordMismatch"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="resetPassword">
                    Đặt lại mật khẩu
                </button>

            </div>
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
            <router-link class="mt-5" to="/login"> Quay về trang đăng nhập</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";
import router from '../../route/router';

const route = useRoute();
const verificationCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false);
const errorMessage = ref('');
const email=ref('')
const validatePasswords = () => {
    passwordMismatch.value = password.value !== confirmPassword.value;
};
onMounted(() => {
    email.value = route.params.email; 
    console.log(email.value);
})
const resetPassword = async () => {
    try {
       // Lấy giá trị email từ tham số trên URL
        console.log(email.value);
        await axios.post('http://localhost:3000/auth/reset-password', {
            email: email.value,
            passwordResetToken: verificationCode.value,
            newPassword: password.value
        });
        notify({
            title: "Password Reset",
            text: "Mật khẩu đã được đặt lại thành công!",
            type: "success",
        });
        // Chuyển hướng về trang chủ hoặc nơi bạn muốn sau khi đặt lại mật khẩu thành công
        router.push('/login');
    } catch (error) {
        console.error(error);
        errorMessage.value = error.response.data.message;
        notify({
            title: "Password Reset",
            text: "Có lỗi xảy ra trong quá trình đặt lại mật khẩu.",
            type: "error",
        });
    }
};
</script>


<style scoped>
/* Thêm thêm định dạng CSS của riêng bạn tại đây nếu cần */
</style>
