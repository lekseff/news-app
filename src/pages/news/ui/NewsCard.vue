<script setup lang="ts">
import { computed } from 'vue'
import type { INews } from '@/entities/news'
import { createReleaseDate } from '@/shared/helpers/functions'

interface Props {
  news: INews
}

const props = defineProps<Props>()

// Дата выхода новости
const releaseDate = computed((): string => {
  return createReleaseDate(props.news.releaseDate)
})
</script>

<template>
  <v-sheet class="text-textPrimary rounded-lg border pa-4 news-card">
    <RouterLink :to="{ name: 'news', params: { id: news.id } }">
      <h2 class="d-inline-block text-h6 font-weight-bold cursor-pointer mb-4 news-card__title">
        <span>{{ news.title }}</span>
      </h2>
    </RouterLink>
    <p class="text-body-1 font-weight-regular mb-3" v-html="news.anons"></p>
    <div class="text-end">
      <span class="text-body-1 opacity-80"> {{ releaseDate }} </span>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
.news-card {
  &__title {
    line-height: 140% !important;

    span {
      border-bottom: 1.5px solid transparent;
      transition: border-bottom 200ms ease-out;

      @media (hover: hover) {
        &:hover {
          border-bottom: 1.5px solid rgba(var(--v-theme-textPrimary));
          transition: border-bottom 120ms ease-out;
        }
      }
    }
  }
}
</style>
