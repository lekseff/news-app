<script setup lang="ts">
import { reactive } from 'vue'
import BaseCalendarField from '@/shared/ui/BaseCalendarField.vue'
import BaseTextInputField from '@/shared/ui/BaseTextInputField.vue'
import { debounce } from '@/shared/helpers/functions'
import { filterHandlers, getActiveFilters } from '@/features/newsFilters'
import type { INews, INewsFilters } from '@/entities/news'

interface Props {
  news: INews[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  onFilter: [filters: INews[]]
}>()

const filters = reactive<INewsFilters>({
  title: '',
  date: '',
})

const handlerSearch = debounce(onFilter, 300)

/**
 * Обработчик выбора фильтра
 */
function onFilter() {
  const activeFilters = getActiveFilters(filters)
  const result = applyFilters(props.news, activeFilters)
  emit('onFilter', result)
}

/**
 * Применяет фильтр
 * @param news
 * @param filters
 */
function applyFilters(news: INews[], filters: INewsFilters) {
  const filtersKeys = Object.keys(filters)
  if (!filtersKeys.length) return news

  return news.filter((n) => {
    return filtersKeys.every((key) => {
      // @ts-ignore
      const newsValue = n[key as keyof typeof news]
      // @ts-ignore
      const filterValue = filters[key]
      return filterHandlers[key as keyof typeof filterHandlers](newsValue, filterValue)
    })
  })
}
</script>

<template>
  <v-form @submit.prevent>
    <v-row>
      <v-col cols="12" md="8">
        <BaseTextInputField
          v-model="filters.title"
          label="Поиск"
          hide-details
          @update:model-value="handlerSearch"
        />
      </v-col>

      <v-col cols="12" md="4">
        <BaseCalendarField v-model="filters.date" hide-details @update:model-value="onFilter" />
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped></style>
