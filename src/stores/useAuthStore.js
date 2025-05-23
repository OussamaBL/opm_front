import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        user: '',
        errors: '',
    }),
    getters: {
        getUser: (state) => state.user,
        getName: (state) => state.user.data.name,
        getID: (state) => state.user.data.id,
        getAvatar: (state) => state.user.data.avatar,
        getEmail: (state) => state.user.data.email,
        getToken: (state) => state.user.currentToken,
        
        getRole: (state) => state.user.role,
        getErrors: (state) => state.errors,
        
        getHeaderConfig(state) {
            const config = {
                headers: {
                    "Authorization" : `Bearer ${state.user.currentToken}`,
                    "Accept": "application/json",
                }
            }  
            return config;
        }
    },
    actions: {
        setUser() {
            if (localStorage.getItem('user')) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        },
        storeUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        updateUser(user) {
            if (localStorage.getItem('user')) {
                const storedData = JSON.parse(localStorage.getItem('user'));
                storedData.data = user;
                localStorage.setItem('user', JSON.stringify(storedData));
                this.user.data = user;
            }
        },
        clearStoredData() {
            localStorage.removeItem('user');
            this.user = '';
            this.count_wishlist=null;
            this.count_cart=null;
        },
        setErrors(errors) {
            this.errors = errors;
        },
        clearErrors() {
            this.errors = '';
        },
    },
});