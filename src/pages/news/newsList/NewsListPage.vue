<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import AppLoader from '@/shared/ui/AppLoader.vue'
import NewsListCard from '@/pages/news/newsList/ui/NewsListCard.vue'
import { NewsFilters } from '@/features/newsFilters'
import { ThePagination } from '@/features/pagination'
import { type INews, useNewsStore } from '@/entities/news'

const newsStore = useNewsStore()

const ITEMS_PER_PAGE = 5
const currentPage = ref(1)

const loading = ref(false)
const { news } = storeToRefs(newsStore)

const filteredNews = ref<INews[]>([])

onMounted(async () => {
  if (!news.value.length) {
    await fetchNews()
  }
  filteredNews.value = [...news.value]
})

const newsList = computed(() => {
  const offset = ITEMS_PER_PAGE * (currentPage.value - 1)
  return filteredNews.value.slice(offset, offset + ITEMS_PER_PAGE)
})

/**
 * Загружает список новостей
 */
async function fetchNews() {
  try {
    loading.value = true
    await newsStore.fetchNews()
  } finally {
    loading.value = false
  }
}

/**
 * Применяет фильтр
 * @param filNews
 */
function onFilter(filNews: INews[]) {
  filteredNews.value = [...filNews]
  currentPage.value = 1
}
</script>

<template>
  <!-- loader -->
  <AppLoader v-if="loading" />

  <!-- content -->
  <template v-else>
    <v-sheet class="pa-4 rounded-lg border mb-6">
      <NewsFilters :news @on-filter="onFilter" />
    </v-sheet>

    <template v-if="newsList.length">
      <v-sheet class="d-flex flex-column ga-6">
        <NewsListCard v-for="item in newsList" :key="item.id" :news="item" />
      </v-sheet>

      <ThePagination
        v-model:page="currentPage"
        :total="filteredNews.length"
        :items-per-page="ITEMS_PER_PAGE"
        class="mt-6"
      />
    </template>
    <h2 v-else class="text-h3 text-textPrimary text-center mt-8 py-8 border-t border-b">
      Новостей нет
    </h2>
  </template>
</template>

<style scoped></style>
