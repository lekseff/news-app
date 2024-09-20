import api from '@/shared/api'

const URL = '/api/rbc/logical/footer/news.rss'

/**
 * Получает список новостей
 */
export async function getNewsApi() {
  return await api.get(URL)
}
