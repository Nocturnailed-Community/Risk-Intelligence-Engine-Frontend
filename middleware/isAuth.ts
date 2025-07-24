import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import Swal from 'sweetalert2'

// Fungsi untuk mengambil data dari IndexedDB
function getFromIndexedDB(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (!process.client) return resolve(null)

    const request = indexedDB.open("myAuthDB", 1)

    request.onsuccess = () => {
      const db = request.result
      const tx = db.transaction("auth", "readonly")
      const store = tx.objectStore("auth")
      const getRequest = store.get(key)

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          console.log(`✅ IndexedDB "${key}":`, getRequest.result.value)
          resolve(getRequest.result.value)
        } else {
          console.log(`⚠️ IndexedDB "${key}" tidak ditemukan`)
          resolve(null)
        }
      }

      getRequest.onerror = () => {
        console.error(`❌ Gagal mengambil "${key}" dari IndexedDB`)
        resolve(null)
      }
    }

    request.onerror = () => {
      console.error("❌ Gagal membuka IndexedDB")
      resolve(null)
    }
  })
}

// Middleware autentikasi berdasarkan IndexedDB
const isAuthUser = defineNuxtRouteMiddleware(async () => {
  let token: string | null = null;
  let name: string | null = null;

  if (process.client) {
    token = await getFromIndexedDB("access_token");
    name = await getFromIndexedDB("user_name");
  }

  console.log("🔐 access_token dari IndexedDB:", token)
  console.log("👤 user_name dari IndexedDB:", name)

  if (!token) {
    Swal.fire("Akses ditolak", "Silakan login terlebih dahulu", "warning")
    return navigateTo('/login')
  }

  return true
})

export default isAuthUser