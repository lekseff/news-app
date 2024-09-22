import type { RouteRecordRaw } from 'vue-router'
import { Layouts } from '@/app/layouts/ELayouts'

export const pageRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'newsList' },
  },
  {
    path: '/news',
    name: 'newsList',
    component: () => import('@/pages/news/newsList/NewsListPage.vue'),
    meta: {
      layout: Layouts.default,
    },
  },
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('@/pages/news/news/NewsPage.vue'),
    meta: {
      layout: Layouts.default,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => ({ name: 'newsList', params: {} }),
  },
] as const
