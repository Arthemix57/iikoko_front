<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-semibold text-gray-900 mb-10 text-center">Bienvenue sur votre caisse</h1>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="section in sections"
            :key="section.title"
            class="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 cursor-pointer"
          >
            <div class="text-4xl mb-4">{{ section.icon }}</div>
            <div class="text-lg font-semibold text-gray-800">{{ section.title }}</div>
            <p class="text-sm text-gray-500 mt-1">{{ section.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const sections = [
    {
      icon: '🛒',
      title: 'Encaissement',
      description: 'Gérez vos ventes rapidement'
    },
    {
      icon: '📊',
      title: 'Tableau de bord',
      description: 'Vue d\'ensemble de votre activité'
    },
    {
      icon: '📈',
      title: 'Résultats',
      description: 'Accès aux statistiques détaillées'
    },
    {
      icon: '👤',
      title: 'Compte client',
      description: 'Historique et fidélité des clients'
    },
    {
      icon: '⚙️',
      title: 'Paramètres',
      description: 'Configuration du système et des produits'
    },
    {
      icon: '📅',
      title: 'Programme',
      description: 'Promotions, horaires et plannings'
    }
  ]
  </script>
  
  <style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }
  </style>
  