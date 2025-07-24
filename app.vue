<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!-- <script setup lang="ts">
onBeforeUnmount(() => {
  deleteIndexedDB()
})

onUnmounted(() => {
  deleteIndexedDB()
})

if (process.client) {
  window.addEventListener("beforeunload", () => {
    deleteIndexedDB()
  })
}
</script> -->


<script setup lang="ts">
onMounted(() => {
  if (!process.client) return

  // Tandai bahwa sesi aktif
  sessionStorage.setItem("session_active", "true")

  // Hapus sesi saat tab/browser ditutup
  window.addEventListener("unload", () => {
    sessionStorage.removeItem("session_active")
  })

  // Cek saat tab ditinggalkan
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      setTimeout(() => {
        // Kalau session sudah tidak ada, anggap tab ditutup
        if (!sessionStorage.getItem("session_active")) {
          indexedDB.deleteDatabase("myAuthDB")
          console.log("🗑️ IndexedDB dihapus karena tab ditutup.")
        }
      }, 300)
    }
  })
})
</script>