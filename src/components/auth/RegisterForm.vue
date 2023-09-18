<template>
    <div class="max-w-md text-black mx-auto p-6 bg-blue-200 rounded shadow m-8">
        <h2 class="text-2xl font-semibold mb-4 text-center">Đăng ký</h2>
        <router-link to="/login">Đăng nhập</router-link>
        <form @submit.prevent="submit">
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Họ và tên</label>
                <input v-model="name" type="text"
                    class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Tuổi</label>
                <input v-model="age" type="number"
                    class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Email</label>
                <input v-model="email" type="email"
                    class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Giới tính</label>
                <select v-model="gender" class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Tên người dùng</label>
                <input v-model="username" type="text"
                    class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Mật khẩu</label>
                <input v-model="password" type="password"
                    class="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" class="w-full py-2 bg-green-500 text-white rounded hover:bg-blue-600">Đăng ký</button>
        </form>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";
import router from '../../route/router';


export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const email = ref('')
        const name = ref('')
        const age = ref('')
        const gender=ref('male')
        const errorMessage = ref('')
        const ResetData = () => {
            username.value = ''
            password.value = ''
            email.value = ''
            name.value = ''
            age.value = ''
            gender.value = 'male';
            errorMessage.value = ''
            
        }
        const submit = async () => {
            try {
                const response = await axios.post('http://localhost:3000/auth/register', {
                    username: username.value,
                    password: password.value,
                    name: name.value,
                    age: age.value,
                    gender: gender.value,
                    email: email.value
                    
                });
                console.log(response);

                notify({
                    title: "Register",
                    text: "You have been register success!",
                    status:"success"
                });
                ResetData();
                router.push('/');
            } catch (error) {
                errorMessage.value = error;
                console.error(error);
            }
        }
        return {
            username,
            password,
            email,
            name,
            age,
            gender,
            errorMessage,
            submit
        }
    },
}
</script>

<style scoped>/* Thêm các lớp Tailwind CSS tại đây nếu cần thiết */</style>
