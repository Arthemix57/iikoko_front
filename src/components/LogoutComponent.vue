<template>
    <div class="fixed inset-0 h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm z-[90]">
        <div class="bg-white rounded-2xl shadow-xl w-80 p-6 text-center">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Déconnexion</h2>
            <p class="text-gray-600 mb-2">
                Voulez-vous vraiment vous déconnecter ?
            </p>
            <p class="text-gray-500 text-sm mb-6">
                ⚠️ Cette action fermera aussi la caisse ouverte et enregistrera son état actuel.
            </p>
            <div class="flex justify-center mb-4">
                <LoadingComponent v-if="loadingTap" />
            </div>
            <div v-if="!loadingTap" class="flex justify-between space-x-4">
                <button @click="cancel"
                    class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition">
                    Annuler
                </button>
                <button @click="confirm"
                    class="flex-1 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                    Déconnexion
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingComponent from './LoadingComponent.vue';
export default {
    computed: {
        api() {
            return import.meta.env.VITE_APP_HOST;
        },
    },
    data() {
        return {
            loadingTap: false
        }
    },
    components: {
        LoadingComponent
    },
    methods: {
        cancel() {
            this.$emit("close");
        },
        confirm() {
            this.loadingTap = true;
            this.axios.get(`${this.api}logout`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } })
                .then(() => {
                    this.loadingTap = false;
                    this.auth = false;
                    this.$userStore.clearUser();
                    localStorage.clear()
                    this.$router.push({ name: "home" });
                    this.cancel();
                })
        }
    }
};
</script>
