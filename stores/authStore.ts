import { defineStore } from 'pinia';
import { useCookie } from '#app'; // Pastikan ini diimport jika belum

interface User {
    id?: number;
  username: string;
  crypt_username: string;
  name: string;
  email: string;
  role: string;
  group: number;
  token: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(user: User) {
      this.user = user;
      console.log("User", user)

      const crypt = useCookie('2492117');
      console.log("Crypt", crypt)
      crypt.value = JSON.stringify(user.crypt_username);

      const token = useCookie('712162213');
      token.value = JSON.stringify(user.token);

      const role = useCookie('9121522');
      role.value = JSON.stringify(user.role);
      
      const name = useCookie("11011001");
      name.value = JSON.stringify(user.name);
    },

    async logout() {
      console.log('Logout action called'); // Debug log

      this.user = null;

      const crypt = useCookie('2492117');
      crypt.value = null;

      const token = useCookie('712162213');
      token.value = null;

      const role = useCookie('9121522');
      role.value = null;

      const name = useCookie("11011001");
      name.value = null;
    },
  },
});