<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <div class="col-md-3 bg-light d-none d-md-flex flex-column justify-content-between p-4 border-end">
        <SideBar />
      </div>
      <div class="col-md-9 col-12  mt-md-0 mt-5">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "~/components/baseComponent/header.vue";
import SideBar from "~/components/baseComponent/sideBar.vue";
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "~/stores/authStore"
import Swal from "sweetalert2"

export default defineComponent({
  name: "DashboardPage",
  components: {
    Header,
    SideBar,
  },
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
        router.replace("/")
      } finally {
        isLoading.value = false
      }
    }

    // ✅ Inisialisasi saat komponen dimount
    onMounted(async () => {
      // setupAutoDeleteIndexedDB()
      // await cek()
    })
  },
})
</script>
