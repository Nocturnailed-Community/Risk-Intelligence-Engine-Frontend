<template>
  <div class="bg-light d-none d-md-flex justify-content-between mb-3 p-2" style="width: 100%">
    <i class="bi bi-list fs-2"></i>
    <i class="bi bi-person fs-2"></i>
  </div>
  <nav class="navbar navbar-expand-md bg-light d-md-none shadow-sm position-absolute top-0 start-0 w-100 z-3">
    <div class="container-fluid">
      <button class="btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <img v-if="isDarkMode === true" src="@/assets/images/white.png" alt="Risk Intelligence Engine"
          style="width: 5rem" />
        <img v-else src="@/assets/images/black.png" alt="Risk Intelligence Engine" style="width: 5rem" />
      </a>
      <i class="bi bi-person fs-2"></i>

      <div class="collapse navbar-collapse" id="mobileNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item fw-bold">
            <span class="nav-link">Riwayat Analisis</span>
          </li>
          <li class="nav-item">
            <div class="d-flex">
              <span>1. </span>
              <span class="nav-link">
                Apa risiko dari peminjam muda dengan penghasilan kecil dan grade
                C?
              </span>
            </div>
          </li>
          <!-- Dark Mode Toggle in Navbar -->
          <li class="nav-item mt-3">
            <button class="btn btn-sm btn-outline-secondary" disabled>
              -
            </button>
          </li>
          <li>
            <button class="btn-sm btn-danger btn" @click="confirmLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "~/stores/authStore"
import Swal from "sweetalert2";

export default defineComponent({
  name: "Header",
  components: {

  },
  setup() {
    // komponen dark mode
    const isDarkMode = ref(false);

    // komponen token
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
      isDarkMode,
      isLoading,
      isAuthenticated,
      token,
      confirmLogout,

    }
  }
})
</script>
