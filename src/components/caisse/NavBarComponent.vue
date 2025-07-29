<template>
    <div class="">
        <nav
            class="backdrop-blur-xl bg-white/80 border-b  border-gray-200 shadow-sm flex items-center justify-between px-6 py-3 rounded-b-xl fixed top-0 left-0 right-0 z-[150]">
            <div class="flex items-center space-x-4">
                <router-link to="/" class="text-lg font-semibold text-gray-900 select-none">King <span
                        class="font-semibold text-blue-700">caisse</span></router-link>
            </div>

            <div class="flex items-center space-x-4">
                <router-link to="/caisse" class="text-gray-700 hover:text-blue-600 transition font-medium select-none"
                    aria-label="Caisse">
                    Caisse
                </router-link>
                <router-link to="/produits" class="text-gray-700 hover:text-blue-600 transition font-medium select-none"
                    aria-label="Produits">
                    Produits </router-link>
            </div>

            <div v-if="auth" class="flex items-center space-x-3">
                <p class="text-gray-700 font-medium select-none">
                    <span class="text-blue-600">{{ $userStore.user?.name }}</span>
                </p>
                <LogoutComponent v-if="LogoutTap" @close="LogoutTap = false" />
                <button @click="LogoutTap = true"
                    class="bg-red-600 text-white p-px rounded-xl shadow hover:bg-red-700 transition font-semibold"
                    aria-label="Déconnexion">
                    <svg fill="#ffffff" width="24px" height="24px" viewBox="-2 0 19 19"
                        xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg">
                        <path
                            d="M7.498 17.1a7.128 7.128 0 0 1-.98-.068 7.455 7.455 0 0 1-1.795-.483 7.26 7.26 0 0 1-3.028-2.332A7.188 7.188 0 0 1 .73 12.52a7.304 7.304 0 0 1 .972-7.128 7.221 7.221 0 0 1 1.387-1.385 1.03 1.03 0 0 1 1.247 1.638 5.176 5.176 0 0 0-.993.989 5.313 5.313 0 0 0-.678 1.181 5.23 5.23 0 0 0-.348 1.292 5.22 5.22 0 0 0 .326 2.653 5.139 5.139 0 0 0 .69 1.212 5.205 5.205 0 0 0 .992.996 5.257 5.257 0 0 0 1.178.677 5.37 5.37 0 0 0 1.297.35 5.075 5.075 0 0 0 1.332.008 5.406 5.406 0 0 0 1.32-.343 5.289 5.289 0 0 0 2.211-1.682 5.18 5.18 0 0 0 1.02-2.465 5.2 5.2 0 0 0 .01-1.336 5.315 5.315 0 0 0-.343-1.318 5.195 5.195 0 0 0-.695-1.222 5.134 5.134 0 0 0-.987-.989 1.03 1.03 0 1 1 1.24-1.643 7.186 7.186 0 0 1 1.384 1.386 7.259 7.259 0 0 1 .97 1.706 7.413 7.413 0 0 1 .473 1.827 7.296 7.296 0 0 1-4.522 7.65 7.476 7.476 0 0 1-1.825.471 7.203 7.203 0 0 1-.89.056zM7.5 9.613a1.03 1.03 0 0 1-1.03-1.029V2.522a1.03 1.03 0 0 1 2.06 0v6.062a1.03 1.03 0 0 1-1.03 1.03z" />
                    </svg>
                </button>
            </div>
        </nav>
        <div class="">
            <div class="h-16"></div>
            <router-view name="one" />
        </div>
    </div>
</template>
<script>
import LogoutComponent from '../LogoutComponent.vue';

export default {
    components:{
        LogoutComponent
    },
    data() {
        return {
            auth: false,
            LogoutTap:false,
        }
    },
    methods: {

    },
    created() {
        // console.log(this.$CaisseStore.products);
        this.axios.get(`${this.api}user`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } })
            .then(({ data }) => {
                this.auth = true;
                this.$userStore.setUser(data.user);
            })
            .catch(error => {
                localStorage.clear()
                this.$router.push('/');
            })
            .finally(() => {
                this.loading = false;
                this.pin = '';
            });
    },
    computed: {
        api() {
            return import.meta.env.VITE_APP_HOST;
        },
        products() {
            return this.$CaisseStore.products;
        }
    }
}
</script>