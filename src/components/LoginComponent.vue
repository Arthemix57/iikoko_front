<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-md flex-col z-50">
        <alert-component v-if="alert.message.length > 0" :type="alert.type" :message="alert.message" icon
            :duration="5000" />
        <form @submit.prevent="login"
            class="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-80 text-center border border-gray-200">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">Connexion</h2>

            <input type="password" v-model="pin" required placeholder="Entrer votre code PIN"
                class="border border-gray-300 rounded-xl px-4 py-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />

            <button v-if="pin.length > 0" type="submit"
                class="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 flex justify-center w-full font-medium shadow hover:shadow-md transition">
                <loading-component v-if="loading" />
                <span v-else>valider</span>
            </button>
        </form>
    </div>

</template>

<script>
import LoadingComponent from './LoadingComponent.vue';
import AlertComponent from './AlertComponent.vue';
export default {
    components: {
        LoadingComponent,
        AlertComponent
    },
    data() {
        return {
            pin: '',
            loading: false,
            alert: {
                type: "",
                message: "",
            }
        };
    },
    computed: {
        api() {
            return import.meta.env.VITE_APP_HOST;
        }
    },
    methods: {
        login() {
            console.log("Tentative de connexion avec le code PIN :", this.pin);
            if (this.pin.length < 0) {
                this.alert.type = "error";
                this.alert.message = "Veuillez entrer un code PIN";
            } else {
                this.loading = true;
                this.axios
                    .post(`${this.api}loginCaisse`, { code_pin: this.pin })
                    .then(({ data }) => {
                        localStorage.setItem("jwtToken", data.access_token.token);
                        this.$userStore.setUser(data.user);
                        this.$router.push("/caisse");
                    })
                    .catch((error) => {
                        this.alert = {
                            type: "error",
                            message: error.response?.data?.message || "Erreur de connexion",
                        };
                    })
                    .finally(() => {
                        this.loading = false;
                        this.pin = "";
                    });

            }
        }
    }
}
</script>
