import axios from 'axios';
import { useAuthStore } from '~/stores/authStore';
import { getRequestParams } from "~/utils/apiUtils";

export const login = async (username: string, password: string) => {
  try {
    // Ambil host dan protokol dari window.location
    const { protocol, host, token } = getRequestParams();
    console.log(protocol, host, token)

    const response = await axios.post(`${protocol}//${host}/api/auth/login`, {
      user_username: username,
      password: password,
    }, {
      // Tambahkan opsi untuk mencegah pengalihan otomatis ke HTTPS
    
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

    const user = response.data.result;
    useAuthStore().login(user);
    return user;
  } catch (error:any) {
    // alert(error)
    throw new Error(error.response.data.message);
  }
};