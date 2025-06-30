<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow" style="margin-top: 8%">
      <div class="row">
        <div
          class="col-12 col-md-6 d-flex justify-content-center align-items-center"
          style="border-top: 2cap"
        >
          <div class="text-center">
            <img
              v-if="isDarkMode === true"
              src="@/assets/images/white.png"
              alt="Risk Intelligence Engine"
              class="mb-4 size-img"
            />
            <img
              v-else
              src="@/assets/images/black.png"
              alt="Risk Intelligence Engine"
              class="mb-4 size-img"
            />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <h3 class="fw-bold">Buat Akun Baru</h3>
          <form>
            <div class="mb-3">
              <label for="usernameInput" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="usernameInput"
                v-model="newuser_username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nameinput" class="form-label">Nama Lenkap</label>
              <input
                type="text"
                class="form-control"
                id="nameinput"
                v-model="newuser_name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="emailinput" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="emailinput"
                v-model="newuser_email"
                required
              />
            </div>
            <div class="mb-3">
              <label>Password :</label>
              <div class="position-relative">
                <input
                  :type="newPasswordFieldType"
                  class="form-control"
                  id="newPassword"
                  placeholder="*****"
                  v-model="newpassword"
                  required
                />
                <span
                  class="position-absolute end-0 top-50 translate-middle-y me-3"
                  @click="toggleNewPasswordVisibility"
                  style="cursor: pointer"
                >
                  <i
                    :class="
                      newPasswordFieldType === 'password'
                        ? 'bi bi-eye'
                        : 'bi bi-eye-slash'
                    "
                  ></i>
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label>Konfirmasi Password Baru :</label>
              <div class="position-relative">
                <input
                  :type="confirmPasswordFieldType"
                  class="form-control"
                  id="validationPassword"
                  placeholder="*****"
                  v-model="newconfirm_password"
                  required
                />
                <span
                  class="position-absolute end-0 top-50 translate-middle-y me-3"
                  @click="toggleValidationPasswordVisibility"
                  style="cursor: pointer"
                >
                  <i
                    :class="
                      confirmPasswordFieldType === 'password'
                        ? 'bi bi-eye'
                        : 'bi bi-eye-slash'
                    "
                  ></i>
                </span>
              </div>
            </div>

            <div class="mb-3">
              <ul class="small mb-3 list-unstyled">
                <li
                  :class="validClass(minChar)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(minChar)" class="me-2"></i>
                  Minimal 8 karakter
                </li>
                <li
                  :class="validClass(upper)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(upper)" class="me-2"></i>
                  Minimal 1 huruf kapital
                </li>
                <li
                  :class="validClass(lower)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(lower)" class="me-2"></i>
                  Minimal 1 huruf kecil
                </li>
                <li
                  :class="validClass(number)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(number)" class="me-2"></i>
                  Minimal 1 angka
                </li>
                <li
                  :class="validClass(special)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(special)" class="me-2"></i>
                  Minimal 1 karakter spesial
                </li>
                <li
                  :class="validClass(match)"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="iconClass(match)" class="me-2"></i>
                  Konfirmasi password harus sama dengan password baru
                </li>
              </ul>
            </div>
            <button
              @click="addUserRegister"
              class="btn btn-success mb-2"
              style="width: 100%"
            >
              <span>Daftar</span>
            </button>

            <div class="text-center">
              <NuxtLink to="/login/"
                ><i class="bi bi-arrow-left"></i> Kembali ke Halaman
                Login</NuxtLink
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import {
  useUserRegister,
  type AddUserRegister,
} from "~/stores/registerStores/userRegisterStore";

export default defineComponent({
  name: "formuserregister",
  setup() {
    // komponen user register
    const userRegisterStore = useUserRegister();
    const userRegisterData = ref<AddUserRegister[]>([]);

    // komponen validasi password
    const newPasswordFieldType = ref<"password" | "text">("password");
    const confirmPasswordFieldType = ref<"password" | "text">("password");

    // komponen modal tambah data
    const newuser_username = ref("Ipanmilal13");
    const newuser_name = ref("ipan saepul milal");
    const newuser_email = ref("ipansaepulmilal13@gmail.com");
    const newpassword = ref("Henshin555");
    const newconfirm_password = ref("Henshin555");

    const resetForm = () => {
      newuser_username.value = "";
      newuser_name.value = "";
      newuser_email.value = "";
      newpassword.value = "";
      newconfirm_password.value = "";
    };

    // fungsi untuk mengatur fitur darknmode
    const isDarkMode = ref(false);
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("dark", isDarkMode.value);
    };

    // fungsi untuk menjalankan show password
    const toggleNewPasswordVisibility = () => {
      newPasswordFieldType.value =
        newPasswordFieldType.value === "password" ? "text" : "password";
    };

    const toggleValidationPasswordVisibility = () => {
      confirmPasswordFieldType.value =
        confirmPasswordFieldType.value === "password" ? "text" : "password";
    };

    // fungsi untuk menambahkan data user register
    const addUserRegister = async (event: Event) => {
      event.preventDefault(); // cegah reload halaman

      try {
        const formData: AddUserRegister = {
          user_username: newuser_username.value,
          user_name: newuser_name.value,
          user_email: newuser_email.value,
          password: newpassword.value,
          confirm_password: newconfirm_password.value,
        };

        Swal.fire({
          title: "apakah anda yakin?",
          text: "Pastikan data yang di isi sudah benar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Kirim",
          cancelButtonText: "Batal",
          reverseButtons: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const sendData = await userRegisterStore.addUserRegiter(formData);
            Swal.fire({
              icon: "success",
              title: "Sukses",
              html: `${sendData.data.message}`,
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: "info",
              title: "Dibatalkan",
              text: "anda membatalkan pendaftaran.",
            });
          }
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Terjadi kesalahan",
        });
      }
    };

    // komponen validasi password
    const validClass = (condition: boolean) => {
      return condition ? "text-success" : "text-danger";
    };

    const iconClass = (condition: boolean) =>
      condition
        ? "bi bi-check-circle-fill text-success"
        : "bi bi-x-circle-fill text-danger";

    const minChar = computed(() => newpassword.value.length >= 8);
    const upper = computed(() => /[A-Z]/.test(newpassword.value));
    const lower = computed(() => /[a-z]/.test(newpassword.value));
    const number = computed(() => /[0-9]/.test(newpassword.value));
    const special = computed(() => /[^A-Za-z0-9]/.test(newpassword.value));
    const match = computed(
      () => newpassword.value === newconfirm_password.value
    );

    const isValid = computed(
      () =>
        newuser_username.value &&
        newuser_name.value &&
        newuser_email.value &&
        minChar.value &&
        upper.value &&
        lower.value &&
        number.value &&
        special.value &&
        match.value
    );

    return {
      // komponen darkmode
      isDarkMode,

      // komponen show password
      toggleNewPasswordVisibility,
      toggleValidationPasswordVisibility,
      newPasswordFieldType,
      confirmPasswordFieldType,

      // komponen tambah data
      addUserRegister,
      newuser_username,
      newuser_name,
      newuser_email,
      newpassword,
      newconfirm_password,

      // komponen validsi
      minChar,
      upper,
      lower,
      number,
      special,
      match,
      isValid,
      validClass,
      iconClass,
    };
  },
});
</script>

<style scoped>
@media (min-width: 576px) {
  .size-img {
    width: 24rem;
  }
}
@media (max-width: 576px) {
  .size-img {
    width: 10rem;
  }
}
</style>
