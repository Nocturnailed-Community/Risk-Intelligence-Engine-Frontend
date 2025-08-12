import { defineStore } from "pinia";
import { useCookie } from "#app";

interface User {
  user: UserData;
  access_token: string;
  token_type: string;
}

interface UserData {
  user_image: null;
  user_name: string;
  user_username: string;
  user_email: string;
  user_status: number;
  group_id: number;
  user_portofolio: string;
  user_phone_number: string;
  user_country: string;
  is_email_verified: number;
  email_verified_at: string;
}

function saveToIndexedDB(name: string, value: any) {
  if (!process.client) return;

  const request = indexedDB.open("myAuthDB", 1);

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("auth")) {
      db.createObjectStore("auth", { keyPath: "key" });
    }
  };

  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction("auth", "readwrite");
    const store = tx.objectStore("auth");
    store.put({ key: name, value });
  };
}

function clearIndexedDB() {
  if (!process.client) return;

  const request = indexedDB.open("myAuthDB", 1);
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction("auth", "readwrite");
    const store = tx.objectStore("auth");
    store.clear();
  };
}


export async function deleteIndexedDB(): Promise<void> {
  if (!process.client) return

  const request = indexedDB.deleteDatabase("myAuthDB")

  request.onsuccess = () => {
    console.log("IndexedDB 'myAuthDB' berhasil dihapus.")
  }

  request.onerror = () => {
    console.error("Gagal menghapus IndexedDB 'myAuthDB':", request.error)
  }

  request.onblocked = () => {
    console.warn("Penghapusan IndexedDB diblokir. Tutup tab lain yang masih memakai DB ini.")
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(user: User) {
      this.user = user;

      // Simpan juga ke IndexedDB
      saveToIndexedDB("user_name", user.user.user_name);
      saveToIndexedDB("access_token", user.access_token);
    },

    async logout() {
      this.user = null;

      // Hapus juga dari IndexedDB
      deleteIndexedDB();
    },
  },
});
