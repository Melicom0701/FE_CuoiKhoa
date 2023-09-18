<template>
    <div @click="closeAllPopup" class="ml-40">
        <div class="flex items-center justify-between">
            <input v-model="search" class="px-3 py-2 h-10 m-8 border rounded" placeholder="Search User" />
            <button @click.prevent="showCreatePopup"
                class="py-2 h-10 m-8 border rounded px-3 bg-sky-600 text-white cursor-pointer">
                + Create New
            </button>
        </div>
        <table class="w-4/5 mx-auto px-8">
            <thead class="text-xs text-gray-700 uppercase py-4 bg-white">
                <tr scope="col" class="px-6 py-3 bg-white">
                    <th v-for="(column, index) in tableColumns" :key="index">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <UserRow v-for="(user, index) in filteredUsers" :key="user.id" :user="user" :getStatusText="getStatusText"
                    :showPopup="showPopup" :index="index" @edit="showEditPopup" @delete="onDelete" />
            </tbody>
        </table>
        <el-pagination class=" my-5 flex items-center justify-between" :page-size="5" 
            layout="prev, pager, next" :total="totalRecords" @current-change="handlePageChange" />

    </div>


    <!-- Create New User Popup -->
    <CreateUserPopup v-if="shouldShowPopup()" :isVisible="isCreatePopupVisible" :getUserByID="UserToEdit"
        :EditedID="EditedID" :isEdit="isEdit" @close="closeCreatePopup" @createNewUser="createNewUser"
        @updateUser="updateUser" />
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';
import axios from 'axios';
import UserRow from './UserRow.vue';
import CreateUserPopup from './CreateUserPopup.vue';
import router from '../../route/router';


export default {
    components: { UserRow, CreateUserPopup },
    setup() {
        const userData = ref([]);
        const accessToken = ref('');
        const search = ref('');
        const isEdit = ref(false);
        const isCreatePopupVisible = ref(false);
        const EditedID = ref(null)
        const pageNumber = ref(1);
        const totalRecords = ref('');
        const UserToEdit = ref(null)
        const tableColumns = ['user', 'role', 'status', 'Gender', 'actions'];

        const handlePageChange = (newPage) => {
            pageNumber.value = newPage; // Cập nhật giá trị pageNumber
            fetchUserData(pageNumber.value); // Gọi lại fetchUserData với pageNumber mới
        };
        const getTotalRecord = () => {
            accessToken.value = JSON.parse(localStorage.getItem('accessToken'));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.value;
            axios.get('http://localhost:3000/user/total-records')
                .then((res) => {
                    totalRecords.value = res.data.totalRecords
                console.log(res.data);
                })  
                .catch((err) => {
                    console.log(err);
                })
        }

        const shouldShowPopup = () => {
            if (isEdit.value) {
                return isCreatePopupVisible.value && UserToEdit.value !== null;
            } else {
                return isCreatePopupVisible.value;
            }
        }

        const fetchUserData = async (pageNum = 1) => {
            accessToken.value = JSON.parse(localStorage.getItem('accessToken'));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken.value;
            axios
                .get(`http://localhost:3000/user?page=${pageNum}&pagesize=5`)
                .then((response) => {
                    userData.value = response.data;
                    console.log(`http://localhost:3000/user?page=${pageNum}&pagesize=5`);
                    console.log(response);
                    closeAllPopup();
                })
                .catch((error) => {
                    console.error(error);
                    localStorage.removeItem('accessToken')
                    router.push('/login')
                });
        };
        const getUserByID = (id) => {
            return axios.get(`http://localhost:3000/user/id/${id}`, {})
                .then(response => {
                    UserToEdit.value = response.data[0]
                    console.log(UserToEdit.value);
                })
                .catch(error => {
                    console.error(error);
                });
        }


        onBeforeMount(() => {
            getTotalRecord();
            fetchUserData(pageNumber.value);
        });

        const filteredUsers = computed(() => {
            return userData.value.filter((user) => {
                const lowerSearch = search.value.toLowerCase();
                return Object.values(user).some(
                    (value) =>
                        typeof value === 'string' && value.toLowerCase().includes(lowerSearch)
                );
            });
        });

        const getStatusText = (status) => {
            const statusTexts = ['inactive', 'pending', 'active'];
            return statusTexts[status];
        };

        const showPopup = (index) => {
            userData.value = userData.value.map((user, idx) => {
                user.popup = idx === index && user.popup === 'hidden' ? 'block' : 'hidden';
                return user;
            });
        };

        const onDelete = (index) => {
            const shouldDelete = window.confirm("Are you sure you want to delete " + index + "?");

            if (shouldDelete) {
                axios.delete(`http://localhost:3000/user/${index}`)
                    .then(() => {
                        fetchUserData();
                    })
                    .catch((error) => {
                        alert(error)
                    })
            }
        };

        const closeAllPopup = () => {
            userData.value.forEach((element) => {
                element.popup = 'hidden';
            });
        };

        const showCreatePopup = () => {
            isCreatePopupVisible.value = true;
            isEdit.value = false
        };
        const showEditPopup = (id) => {
            EditedID.value = id
            console.log(id);
            isCreatePopupVisible.value = true;
            isEdit.value = true;
            getUserByID(id)
        };
        const closeCreatePopup = () => {
            isCreatePopupVisible.value = false;
            isEdit.value = false;
            EditedID.value = null;
            UserToEdit.value = null;
        };
        const updateUser = async (user) => {
            try {
                await axios.put(`http://localhost:3000/user/${user.id}`, user);

                console.log("User updated successfully");
                fetchUserData()
                closeCreatePopup();
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        }
        const createNewUser = async (newUserData) => {
            console.log("newUserData", newUserData);
            // Chuẩn bị dữ liệu cần gửi đến máy chủ
            let formData = new FormData();
            formData.append('name', newUserData.name);
            formData.append('age', newUserData.age);
            formData.append('gender', newUserData.gender);
            formData.append('password', newUserData.password);
            formData.append('email', newUserData.email);
            formData.append('username', newUserData.username);
            formData.append('userRole', newUserData.role);
            formData.append('status', newUserData.status);
            console.log("duy" + formData);
            try {
                // Gửi yêu cầu tạo người dùng mới đến máy chủ
                await axios.post('http://localhost:3000/user', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken.value,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                fetchUserData()
                closeCreatePopup();
            } catch (error) {
                console.log(error);
            }
        };



        return {
            shouldShowPopup,
            totalRecords,
            handlePageChange,
            getTotalRecord,
            pageNumber,
            search,
            isEdit,
            EditedID,
            createNewUser,
            updateUser,
            tableColumns,
            filteredUsers,
            isCreatePopupVisible,
            getUserByID,
            UserToEdit,
            showCreatePopup,
            showEditPopup,
            closeCreatePopup,
            onDelete,
            showPopup,
            closeAllPopup,
            getStatusText,
        };
    },
};
</script>
