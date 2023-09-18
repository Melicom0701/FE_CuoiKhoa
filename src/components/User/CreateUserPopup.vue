<template>
    <div v-if="isVisible"
        class="fixed pt-20 top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
        <div class="bg-white p-8 rounded-lg ">
            <h2 class="text-lg text-center font-semibold mb-4">Create New User</h2>
            <form @submit.prevent="createUser">
                <div class="flex justify-between">
                    <div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Username:</label>
                            <input v-model="newUserData.username" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Password:</label>
                            <input :disabled="isEdited" v-model="newUserData.password" type="password"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Name:</label>
                            <input v-model="newUserData.name" type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Age:</label>
                            <input v-model="newUserData.age" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Email:</label>
                            <input v-model="newUserData.email" type="email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200" />
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Gender:</label>
                            <select v-model="newUserData.gender"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Status:</label>
                            <select v-model="newUserData.status"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200">
                                <option value="2">Active</option>
                                <option value="0">Inactive</option>
                                <option value="1">Pending</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Role:</label>
                            <select v-model="newUserData.role"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-400 focus:ring focus:ring-sky-200">
                                <option value="1">User</option>
                                <option value="2">Moderator</option>
                                <option value="3">Admin</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700">Avatar:</label>
                            <input :disabled="isEdited" type="file" @change="handleAvatarChange"
                                class="mt-1 block w-full" />
                        </div>

                    </div>
                </div>

                <div class="flex justify-around">
                    <button @click.prevent="closePopup" class="ml-2 px-4 py-2 bg-red-400 text-gray-700 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md">Xác nhận</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        isVisible: Boolean,
        getUserByID: Object,
        isEdit: Boolean,
        EditedID: Number
    },
    emits: ['close', 'createNewUser', 'updateUser'],
    setup(props, { emit }) {
        const newUserData = ref({
            username: '',
            password: '',
            name: '',
            age: '',
            email: '',
            avatar: '',
            gender: 'male',
            status: 0,
            role: 1,
        });

        // const isVisible = computed(() => props.isVisible);
        // const getUserByID = computed(() => props.getUserByID);
        const isEdited = computed(() => props.isEdit);
        // const EditedID = computed(() => props.EditedID);
        // console.log('isVisible:', isVisible.value);
        // console.log('getUserByID:', getUserByID.value);
        // console.log('isEdit:', isEdit.value);
        // console.log('EditedID:', EditedID.value);

        if (props.isEdit) {
            newUserData.value = props.getUserByID;
        }

        const closePopup = () => {
            emit('close');
        };

        const createUser = () => {
            if (!props.isEdit) {
                emit('createNewUser', newUserData.value);

            }
            else {
                emit('updateUser', props.getUserByID)
            }
            // Reset các trường dữ liệu nhập
            newUserData.value.username = '';
            newUserData.value.password = '';
            newUserData.value.name = '';
            newUserData.value.email = '';
            newUserData.value.gender = 'male';
            newUserData.value.role = 1;
            newUserData.value.avatar = null;
            newUserData.value.status = 0;
            // closePopup();
        };

        const handleAvatarChange = (event) => {
            const file = event.target.files[0];
            newUserData.value.avatar = file;
        };

        return {
            isEdited,
            newUserData,
            closePopup,
            createUser,
            handleAvatarChange,
        };
    },
};
</script>