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
    </pre
      >

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
    <input
      type="text"
      class="form-control"
      placeholder="Enter text for analysis..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "default",
  middleware: ["is-auth"],
});

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark", isDarkMode.value);
};
</script>
