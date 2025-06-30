<template>
    <div class="d-flex">
      <Sidebar v-if="showSidebar" class="sidebar" /> <!-- Tambahkan kondisional untuk menampilkan Sidebar -->
      <div class="content">
        <Header @toggleSidebar="toggleSidebar" /> <!-- Teruskan event untuk mengontrol Sidebar -->
        <div class="main-content">
          <!-- <slot /> -->
            <NuxtPage />
        </div>
        <Footer />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  
  import Sidebar from '~/components/SIDComponent/BaseComponent/SidebarSIDComponent.vue';
  import Header from '~/components/BaseComponent/Header.vue';
  import Footer from '~/components/BaseComponent/Footer.vue';
  
  
  // Mengatur komponen
  const showSidebar = ref(true);
  
  // Fungsi untuk toggle nilai showSidebar untuk menampilkan/menyembunyikan sidebar
  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
  };
  </script>
  <style scoped>
  .sidebar {
    width: 250px; /* Atur lebar sidebar sesuai kebutuhan */
    flex: 0 0 auto; /* Tetapkan agar sidebar tidak fleksibel */
  }
  .d-flex {
    display: flex; /* Atur tata letak menjadi flexbox */
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box; /* Membuat padding dihitung dalam ukuran total elemen */
  }
  
  .main-content {
    flex: 1;
    overflow-y: auto; /* Biarkan konten utama memiliki scroll jika lebih panjang dari tinggi layar */
    background-color: whitesmoke;
    padding: 15px; /* Menambahkan padding di konten utama */
  }
  
  Header {
    /* position: fixed;  */
    top: 0; /* Menetapkan posisi header di bagian atas */
    left: 0; /* Menetapkan posisi header di bagian kiri */
    right: 0; /* Menetapkan posisi header di bagian kanan */
    z-index: 1000; /* Menetapkan z-index untuk memastikan header muncul di atas konten lain */
    background-color: white; /* Menambahkan warna latar belakang putih untuk header */
    width: 100%; /* Membuat header mengisi lebar layar */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Menambahkan bayangan untuk efek visual */
  }
  
  
  .footer {
    /* Definisikan gaya footer di sini */
  
    bottom: 0;
    width: 100%;
  }
  
  /*  */
  </style>
  