import type { INewsFilters } from '@/entities/news'

// Фильтр и обработчики
export const filterHandlers = {
  title: filterSearchHandler,
  date: filterDatePublishHandler,
}

/**
 * Убирает неактивные фильтры
 */
export function getActiveFilters(filters: INewsFilters) {
  let activeFilters: INewsFilters = {}
  Object.keys(filters).forEach((key) => {
    if (filters[key as keyof typeof filters]) {
      activeFilters = Object.assign(activeFilters, {
        [key]: filters[key as keyof typeof filters],
      })
    }
  })
  return activeFilters
}

/**
 * Фильтр поиска по названию
 * @param newsTitle
 * @param filterTitle
 */
function filterSearchHandler(newsTitle: string, filterTitle: string): boolean {
  return newsTitle.toLowerCase().includes(filterTitle.trim().toLowerCase())
}

/**
 * Фильтр по дате публикации
 * @param newsDate
 * @param filterDate
 */
function filterDatePublishHandler(newsDate: string, filterDate: string): boolean {
  const releaseDate = new Date(newsDate).getTime()
  const date = new Date(filterDate).getTime()
  return releaseDate === date
}
