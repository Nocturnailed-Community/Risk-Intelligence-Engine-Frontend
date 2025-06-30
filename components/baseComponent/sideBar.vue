<template>
  <div>
    <div class="mb-4">
      <div class="text-center">
        <img
          v-if="isDarkMode === true"
          src="@/assets/images/white.png"
          alt="Risk Intelligence Engine"
          class="mb-4"
          style="width: 10rem"
        />
        <img
          v-else
          src="@/assets/images/black.png"
          alt="Risk Intelligence Engine"
          class="mb-4"
          style="width: 10rem"
        />
      </div>
      <h5 class="">Risk Intelligence Engine</h5>
    </div>
    <p class="mt-4">Riwayat Analisis</p>
    <p class="mt-2 fw-bold d-flex">
      <span>1. </span>
      <span>Apa risiko dari peminjam muda dengan penghasilan kecil dan grade C?</span>
    </p>
    <p class="mt-2 fw-bold d-flex">
      <span>2. </span>
      <span>Apa risiko dari peminjam muda dengan penghasilan kecil dan grade C?</span>
    </p>
    <p class="mt-2 fw-bold d-flex">
      <span>3. </span>
      <span>Apa risiko dari peminjam muda dengan penghasilan kecil dan grade C?</span>
    </p>
    <p class="mt-2 fw-bold d-flex">
      <span>4. </span>
      <span>Apa risiko dari peminjam muda dengan penghasilan kecil dan grade C?</span>
    </p>
  </div>

  <!-- Dark Mode Toggle in Sidebar -->
  <div class="mt-4">
    <button
      class="btn btn-sm btn-outline-secondary w-100"
      @click="toggleDarkMode"
    >
      {{ isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark", isDarkMode.value);
};
</script>
