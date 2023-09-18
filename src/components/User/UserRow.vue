<template>
    <tr class=" text-center border-b-2">
        
        <td class="py-4 px-6 ">
            <div class="flex items-center text-center">
                <img class="w-14 rounded-full" src="/src/assets/img/avatar.png" alt="avatar">
                <div class="mx-3 text-center">
                    <p>{{ user.name }}</p>
                    <b>{{ user.email }}</b>
                </div>
            </div>
        </td>
        <td>
            <span>{{ user.role_name }}</span>
        </td>
        <td>
            <span class="rounded px-2 py-2 text-white" :class="{
                'bg-green-400': user.status === 2,
                'bg-red-400': user.status === 0,
                'bg-blue-400': user.status === 1
            }">{{ getStatusText(user.status) }}</span>
        </td>
        <td>
            <span>{{ user.gender }}</span>
        </td>
        <td class="relative">
            <button type="button" @click.stop.prevent="showPopup(index);"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Actions
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                    </path>
                </svg>
            </button>
            <div :id="'action-' + user.id" data-display="none" :class="user.popup"
                class="popup  absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
                <div class="px-1 py-1 popup">
                    <button @click="OnEdit(user.id)"
                        class="popup hover:bg-gray-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                            </path>
                        </svg>
                        Edit
                    </button>
                    <button @click.prevent.stop="onDelete(user.id)"
                        class="popup hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </td>
    </tr>
</template>


<script >


export default {
    props: {
    user: Object,
    index: Number,
    getStatusText: Function,
    showPopup: Function,
    },
    emits: ['edit', 'delete'],
    setup(props, { emit }) {
        const onDelete = (id) => {
            emit('delete',id);
        };

        const OnEdit =  (id) => {
            emit('edit', id);

        };
        const backendBaseUrl = 'http://localhost:3000';
        const getUserAvatarUrl = (backendBaseUrl, avatarFileName) => {
        return (`${backendBaseUrl}/assets/img/${avatarFileName}`);
}
        return {
            OnEdit,
            onDelete,
            getUserAvatarUrl,
            backendBaseUrl
        };
    },
};
</script>



