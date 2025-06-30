import axios from "axios";
import type { AddUserRegister } from "~/stores/registerStores/userRegisterStore";
import { getRequestParams } from "~/utils/apiUtils";

// menambahkan user baru 
export async function addUserRegiter(registeradd: AddUserRegister) {
  try {
    const { protocol, host} = getRequestParams();
    const url = `${protocol}//${host}/api/auth/register`;
    const body = {
      ...registeradd,
    };

    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    console.error("Error adding user register :", error);
    throw error;
  }
}