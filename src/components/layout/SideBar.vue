<template>
	<div class=" border-[1px] fixed h-[100vh] bg-white z-[1000] ">
		<div class="w-full text-center mt-5 text-2xl font-bold text-[#2b00d4]">
			<img src="../../assets/logo.svg" alt="">
		</div>
		<div>
			<div class="flex flex-col mt-14 gap-6 px-3">
				<router-link to="/">
					<div class="flex flex-row items-center gap-4 text-base">
						<i class="fi fi-rr-dashboard"></i>
						<div class="font-medium text-[#bcbcbc]">Dashboard</div>
					</div>
				</router-link>
				<router-link to="/user">
					<div class="flex flex-row items-center gap-4">
						<i class=" font-medium fi fi-rr-users-alt"></i>
						<div class=" font-medium text-[#bcbcbc]">User manager</div>
					</div>
				</router-link>

				<div>
					<div class="flex flex-row items-center gap-4">
						<i class="fi fi-rr-calendar"></i>
						<div class="font-medium text-[#bcbcbc]">User Details</div>
					</div>
				</div>

				<div>
					<div class="flex flex-row items-center gap-4">
						<i class="fi fi-rr-calendar"></i>
						<div class="font-medium text-[#bcbcbc]">Poll</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>


</script>
<style scoped>
@import url('https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css');
</style>