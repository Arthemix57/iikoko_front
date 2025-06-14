<template>
    <div>
        login
    </div>
</template>
<script>
    export default {
        name: 'Login',
        mounted() {
            console.log('Login component mounted');
            // axios api
            console.log('axios api: ', import.meta.env.VITE_APP_HOST);
        }
    }
</script>