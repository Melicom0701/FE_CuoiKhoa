<template>
	<div class=" sticky top-0 bg-white z-[999] h-[80px] border-b-[1px] ">
		<div class="px-14 w-full h-full flex items-center justify-between">
			<div>
				<img class="w-24 rounded-full" src="../../assets/img/logoS.jpg" alt="avatar">
			</div>
			<div class="flex flex-col">
			
			</div>
			
			<div>
				<div class="flex flex-row items-center gap-4">
				
				
					<div class="flex flex-col">
						<p class="text-sm font-medium">{{userName}}</p>
			
					</div>
					<div class="relative">
						<button class="h-[50px] w-[50px] bg-[#f5f9fd] rounded-full" @click="togglePopup">
							<img class="w-14 rounded-full" src="/src/assets/img/avatar.png" alt="avatar">
						</button>
						<div v-if="popupVisible" class="absolute right-0 mt-2 p-4 bg-white border rounded shadow">
							<div class="mb-2"> {{ userName }}</div>
							<button class="bg-red-500 text-white px-2 py-1 rounded" @click="logout">Đăng xuất</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import router from '../../route/router';
import jwtDecode from 'jwt-decode';
const accessToken = ref('')
    accessToken.value = JSON.parse(localStorage.getItem('accessToken'))
// Dùng ref để tạo các biến reactivity
const popupVisible = ref(false);
const userName = ref(''); 
const userRole = ref('');
const userAVT = ref('');

// Hàm để hiển thị/ẩn popup
const togglePopup = () => {
	popupVisible.value = !popupVisible.value;
};

// Hàm xử lý đăng xuất
const logout = () => {
            localStorage.removeItem('accessToken')
	router.push('/login')
	popupVisible.value = false;
}
// Lấy thông tin người dùng từ accessToken
const decodedToken = jwtDecode(accessToken.value); // Giải mã accessToken
console.log("decoded token", decodedToken )
if (decodedToken) {
	userName.value = decodedToken.name; 
	userRole.value = decodedToken.role;
	userAVT.value = decodedToken.avt;
}
const getRole = (role) => {
	if (role == 1) return "User"
	if (role == 2) return "Moderator"
	if (role == 3) return "Admin"
}
const backendBaseUrl = 'http://localhost:3000';
const getUserAvatarUrl = (backendBaseUrl, avatarFileName) => {
    return (`${backendBaseUrl}/assets/img/${avatarFileName}`);
}
</script>