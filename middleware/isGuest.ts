// import { useAuthStore } from '~/stores/auth'

// const isGuest = defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore()
//   const isAuthenticated = authStore.isAuthenticated

//   if (isAuthenticated) {
//     return navigateTo('/')
//   }

//   return true
// })

// export default isGuest
import { useAuthStore } from '~/stores/authStore'

const isGuest = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    return navigateTo('/')
  }

  return true
})

export default isGuest
