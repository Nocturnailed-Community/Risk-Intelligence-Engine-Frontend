<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow">
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
      <div class="mb-2 text-center">
        <h4>Hai,selamat datang kembali</h4>
        <p>
          <label class="me-1">Belum punya Akun? </label
          ><NuxtLink to="/register/">Daftar disini</NuxtLink>
        </p>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Masukan Username"
            id="usernameInput"
            v-model="username"
            required
          />
        </div>
        <div class="mb-2">
          <div class="position-relative">
            <input
              :type="passwordFieldType"
              class="form-control"
              placeholder="Masukan Password"
              id="password"
              v-model="password"
              required
            />
            <span
              class="position-absolute end-0 top-50 translate-middle-y me-3"
              @click="togglePasswordVisibility"
              style="cursor: pointer"
            >
              <i
                :class="
                  passwordFieldType === 'password'
                    ? 'bi bi-eye'
                    : 'bi bi-eye-slash'
                "
              ></i>
            </span>
          </div>
        </div>
        <button type="submit" class="btn btn-success" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Login</span>
        </button>
        <div class="text-end mt-2">
          <NuxtLink to="#">Lupa Password?</NuxtLink>
        </div>
      </form>
      <div class="row mt-4">
        <div class="col-12 text-start align-middle">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { login as loginService } from "~/services/authService";
import { useAuthStore } from "~/stores/authStore";
import Swal from "sweetalert2";

definePageMeta({
  layout: "login",
  middleware: ["is-guest"],
});

const username = ref("");
const password = ref("");
const isLoading = ref(false);

// Komponen password show
const passwordFieldType = ref<"password" | "text">("password");

// fungsi untuk menjalankan password show
const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

const login = async () => {
  if (isLoading.value) return; // prevent multiple submissions
  isLoading.value = true;

  try {
    const user = await loginService(username.value, password.value);
    useAuthStore().login(user);
    return navigateTo("/");
  } catch (error: any) {
    console.error("Gagal melakukan login:", error.message);
    Swal.fire({
      icon: "error",
      text: error.message,
      timer: 4000,
      showConfirmButton: false,
    });
  } finally {
    isLoading.value = false;
  }
};

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark", isDarkMode.value);
};
</script>

<style scoped>
.login-content {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.system-header {
  text-align: center;
  margin-bottom: 20px;
}

.system-title {
  font-size: 20px;
  margin-top: 10px;
}

.login-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
}

.btn-success {
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 2rem;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-success:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 4px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 769px) {
  .modal.show {
    display: block;
    opacity: 1;
  }
  svg {
    display: none;
  }

  #loginpage {
    z-index: 2;
    margin-right: 15px !important;
    margin-left: 15px !important;
  }
}
</style>
