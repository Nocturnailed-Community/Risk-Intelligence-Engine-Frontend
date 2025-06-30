import { defineStore } from "pinia";
import { addUserRegiter } from "~/services/registerServices/userRegisterService";

export interface AddUserRegister {
  user_username: string;
  user_name: string;
  user_email: string;
  password: string;
  confirm_password: string;
}

export const useUserRegister = defineStore("userregister", {
  state: () => ({
    adduserregister: [] as AddUserRegister[],
  }),
  actions: {
    // menambahkan data user register
    async addUserRegiter(userregisteradd: AddUserRegister) {
      try {
        const response = await addUserRegiter(userregisteradd);
        this.adduserregister.push(response.data.result);
        return response;
      } catch (error) {
        console.error("Error adding user register:", error);
        throw error;
      }
    },
  },
});
