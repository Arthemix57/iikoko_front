<template>
    <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Gestion Produits</h2>

        <!-- Barre de filtre -->
        <input v-model="filtre" placeholder="🔍 Rechercher produit..."
            class="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <!-- Liste Produits -->
        <div class="bg-white shadow rounded-3xl overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-100 text-left">
                    <tr>
                        <th class="p-4">Nom</th>
                        <th class="p-4">Prix (€)</th>
                        <th class="p-4">Stock</th>
                        <th class="p-4">TVA</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prod in produitsFiltres" :key="prod.id" class="border-t">
                        <td class="p-4">{{ prod.nom }}</td>
                        <td class="p-4">{{ prod.prix }}</td>
                        <td class="p-4">{{ prod.quantite }}</td>
                        <td class="p-4">{{ prod.tva }}</td>
                        <td class="p-4 text-right space-x-2">
                            <button @click="ouvrirModal(prod)"
                                class="px-3 py-1 bg-black text-white rounded-xl hover:bg-gray-800">
                                Modifier
                            </button>
                            <button @click="supprimerProduit(prod.id)"
                                class="px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Edition -->
        <div v-if="modalActif" class="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-50">
            <div class="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
                <h3 class="text-xl font-semibold mb-4">Modifier Produit</h3>

                <label class="block mb-1 font-medium">Nom</label>
                <input v-model="form.nom" type="text" class="w-full border rounded-xl px-4 py-3 mb-3" />

                <label class="block mb-1 font-medium">Prix (€)</label>
                <input v-model="form.prix" type="number" step="0.01" class="w-full border rounded-xl px-4 py-3 mb-3" />

                <label class="block mb-1 font-medium">Stock</label>
                <input v-model="form.quantite" type="number" class="w-full border rounded-xl px-4 py-3 mb-3" />

                <label class="block mb-1 font-medium">TVA</label>
                <input v-model="form.tva" type="text" class="w-full border rounded-xl px-4 py-3 mb-4" />

                <div class="flex justify-end space-x-3">
                    <button @click="modalActif = false" class="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400">
                        Annuler
                    </button>
                    <button @click="enregistrerProduit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            produits: [],
            filtre: '',
            modalActif: false,
            form: {
                id: null,
                nom: '',
                prix: '',
                quantite: '',
                tva: '',
            },
        };
    },

    computed: {
        produitsFiltres() {
            if (!this.filtre) return this.produits;
            return this.produits.filter(p =>
                p.nom.toLowerCase().includes(this.filtre.toLowerCase())
            );
        },
                api() {
            return import.meta.env.VITE_APP_HOST;
        },
    },

    mounted() {
        this.chargerProduits();
    },

    methods: {
        async chargerProduits() {
            const res = await this.axios.get(`${this.api}GetProduct`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            this.produits = res.data[0];
            console.log(this.produits);
        },

        ouvrirModal(prod) {
            this.form = { ...prod };
            this.modalActif = true;
        },

        async enregistrerProduit() {
            await this.axios.put(`${this.api}produits/${this.form.id}`, this.form, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            this.modalActif = false;
            this.chargerProduits();
        },

        async supprimerProduit(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
                await this.axios.delete(`${this.api}produits/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                this.chargerProduits();
            }
        },
    },
};
</script>
