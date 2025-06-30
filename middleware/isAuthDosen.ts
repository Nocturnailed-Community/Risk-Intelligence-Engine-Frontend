import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import Swal from 'sweetalert2';

const isAuthDosen = defineNuxtRouteMiddleware(async (to, from) => {
  console.log('Middleware isAuth: Middleware function executed');

  const cryptCookie = useCookie('2492117');
  const roleCookie = useCookie('9121522');

  // Cek apakah cookie untuk autentikasi ada
  if (!cryptCookie.value) {
    return navigateTo('/login');
  }

  // Cek peran dan arahkan ke halaman yang sesuai
  if (roleCookie.value === 'Keuangan') {
    const result = await Swal.fire({
      title: 'Informasi',
      text: 'Silahkan login ke SIAKAD V2',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    if (result.isConfirmed) {
      return navigateTo('https://siakad-v2.utb-univ.ac.id/login', { external: true });
    }
  } else if (roleCookie.value === 'Mahasiswa') {
    const result = await Swal.fire({
      title: 'Informasi',
      text: 'Silahkan login ke OASIS V2',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    if (result.isConfirmed) {
      return navigateTo('https://oasis-v2.utb-univ.ac.id/login', { external: true });
    }
  }

  // Jika tidak ada kondisi yang terpenuhi, lanjutkan ke rute yang diminta
  return true;
});

export default isAuthDosen;
