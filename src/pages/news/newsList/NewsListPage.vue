<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/entities/news'
import NewsListCard from '@/pages/news/newsList/ui/NewsListCard.vue'

const newsStore = useNewsStore()

const loading = ref(true)
const { news } = storeToRefs(newsStore)

onMounted(async () => {
  if (!news.value.length) {
    await fetchNews()
  }
})

/**
 * Загружает список новостей
 */
async function fetchNews() {
  try {
    await newsStore.fetchNews()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <NewsListCard v-for="item in news" :key="item.id" :news="item" />
  </div>
</template>

<style scoped></style>
