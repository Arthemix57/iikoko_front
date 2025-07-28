import { defineStore } from 'pinia'

export const CaisseStore = defineStore('CaisseStore', {
  state: () => ({
    products: [],
    panier: [], // {productId, quantite}
  }),
  getters: {
    panierDetail(state) {
      return state.panier.map(item => {
        const produit = state.products.find(p => p.id === item.productId)
        console.log(produit)
        return {
          ...item,
          quantite: item.quantite,
          nom: produit.nom,
          prix: produit.prix,
          total: produit.prix * item.quantite,
        }
      })
    },
    totalPanier(state) {
      return state.panierDetail.reduce((acc, item) => acc + item.total, 0).toFixed(2)
    },
  },
  actions: {
    ajouterAuPanier(productId) {
      const produit = this.products.find(p => p.id === productId)
      if (!produit || produit.quantite === 0) {
        alert('Produit en rupture de stock')
        return
      }
      const item = this.panier.find(i => i.productId === productId)
      if (item) {
        if (item.quantite < produit.quantite) {
          item.quantite++
        } else {
          alert('Stock insuffisant')
        }
      } else {
        this.panier.push({ productId, quantite: 1 })
      }
    },
    supprimerDuPanier(productId) {
      this.panier = this.panier.filter(i => i.productId !== productId)
    },
  },
})
