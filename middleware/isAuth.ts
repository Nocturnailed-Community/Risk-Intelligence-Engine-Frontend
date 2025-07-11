import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import Swal from 'sweetalert2';

const isAuthUser = defineNuxtRouteMiddleware(async (to, from) => {
  const cryptCookie = useCookie('111111');
  const roleCookie = useCookie('333333');

  // Cek apakah cookie untuk autentikasi ada
  if (!cryptCookie.value) {
    return navigateTo('/login');
  }
  return true;
});

export default isAuthUser;