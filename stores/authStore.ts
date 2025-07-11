import { defineStore } from "pinia";
import { useCookie } from "#app"; // Pastikan ini diimport jika belum

interface User {
  user: UserData;
  access_token: string;
  token_type: string;
}

interface UserData {
  user_image: null;
  user_name: string;
  user_username: string;
  user_email: string;
  user_status: number;
  group_id: number;
  user_portofolio: string;
  user_phone_number: string;
  user_country: string;
  is_email_verified: number;
  email_verified_at: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(user: User) {
      this.user = user;
      
      const name = useCookie("222222");
      name.value = JSON.stringify(user.user.user_name);

      const token = useCookie("111111");
      token.value = JSON.stringify(user.access_token);
    },

    async logout() {
      this.user = null;

      const user = useCookie("222222");
      user.value = null;

      const token = useCookie("111111");
      token.value = null;
    },
  },
});
