<template>
    <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl">
        <h2 class="text-2xl font-semibold mb-6 text-center">Gestion de Caisse</h2>

        <div v-if="!isOpen">
            <label class="block mb-2 font-medium">Fond de caisse initial (€)</label>
            <input v-model="fondInitial" type="number" min="0" step="0.01" placeholder="Ex: 100"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <button @click="ouvrirCaisse"
                class="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                Ouvrir la caisse
            </button>
        </div>

        <div v-else>
            <p class="text-green-700 mb-4">✅ Caisse ouverte le {{ openedAt }}</p>

            <label class="block mb-2 font-medium">Montant total réel (€)</label>
            <input v-model="totalReel" type="number" min="0" step="0.01" placeholder="Ex: 1500"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label class="block mb-2 font-medium">Détails par mode de paiement</label>
            <textarea v-model="detailsPaiement" rows="3" placeholder="Ex: Espèces: 500 €, CB: 1000 €"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <button @click="fermerCaisse"
                class="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition">
                Fermer la caisse
            </button>
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
        this.checkCaisseStatus();
    },
    computed: {
        api() {
            return import.meta.env.VITE_APP_HOST;
        },
    },
    data() {
        return {
            fondInitial: '',
            totalReel: '',
            detailsPaiement: '',
            isOpen: false,
            openedAt: null,
        };
    },
    methods:{ 
         checkCaisseStatus() {

            this.axios
                .get(`${this.api}Status`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })
                .then(({ data }) => {
                    if (data.status === 'ouverte') {
                        this.openedAt = data.caisse.ouverture;
                        this.fondInitial = data.caisse.fond_initial;
                    }
                    console.log('Statut caisse récupéré :', data);
                })
                .catch((error) => {
                    console.error('Erreur statut caisse :', error);
                    this.alert = {
                        type: 'error',
                        message: error.response?.data?.message || 'Impossible de vérifier le statut de la caisse',
                    };
                })

        },
        async ouvrirCaisse() {
            if (this.fondInitial === '' || parseFloat(this.fondInitial) < 0) {
                alert('Veuillez entrer un fond de caisse valide.');
                return;
            }

            try {
                const res = await this.axios.post(`${this.api}OpenCaisse`, {
                    fond_initial: this.fondInitial,
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                this.isOpen = true;
                this.openedAt = res.data.caisse.ouverture;
            } catch (error) {
                console.error(error);
                alert('Erreur lors de l\'ouverture.');
            }
        },

        async fermerCaisse() {
            if (this.totalReel === '' || parseFloat(this.totalReel) < 0) {
                alert('Veuillez entrer le montant total réel.');
                return;
            }

            try {
                const res = await this.axios.post(`${this.api}CloseCaisse`, {
                    total_reel: this.totalReel,
                    details_paiement: this.detailsPaiement,
                },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                    });
                this.isOpen = false;
                alert('✅ Caisse fermée avec succès !');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la fermeture.');
            }
        },
    },
};
</script>
