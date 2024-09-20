import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import type { ThemeDefinition } from 'vuetify'

const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#886ed5', // Основной
    success: '#28b42e',
    error: '#F44336', // Ошибка
    danger: '#F44336', // Предупреждение
    warning: '#ff8a00',
    textPrimary: '#2E2E2E', // Основной текст
  },
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme,
    },
  },
})
