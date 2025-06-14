<template>
  <h1 class="text-red-500 text-3xl font-semibold text-center">{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="updatedCount(1)">count is {{ count }}</button>
  </div>

</template>

<script >
export default {
  methods: {
    updatedCount(index) {
      this.$store.UpdateCount(index)
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    count() {
      return this.$store.count
    }
  },

  mounted() {
    console.log('HelloWorld component mounted')

    // axios api
    console.log('axios api: ', import.meta.env.VITE_APP_HOST)
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
