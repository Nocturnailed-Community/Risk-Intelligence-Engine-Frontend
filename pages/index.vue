<template>
  <div class="container">
    <div class="bg-success bg-opacity-25 p-3 rounded text-end mb-3 mt-4">
      <strong>
        Apa risiko dari peminjam muda dengan penghasilan kecil dan grade C?
      </strong>
    </div>

    <div class="bg-light border p-3 rounded mb-3">
      <h6><strong>Analisis:</strong></h6>
      <p>
        Berdasarkan data yang telah dikumpulkan, terlihat bahwa terdapat
        sejumlah peminjam dengan rentang usia muda, khususnya di usia 20-an,
        yang memiliki tingkat penghasilan relatif rendah...
      </p>
      <pre class="bg-white p-2 rounded small border">
1. Umur: 23, Penghasilan: 77,927, Grade: C
2. Umur: 26, Penghasilan: 62,450, Grade: C
3. Umur: 21, Penghasilan: 48,300, Grade: D
4. Umur: 29, Penghasilan: 85,000, Grade: B
    </pre>

      <h6><strong>Rekomendasi:</strong></h6>
      <p>
        Disarankan untuk lebih berhati-hati dalam menyetujui pinjaman bagi
        peminjam yang berusia muda dan memiliki penghasilan di bawah
        rata-rata...
      </p>
    </div>
  </div>

  <!-- Bar input di bawah layar, tapi ikut batasan container -->
  <div class="d-flex flex-column flex-md-row gap-2 p-4">
    <input type="text" class="form-control" placeholder="Enter text for analysis..." />
  </div>
  <NuxtLink to="/cek" class="btn btn-primary">Cek</NuxtLink>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "~/stores/authStore"
import Swal from "sweetalert2"

definePageMeta({
  middleware: "is-auth", // this should match the name of the file inside the middleware directory
  layout: "default"
});


export default defineComponent({
  name: "dashboard",
  componet: {

  },
  setup() {
    // komonen dark mode
    const isDarkMode = ref(false);

    // komponen idexeddb
    const isLoading = ref(true)
    const isAuthenticated = ref(false)
    const token = ref("-")
    const router = useRouter()
    const authStore = useAuthStore()

    // fungsi untuk menjalankan darkmode
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("dark", isDarkMode.value);
    };

    // fungsi untuk menjalankan indexeddb
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
      // setupAutoDeleteIndexedDB()
      // await cek()
    })

    return {
      isLoading,
      isAuthenticated,
      token,
      confirmLogout,
    }
  }
})

</script>
