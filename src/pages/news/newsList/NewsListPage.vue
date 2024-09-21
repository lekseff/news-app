<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useNewsStore } from '@/entities/news'
import NewsListCard from '@/pages/news/newsList/ui/NewsListCard.vue'
import { ThePagination } from '@/features/pagination'

const newsStore = useNewsStore()

const ITEMS_PER_PAGE = 5

const loading = ref(true)
const currentPage = ref(1)
const { news } = storeToRefs(newsStore)

onMounted(async () => {
  if (!news.value.length) {
    await fetchNews()
  }
})

const newsList = computed(() => {
  const offset = ITEMS_PER_PAGE * (currentPage.value - 1)
  return news.value.slice(offset, offset + ITEMS_PER_PAGE)
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
    <NewsListCard v-for="item in newsList" :key="item.id" :news="item" />
  </div>

  <ThePagination
    v-model:page="currentPage"
    :total="news.length" :items-per-page="ITEMS_PER_PAGE"
    class="mt-6"
  />
</template>

<style scoped></style>
