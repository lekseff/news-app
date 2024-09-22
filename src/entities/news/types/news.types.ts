export interface INews {
  id: string
  title: string
  link: string
  anons: string
  date: string
  description: string
  category: string | null
  media: INewsMedia[]
  releaseDate: string
  fullText: string
  author: string | null
}

export interface INewsMedia {
  url: string
  type: string
}

export interface INewsFilters {
  title?: string // Поиск по названию
  date?: string // Дата публикации
}
