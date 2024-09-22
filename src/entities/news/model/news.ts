import type { INews, INewsMedia } from '@/entities/news'
import { convertDotDate } from '@/shared/helpers/functions'

/**
 * Создает список новостей
 * @param rssXml
 */
export function createNewsList(rssXml: string) {
  const parser: DOMParser = new DOMParser()
  const xml: Document = parser.parseFromString(rssXml, 'text/xml')
  const items: Element[] = [...xml.getElementsByTagName('item')]
  const newsList: INews[] = items.map((e) => {
    const news = createNews(e)
    const media = createMediaList(e)
    return { ...news, media }
  })
  console.log(newsList)
  return newsList
}

/**
 * Создает объект новости
 * @param element
 */
function createNews(element: Element): Omit<INews, 'media'> {
  const title = element.querySelector('title')?.textContent || ''
  const anons = element.getElementsByTagName('rbc_news:anons')[0].textContent || ''
  const link = element.getElementsByTagName('link')[0]?.textContent || ''
  const description = element.getElementsByTagName('description')[0]?.textContent || ''
  const category = element.getElementsByTagName('category')[0]?.textContent || null
  const time = element.getElementsByTagName('rbc_news:time')[0]?.textContent || ''
  const date = element.getElementsByTagName('rbc_news:date')[0]?.textContent || ''
  const id = element.getElementsByTagName('rbc_news:news_id')[0]?.textContent || ''
  const fullText = element.getElementsByTagName('rbc_news:full-text')[0]?.textContent || ''
  const author = element.getElementsByTagName('author')[0]?.textContent || null

  return {
    id,
    title,
    link,
    anons,
    author,
    fullText,
    category,
    description,
    date: convertDotDate(date),
    releaseDate: generateFullDate(date, time),
  }
}

/**
 * Создает список изображений
 * @param element
 */
function createMediaList(element: Element): INewsMedia[] {
  const mediaElements = element.getElementsByTagName('enclosure')
  const media: INewsMedia[] = []

  Array.from(mediaElements).forEach((i) => {
    const url = i.getAttribute('url')
    const type = i.getAttribute('type')

    if (url && type) {
      media.push({ url, type })
    }
  })
  return media
}

/**
 * Сортирует список новостей по дате публикации от свежих к старым
 * @param newsList
 */
export function sortNewsByDateDesc(newsList: INews[]) {
  return newsList.sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  )
}

/**
 * Создает полную дату выхода новости
 * @param date
 * @param time
 */
function generateFullDate(date: string, time: string): string {
  const validDate = convertDotDate(date)
  return new Date(`${validDate} ${time}`).toString()
}


