<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import Layout from '@/components/Layout.vue'

const cartStore = useCartStore()

onMounted(() => {
  // Cargar carrito desde localStorage
  cartStore.loadFromLocalStorage()
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
