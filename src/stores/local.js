import { defineStore } from 'pinia';
import {computed, ref} from 'vue';


export const useProduct = defineStore('product', ()=> {
    const data = ref([])
    const dataAll = ref([])

    return { data , dataAll} ;
});

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null, // Khởi tạo từ localStorage
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
            localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user'); // Xóa khi logout
        }
    }
});