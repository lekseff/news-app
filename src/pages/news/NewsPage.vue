<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { type INews, useNewsStore } from '@/entities/news'
import { createReleaseDate } from '@/shared/helpers/functions'

const route = useRoute()
const newsStore = useNewsStore()

const news = ref<INews | null>(null)

onMounted(() => {
  const newsId = route.params.id
  if (newsId && typeof newsId === 'string') {
    const currentNews = newsStore.findNewsById(newsId)
    if (currentNews) {
      news.value = { ...currentNews }
    }
  }
})

const releaseDate = computed((): string => {
  return news.value?.releaseDate ? createReleaseDate(news.value.releaseDate) : ''
})
</script>

<template>
  <section v-if="news" class="text-textPrimary">
    <h1 class="text-h2 font-weight-bold mb-6">{{ news.title }}</h1>

    <h2 class="text-body-1 opacity-80 mb-6">{{ news.anons }}</h2>
    <!-- images -->
    <template v-if="news.media.length">
      <v-img
        :src="news.media[0].url"
        max-width="560"
        class="rounded-lg mb-6 float-left w-100 mr-6"
      ></v-img>
    </template>

    <!-- text -->
    <p v-html="news.fullText" class="text-justify"></p>

    <!-- date, author, source -->
    <div class="d-flex flex-column align-end ga-1">
      <p class="d-flex justify-end">{{ releaseDate }}</p>
      <span v-if="news.author" class="d-block text-end font-weight-medium">
        {{ news.author }}
      </span>
      <a v-if="news.link" :href="news.link" target="_blank" class="text-decoration-underline">
        Источник
      </a>
    </div>
  </section>
</template>

<style scoped></style>
