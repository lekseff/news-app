import type { RouteRecordRaw } from 'vue-router'
import { Layouts } from '@/app/layouts/ELayouts'

export const pageRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'news',
    component: () => import('@/pages/NewsPage.vue'),
    meta: {
      layout: Layouts.default,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => ({ name: 'news', params: {} }),
  },
] as const
