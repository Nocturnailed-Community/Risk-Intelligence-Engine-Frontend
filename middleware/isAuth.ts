import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import Swal from 'sweetalert2'

/**
 * Mengambil nilai dari IndexedDB dengan aman.
 * Tidak akan membuat database atau object store baru jika belum ada.
 */
async function getFromIndexedDB(key: string): Promise<string | null> {
  if (!process.client) return null

  // ✅ Cek apakah database sudah ada (hanya di browser modern)
  const databases = await indexedDB.databases?.()
  const dbExists = databases?.some(db => db.name === "myAuthDB")

  if (!dbExists) {
    console.warn("⚠️ Database 'myAuthDB' belum ada. Mungkin user belum login.")
    return null
  }

  return new Promise((resolve) => {
    const request = indexedDB.open("myAuthDB", 1)

    request.onsuccess = () => {
      const db = request.result

      if (!db.objectStoreNames.contains("auth")) {
        console.error('❌ Object store "auth" tidak ditemukan.')
        return resolve(null)
      }

      const tx = db.transaction("auth", "readonly")
      const store = tx.objectStore("auth")
      const getRequest = store.get(key)

      getRequest.onsuccess = () => {
        resolve(getRequest.result?.value ?? null)
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

/**
 * Middleware autentikasi: hanya lanjut jika token ada di IndexedDB.
 */
const isAuthUser = defineNuxtRouteMiddleware(async () => {
  if (!process.client) return

  const token = await getFromIndexedDB("access_token")
  const name = await getFromIndexedDB("user_name")

  console.log("🔐 Token:", token)
  console.log("👤 Name:", name)

  if (!token) {
    Swal.fire("Akses ditolak", "Silakan login terlebih dahulu", "warning")
    return navigateTo('/login')
  }

  return true
})

export default isAuthUser
