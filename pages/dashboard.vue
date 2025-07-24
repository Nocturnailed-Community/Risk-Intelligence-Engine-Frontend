<template>
  <div class="container mt-5">
    <div v-if="isLoading">
      kembali ke halaman login
    </div>

    <div v-else-if="isAuthenticated">
      <h1>🏠 Dashboard</h1>
      <p>Selamat datang! Kamu berhasil login.</p>
    </div>

    <div v-else>
      <p>🚫 Akses ditolak. Mengalihkan ke login...</p>
    </div>

    <div>cek {{ token }}</div>

    <button @click="confirmLogout">Logout</button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "~/stores/authStore"
import Swal from "sweetalert2"

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const isLoading = ref(true)
    const isAuthenticated = ref(false)
    const token = ref("-")
    const router = useRouter()
    const authStore = useAuthStore()

    // ✅ Fungsi ambil token dari IndexedDB
    function getFromIndexedDB(key: string): Promise<string | null> {
      return new Promise((resolve) => {
        const request = indexedDB.open("myAuthDB", 1)

        request.onupgradeneeded = () => {
          const db = request.result
          if (!db.objectStoreNames.contains("auth")) {
            db.createObjectStore("auth", { keyPath: "key" })
          }
        }

        request.onsuccess = () => {
          const db = request.result
          if (!db.objectStoreNames.contains("auth")) {
            console.error('Object store "auth" tidak ditemukan!')
            return resolve(null)
          }

          const tx = db.transaction("auth", "readonly")
          const store = tx.objectStore("auth")
          const getRequest = store.get(key)

          getRequest.onsuccess = () => {
            resolve(getRequest.result?.value ?? null)
          }

          getRequest.onerror = () => resolve(null)
        }

        request.onerror = () => {
          console.error("Gagal membuka IndexedDB")
          resolve(null)
        }
      })
    }

    // ✅ Fungsi hapus IndexedDB saat tab/browser ditutup
    function setupAutoDeleteIndexedDB() {
      sessionStorage.setItem("auth", "true")

      window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          setTimeout(() => {
            if (!sessionStorage.getItem("auth")) {
              indexedDB.deleteDatabase("myAuthDB")
              console.log("🗑️ IndexedDB dihapus karena tab ditutup.")
            }
          }, 500)
        }
      })

      window.addEventListener("unload", () => {
        sessionStorage.removeItem("auth")
      })
    }

    // ✅ Cek token & redirect jika tidak ada
    const cek = async () => {
      try {
        const tokenAccess = await getFromIndexedDB("access_token")
        token.value = tokenAccess || "-"

        if (!tokenAccess || tokenAccess.trim() === "") {
          isLoading.value = false
          return router.replace("/login")
        }

        isAuthenticated.value = true
      } catch (error) {
        console.error("❌ Gagal ambil token:", error)
        router.replace("/login")
      } finally {
        isLoading.value = false
      }
    }

    const logout = () => {
      authStore.logout()
      router.replace("/login")
    }

    const confirmLogout = () => {
      Swal.fire({
        title: "Apakah Anda yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, keluar!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          logout()
        }
      })
    }

    // ✅ Inisialisasi saat komponen dimount
    onMounted(async () => {
      setupAutoDeleteIndexedDB()
      await cek()
    })

    return {
      isLoading,
      isAuthenticated,
      token,
      confirmLogout,
    }
  },
})
</script>
