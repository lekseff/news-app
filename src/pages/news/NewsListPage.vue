<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/entities/news'
import NewsCard from '@/pages/news/ui/NewsCard.vue'

const newsStore = useNewsStore()
const { news } = storeToRefs(newsStore)
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <NewsCard v-for="item in news" :key="item.id" :news="item" />
  </div>
</template>

<style scoped></style>
