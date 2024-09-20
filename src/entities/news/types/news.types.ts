export interface INews {
  id: string
  title: string
  link: string
  anons: string
  description: string
  category: string | null
  media: INewsMedia[]
  updateDate: string | null
  releaseDate: string
  fullText: string
  author: string | null
}

export interface INewsMedia {
  url: string
  type: string
}
