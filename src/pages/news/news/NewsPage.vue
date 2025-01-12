<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import NewsImage from '@/pages/news/news/ui/NewsImage.vue'
import { createReleaseDate } from '@/shared/helpers/functions'
import { type INews, useNewsStore } from '@/entities/news'
import AppLoader from '@/shared/ui/AppLoader.vue'

const route = useRoute()
const newsStore = useNewsStore()

const loading = ref(false)
const news = ref<INews | null>(null)

onMounted(async () => {
  if (!newsStore.news.length) {
    await fetchNews()
  }
  getNewsById(route.params.id)
})

// Дата выхода новости
const releaseDate = computed((): string => {
  return news.value?.releaseDate ? createReleaseDate(news.value.releaseDate) : ''
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
 * Находит новость по id
 * @param newsId
 */
function getNewsById(newsId: string | string[] | undefined) {
  if (newsId && typeof newsId === 'string') {
    const currentNews = newsStore.findNewsById(newsId)
    if (currentNews) {
      news.value = { ...currentNews }
    }
  }
}
</script>

<template>
  <!-- loader -->
  <AppLoader v-if="loading" />

  <!-- content -->
  <section v-if="!loading && news" class="text-textPrimary pt-4 pt-sm-6 pt-md-8">
    <h1 class="text-h2 font-weight-bold mb-6">{{ news.title }}</h1>

    <h2 v-html="news.anons" class="text-body-1 opacity-80 mb-6"></h2>

    <NewsImage :news="news" />

    <!-- text -->
    <p v-html="news.fullText" class="text-justify mb-6"></p>

    <!-- date, author, source -->
    <div class="d-flex flex-column align-end">
      <p class="d-flex justify-end">{{ releaseDate }}</p>
      <span v-if="news.author" class="d-block text-end font-weight-medium">
        {{ news.author }}
      </span>
      <a v-if="news.link" :href="news.link" target="_blank" class="text-decoration-underline">
        Источник
      </a>
    </div>
  </section>
  <section v-else>
    <h2 class="text-h3 text-textPrimary text-center mt-8 py-6 border-t border-b">
      Новость не найдена
    </h2>
    <div class="text-center pt-6">
      <RouterLink :to="{ name: 'newsList' }">
        <v-btn color="primary">На главную</v-btn>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
