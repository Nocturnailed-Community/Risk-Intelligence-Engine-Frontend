import { useAuthStore } from '~/stores/authStore'

const isGuest = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    return navigateTo('/')
  }

  return true
})

export default isGuest
