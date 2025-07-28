import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = {};
    },
  },
});
