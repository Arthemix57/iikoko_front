<template>
    <div class="min-h-screen bg-gray-50 relative">
        <!-- Formulaire ajout produit -->
        <div v-if="showForm"
            class="flex h-screen justify-center items-center absolute z-50 w-full bg-black/20 backdrop-blur-md">
            <div class=" z-50 max-w-lg mx-auto  border bg-white border-gray-200 rounded-2xl shadow-md p-6 "
                aria-label="Ajouter un produit temporaire">
                <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center select-none">Ajouter un produit
                    temporaire
                </h2>

                <form @submit.prevent="ajouterProduitTemporaire" class="space-y-5">
                    <input v-model="newProduit.nom" type="text" placeholder="Nom du produit" required
                        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        autocomplete="off" spellcheck="false" aria-label="Nom du produit" />

                    <input v-model.number="newProduit.prix" type="number" step="0.01" placeholder="Prix (€)" required
                        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        aria-label="Prix du produit en euros" />

                    <input v-model.number="newProduit.quantite" type="number" placeholder="quantite initial" required
                        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        aria-label="Stock initial du produit" />

                    <input v-model.number="newProduit.tva" type="number" placeholder="tva" required
                        class="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        aria-label="tva du produit" />


                    <div class="flex justify-end space-x-3 items-center">
                        <button @click="showForm = false" :disabled="loading"
                            class="text-gray-500 hover:text-gray-700 transition font-semibold">Annuler</button>
                        <button type="submit" :disabled="loading"
                            class=" bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded py-1 px-2 font-semibold shadow-md transition focus:ring-4 focus:ring-blue-300"
                            aria-label="Ajouter le produit au catalogue temporaire">
                            <loading-component v-if="loading" />
                            <span v-else>Ajouter un produit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showConfirmation"
            class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-lg text-center">
                <h3 class="text-xl font-semibold mb-4">Confirmer le paiement</h3>
                <p class="mb-6 text-gray-700">
                    Total à payer : <strong>{{ $CaisseStore.totalPanier }} €</strong>
                </p>
                <div class="flex justify-center space-x-6">
                    <button @click="effectuerPaiement"
                        class="bg-green-600 text-white px-6 py-2 rounded-2xl hover:bg-green-700 transition font-semibold">
                        Valider
                    </button>
                    <button @click="showConfirmation = false"
                        class="bg-gray-300 text-gray-700 px-6 py-2 rounded-2xl hover:bg-gray-400 transition font-semibold">
                        Annuler
                    </button>
                </div>
            </div>
        </div>


        <!-- Produits + Panier -->
        <div class="flex max-w-7xl mx-auto space-x-10 p-8">
            <!-- Liste des produits -->
            <section
                class="flex-1 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 overflow-auto max-h-[70vh]"
                aria-label="Liste des produits disponibles">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-semibold mb-6 select-none">Produits disponibles</h2>
                    <button @click="showForm = true"
                        class=" px-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-2xl py-3 font-semibold shadow-md transition focus:ring-4 focus:ring-green-300">
                        Ajouter un produit
                    </button>
                </div>
                <ul class="divide-y divide-gray-200">
                    <li v-for="prod in $CaisseStore.products" :key="prod.id"
                        class="flex justify-between items-center py-4"
                        :class="{ 'opacity-50 cursor-not-allowed': prod.quantite === 0 }">
                        <div>
                            <p class="text-lg font-medium text-gray-900 select-text">{{ prod.nom }}</p>
                            <p class="text-sm text-gray-600 select-text">Prix : {{ parseFloat(prod.prix).toFixed(2) }} € | ({{ prod.tva }})</p>
                            <p class="text-sm text-gray-600 select-text">Stock : {{ prod.quantite }}</p>
                        </div>
                        <button @click="$CaisseStore.ajouterAuPanier(prod.id)" :disabled="prod.quantite === 0"
                            class="rounded-3xl bg-blue-600 px-5 py-2 text-white font-semibold shadow-md transition hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed select-none"
                            aria-label="Ajouter {{ prod.nom }} au panier">
                            Ajouter
                        </button>
                    </li>
                </ul>
            </section>

            <!-- Panier -->
            <aside
                class="w-96 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col"
                aria-label="Panier">
                <h2 class="text-2xl font-semibold mb-6 select-none">Panier</h2>

                <ul v-if="$CaisseStore.panierDetail.length > 0"
                    class="divide-y divide-gray-200 flex-grow overflow-auto max-h-[55vh]">
                    <li v-for="item in $CaisseStore.panierDetail" :key="item.productId"
                        class="flex justify-between items-center py-4">
                        <div>
                            <p class="font-medium text-gray-900 select-text">{{ item?.nom }}</p>
                            <p class="text-sm text-gray-600 select-text">
                                Quantité : {{ parseFloat(item.quantite) }} × {{ parseFloat(item.prix).toFixed(2) }} € = {{ parseFloat(item.total).toFixed(2)
                                }} €
                            </p>
                        </div>
                        <button @click="$CaisseStore.supprimerDuPanier(item.productId)"
                            class="text-red-600 font-bold hover:text-red-800 select-none"
                            aria-label="Supprimer {{ item.nom }} du panier">
                            ×
                        </button>
                    </li>
                </ul>

                <p v-else class="text-gray-500 text-center select-none flex-grow flex items-center justify-center">
                    Le panier est vide
                </p>

                <div class="mt-6 border-t border-gray-300 pt-4 font-semibold text-xl select-text">
                    Total : {{ $CaisseStore.totalPanier }} €
                </div>
                <button @click="confirmerPaiement" :disabled="$CaisseStore.panierDetail.length === 0"
                    class="mt-4 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-2xl py-3 font-semibold shadow-md transition focus:ring-4 focus:ring-green-300">
                    Payer {{ $CaisseStore.totalPanier }} €
                </button>
            </aside>
        </div>


    </div>
</template>

<script>
import LoadingComponent from '../LoadingComponent.vue';
export default {
    created() {
        this.axios.get(`${this.api}GetProduct`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } })
            .then(({ data }) => {
                this.$CaisseStore.products = data[0];
            })
            .catch(error => {   
                this.alert.type = "error";
                this.alert.message = "erreur lors de la récupération des produits";
            })
    },
    name: 'Caisse',
    components: {
        LoadingComponent,
    },
    data() {
        return {
            newProduit: {
                nom: '',
                prix: "",
                quantite: "",
                tva: ""
            },
            showConfirmation: false,
            showForm: false,
            loading: false,
        }
    },
    computed: {
        api() {
            return import.meta.env.VITE_APP_HOST;
        }
    },
    methods: {
        ajouterProduitTemporaire() {
            if (!this.newProduit.nom.trim() || this.newProduit.prix <= 0 || this.newProduit.quantite < 0) {
                this.alert.type = "error";
                this.alert.message = "Veuillez saisir des valeurs valides";
                return
            }

            let data = new FormData();
            data.append("nom", this.newProduit.nom.trim())
            data.append("prix", this.newProduit.prix)
            data.append("quantite", this.newProduit.quantite)
            data.append("tva", this.newProduit.tva)
            this.loading = true;
            this.axios.post(`${this.api}SaveProduct`, data, { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } })
                .then(() => {
                    this.$CaisseStore.products.push({
                        nom: this.newProduit.nom.trim(),
                        prix: this.newProduit.prix,
                        quantite: this.newProduit.quantite,
                        tva: this.newProduit.tva,
                    })
                    this.newProduit.nom = ''
                    this.newProduit.prix = 0
                    this.newProduit.quantite = 0
                    this.newProduit.tva = 0
                    this.showForm = false
                    this.loading = false;
                })
                .catch(error => {
                    this.alert.type = "error";
                    this.alert.message = error.response.data?.message;
                    this.loading = false
                })

        },

        confirmerPaiement() {
            // Vérifier stock avant d’afficher modal
            const manqueStock = this.$CaisseStore.panierDetail.find(
                (item) => item.quantite > item.quantite
            )
            if (manqueStock) {
                alert(
                    `Stock insuffisant pour le produit "${manqueStock.nom}". Veuillez ajuster la quantité.`
                )
                return
            }
            this.showConfirmation = true
        },

        effectuerPaiement() {
            // Décrémenter stock localement
            this.$CaisseStore.panierDetail.forEach((item) => {
                const produit = this.$CaisseStore.products.find((p) => p.id === item.productId)
                if (produit) {
                    produit.quantite -= item.quantite
                }
            })

            // Enregistrer vente + lignes ici (appel API futur)
            console.log("panier detail: ", this.$CaisseStore.panierDetail);

            let data = new FormData();
            data.append("panier", JSON.stringify(this.$CaisseStore.panierDetail))
            this.axios.post(`${this.api}SaveVente`, data, { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } })
                .then(() => {
                    this.$CaisseStore.panier = []
                    this.showConfirmation = false
                })
                .catch(error => {
                    this.alert.type = "error";
                    this.alert.message = error.response.data?.message;
                })
                .finally(() => {
                    this.loading = false;
                    this.pin = '';
                });


        },
    },
}
</script>
