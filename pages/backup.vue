<template>
  <div>
    <!-- Navbar (Mobile Only) -->
    <nav
      class="navbar navbar-expand-md bg-light d-md-none shadow-sm position-absolute top-0 start-0 w-100 z-3"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/logo/logo_risk_intelligence_engine.png"
            alt="Logo"
            width="30"
            class="me-2"
          />
          Risk Intelligence Engine
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mobileNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item fw-bold">
              <span class="nav-link">Riwayat Analisis</span>
            </li>
            <li class="nav-item">
              <span class="nav-link">
                Apa risiko dari peminjam muda dengan penghasilan kecil dan grade
                C?
              </span>
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

    <!-- Layout -->
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Sidebar (Desktop Only) -->
        <div
          class="col-md-3 bg-light d-none d-md-flex flex-column justify-content-between p-4 border-end"
        >
          <div>
            <div class="mb-4">
              <img
                src="@/assets/logo/logo_risk_intelligence_engine.png"
                alt="Risk Intelligence Engine"
                style="width: 10rem"
              />
              <h5 class="">Risk Intelligence Engine</h5>
            </div>
            <h6 class="text-muted mt-4">Riwayat Analisis</h6>
            <p class="mt-2 fw-bold">
              Apa risiko dari peminjam muda dengan penghasilan kecil dan grade
              C?
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
        </div>

        <!-- Main Content -->
        <div class="col-md-9 col-12 p-4 pt-5 mt-md-0 mt-5">
          <div class="bg-success bg-opacity-25 p-3 rounded text-end mb-3">
            <strong
              >Apa risiko dari peminjam muda dengan penghasilan kecil dan grade
              C?</strong
            >
          </div>

          <div class="bg-light border p-3 rounded mb-3">
            <h6><strong>Analisis:</strong></h6>
            <p>Berikut adalah data peminjam dan sentimen pasar:</p>
            <pre class="bg-white p-2 rounded small border">
1. Umur: 23, Penghasilan: 77927 ...
            </pre>

            <h6><strong>Rekomendasi:</strong></h6>
            <p>
              Peminjam muda dengan penghasilan kecil dan grade C memiliki risiko
              tinggi.
            </p>
          </div>
          
          <div class="d-flex flex-column flex-md-row gap-2">
            <input
              type="text"
              class="form-control"
              placeholder="Enter text for analysis..."
            />
            <input type="file" class="form-control" />
            <button class="btn btn-primary">Analisis</button>
          </div>
        </div>
      </div>
    </div>
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
