import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getNewsApi } from '@/entities/news/api/news.api'
import { createNewsList, sortNewsByDateDesc } from '@/entities/news/model/news'
import type { INews } from '@/entities/news'

export const useNewsStore = defineStore('newsStore', () => {
  const news = ref<INews[]>([])

  /**
   * Получает список новостей
   */
  async function fetchNews() {
    try {
      const response = await getNewsApi()
      if (response && response.status === 200) {
        const newsList = createNewsList(response.data)
        news.value = sortNewsByDateDesc(newsList)
      }
    } catch (error) {
      // FIXME: Обработка ошибки
      console.log(error)
    }
  }

  /**
   * Находит новость по id
   * @param id
   */
  function findNewsById(id: string): INews | undefined {
    return news.value.find((n) => n.id === id)
  }

  return { news, fetchNews, findNewsById }
})
