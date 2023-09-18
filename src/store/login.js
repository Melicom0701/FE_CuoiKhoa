import { defineStore } from 'pinia'
import axios from 'axios'
export const useLoginStore = defineStore('login', {
    state: () => ({
        accessToken: null
    }),
    getters: {
        getToken: (state) => state.accessToken
    },
    actions: {
        async login(username, password) {
            await axios.post('http://localhost:3000/auth/login', {
                username: username,
                password: password
            })
                .then((response) => {
                    this.accessToken = response.data.token;
                    localStorage.setItem('accessToken', JSON.stringify(response.data.token))
                    //accessToken.value = JSON.parse(localStorage.getItem('accessToken'))
                })
        },
        decrement() {
            this.count--
        },
    }
})
