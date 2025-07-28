<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center relative">
    <!-- Contenu principal -->
    <div class="blur-sm pointer-events-none select-none opacity-50">
      <h1 class="text-3xl font-bold">💳 Mon Logiciel de Caisse</h1>
      <p class="mt-4">Bienvenue sur votre caisse POS !</p>
    </div>

    <!-- Modal connexion -->
     <login-component />
   
  </div>
</template>

<script>
import LoginComponent from './LoginComponent.vue';
  export default{
    components: {
      LoginComponent
    },

  }
</script>
