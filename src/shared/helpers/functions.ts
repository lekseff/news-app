/**
 * Конвертирует дату формата DD.MM.YYYY в YYYY-MM-DD
 * @param date
 */
export function convertDotDate(date: string) {
  return date.split('.').reverse().join('-')
}

/**
 * Форматирует дату к виду "20 сент. 2024 г."
 * @param date
 */
export function convertDateToLocale(date: string): string {
  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return formatter.format(new Date(date))
}

/**
 * Получает время из полной даты
 * @param date
 */
export function getTimeFromDate(date: string): string {
  return new Date(date).toLocaleTimeString()
}

/**
 * Создает дату и время выхода новости в формате "20 сент. 2024 г., 23:56:00"
 * @param date
 */
export function createReleaseDate(date: string) {
  const dateLocale = convertDateToLocale(date)
  const time = getTimeFromDate(date)
  return `${dateLocale}, ${time}`
}
