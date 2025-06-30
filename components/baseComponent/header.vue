<template>
  <div class="bg-light d-none d-md-flex justify-content-between mb-3 p-2" style="width: 100%">
    <i class="bi bi-list fs-2"></i>
    <i class="bi bi-person fs-2"></i>
  </div>
  <nav
    class="navbar navbar-expand-md bg-light d-md-none shadow-sm position-absolute top-0 start-0 w-100 z-3"
  >
    <div class="container-fluid">
      <button
        class="btn navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <img
      v-if="isDarkMode === true"
        src="@/assets/images/white.png"
        alt="Risk Intelligence Engine"
        style="width: 5rem"
      />
      <img
      v-else
        src="@/assets/images/black.png"
        alt="Risk Intelligence Engine"
        style="width: 5rem"
      />
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
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="toggleDarkMode"
            >
              {{ isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode" }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark", isDarkMode.value);
};
</script>
