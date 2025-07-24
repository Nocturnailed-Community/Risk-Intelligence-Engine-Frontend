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
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "tes",
  setup() {
    const isLoading = ref(true);
    const isAuthenticated = ref(false);
    const router = useRouter();

    const token = ref("-");

    function getFromIndexedDB(key: string): Promise<string | null> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("myAuthDB", 1)

        // Buat object store jika belum ada
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
            const result = getRequest.result
            resolve(result?.value ?? null)
          }

          getRequest.onerror = () => resolve(null)
        }

        request.onerror = () => {
          console.error("Gagal membuka IndexedDB")
          resolve(null)
        }
      })
    }


    const cek = async () => {
      try {
        const tokenAcces = await getFromIndexedDB("access_token")
        console.log("🔐 Token ditemukan:", tokenAcces)

        // Jika token kosong/null/undefined → redirect
        if (!tokenAcces || tokenAcces.trim() === "") {
          isLoading.value = false
          return router.replace('/login')
        }

        isAuthenticated.value = true
      } catch (error) {
        console.error("❌ Terjadi kesalahan saat mengambil token:", error)
        return router.replace('/login')
      } finally {
        isLoading.value = false
      }
    }


    onMounted(async () => {
      await cek();
    })

    return {
      isLoading,
      isAuthenticated,
      token,
      cek,
    }
  }
});
</script>
