<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import { useNewsStore } from '@/entities/news'
import type { Layouts } from '@/app/layouts/ELayouts'

const route = useRoute()
const newsStore = useNewsStore()

const loading = ref(true)
const { news } = storeToRefs(newsStore)

const layoutComponents = {
  default: DefaultLayout,
}

onMounted(async () => {
  if(!news.value.length) {
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

// Текущий шаблон
const layout = computed(() => {
  const currentLayout = route.meta.layout as Layouts
  return layoutComponents[currentLayout]
})
</script>

<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<style scoped></style>
