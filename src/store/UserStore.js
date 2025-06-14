import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    user: {
      name: "John Doe",
      email: "foguengcyrille@gmail.com",
    },
    count:0,
  }),
  actions: {
    setUser(name, email) {
      this.user.name = name;
      this.user.email = email;
    },
    UpdateCount(index){
        this.count += index;
        if(this.count < 0){
            this.count = 0;
        }
    }
  },
});
